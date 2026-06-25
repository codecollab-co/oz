import { Chat, type UIMessage } from "@ai-sdk/react";
import {
  type ChatTransport,
  lastAssistantMessageIsCompleteWithApprovalResponses,
} from "ai";
import { getModel, providerNeedsKey, type ModelId } from "../config";
import { usePreferencesStore } from "@/features/layout-chrome/settings/preferences";
import { BUILTIN_AGENTS } from "../lib/agents";
import { useAiAgentsStore } from "./aiAgentsStore";
import { usePlanStore } from "./planStore";
import { createContextAwareTransport } from "../lib/transport";
import type { ToolContext } from "../tools/tools";
import {
  chats,
  getActiveProviderKey,
  seedMessages,
  touchChat,
  useAiChatStore,
} from "./aiChatStore";

function makeChat(sessionId: string): Chat<UIMessage> {
  const readCache = new Map<string, { size: number; hash: number }>();
  const toolContext: ToolContext = {
    getCwd: () => useAiChatStore.getState().live.getCwd(),
    getWorkspaceRoot: () => useAiChatStore.getState().live.getWorkspaceRoot(),
    getTerminalContext: () => useAiChatStore.getState().live.getTerminalContext(),
    isActiveTerminalPrivate: () =>
      useAiChatStore.getState().live.isActiveTerminalPrivate(),
    injectIntoActivePty: (text) =>
      useAiChatStore.getState().live.injectIntoActivePty(text),
    openPreview: (url) => useAiChatStore.getState().live.openPreview(url),
    spawnAgent: (prompt) =>
      useAiChatStore.getState().live.spawnManagedAgent(prompt, sessionId),
    readAgentOutput: (leafId) =>
      useAiChatStore.getState().live.readLeafBuffer(leafId),
    readCache,
    getSessionId: () => sessionId,
  };

  const transport = createContextAwareTransport({
    getKeys: () => useAiChatStore.getState().apiKeys,
    toolContext,
    getModelId: () => useAiChatStore.getState().selectedModelId,
    getCustomInstructions: () =>
      usePreferencesStore.getState().customInstructions,
    getAgentPersona: () => {
      const { activeId, customAgents } = useAiAgentsStore.getState();
      const all = [...BUILTIN_AGENTS, ...customAgents];
      const a = all.find((x) => x.id === activeId) ?? BUILTIN_AGENTS[0];
      return { name: a.name, instructions: a.instructions };
    },
    getLive: () => {
      const live = useAiChatStore.getState().live;
      return {
        cwd: live.getCwd(),
        terminalPrivate: live.isActiveTerminalPrivate(),
        workspaceRoot: live.getWorkspaceRoot(),
        activeFile: live.getActiveFile(),
      };
    },
    getPlanMode: () => usePlanStore.getState().active,
    getLmstudioBaseURL: () => usePreferencesStore.getState().lmstudioBaseURL,
    getLmstudioModelId: () => usePreferencesStore.getState().lmstudioModelId,
    getMlxBaseURL: () => usePreferencesStore.getState().mlxBaseURL,
    getMlxModelId: () => usePreferencesStore.getState().mlxModelId,
    getOllamaBaseURL: () => usePreferencesStore.getState().ollamaBaseURL,
    getOllamaModelId: () => usePreferencesStore.getState().ollamaModelId,
    getOpenaiCompatibleBaseURL: () =>
      usePreferencesStore.getState().openaiCompatibleBaseURL,
    getOpenaiCompatibleModelId: () =>
      usePreferencesStore.getState().openaiCompatibleModelId,
    getOpenaiCompatibleContextLimit: () =>
      usePreferencesStore.getState().openaiCompatibleContextLimit,
    getOpenrouterModelId: () =>
      usePreferencesStore.getState().openrouterModelId,
    getCustomEndpoints: () => usePreferencesStore.getState().customEndpoints,
    getCustomEndpointKeys: () => useAiChatStore.getState().customEndpointKeys,
    onStep: (step) => {
      useAiChatStore.getState().patchAgentMeta({ step });
    },
    onCompact: (info) => {
      useAiChatStore.getState().patchAgentMeta({
        compactionNotice: { droppedCount: info.droppedCount, at: Date.now() },
      });
    },
    onFinishMeta: (info) => {
      useAiChatStore.getState().patchAgentMeta({ hitStepCap: info.hitStepCap });
    },
    onUsage: (delta) => {
      const cur = useAiChatStore.getState().agentMeta.tokens;
      useAiChatStore.getState().patchAgentMeta({
        tokens: {
          inputTokens: cur.inputTokens + delta.inputTokens,
          outputTokens: cur.outputTokens + delta.outputTokens,
          cachedInputTokens: cur.cachedInputTokens + delta.cachedInputTokens,
        },
        lastInputTokens: delta.lastInputTokens,
        lastCachedTokens: delta.lastCachedTokens,
      });
    },
  }) as unknown as ChatTransport<UIMessage>;

  const initialMessages = seedMessages.get(sessionId);
  seedMessages.delete(sessionId);

  return new Chat<UIMessage>({
    id: sessionId,
    transport,
    messages: initialMessages,
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses,
    onError: (e) => {
      useAiChatStore.getState().patchAgentMeta({
        status: "error",
        error: e instanceof Error ? e.message : String(e),
      });
    },
  });
}

export function getOrCreateChat(sessionId: string): Chat<UIMessage> {
  const existing = chats.get(sessionId);
  if (existing) {
    touchChat(sessionId, existing);
    return existing;
  }
  const c = makeChat(sessionId);
  touchChat(sessionId, c);
  return c;
}

export async function sendMessage(text: string): Promise<boolean> {
  const state = useAiChatStore.getState();
  const sessionId = state.activeSessionId;
  if (!sessionId) return false;
  if (
    providerNeedsKey(getModel(state.selectedModelId as ModelId).provider) &&
    !getActiveProviderKey()
  )
    return false;
  const c = getOrCreateChat(sessionId);
  await c.sendMessage({ text });
  return true;
}

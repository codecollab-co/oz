import {
  ChatGptIcon,
  ClaudeIcon,
  RoboticIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { OzLogo } from "@/components/OzLogo";

function iconFor(agent: string): IconSvgElement {
  const a = agent.toLowerCase();
  if (a.includes("claude")) return ClaudeIcon;
  if (a.includes("codex") || a.includes("gpt") || a.includes("openai"))
    return ChatGptIcon;
  return RoboticIcon;
}

export function AgentIcon({
  agent,
  size = 15,
  className,
}: {
  agent: string;
  size?: number;
  className?: string;
}) {
  if (agent.toLowerCase().includes("oz")) {
    return (
      <OzLogo size={size} className={className} />
    );
  }
  return (
    <HugeiconsIcon
      icon={iconFor(agent)}
      size={size}
      strokeWidth={1.75}
      className={className}
    />
  );
}

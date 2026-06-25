# Multi-Provider BYOK and Local Offline Models

We decided to support a diverse set of cloud and local AI models rather than locking the terminal to a single cloud provider. The application implements a Bring Your Own Key (BYOK) model supporting Anthropic, OpenAI, Google Gemini, Groq, and custom OpenAI-compatible API base URLs. In addition, the application automatically integrates with local offline inference engines (such as Ollama, LM Studio, and MLX) to support complete offline operations and token-cost-free execution on local developer machines.

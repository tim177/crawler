import type React from "react";
import { useState, useRef, useEffect } from "react";
import { SendIcon, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
}

interface ChatPanelProps {
  chatConfig: ChatConfig;
}

export function ChatPanel({ chatConfig }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { role: "assistant", content: "Hello! Welcome to Senaptiq.", id: "1" },
        {
          role: "assistant",
          content: "How can I assist you with our AI solutions today?",
          id: "2",
        },
      ]);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      id: Date.now().toString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError(null);
    setIsLoading(true);

    const tempAssistantMessage: Message = {
      role: "assistant",
      content: "Thinking...",
      id: (Date.now() + 1).toString(),
    };

    setMessages((prev) => [...prev, tempAssistantMessage]);

    try {
      const response = await fetch("http://localhost:3000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: input, // Send user input as "query"
          messages: [...messages, userMessage].map(({ role, content }) => ({
            role,
            content,
          })),
          config: chatConfig,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const jsonResponse = await response.json();
      if (!jsonResponse || !jsonResponse.response) {
        throw new Error("Invalid response format from server");
      }

      // Extract only the "response" field
      const assistantResponse: string = jsonResponse.response;

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempAssistantMessage.id
            ? { ...msg, content: assistantResponse }
            : msg
        )
      );
    } catch (err) {
      setError("Failed to get a response. Please try again.");
      console.error("Error in chat request:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.content ||
                  (isLoading &&
                    message.id === messages[messages.length - 1].id && (
                      <span className="inline-block w-4 h-4 bg-gray-300 rounded-full animate-pulse"></span>
                    ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
            {error}
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <SendIcon size={18} />
            )}
          </button>
        </form>

        <div className="mt-2 text-xs text-gray-500 flex items-center">
          <span>Using: {chatConfig.model}</span>
          <span className="mx-2">•</span>
          <span>Temp: {chatConfig.temperature}</span>
        </div>
      </div>
    </div>
  );
}

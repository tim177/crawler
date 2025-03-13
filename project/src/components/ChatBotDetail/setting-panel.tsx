import { useState } from "react";

interface ChatConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  systemPrompt: string;
}

interface SettingsPanelProps {
  chatConfig: ChatConfig;
  onConfigChange: (config: Partial<ChatConfig>) => void;
}

export function SettingsPanel({
  chatConfig,
  onConfigChange,
}: SettingsPanelProps) {
  const [localSystemPrompt, setLocalSystemPrompt] = useState(
    chatConfig.systemPrompt
  );

  const models = [
    { id: "llama-3.1-70b-versatile", name: "LLaMA 3.1 70B Versatile" },
    { id: "llama-3.1-8b-versatile", name: "LLaMA 3.1 8B Versatile" },
    { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B 32K" },
    { id: "gemma-7b-it", name: "Gemma 7B IT" },
  ];

  const handleSystemPromptSave = () => {
    onConfigChange({ systemPrompt: localSystemPrompt });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Settings</h2>

      <div className="space-y-8">
        {/* Model Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Model
          </label>
          <select
            value={chatConfig.model}
            onChange={(e) => onConfigChange({ model: e.target.value })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500">
            Select the AI model to use for generating responses
          </p>
        </div>

        {/* Temperature Slider */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Temperature: {chatConfig.temperature}
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs">0</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={chatConfig.temperature}
              onChange={(e) =>
                onConfigChange({
                  temperature: Number.parseFloat(e.target.value),
                })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="text-xs">1</span>
          </div>
          <p className="text-xs text-gray-500">
            Lower values produce more consistent outputs, higher values more
            creative
          </p>
        </div>

        {/* Max Tokens */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Max Tokens: {chatConfig.maxTokens}
          </label>
          <input
            type="range"
            min="100"
            max="4000"
            step="100"
            value={chatConfig.maxTokens}
            onChange={(e) =>
              onConfigChange({ maxTokens: Number.parseInt(e.target.value) })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <p className="text-xs text-gray-500">
            Maximum number of tokens to generate in the response
          </p>
        </div>

        {/* System Prompt */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            System Prompt
          </label>
          <div className="flex flex-col gap-2">
            <textarea
              value={localSystemPrompt}
              onChange={(e) => setLocalSystemPrompt(e.target.value)}
              rows={4}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter system instructions for the AI..."
            />
            <div className="flex justify-end">
              <button
                onClick={handleSystemPromptSave}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Prompt
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Instructions that define how the AI should behave
          </p>
        </div>

        {/* Status Information */}
        {/* <div className="p-4 border rounded-md bg-gray-50">
          <p className="text-sm text-gray-700">Status: Check the code for this</p>
        </div>

        <div className="p-4 border rounded-md bg-gray-50">
          <p className="text-sm text-gray-700">
            Last trained at: December 31, 2024 at 6:24 PM
          </p>
        </div> */}
      </div>
    </div>
  );
}

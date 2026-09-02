import { useState } from "react";

const API_URL = "https://tradeaudit-backend-h3z4.onrender.com";

function AIChat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendQuestion = async () => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: trimmedQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmedQuestion,
        }),
      });

      if (!response.ok) {
        throw new Error("Chat API failed");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: data.answer || "No answer received.",
        },
      ]);
    } catch (error) {
      console.error("AI Chat Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "Could not connect to AI assistant.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="ai-chat"
      className="mb-8 rounded-xl border border-gray-800 bg-[#161B22]"
    >
      {/* Header */}
      <div className="border-b border-gray-800 p-5">
        <h2 className="text-lg font-semibold text-white">
          🤖 AI Trading Assistant
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Ask questions about your trades and portfolio
        </p>
      </div>

      {/* Messages */}
      <div className="max-h-80 min-h-40 space-y-4 overflow-y-auto p-5">

        {messages.length === 0 && (
          <div className="flex min-h-32 items-center justify-center text-center">
            <div>
              <p className="text-sm text-gray-400">
                Ask me anything about your trading activity.
              </p>

              <p className="mt-2 text-xs text-gray-600">
                Example: What trades did I make today?
              </p>
            </div>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${
                message.type === "user"
                  ? "bg-blue-600 text-white"
                  : "border border-gray-800 bg-[#0D1117] text-gray-300"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-sm text-gray-500">
            AI is thinking...
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex gap-3">

          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendQuestion();
              }
            }}
            placeholder="Ask about your trades..."
            className="flex-1 rounded-lg border border-gray-800 bg-[#0D1117] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-blue-500"
          />

          <button
            onClick={sendQuestion}
            disabled={loading || !question.trim()}
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-40"
          >
            {loading ? "..." : "Send"}
          </button>

        </div>
      </div>
    </section>
  );
}

export default AIChat;
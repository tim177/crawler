import { useState } from "react";

const ChatComponent = () => {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState<{ role: string; content: string }[]>(
    []
  );

  const handleSend = async () => {
    if (!query.trim()) return;

    //Add user message to chat
    setMessage((prev) => [...prev, { role: "user", content: query }]);

    try {
      const response = await fetch("http://localhost:3000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      setMessage((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (err) {
      console.log(err);
      setMessage((prev) => [
        ...prev,
        { role: "assistant", content: "Error getting response" },
      ]);
    }

    //clear input
    setQuery("");
  };
  return (
    <div>
      <div>
        {message.map((msg, index) => (
          <div key={index}>
            <strong>{msg.role === "user" ? "you" : "Ai"}</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a question"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatComponent;

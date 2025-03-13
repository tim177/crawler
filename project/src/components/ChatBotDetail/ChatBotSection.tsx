// ChatBotList.tsx
import { useNavigate } from "react-router-dom";

// interface ChatBot {
//   id: string;
//   name: string;
// }

const ChatBotList = () => {
  const navigate = useNavigate();

  const handleChatBotClick = (id: string) => {
    navigate(`/chatbot/${id}`);
  };

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:3000/chatbot");

      if (response.ok) {
        const html = await response.text();
        document.getElementById("chatbot-container")!.innerHTML = html;
      } else {
        console.log("failed to fetch chatbot");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Chatbots</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={handleClick}
        >
          New Chatbot
        </button>
      </div>
      <div id="chatbot-container"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[{ id: "1", name: "Senaptiq" }].map((bot) => (
          <div
            key={bot.id}
            onClick={() => handleChatBotClick(bot.id)}
            className="bg-gray-50 p-6 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 mb-4">
              <svg
                className="w-full h-full text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-gray-900">{bot.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

// ChatBotDetail.tsx
interface ChatBotDetailProps {
  id: string;
}

const ChatBotDetail = ({ id }: ChatBotDetailProps) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chatbot Details</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl mb-4">ID: {id}</h2>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

export { ChatBotList, ChatBotDetail };

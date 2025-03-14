import { useState } from "react";

interface StoreButtonProps {
  links: string[];
}

export default function StoreButton({ links }: StoreButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClick = async () => {
    if (isLoading || isSuccess) return;

    setIsLoading(true);

    const API_URL =
      window.location.hostname === "localhost"
        ? "http://127.0.0.1:8000/store" // New route for storing links
        : "https://crawler-backend-ftdv.onrender.com/store";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ links }),
      });

      const data = await response.json();
      if (data.success) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error storing data:", error);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <button
        onClick={handleClick}
        disabled={isLoading || isSuccess}
        className={`
          relative px-6 py-3 rounded-lg font-medium text-white transition-all duration-300
          ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : isSuccess
              ? "bg-green-500 hover:bg-green-500 cursor-default" // Prevent hover effect
              : "bg-blue-500 hover:bg-blue-600"
          }
          focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50
          disabled:opacity-70
        `}
      >
        <span
          className={`flex items-center justify-center ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          {isSuccess ? "Stored Successfully!" : "Store in DB"}
        </span>

        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="ml-2">Storing...</span>
          </span>
        )}
      </button>

      {isSuccess && (
        <div className="mt-4 px-4 py-2 bg-green-100 text-green-800 rounded-md flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          Data stored successfully!
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { AlertMessage } from "./Alert";

interface ApiResponse {
  success: boolean;
  links: string[];
}

const ToggleSections = () => {
  const [activeSection, setActiveSection] = useState("website");
  const [crawlUrl, setCrawlUrl] = useState("");
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCrawlFetch = async () => {
    if (!crawlUrl.startsWith("http://") && !crawlUrl.startsWith("https://")) {
      alert("Please enter a valid URL starting with http:// or https://");
      return;
    }

    setIsLoading(true);
    setApiResponse(null);

    try {
      const API_URL =
        window.location.hostname === "localhost"
          ? "http://127.0.0.1:8000/crawl" // Local environment
          : "https://crawler-backend-ftdv.onrender.com/crawl"; // Production

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: crawlUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch links. Please try again.");
      }

      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error("Error fetching links:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-6 bg-transparent min-h-screen flex flex-col md:flex-row gap-6">
      {/* Toggle Buttons */}
      <div className="flex flex-row md:flex-col gap-2 md:gap-4 mb-4 md:mb-0">
        <button
          className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
            activeSection === "website"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveSection("website")}
        >
          Website
        </button>
        <button
          className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
            activeSection === "text"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveSection("text")}
        >
          Text
        </button>
        <button
          className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md ${
            activeSection === "files"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => setActiveSection("files")}
        >
          Files
        </button>
      </div>

      {/* Sections */}
      <div className="w-full max-w-xxl bg-white p-6 rounded-lg shadow-lg border border-gray-100 transition-all duration-300">
        {activeSection === "website" && (
          <div className="bg-white rounded-lg p-6 max-w-full mx-auto">
            {/* Header Section */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Train Your Chatbot on Website Content
            </h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Enhance your chatbot's knowledge by adding content from websites.
              You can crawl a website, use a sitemap, or manually enter specific
              URLs.
            </p>

            <AlertMessage />

            {/* Crawl Section */}
            <div className="mt-6">
              <label
                htmlFor="crawl"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Crawl Website
              </label>
              <div className="flex mt-2 group">
                <input
                  type="url"
                  id="crawl"
                  placeholder="https://example.com/"
                  value={crawlUrl}
                  onChange={(e) => setCrawlUrl(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 border border-gray-300 rounded-l-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-400"
                />
                <button
                  onClick={handleCrawlFetch}
                  disabled={isLoading}
                  className={`${
                    isLoading
                      ? "bg-orange-400 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600 active:bg-orange-700"
                  } text-white px-6 py-3 rounded-r-md transition-all duration-200 font-medium flex items-center justify-center min-w-[120px]`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      Crawling...
                    </span>
                  ) : (
                    "Fetch Links"
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                This will crawl all the links and PDF files starting with the
                URL. (Must start with "http://" or "https://")
              </p>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="mt-8 flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-100 animate-pulse">
                <div className="relative w-16 h-16 mb-4">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  Crawling Website
                </h3>
                <p className="text-sm text-gray-500 text-center max-w-md">
                  We're currently crawling {crawlUrl} to fetch all available
                  links. This might take a moment depending on the size of the
                  website.
                </p>
              </div>
            )}

            {/* Display API Response */}
            {apiResponse && !isLoading && (
              <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-inner transition-all duration-300 hover:shadow-md">
                <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Crawl Results:
                </h3>
                <p className="text-xs text-gray-500">
                  {apiResponse.links.length} links found
                </p>
                <div className="mt-3 max-h-80 overflow-y-auto rounded-md shadow-sm border border-gray-200">
                  <ul className="divide-y divide-gray-100 bg-white">
                    {apiResponse?.links.length ? (
                      apiResponse?.links.map((link, index) => (
                        <li
                          key={index}
                          className="px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="flex-shrink-0 font-medium text-gray-500 mt-0.5">
                              {index + 1}.
                            </span>
                            <span className="text-blue-600 hover:text-blue-800 hover:underline break-all">
                              {link}
                            </span>
                          </a>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-3 text-sm text-gray-500">
                        No links found
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {activeSection === "text" && (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-4">Text Section</h2>
            <p className="text-gray-600">
              Provide the text input here for your chatbot.
            </p>
            <div className="mt-6 p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center">
              <p className="text-gray-400">
                Text input functionality coming soon
              </p>
            </div>
          </div>
        )}

        {activeSection === "files" && (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-4">Files Section</h2>
            <p className="text-gray-600">Upload and manage your files here.</p>
            <div className="mt-6 p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center">
              <p className="text-gray-400">
                File upload functionality coming soon
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToggleSections;

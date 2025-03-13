import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../Button";
import axios from "axios";

interface LoginFormState {
  email: string;
  password: string;
}

export function LogInForm() {
  const [formState, setFormState] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://3.110.223.250:8000/login", {
        email: formState.email,
        password: formState.password,
      });
      console.log("Login successful:", response.data);
      setSuccess(true);
      setError(null);
    } catch (err: unknown) {
      console.error("Error logging in:", err);
      setError("Failed to log in. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormState({ ...formState, email: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        <div className="relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="••••••••"
            value={formState.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormState({ ...formState, password: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 text-gray-500 dark:text-gray-400 focus:outline-none"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.875 18.825A10.05 10.05 0 0012 19c-4.563 0-8.474-3.15-10-7.5a10.05 10.05 0 011.179-2.62m2.54-2.58A10.05 10.05 0 0112 5c4.563 0 8.474 3.15 10 7.5a10.05 10.05 0 01-1.179 2.62m-2.54 2.58l-3.85-3.85m0 0l-3.85-3.85m7.7 7.7a3.015 3.015 0 010-4.285m-7.7-3.415a3.015 3.015 0 014.285 0m7.7 7.7l.01.01"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5c4.563 0 8.474 3.15 10 7.5a10.05 10.05 0 01-1.179 2.62m-2.54 2.58A10.05 10.05 0 0112 19c-4.563 0-8.474-3.15-10-7.5a10.05 10.05 0 011.179-2.62m2.54-2.58A10.05 10.05 0 0112 5m0 0a3.015 3.015 0 010 4.285M12 5a3.015 3.015 0 014.285 0"
                />
              </svg>
            )}
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Login successful!</p>}
        <Button type="submit" className="w-full">
          Log In
        </Button>
      </form>
    </motion.div>
  );
}

export default LogInForm;

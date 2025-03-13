import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/Button";
import axios from "axios";

// Define a type for the subscription data
interface Subscription {
  id: string;
  name: string;
  price: string;
  currency: string;
}

const SignUp = () => {
  const [formState, setFormState] = useState({
    email: "",
    subscription_id: "", // Default value for subscription_id
    source: "google", // Default value for source
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]); // Use Subscription type for subscriptions state

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          "http://3.110.223.250:8000/subscriptions"
        );
        setSubscriptions(response.data); // Assuming the response contains an array of subscriptions
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
        setError("Failed to load subscription plans.");
      }
    };
    fetchSubscriptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://3.110.223.250:8000/register", // Update this URL as per your API
        {
          email: formState.email,
          subscription_id: formState.subscription_id, // Send the selected subscription ID
          source: formState.source,
        }
      );
      console.log("Response:", response.data);
      setSuccess(true); // Show success message or redirect
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error("Error signing up:", err);
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4 mt-16">
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
        <div className="mb-4">
          <label
            htmlFor="subscription_id"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Select Plan
          </label>
          <select
            id="subscription_id"
            value={formState.subscription_id}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFormState({ ...formState, subscription_id: e.target.value })
            }
            className="w-full cursor-pointer focus:outline-none focus:ring-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select a Plan</option>
            {subscriptions.length > 0 ? (
              subscriptions.map((subscription) => (
                <option key={subscription.id} value={subscription.id}>
                  {subscription.name} - {subscription.price}{" "}
                  {subscription.currency}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Loading plans...
              </option>
            )}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="source"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            How did you hear about us?
          </label>
          <select
            id="source"
            value={formState.source}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFormState({ ...formState, source: e.target.value })
            }
            className="w-full cursor-pointer focus:outline-none focus:ring-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="google">Google</option>
            <option value="linkedin">LinkedIn</option>
            <option value="instagram">Instagram</option>
          </select>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Sign-up successful!</p>}
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
    </motion.div>
  );
};

export default SignUp;

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthFetch } from "../utils/authFetch";

export default function AddUsingAiModal({ isOpen, onClose, deckId }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const authFetch = useAuthFetch();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const res = await authFetch(`${import.meta.env.VITE_BASE_URL}api/cardRoutes/generateAI`, {
        method: "POST",
        body: JSON.stringify({ prompt, deckId }),
      });

      if (!res.ok) throw new Error("AI generation failed");
      toast.success("AI-generated cards added!");
      onClose();
    } catch (err) {
      toast.error("Failed to generate cards");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Generate Cards with AI
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full rounded border p-3 dark:bg-gray-700 dark:text-white"
            placeholder="Enter topic or concept to generate cards"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

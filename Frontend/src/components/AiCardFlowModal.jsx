import React from "react";

export default function AiCardFlowModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">📘 Add Cards using AI</h2>
        <ol className="list-decimal pl-5 space-y-3 text-gray-800 dark:text-gray-200">
          <li>
            <span className="font-medium">Create a Deck</span> with a name and optional description.
          </li>
          <li>
            <span className="font-medium">Open the Deck</span> you just created from your dashboard.
          </li>
          <li>
            Click on <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">➕ Add Cards using AI</span>.
          </li>
          <li>
            Enter a <span className="font-medium">topic prompt</span> (e.g., "Basics of React") that the AI will use.
          </li>
          <li>
            AI will generate up to <span className="font-medium">15 flashcards</span> based on your prompt.
          </li>
          <li>
            Review and start studying with your new cards!
          </li>
        </ol>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Got it, let's go!
        </button>
      </div>
    </div>
  );
}

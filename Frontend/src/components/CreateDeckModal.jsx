import { useState } from "react";

export default function CreateModalDeck({isOpen,onClose,onCreate}){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleCreateDeck = (e)=>{
        e.preventDefault();
        if (!title.trim()) return;
        onCreate({ title, description });
        setTitle("");
        setDescription("");
        onClose();
    }

    if(!isOpen) return null;
    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Create New Deck</h2>
                <form onSubmit={handleCreateDeck} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Deck Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none"
                  />
                  <textarea
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
        </>
    )
}
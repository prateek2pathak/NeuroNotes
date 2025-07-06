import { useState, useEffect } from "react";

export default function EditCardModal({ isOpen, onClose, onSubmit, question, answer }) {
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    useEffect(() => {
        if (isOpen) {
            setFront(question);
            setBack(answer);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!front.trim() || !back.trim()) {
            onClose();
            return;
        }
        onSubmit({ front, back });
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Add New Card</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="front" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                            Front (Question)
                        </label>
                        <textarea
                            id="front"
                            value={front}
                            onChange={(e) => setFront(e.target.value)}
                            rows={3}
                            className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter question or prompt"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="back" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                            Back (Answer)
                        </label>
                        <textarea
                            id="back"
                            value={back}
                            onChange={(e) => setBack(e.target.value)}
                            rows={3}
                            className="w-full rounded border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter answer or explanation"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                        >
                            Save Card
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}
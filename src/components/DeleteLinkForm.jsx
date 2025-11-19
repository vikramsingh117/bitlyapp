"use client";
import { useState } from "react";

export default function DeleteLinkForm({ onSuccess, onError }) {
  const [shortId, setShortId] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!shortId.trim()) {
      onError?.("Please enter a short ID to delete");
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(`/api/links/${shortId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        setShortId("");
        onSuccess?.("Link deleted successfully!");
      } else {
        onError?.(data.message || "Failed to delete link");
      }
    } catch (error) {
      const errorMsg = "Network error. Please try again.";
      onError?.(errorMsg);
      console.error("Failed to delete link", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Delete Link</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter short ID to delete"
            value={shortId}
            onChange={(e) => setShortId(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={deleting}
          />
          <button
            type="submit"
            disabled={deleting || !shortId.trim()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {deleting ? "Deleting..." : "Delete Link"}
          </button>
        </div>
      </form>
    </section>
  );
}


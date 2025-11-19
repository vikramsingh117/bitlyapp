"use client";
import { useState } from "react";

export default function CreateLinkForm({ onSuccess }) {
  const [longUrl, setLongUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [urlError, setUrlError] = useState("");

  const validateUrl = (url) => {
    if (!url.trim()) {
      return "URL is required";
    }
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return "URL must start with http:// or https://";
    }
    try {
      new URL(url);
      return "";
    } catch {
      return "Please enter a valid URL";
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const validationError = validateUrl(longUrl);
    if (validationError) {
      setUrlError(validationError);
      return;
    }

    setUrlError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/links", {
        method: "POST",
        body: JSON.stringify({ longUrl }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setLongUrl("");
        onSuccess?.();
      } else {
        setUrlError(data.message || "Failed to create link");
      }
    } catch (error) {
      setUrlError("Network error. Please try again.");
      console.error("Failed to add new link", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Create Short Link</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="longUrl" className="block text-sm font-medium text-gray-700 mb-2">
            Long URL
          </label>
          <div className="flex gap-2">
            <input
              id="longUrl"
              type="text"
              placeholder="https://example.com"
              value={longUrl}
              onChange={(e) => {
                setLongUrl(e.target.value);
                setUrlError("");
              }}
              className={`flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                urlError
                  ? "border-red-300 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting || !longUrl.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? "Creating..." : "Create Link"}
            </button>
          </div>
          {urlError && (
            <p className="mt-2 text-sm text-red-600">{urlError}</p>
          )}
        </div>
      </form>
    </section>
  );
}


"use client";
import { useEffect, useState } from "react";
import MessageBanner from "../src/components/MessageBanner";
import CreateLinkForm from "../src/components/CreateLinkForm";
import DeleteLinkForm from "../src/components/DeleteLinkForm";
import LinksTable from "../src/components/LinksTable";

export default function Home() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/links");
      if (res.ok) {
        const data = await res.json();
        setLinks(data || []);
      } else {
        setError("Failed to load links");
      }
    } catch (err) {
      setError("Failed to load links");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = (message) => {
    setSuccess(message);
    setError("");
    fetchLinks();
    setTimeout(() => setSuccess(""), 5000);
  };

  const handleError = (message) => {
    setError(message);
    setSuccess("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">URL Shortener</h1>
          <p className="text-gray-600">Create and manage your shortened links</p>
        </header>

        <MessageBanner type="success" message={success} />
        <MessageBanner type="error" message={error} />

        <CreateLinkForm onSuccess={handleSuccess} onError={handleError} />
        <DeleteLinkForm onSuccess={handleSuccess} onError={handleError} />
        <LinksTable links={links} loading={loading} onRefresh={fetchLinks} />
      </div>
    </div>
  );
}

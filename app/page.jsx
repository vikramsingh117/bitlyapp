"use client";
import { useEffect, useState } from "react";
import CreateLinkForm from "../src/components/CreateLinkForm";
import DeleteLinkForm from "../src/components/DeleteLinkForm";
import LinksTable from "../src/components/LinksTable";

export default function Home() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/links");
      if (res.ok) {
        const data = await res.json();
        setLinks(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    fetchLinks();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">URL Shortener</h1>
          <p className="text-gray-600">Create and manage your shortened links</p>
        </header>

        <CreateLinkForm onSuccess={handleSuccess} />
        <DeleteLinkForm onSuccess={handleSuccess} />
        <LinksTable links={links} loading={loading} />
      </div>
    </div>
  );
}

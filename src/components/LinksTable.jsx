"use client";
import { useState } from "react";
import LinkRow from "./LinkRow";

export default function LinksTable({ links, loading, onRefresh }) {
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filter, setFilter] = useState("");
  const [copiedId, setCopiedId] = useState("");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(""), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const truncateUrl = (url, maxLength = 50) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
  };

  const sortedAndFilteredLinks = [...links]
    .filter((link) => {
      if (!filter) return true;
      const searchTerm = filter.toLowerCase();
      return (
        link.longUrl.toLowerCase().includes(searchTerm) ||
        link.shortUrl.toLowerCase().includes(searchTerm) ||
        link.shortId.toLowerCase().includes(searchTerm)
      );
    })
    .sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === "createdAt" || sortField === "updatedAt") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      } else if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  const SortableHeader = ({ field, children }) => (
    <th
      className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-2">
        {children}
        {sortField === field && (
          <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
        )}
      </div>
    </th>
  );

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Links</h2>
        <input
          type="text"
          placeholder="Search links..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading links...</p>
        </div>
      ) : sortedAndFilteredLinks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {filter ? "No links match your search" : "No links yet. Create your first short link above!"}
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <SortableHeader field="shortUrl">Short URL</SortableHeader>
                  <SortableHeader field="longUrl">Long URL</SortableHeader>
                  <SortableHeader field="visitCount">Clicks</SortableHeader>
                  <SortableHeader field="createdAt">Created</SortableHeader>
                  <SortableHeader field="updatedAt">Last Clicked</SortableHeader>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedAndFilteredLinks.map((link) => (
                  <LinkRow
                    key={link._id}
                    link={link}
                    copiedId={copiedId}
                    onCopy={handleCopy}
                    truncateUrl={truncateUrl}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {sortedAndFilteredLinks.length} of {links.length} link{links.length !== 1 ? "s" : ""}
          </div>
        </>
      )}
    </section>
  );
}


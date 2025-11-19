"use client";
import { useState } from "react";

export default function LinksTable({ links, loading }) {
  const [filter, setFilter] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredLinks = links.filter((link) => {
    if (!filter) return true;
    const searchTerm = filter.toLowerCase();
    return (
      link.longUrl.toLowerCase().includes(searchTerm) ||
      link.shortUrl.toLowerCase().includes(searchTerm) ||
      link.shortId.toLowerCase().includes(searchTerm)
    );
  });

  const sortedLinks = [...filteredLinks].sort((a, b) => {
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

  if (loading) {
    return (
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p>Loading links...</p>
      </section>
    );
  }

  if (links.length === 0) {
    return (
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p>No links yet. Create your first short link above!</p>
      </section>
    );
  }

  const truncateUrl = (url, maxLength = 60) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
  };

  return (
    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-4 flex gap-4 items-center">
        <h2 className="text-xl font-semibold text-gray-900">Your Links</h2>
        <input
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase cursor-pointer hover:bg-gray-100 w-1/4"
                onClick={() => handleSort("shortUrl")}
              >
                Short URL {sortField === "shortUrl" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase cursor-pointer hover:bg-gray-100 w-2/5"
                onClick={() => handleSort("longUrl")}
              >
                Long URL {sortField === "longUrl" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase cursor-pointer hover:bg-gray-100 w-1/12"
                onClick={() => handleSort("visitCount")}
              >
                Clicks {sortField === "visitCount" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase cursor-pointer hover:bg-gray-100 w-1/6"
                onClick={() => handleSort("updatedAt")}
              >
                Last Clicked {sortField === "updatedAt" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedLinks.map((link) => (
              <tr key={link._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <a href={link.shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate block" title={link.shortUrl}>
                    {truncateUrl(link.shortUrl, 40)}
                  </a>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-900 truncate block" title={link.longUrl}>
                    {truncateUrl(link.longUrl, 60)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-900">{link.visitCount}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-sm text-gray-600">
                    {new Date(link.updatedAt).toLocaleDateString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filter && (
        <div className="mt-4 text-sm text-gray-600">
          Showing {sortedLinks.length} of {links.length} links
        </div>
      )}
    </section>
  );
}

"use client";

export default function LinkRow({ link, copiedId, onCopy, truncateUrl }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono text-blue-600">
            {truncateUrl(link.shortUrl, 30)}
          </span>
          <button
            onClick={() => onCopy(link.shortUrl, `short-${link._id}`)}
            className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
            title="Copy short URL"
          >
            {copiedId === `short-${link._id}` ? (
              <span className="text-green-600">✓</span>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </button>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2 max-w-md">
          <span className="text-sm text-gray-900 truncate" title={link.longUrl}>
            {truncateUrl(link.longUrl, 40)}
          </span>
          <button
            onClick={() => onCopy(link.longUrl, `long-${link._id}`)}
            className="p-1 text-gray-500 hover:text-blue-600 transition-colors flex-shrink-0"
            title="Copy long URL"
          >
            {copiedId === `long-${link._id}` ? (
              <span className="text-green-600">✓</span>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            )}
          </button>
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="text-sm text-gray-900 font-medium">
          {link.visitCount}
        </span>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="text-sm text-gray-600">
          {new Date(link.createdAt).toLocaleDateString()}
        </span>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="text-sm text-gray-600">
          {new Date(link.updatedAt).toLocaleDateString()}
        </span>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <a
          href={link.shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Open
        </a>
      </td>
    </tr>
  );
}


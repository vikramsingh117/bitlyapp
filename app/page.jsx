// simple table to show short urls and long urls total clicks and created at, updated at
"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [links, setLinks] = useState([]);
  const [longUrl, setLongUrl] = useState("");
  const [shortId, setShortId] = useState("");
  useEffect(() => {
    fetch("/api/links")
      .then(res => res.json())
      .then(data => setLinks(data))
      .catch(err => console.error(err));
  }, []);

  const handleAddNewLink = async () => {
    try {
      const response = await fetch("/api/links", {
        method: "POST",
        body: JSON.stringify({ longUrl }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      // console.log("response", response);  
      if (response.ok) {
        const data = await fetch("/api/links")
        .then(res => res.json())
        .then(data => {
          // console.log("data", data);
          setLinks(data);
        })
        .catch(err => console.error(err));
        // console.log("links", links);
      }
    } catch (error) {
      console.error("Failed to add new link", error);
      // console.log("error", error);
    }
  }

  const handleDeleteLink = async () => {
    try {
      const response = await fetch(`/api/links/${shortId}`, {
        method: "DELETE"
      })
      if (response.ok) {
        setLinks(links.filter(link => link.shortId !== shortId));
      }
    }
    catch (error) {
      console.error("Failed to delete link", error);
    }
  }


  return (
    <>

      <table className="w-1/2">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Short URL</th>
            <th className="border border-gray-300 p-2">Long URL</th>
            <th className="border border-gray-300 p-2">Total Clicks</th>
            <th className="border border-gray-300 p-2">Created At</th>
            <th className="border border-gray-300 p-2">Last Clicked At</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link._id} className="border border-gray-300 p-2">
              <td className="border border-gray-300 p-2">{link.shortUrl}</td>
              <td className="border border-gray-300 p-2">{link.longUrl}</td>
              <td className="border border-gray-300 p-2">{link.visitCount}</td>
              <td className="border border-gray-300 p-2">{new Date(link.createdAt).toLocaleDateString()}</td>
              <td className="border border-gray-300 p-2">{new Date(link.updatedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>


    
    <div className="flex  gap-2 mt-4">
      <input 
        type="text" 
        placeholder="Enter long URL" 
        value={longUrl} 
        onChange={(e) => setLongUrl(e.target.value)}
        className="border border-gray-300 p-2 rounded-md"
      />
      <button className="bg-blue-500 text-white p-2 rounded-md" onClick={handleAddNewLink}>Add New Link</button>
    </div>
    <div className="flex  gap-2 mt-2">
      <input 
        type="text" 
        placeholder="Enter short ID to delete" 
        value={shortId} 
        onChange={(e) => setShortId(e.target.value)}
        className="border border-gray-300 p-2 rounded-md "
      />
      <button className="bg-red-500 text-white p-2 rounded-md" onClick={handleDeleteLink}>Delete Link</button>
    </div>

    </>
  )
}
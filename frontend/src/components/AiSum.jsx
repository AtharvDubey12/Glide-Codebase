import React, { useState } from "react";
import axios from "axios";
import './util.css';

function AiSum({ file }) {
  const [sum, setSum] = useState("Summarized text appears here...");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setSum("Fetching summarization...");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/summarize",
        {
          link: file.url,
        }
      );

      setSum(data.summary || data.error || "No summary returned.");
    } catch (err) {
      console.error(err);
      setSum("Error fetching summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-full p-5 text-center">
      <p>File to Scan:</p>
      <span className="text-sm">{file.name}</span>
      <p>File Type: {file.type}</p>

      <button
        disabled={loading}
        onClick={handleSummarize}
        className="mt-10 mb-5 p-3 rounded-lg border-white border-2"
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      <div className="w-full h-[50%] flex justify-center items-center">
        <div className="transparent_scroll p-4 w-[90%] h-full rounded-xl bg-violet-600 bg-opacity-10 overflow-auto text-sm text-gray-400">
          {sum}
        </div>
      </div>
    </div>
  );
}

export default AiSum;

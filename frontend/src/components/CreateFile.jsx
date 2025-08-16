import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function CreateFile({ onUpload }) {
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("txt");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isUploading, setIsUploading] = useState(false);


  const handleUpload = async () => {
    if (!fileName) return alert("Please enter a file name!");
    setIsUploading(true);
    try {
      const blob = new Blob([content], { type: "text/plain" });
      const file = new File([blob], `${fileName}.${fileType}`, {
        type: "text/plain",
      });
      const formData = new FormData();
      formData.append("file", file);
      formData.append("isPublic", isPublic);
      alert("hi")
      const res = await axios.post("http://localhost:4000/api/save-file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });

      alert("File uploaded successfully!");
      onUpload?.(res.data.file);
      setFileName("");
      setContent("");
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (!fileName) return alert("Please enter a file name!");
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.${fileType}`;
    link.click();
  };

  return (
    <div className="p-4 rounded w-full max-w-lg mx-auto">

      <input
        type="text"
        placeholder="File name.."
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        className="font-inter text-sm px-5 text-white p-2 mb-2 w-full rounded-lg bg-violet-900 bg-opacity-45"
      />

      <div className="flex gap-2 mb-2">
        <select
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          className="text-sm font-inter text-white p-2 px-4 rounded flex-1  bg-violet-900 bg-opacity-45"
        >
          <option className="text-white bg-violet-500" value="txt">Text File (.txt)</option>
          <option className="text-white bg-violet-500" value="md">Markdown (.md)</option>
        </select>

        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="h-4 w-4"
          />
          Public
        </label>
      </div>

      <textarea
        placeholder="Enter file content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="rounded-lg bg-violet-900 bg-opacity-45 text-white text-sm font-inter p-4 mb-2 w-full h-40 resize-none"
      />

      <div className="font-inter text-white text-sm p-3 mb-2 rounded-lg bg-violet-900 bg-opacity-45 max-h-64 min-h-[5.7rem] overflow-auto">
        <h3 className="font-medium mb-1">Preview:</h3>
        {fileType === "md" ? (
          <ReactMarkdown>{content || "_Nothing to preview..._"}</ReactMarkdown>
        ) : (
          <pre className="whitespace-pre-wrap">{content || "Nothing to preview"}</pre>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleDownload}
          className="mt-1 flex-1 bg-red-500 bg-opacity-30 text-white p-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
        >
          Download
        </button>

        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="mt-1 flex-1 bg-violet-700 bg-opacity-30 text-white p-2 rounded-lg hover:bg-violet-600 disabled:opacity-50 transition-colors duration-200"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
}

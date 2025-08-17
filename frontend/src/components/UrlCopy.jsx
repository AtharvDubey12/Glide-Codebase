import React, { useState } from "react";
const API_URL = import.meta.env.VITE_FRONTEND_URL;
function UrlCopy({ file, setCopy }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
    navigator.clipboard
      .writeText(`${API_URL}/download/${file._id}`)
      .then(() => {
        setCopied(true);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="cursor-default fixed flex justify-center items-center w-full h-full backdrop-blur-md z-[20] bg-black bg-opacity-10">
      <div className="cursor-default pt-4 pl-5 pr-5 text-gray-300 text-sm font-semibold font-inter w-[80vw] md:w-[50vw] h-[160px] bg-slate-900 rounded-xl">
        <p className="cursor-default mb-5 flex w-full justify-between">
          Share File{" "}
          <div onClick={()=>setCopy(false)} className="w-6 h-6 rounded-md bg-red-500 flex justify-center items-center text-black text-xs cursor-pointer">
            X
          </div>{" "}
        </p>
        <div className="w-full flex justify-center items-center">
          <input
            className="cursor-text p-2 text-xs text-gray-300 w-[80%] rounded-md h-8 bg-slate-800 border-2 border-gray-400 overflow-x-auto overflow-y-hidden"
            disabled
            value={`http://localhost:5173/download/${file._id}`}
            type="text"
          />{" "}
          <div onClick={()=>handleCopy()} className="ml-3 text-xs bg-violet-950 text-gray-300 bg-opacity-80 p-1 py-2 rounded-lg text-center">
            {copied ? 'copied' : 'copy'}
          </div>
        </div>
        <div className="text-xs mt-5 text-center w-full flex justify-center  text-gray-400">
          Note: a file can only be downloaded if it is marked as public
        </div>
      </div>
    </div>
  );
}

export default UrlCopy;

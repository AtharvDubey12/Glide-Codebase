import React, { useEffect, useState } from "react";
import axios from "axios";

function VirusScan({ file }) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("yet to be scanned.");
  const [scanRes, setScanRes] = useState(null);
  const [isSafe, setIsSafe] = useState(null);
  return (
    <div className="relative w-full h-full p-5 text-center">
      File to Scan: <br />
      <span className="text-sm font-inter break-words">{file.name}</span>
      <br /> <br />
      <p>File Size: <br /> <span className="font-inter text-sm">{file.size} KB</span></p>
      <div className="w-full h-[50%] flex flex-col justify-center items-center">
        <span className="text-center mb-5">
          <div
            className={`w-2 h-2 rounded-full ${
              status === "yet to be scanned."
                ? "bg-red-500"
                : status === "scanning..."
                ? "bg-yellow-500"
                : isSafe && status === "scan complete."
                ? "bg-green-400"
                : "bg-red-500"
            } -mb-4 -translate-x-4`}
          ></div>{" "}
          Scanning Status:{" "}
          <span className="mx-1 text-sm text-gray-500">{status}</span>
        </span>
        <button
          disabled={isLoading}
          onClick={async () => {
            setStatus("scanning...");
            setIsLoading(true);
            const { data } = await axios.post(
              "http://localhost:4000/api/scan",
              {
                fileUrl: file.url,
              }
            );
            setStatus("scan complete.");
            setScanRes(`found ${data.scan_results.total_detected_avs} viruses`);
            if (data.scan_results.total_detected_avs === 0) setIsSafe(true);
            else setIsSafe(false);
            setIsLoading(false);
          }}
          className="px-3 py-2 flex justify-center items-center rounded-lg border-white border-2"
        >
          {isLoading ? "Scanning..." : "Start Scanning"}
        </button>
        {status === "scanning..." ? (
          <div
            className="bottom-[15%] flex justify-center items-center absolute w-12 h-12 rounded-full
             bg-[conic-gradient(from_0deg,_transparent,_theme(colors.violet.600),_transparent,_transparent)] animate-spin-slow"
          >
            <div className="absolute w-10 h-10 rounded-full bg-[rgb(24,9,42)]"></div>
          </div>
        ) : status === "scan complete." ? (
          <div
            className={`px-3 py-2
          ${isSafe ? "bg-green-500" : "bg-red-500"}
            bg-opacity-20 text-sm font-inter rounded-lg absolute bottom-20`}
          >
            {scanRes}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default VirusScan;

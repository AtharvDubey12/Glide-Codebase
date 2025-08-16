import React, { useState } from "react";
import close from "../assets/close_pop.png";
import FileUpload from "./FileUpload.jsx";
import FolderCreate from "./FolderCreate.jsx";
import MiscInfo from "./MiscInfo.jsx";
import VirusScan from "./VirusScan.jsx";
import AiSum from "./AiSum.jsx";
import './util.css'
import CreateFile from "./CreateFile.jsx";
function FilePopup({ state, setInPopup, file, forceRefresh }) {
  return (
    <div className="cursor-pointer fixed backdrop-blur-sm flex justify-center items-center text-white w-full h-[calc(100%-60px)] bg-[rgba(13,13,13,0.7)] z-[30] flex-col">
      <div
        onClick={() => {
          setInPopup(false);
        }}
        className="fixed right-0 top-0 m-5 w-10 h-10 rounded-full bg-violet-900 bg-opacity-50 flex justify-center items-center"
      >
        <img src={close} className="invert w-[20px]" />
      </div>
      <p className="text-3xl font-extralight">{state}</p>
      <div
        className=" transparent_scroll overflow-y-auto
        text-white font-extralight h-[70vh] 
        m-5 sm:m-8 md:m-10 
        w-[90vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw]  
        rounded-2xl 
      bg-violet-900 bg-opacity-15 
        p-4 sm:p-6 md:p-8 backdrop-blur-lg"
      >
        {state === "Upload a File" ? (
          <FileUpload />
        ) : state === "Create a File" ? (
          <CreateFile />
        ) : state === "Scan for Viruses" ? (
          <VirusScan file={file} />
        ) : state === "AI Summarization" ? (
          <AiSum file={file} />
        ) : (
          <MiscInfo file={file} forceRefresh={forceRefresh} />
        )}
      </div>
    </div>
  );
}

export default FilePopup;

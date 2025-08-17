import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import axios from "axios";
import FilePopup from "./FilePopup";
import UrlCopy from "./UrlCopy";
import DeleteFile from "./DeleteFile";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function SemiMenu({ action, flag, forceRefresh }) {
  const [open, setOpen] = useState(false);
  const [virus, setVirus] = useState(false);
  const [copy, setCopy] = useState(false);
  const [toDel, setToDel] = useState(false);
  const [sum, setSum] = useState(false);

  const downloadFromSharedURL = (url, filename) => {
    const directUrl = url
      .replace("www.dropbox.com", "dl.dropboxusercontent.com")
      .replace("&dl=0", "&dl=1");

    const a = document.createElement("a");
    a.href = directUrl;
    a.download = filename || url.split("/").pop() || "download";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const downloadFromBackend = async (id, filename) => {
  try {
    const res = await fetch(`${API_URL}/api/download/${id}`);
    if (!res.ok) throw new Error('Download failed');

    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename || "download";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (err) {
    alert(err.message);
  }
};

  const slideRef = useRef();
  useEffect(() => {
    gsap.from(slideRef.current, {
      opacity: 0,
      ease: "power2.in",
      height: 15,
      duration: 0.3,
    });
  }, []);
  useEffect(() => {
    gsap.from(slideRef.current.children, {
      opacity: 0,
      ease: "power2.in",
      stagger: 0.15,
      duration: 0.3,
    });
  }, []);

  useEffect(() => {
    if (flag) {
      gsap.to(slideRef.current, {
        opacity: 0,
        duration: 0.5,
        height: 15,
        ease: "power1.out",
      });
      gsap.to(slideRef.current.children, {
        opacity: 0,
        duration: 0.1,
        stagger: 0,
      });
    }
  }, [flag]);

  return (
    <>
      <div
        ref={slideRef}
        className="absolute translate-x-5 lg:translate-x-4 w-[18vh] h-[23vh] rounded-md bg-white bg-opacity-80 backdrop-blur-xl flex flex-col justify-between overflow-hidden z-[20]"
      >
        <div
          onClick={() => downloadFromBackend(action._id, action.name)}
          className="w-full h-[20%] text-black font-inter text-xs flex justify-center items-center border-b-[1px] border-[rgba(0,0,0,0.5)] transition-colors duration-200 cursor-pointer hover:bg-gray-400 rounded-t-md"
        >
          Download
        </div>
        <div
          onClick={() => setVirus((prev) => !prev)}
          className="w-full h-[20%] text-black font-inter text-xs flex justify-center items-center border-b-[1px] border-[rgba(0,0,0,0.5)] transition-colors duration-200 cursor-pointer hover:bg-gray-400 "
        >
          Scan for Viruses
        </div>
        <div
          onClick={() => setToDel((prev) => !prev)}
          className="w-full h-[20%] text-black font-inter text-xs flex justify-center items-center border-b-[1px] border-[rgba(0,0,0,0.5)] transition-colors duration-200 cursor-pointer hover:bg-gray-400 "
        >
          Delete
        </div>
        <div
          onClick={() => setCopy(true)}
          className="w-full h-[20%] text-black font-inter text-xs flex justify-center items-center border-b-[1px] border-[rgba(0,0,0,0.5)] transition-colors duration-200 cursor-pointer hover:bg-gray-400"
        >
          Share
        </div>
        <div
          onClick={() => setSum(true)}
          className="w-full h-[20%] text-black font-inter text-xs flex justify-center items-center border-b-[1px] border-[rgba(0,0,0,0.5)] transition-colors duration-200 cursor-pointer hover:bg-gray-400"
        >
          Summarize with AI
        </div>
        <div
          onClick={() => setOpen(true)}
          className="w-full h-[20%] text-black font-inter text-xs flex justify-center items-center border-b-[1px] border-[rgba(0,0,0,0.5)] transition-colors duration-200 cursor-pointer hover:bg-gray-400 rounded-b-md"
        >
          More information
        </div>
      </div>
      {open === true ? (
        <div className="absolute top-0 left-0 mt-[60px] w-full h-full">
          <FilePopup
            state={"Information"}
            setInPopup={setOpen}
            file={action}
            forceRefresh={forceRefresh}
          />
        </div>
      ) : (
        <></>
      )}
      {virus === true ? (
        <div className="absolute top-0 left-0 mt-[60px] w-full h-full">
          <FilePopup
            state={"Scan for Viruses"}
            setInPopup={setVirus}
            file={action}
          />
        </div>
      ) : (
        <></>
      )}
      {sum === true ? (
        <div className="absolute top-0 left-0 mt-[60px] w-full h-full">
          <FilePopup
            state={"AI Summarization"}
            setInPopup={setSum}
            file={action}
          />
        </div>
      ) : (
        <></>
      )}
      {copy === true ? (
        <div className="absolute top-0 left-0 mt-[60px] w-full h-full">
          <UrlCopy file={action} setCopy={setCopy} />
        </div>
      ) : (
        <></>
      )}
      {toDel === true ? (
        <div className="absolute top-0 left-0 mt-[60px] w-full h-full">
          <DeleteFile
            file={action}
            setToDel={setToDel}
            forceRefresh={forceRefresh}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default SemiMenu;

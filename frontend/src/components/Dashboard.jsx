import React, { useEffect, useRef, useState } from "react";
import add_file from "../assets/add_file.png";
import add_folder from "../assets/add_folder.png";
import menu from "../assets/menu.png";
import img from '../assets/img.png';
import miscimg from '../assets/misc.png';
import img1 from '../assets/pdf.png';
import txtimg from '../assets/txt.png';
import { gsap } from "gsap";
import FilePopup from "./FilePopup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SemiMenu from "./SemiMenu";

const API_URL = import.meta.env.VITE_BACKEND_URL;


function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [inPopup, setInPopup] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [fileOrFold, setFileOrFold] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inSemMenu, setInSemMenu] = useState(false);
  const [semClicked, setSemClicked] = useState("");
  const floatRef = useRef(null);
  const fadeRef = useRef(null);
  const [flag, setFlag] = useState(false);

  const downloadFile = async (url, filename) => {
    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) throw new Error("Network response was not ok");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename || "download";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  useEffect(() => {
    if (!user) navigate("/authentication");
  }, []);
  useEffect(() => {
    gsap.fromTo(
      fadeRef.current,
      {
        opacity: 0,
        y: -7,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      }
    );
  }, []);
  useEffect(() => {
    if (clicked) {
      gsap.fromTo(
        floatRef.current.children,
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }
      );
    }
  }, [clicked]);
    const fetchFiles = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/files`, {
          withCredentials: true,
        });
        setFiles(res.data);
      } catch (err) {
        console.log("error fetching files: ", err);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    fetchFiles();
  }, [inPopup]);

  return (
    <>
      <div
        onClick={async () => {
          if (clicked === true) {
            await gsap.to(floatRef.current.children, {
              opacity: 0,
              y: 5,
              duration: 0.1,
              ease: "power2.out",
            });
            setTimeout(() => setClicked(!clicked), 170);
          } else setClicked(!clicked);
        }}
        className="select-none shadow-[0_0_20px_rgba(128,0,255,0.4)] cursor-pointer m-5 fixed bottom-0 right-0 w-[50px] h-[50px] rounded-full bg-purple-900 text-white flex justify-center items-center text-5xl hover:bg-violet-600 transition-all duration-200 z-[15]"
      >
        <span className="-translate-y-1.5 font-extralight hover:scale-90 transition-all duration-200">
          +
        </span>
      </div>

      {clicked === true ? (
        <div ref={floatRef}>
          <div
            onClick={() => {
              setInPopup(true);
              setFileOrFold("Create a File");
            }}
            className="hover:bg-violet-800 z-[15] transition-all duration-200 select-none flex justify-center items-center mr-5 w-[50px] h-[50px] rounded-full bg-violet-900 bg-opacity-40 fixed bottom-[90px] right-0"
          >
            <img
              src={add_folder}
              className="w-6 invert  hover:scale-90 transition-all duration-200"
              alt=""
            />
          </div>
          <div
            onClick={() => {
              setInPopup(true);
              setFileOrFold("Upload a File");
            }}
            className="hover:bg-violet-800 z-[15] transition-all duration-200 select-none flex justify-center items-center mr-5 w-[50px] h-[50px] rounded-full bg-violet-900 bg-opacity-40 fixed bottom-[150px] right-0"
          >
            <img
              src={add_file}
              className="w-6 invert hover:scale-90 transition-all duration-200"
              alt=""
            />
          </div>{" "}
        </div>
      ) : (
        <></>
      )}
      {inPopup ? (
        <FilePopup state={fileOrFold} setInPopup={setInPopup} />
      ) : (
        <></>
      )}
      <div className="mt-[60px] w-full min-h-[calc(100vh-60px)] text-white">
        <p
          ref={fadeRef}
          className="pt-5 w-full text-center font-extralight text-xl mb-5"
        >
          {" "}
          Welcome to your uploadspace, {user.username}.{" "}
        </p>
        <div className=" p-[8px] md:p-5 gap-5 w-full h-full flex flex-wrap">
          {loading ? (
            <p className="w-full text-center mt-10 font-inter text-lg">Loading your Files...</p>
          ) : (
            <>
              {files.length === 0 ? (
                <p className="w-full text-center mt-10 font-inter text-lg">Your uploadspace is empty.</p>
              ) : (
                <>
                  {files.map((file, index) => (
                    <div
                      key={file._id}
                      className=" p-3 w-[44vw] md:w-[20vw] lg:w-[14vw] xl:w-[11vw] h-[25vh] rounded-lg bg-violet-900 bg-opacity-20 flex flex-col flex-wrap hover:bg-opacity-40 duration-200 transition-colors cursor-pointer"
                    > 
                      <div
                        onClick={async () => {
                          if(inSemMenu) {
                            setFlag(true);
                            setTimeout(()=>setInSemMenu((prev) => !prev),200);
                          }
                          else{
                            setFlag(false);
                            setInSemMenu((prev) => !prev);
                          }
                          setSemClicked(index);
                        }}
                        className="flex justify-center items-center absolute -translate-x-2 -translate-y-1 m-1 w-6 h-6 rounded-full hover:bg-violet-500 transition-colors duration-200 focus:bg-violet-600"
                      >
                        <img src={menu} className="invert w-3/4" />
                      </div>
                      <p className="line-clamp-5 h-full w-full flex flex-col-reverse text-center text-sm font-inter text-gray-400 justify-between">
                        {file.name}
                        <div className="w-full h-full pt-8 flex justify-center items-baseline" >
                          {
                            (file.type.slice(0,5) === 'image') ? <img src={img} className="w-[40%] invert"/> : (file.type.slice(12,15) === 'pdf')? <img src={img1} className="w-[40%] invert"/> : (file.type.slice(0,4) === 'text')? <img src={txtimg} className="w-[40%] invert"/> : <img src={miscimg} className="w-[40%] invert"/>
                          }
                        </div>
                      </p>
                      {inSemMenu && semClicked == index ? (
                        <SemiMenu flag={flag} action={file} forceRefresh={fetchFiles} />
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;

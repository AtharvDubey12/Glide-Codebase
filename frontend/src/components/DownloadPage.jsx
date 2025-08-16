import React, {useEffect, useState, useRef} from "react";
import { useParams} from "react-router-dom";
import s_img from "../assets/speed.png";
import {gsap} from 'gsap';
import axios from "axios";

function DownloadPage() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [inv, setInv] = useState(false);
  const { id } = useParams();
  const pop = useRef();
  useEffect(()=>{
    gsap.from(pop.current, {
      opacity: 0.5,
      y: -8,
      duration: 0.5,
      ease: "power2.inOut"
    })
  },[])
  
  useEffect(()=>{
    async function x(){
    try {
      const response = await axios.post('http://localhost:4000/api/getfile', {
        id: id
      });
      setFile(response.data);
      setError(null);
    }
    catch (err) {
      setError(err.response?.data?.message || err.message);
      setFile(null);
      setInv(true);
    }
  }
  x();
  },[])

  const downloadFromSharedURL = (url, filename) => {
  const directUrl = url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('&dl=0', '&dl=1');

  const a = document.createElement("a");
  a.href = directUrl;
  a.download = filename || url.split("/").pop() || "download";
  document.body.appendChild(a);
  a.click();
  a.remove();
};

  return (
    <div className="flex justify-center items-center mt-[60px] h-[calc(100vh-60px)] text-white w-full">
      { (inv === false) ? 
      <div ref={pop} className="relative flex flex-col items-center p-10 lg:-ml-10 w-[80%] h-[75%] md:h-[70%] lg:h-[70%] bg-violet-950 bg-opacity-25 rounded-3xl">
        <p className="w-full flex justify-center lg:justify-start mb-3 rounded-bl-lg">
          <span className="font-inter font-bold mr-2 text-violet-500">
            GLIDE
          </span>{" "}
          <span className="text-sm text-red-400 translate-y-[1px]">
            Downloads{" "}
            <img
              src={s_img}
              className="absolute invert w-5 h-5 translate-x-[70px] -translate-y-[18px]"
            />
          </span>
        </p>
        <div className="w-full mb-2 h-[1px] bg-gradient-to-r from-violet-900 to-transparent rounded-full"></div>
        <div className="w-full flex-col justify-center items-center flex pt-5 pb-2"> 
        <div className="mb-3 flex text-center flex-col px-5 w-full font-extralight">File Name  <span className="font-inter text-center text-sm text-gray-400 pl-2">{file?.name || "processing"}</span></div>
        <div className="px-5 flex-col flex text-center w-full font-extralight mb-3"><span>File Size</span><span className="font-inter text-sm text-center text-gray-400 pl-2">{file?.size / 1000 || "processing"} KB</span></div>
    </div>
        <div className="w-full flex flex-col"> 
        <div className="px-5 w-full flex flex-col text-center font-extralight mb-3"><span>File Type</span>  <span className="font-inter text-sm text-gray-400 pl-2">{file?.type || "processing"}</span></div>
        <div className="px-5 w-full flex flex-col text-center font-extralight">Available  <span className="font-inter text-sm text-gray-400 pl-2">{(file?.isPublic)? "Yes" : "No"}</span></div>
    </div>
        <button onClick={()=>{
          downloadFromSharedURL(file.url, file.name);
        }} className={` absolute bottom-5 md:bottom-8 lg:bottom-14 w-[150px] p-4 rounded-xl border-2 ${(file?.isPublic) ? "border-green-600 bg-green-100" : "border-red-500 bg-red-200"}  bg-opacity-5`} disabled={!(file?.isPublic)}>
          {
            (file?.isPublic) ? "Download Now" : "Unavailable"
          }
          </button>
      </div> : <div className="w-full h-full justify-center items-center flex flex-col">
       <p className='text-violet-700 mb-5 text-4xl font-extrabold'>OOPS :(</p>
        <p className='text-violet-950 text-2xl font-bold mb-1'>Error Code : 404</p>
        <p className='text-violet-950 text-center' >The URL you are requesting is either invalid or isn't available at the moment.</p>
      </div>
}
    </div>
  );
}

export default DownloadPage;

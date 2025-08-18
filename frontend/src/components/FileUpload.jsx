import React, { useState } from "react";
import axios from 'axios';
const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function FileUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentUpload, setCurrentUpload] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleFiles = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    setFiles((prev) => [...prev, ...fileArray]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleChange = (e) => {
    handleFiles(e.target.files);
  };


const uploadToDropbox = async () => {
  if (files.length === 0) return;
  setIsUploading(true);

  for (let i = 0; i < files.length; i++) {
    setCurrentUpload(files[i].name);
    const formData = new FormData();
    formData.append("file", files[i]);
    formData.append("isPublic", isPublic);
    try {
  
      const res = await axios.post(
        `${API_URL}/api/save-file`, 
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true, 
          onUploadProgress: (progressEvent) => {
            if (progressEvent.lengthComputable) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percent);
            }
          },
        }
      );
      console.log("File uploaded to Dropbox: ", res.data.link);

    } catch (err) {
      console.error("Error uploading file to Dropbox:", err);
    }
  }

  setIsUploading(false);
  setFiles([]);
  setUploadProgress(0);
  setCurrentUpload('');
};



  return (
    <> 
      <form action="" className="w-full h-full">
        <div
          className={`h-1/2 flex justify-around items-center flex-col border-2 border-dashed rounded-lg p-6 cursor-pointer transition
            ${dragActive ? "border-violet-400 bg-blue-300 bg-opacity-40" : "border-gray-300"}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            onChange={handleChange}
            className="hidden"
            id="file-upload-input"
          />

          <label htmlFor="file-upload-input" className="flex flex-col items-center">
            📁
            <span className="mt-2 text-gray-600 cursor-pointer">
              Drag & drop files here or <span className="text-blue-500 cursor-pointer">click to browse</span>
            </span>
          </label>

          {files.length > 0 && (
            <ul className="mt-4 text-sm text-violet-400">
              {files.map((file, idx) => (
                <li type='square' key={idx}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="w-full h-1/2 flex justify-center items-center flex-col">
          { (!isUploading) ? <> 
            <p className="text-sm text-gray-400 mb-5">
              <input onClick={()=>setIsPublic(prev=>!prev)} type="checkbox" className="mr-2 translate-y-0.5" />
              Mark as private
            </p>
           
            <button onClick={(e)=>{
              e.preventDefault();
              uploadToDropbox(); 
         
            }} className="w-[180px] rounded-md h-10 border-2 mb-4 focus:bg-green-600 transition-colors duration-200">Upload File</button> 
          </> : <></>}

          { (isUploading) ? <>
            <div className="h-1.5 w-full bg-violet-800 bg-opacity-20 rounded-full mb-5">
              <div className="h-full bg-violet-800 rounded-full" style={{width: `${uploadProgress}%`}}></div>
            </div>
            <p className="text-sm font-inter text-gray-300">{currentUpload} is {uploadProgress}% uploaded</p>
          </> : <></>}
        </div>
      </form>
    </>
  );
}

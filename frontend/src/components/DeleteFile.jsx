import React, {useState} from 'react'
import axios from 'axios';
const API_URL = import.meta.env.VITE_BACKEND_URL;
function DeleteFile({file, setToDel, forceRefresh}) {
  const [delStatus, setDelStatus] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  async function delFile(url, id){
    try {
      const res = await axios.post(`${API_URL}/api/files`, {
        url: url,
        id: id
      });
      setDelStatus(res.data.message);
    }
    catch (err) {
      setDelStatus(err.response?.data || err.message);
    }
  }

  return (
        <div className="cursor-default fixed flex justify-center items-center w-full h-full backdrop-blur-md z-[20] bg-black bg-opacity-10">
      <div className="cursor-default pt-4 pl-5 pr-5 text-gray-300 text-sm font-semibold font-inter w-[80vw] md:w-[50vw] lg:w-[30vw] h-[160px] bg-slate-900 rounded-xl">
        <p className="cursor-default mb-5 flex w-full justify-between">
          Delete File{" "}
          <div onClick={()=>setToDel(false)} className="w-6 h-6 rounded-md bg-red-500 flex justify-center items-center text-black text-xs cursor-pointer">
            X
          </div>{" "}
        </p>
        <div className="w-full flex flex-col gap-4 justify-center items-center">
        <div className="text-xs mt-1 text-center w-full flex justify-center  text-gray-400">
          Are you sure you want to delete the file? <br /> This action cannot be reversed.
        </div>
          <button disabled={isDeleting} onClick={async ()=>{
            setIsDeleting(true);
            await delFile(file.url, file._id);
            setIsDeleting(false);
            forceRefresh();
            setToDel(false);
            }} className="ml-3 text-xs px-3 bg-red-700 text-gray-300 bg-opacity-80 p-1 py-2 rounded-lg text-center">
            {(!isDeleting) ? "delete" : "deleting"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteFile
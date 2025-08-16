import React, {useState} from 'react';
import axios from 'axios';

function MiscInfo({file, forceRefresh}) {
  const [clicked, setClicked] = useState(false);
  const [status, setStatus] = useState(file.isPublic === true ? "Public" : "Private");

  const reverse = async (file) => {
    const response = await axios.post("http://localhost:4000/api/change-file-status", {
      id: file._id
    })
    setStatus(response.data.message === true ? "Public" : "Private");
  }

  return (
    <div className='cursor-default break-words w-full h-full font-inter pl-5 flex justify-center text-center items-center flex-col'>
      <div className='w-full h-20 mb-3'>
        File name: <br /> <span className='text-sm text-gray-400 font-extralight'>{file.name}</span> <br/>
      </div>
      <div className='w-full h-20'>
        File size: <span className='text-sm text-gray-400 font-extralight'> <br/> {file.size} KB</span> 
      </div>
      <div className='w-full h-20'>
        File type: <span className='text-sm text-gray-400 font-extralight'> <br /> {file.type}</span> 
      </div>
      <div className='w-full h-20 break-words'>
        Status: <span className='text-sm text-gray-400 font-extralight'> <br />{status}</span> 
        <div className='w-full h-4 text-center'>
          <button disabled={clicked} onClick={async ()=>{
            setClicked(prev=>!prev);
            setStatus('Processing...');
            await reverse(file);
            setClicked(prev=>!prev);
            forceRefresh();
          }
          } className='text-xs text-violet-700'>change</button>
          </div>
      </div>
    </div>
  )
}

export default MiscInfo
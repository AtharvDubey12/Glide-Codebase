import '../App.css' 
import btnVideo from '../assets/btn-rev.webm';
import { useNavigate } from 'react-router-dom';

function AnimButton({redirectTo}) {
  const navigate = useNavigate();
  return (
    <div onClick={()=> navigate(redirectTo)} className='relative button w-[180px] h-14 bg-gradient-to-r from-[rgba(26,0,51,0.5)] via-[rgba(45,0,107,0.5)] to-[rgba(59,0,128,0.5)] flex items-center justify-center rounded-2xl text-white font-inter text-sm border  hover:border-purple-100 border-violet-500 hover:bg-none transition-bg duration-500 cursor-pointer overflow-hidden z-[1] hover:shadow-[0_0_7px_1px_rgba(255,255,255,0.2)]'>
        <video
            className="absolute inset-0 w-full h-full object-cover z-[-1]"
            src={btnVideo}
            autoPlay
            loop
            muted
            playsInline
        />
        <div className='relative button w-full h-full bg-gradient-to-r from-[rgba(26,0,51,0.55)] via-[rgba(45,0,107,0.82)] to-[rgba(59,0,128,1)] flex items-center justify-center rounded-2xl text-white font-inter text-sm transition-all duration-500 cursor-pointer overflow-hidden z-[1] hover:text-violet-200'>Get Started For Free</div>
    </div>
  )
}

export default AnimButton;

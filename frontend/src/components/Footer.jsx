import React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <div className='p-4 w-full h-[15rem] text-white' style={{background: 'linear-gradient(to top, rgb(0, 0, 9),rgb(0, 0, 9), rgb(5, 0, 20))'}}>
        <div className='w-full font-inter font-extrabold text-xl flex justify-center' style={{marginBottom: '3px'}}>GLIDE
        </div>
        <p className='flex justify-center font-sans text-sm text-gray-500' style={{marginBottom: '20px'}}>© All Right Reserved 2025</p>
        <div className="flex gap-10 text-gray-400 w-full justify-center">
            <a href="https://github.com/AtharvDubey12" target="_blank"><FaGithub className="hover:text-white" /></a>
            <a href="https://linkedin.com/in/AtharvDubey" target="_blank"><FaLinkedin className="hover:text-white" /></a>
            <a href="https://twitter.com/2K4Dubey" target="_blank"><FaTwitter className="hover:text-white" /></a>
        </div>
        <ul className="flex gap-4 text-sm text-gray-400 w-full justify-center items-center mt-4">
        <li><a href="/about" className="hover:text-white text-center w-full">About</a></li>
        <li><a href="/contact" className="hover:text-white">Contact</a></li>
        <li><a href="/privacy" className="hover:text-white">Privacy</a></li>
        </ul>

    </div>
  )
}

export default Footer
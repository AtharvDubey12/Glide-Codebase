import React, {useEffect, useRef} from 'react'
import {gsap} from 'gsap';

function Enterprise() {
    const floatRef = useRef(null);
    useEffect(()=>{
        gsap.to(floatRef.current, {
            y: -5,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    },[]);

  return (
    <div className='mt-[60px] p-5 pt-10 text-white font-extralight text-sm text-center'>
        <p ref={floatRef} className='will-change-transform mb-5'>Glide offers the best in class pricing options for both, advanced users and large enterprises to cater to their needs regarding file storage and sharing</p>

    </div>
  )
}

export default Enterprise
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function LandingCard({ image, content, body }) {
  const popRef = useRef(null);
  const pop2Ref = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      popRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: -10,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: popRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      pop2Ref.current,
      { opacity: 0, y: 20, x: 5, scale: 1.1 },
      {
        opacity: 1,
        x: 0,
        y: -10,
        duration: 1,
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: popRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const handleMouseMove = (e) => {
    const rect = popRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    popRef.current.style.setProperty("--x", `${x}px`);
    popRef.current.style.setProperty("--y", `${y}px`);
  };

  return (
    <div
      ref={popRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden gap-5 m-5 p-5 rounded-xl 
  w-full max-w-[90vw] min-w-[260px] 
  h-auto min-h-[300px]
  sm:max-w-[300px] sm:min-h-[350px]
  md:max-w-[350px] md:min-h-[400px]
  lg:w-[20vw] lg:h-[25vw] 
  bg-gradient-to-br from-[rgba(26,0,51,0.5)] via-[rgba(45,0,107,0.5)] to-[rgba(59,0,128,0.5)] 
  bg-opacity-20 border-2 border-purple-500 transition-all duration-300 
  hover:border-red-200 hover:bg-[rgba(88,28,135,0.3)]`}
      style={{
        backgroundImage: isHovered
          ? `
                radial-gradient(500px circle at var(--x, 50%) var(--y, 50%), rgba(255, 0, 25, 0.1), transparent 40%),
                linear-gradient(to bottom right, rgba(26,0,51,0.5), rgba(45,0,107,0.5), rgba(59,0,128,0.5))
                `
          : `
                linear-gradient(to bottom right, rgba(26,0,51,0.5), rgba(45,0,107,0.5), rgba(59,0,128,0.5))
                `,
      }}
    >
      <div className="w-full h-[30%] flex items-end justify-center overflow-hidden">
        <img
          ref={pop2Ref}
          src={image}
          alt=""
          className="max-h-[60px] w-auto h-auto object-contain invert sm:max-h-[40px]"
        />
      </div>
      <p className="font-thin text-lg text-center mb-4 mt-2">{content}</p>
      <p className="text-gray-400 text-sm font-extralight text-center">
        {body}
      </p>
    </div>
  );
}

export default LandingCard;

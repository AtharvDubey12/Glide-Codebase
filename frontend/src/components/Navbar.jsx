import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import logo from "../assets/logo.webp";
import "../App.css";
import { useNavigate } from "react-router-dom";

async function scrollToTarget(division, navi) {
  const target = document.getElementById(division);
  if (target) {
    gsap.to(window, {
      duration: 0.8, // slightly faster for smoother mobile perf
      scrollTo: { y: target, offsetY: 20, autoKill: true },
      ease: "power1.out",
    });
  } else {
    navi("/");
  }
}

function Nav() {
  const navigate = useNavigate();
  const menuRef = useRef();
  const icoRef = useRef();
  const [hover, setHover] = useState("");

  useEffect(() => {
    const items = menuRef.current.children;
    const ico = icoRef.current.children;

    // Pre-apply will-change and initial states
    gsap.set(items, { opacity: 0, y: -12, willChange: "transform, opacity" });
    gsap.set(ico, { opacity: 0, x: -12, willChange: "transform, opacity" });

    // Animate items in
    gsap.to(items, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.35,
      ease: "power1.out",
    });

    // Animate icons in
    gsap.to(ico, {
      opacity: 1,
      x: -5,
      duration: 0.35,
      ease: "power1.out",
      stagger: 0.15,
    });
  }, []);

  return (
    <>
      <nav
        className="fixed backdrop-blur-md top-0 w-full h-[60px] bg-gradient-to-r from-[rgba(26,0,51,0.5)] via-[rgba(45,0,107,0.5)] to-[rgba(59,0,128,0.7)]
        flex justify-between text-white overflow-hidden z-50"
      >
        <div ref={icoRef} className="flex justify-center items-center relative">
          <img
            src={logo}
            alt="GLIDE Logo"
            className="h-20 w-auto -translate-y-1 will-change-transform"
          />
          <h1 className="font-inter font-extrabold text-xl -translate-x-6 translate-y-1 cursor-default absolute left-[55px]">
            GLIDE
          </h1>
        </div>

        <div ref={menuRef} className="flex text-white font-inter">
          <div
            onClick={() => scrollToTarget("features_div", navigate)}
            onMouseEnter={() => setHover("Features")}
            onMouseLeave={() => setHover("")}
            className={`${
              hover === "Features" ? "border-b-[1px] border-blue-600" : ""
            } flex justify-center items-center transition-all duration-150 cursor-pointer`}
          >
            Features
          </div>
          <div
            onClick={() => navigate("/pricing")}
            onMouseEnter={() => setHover("Enterprise")}
            onMouseLeave={() => setHover("")}
            className={`${
              hover === "Enterprise" ? "border-b-[1px] border-blue-600" : ""
            } ml-5 flex justify-center items-center hover:text-gray-400 transition-colors duration-150 cursor-pointer`}
          >
            Enterprise
          </div>
          <div
            onClick={() => navigate("/authentication")}
            onMouseEnter={() => setHover("Start")}
            onMouseLeave={() => setHover("")}
            className={`${
              hover === "Start" ? "border-b-[1px] border-blue-600" : ""
            } ml-5 mr-4 flex justify-center items-center hover:text-gray-400 transition-colors duration-150 cursor-pointer`}
          >
            Start
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;

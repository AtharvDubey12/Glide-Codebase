import React, { Suspense, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import cube from "../assets/cube.glb";
import AnimButton from "./AnimButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import image from "../assets/file.png";
import share_img from "../assets/share.png";
import safe_img from "../assets/safe.png";
import gem_img from "../assets/gem.png";
import pr_img from "../assets/priv.png";
import cover from "../assets/cover.webm";
import LandingCard from "./LandingCard";
import TrustedBy from "./TrustedBy";
import Reviews from "./Reviews";

function InitModel(props) {
  const gltf = useGLTF(cube);
  const { scene, animations } = gltf;
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    const action = Object.values(actions)[0];
    if (action) {
      action.reset().play();
      action.timeScale = 0.1;
    }
  }, [actions]);

  return <primitive object={scene} scale={1.2} {...props} />;
}

function LandingPage() {
  const headRef = useRef();
  const mainRef = useRef();
  const semiRef = useRef();
  const popRef = useRef();

  const cardCont = [
    {
      image: image,
      content: "Bulk File Storage",
      body: "Store massive volumes of data with unmatched efficiency. Glide’s infrastructure is optimized for high-speed access, minimal latency, and cost-effective scalability, making it ideal for both personal and enterprise needs.",
    },
    {
      image: share_img,
      content: "Effortless Sharing",
      body: "Share files instantly without the complexity of traditional transfer methods. Simply copy the unique link and send it to anyone—no bulky email attachments or third-party apps required.",
    },
    {
      image: safe_img,
      content: "Advanced Malware Protection",
      body: "Every uploaded file undergoes rigorous multi-engine antivirus scanning from trusted providers. Glide proactively ensures your shared content is safe from malicious threats before it reaches recipients.",
    },
    {
      image: gem_img,
      content: "AI-Powered Summarization",
      body: "Harness the power of AI to quickly extract key insights from text, documents, and even images. Glide transforms lengthy content into concise, actionable summaries within seconds.",
    },
    {
      image: pr_img,
      content: "Privacy and Access Control",
      body: "Your data, your rules. Glide offers secure authentication, granular permission settings, and safe transfers—giving you complete authority over who can view or download your files.",
    },
  ];

  // Fade-in on scroll
  useEffect(() => {
    if (!popRef.current) return;
    gsap.fromTo(
      popRef.current,
      { autoAlpha: 0, y: 20, willChange: "transform, opacity" },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: popRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onComplete: () => gsap.set(popRef.current, { willChange: "auto" }),
      }
    );
  }, []);

  // Heading animations (combined into one timeline to avoid multiple layout passes)
  useEffect(() => {
    if (!headRef.current || !semiRef.current || !mainRef.current) return;

    const tl = gsap.timeline();
    const spans = headRef.current.children;

    tl.from(spans, {
      opacity: 0,
      y: 10,
      stagger: 0.2,
      duration: 0.4,
      ease: "power2.out",
      willChange: "transform, opacity",
    })
      .to(semiRef.current, {
        x: 40,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(
        mainRef.current,
        {
          x: 80,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.2"
      );

    return () => tl.kill();
  }, []);

  return (
    <>
      <div className="mt-[60px] flex flex-col lg:flex-row text-white font-inter w-full">
        <div className="relative w-full lg:w-3/5 h-[100vh]">
          <div className="overflow-hidden opacity-100 w-full h-full absolute">
            <Canvas
              className="md:translate-x-40 lg:translate-x-40 -translate-y-40"
              dpr={[1, 1.5]}
              performance={{ min: 0.5 }}
              camera={{ position: [0, 2, 5], fov: 50 }}
            >
              <ambientLight intensity={1.2} />
              <directionalLight position={[5, 5, 5]} intensity={5} />
              <Suspense fallback={null}>
                <InitModel />
              </Suspense>
            </Canvas>
          </div>
          <h1
            ref={headRef}
            className="text-5xl font-semibold p-10 md:w-[50%] h-[50vh] flex justify-center flex-col items-center"
          >
            <span>Swift. Secure.</span>
            <span ref={semiRef}>Seamless. </span>
            <span
              ref={mainRef}
              className="font-extrabold bg-gradient-to-l from-purple-400 via-purple-500 to-blue-900 bg-clip-text text-transparent"
            >
              Glide.
            </span>
          </h1>
          <p className="w-full p-2 text-center text-sm text-gray-300">
            Welcome to the new world of file sharing powered by smooth UI and
            amazing Experience offered by Glide.
            <br />
            Trusted by Millions of users Worldwide.
          </p>
          <div className="my-10 w-full h-20 p-4 flex justify-center">
            <AnimButton redirectTo={"/authentication"} />
          </div>
        </div>

        <div className="relative overflow-hidden flex flex-col h-[calc(100vh)] bg-violet-900 bg-opacity-5 items-center shadow-lg rounded-bl-xl w-full lg:w-2/5">
          <div className="md:w-2/3 lg:w-2/3 w-3/4 h-[42%] md:h[40%] lg:h-[40%] bg-violet-900 bg-opacity-10 shadow-[0_0_25px_rgba(43,2,86,1)] rounded-3xl mt-20 md:mt-20 lg:mt-10 overflow-hidden">
            <video
              className="w-full h-full object-cover"
              src={cover}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <span className="mt-2 translate-x-2 opacity-50 w-2/3 justify-end text-xs text-gray-600 font-extralight font-sans">
            Creative Visualization
          </span>
          <div className="relative flex flex-col justify-center items-center text-center md:w-2/3 lg:w-2/3 w-3/4 h-[20vh] mt-20 md:mt-10 lg:mt-10 md:h-1/4 mb-5 md:mb-0 bg-violet-900 bg-opacity-10 shadow-[5_5_25px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden p-4">
            <Reviews />
            <span className="absolute right-6 text-sm bottom-2 text-gray-500 font-inter">
              - our users
            </span>
          </div>
        </div>
      </div>
      <div id="features_div" className="w-full text-white pt-10">
        <p
          ref={popRef}
          className="text-3xl font-bold font-inter flex justify-center text-center"
        >
          Gliding through the Tension. <br /> With Style
        </p>
        <div className="flex flex-wrap gap-10 p-4 justify-center">
          {cardCont.map((item, idx) => (
            <LandingCard
              key={idx}
              image={item.image}
              content={item.content}
              body={item.body}
            />
          ))}
        </div>
      </div>
      <TrustedBy />
    </>
  );
}

export default LandingPage;

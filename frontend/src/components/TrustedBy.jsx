import React from "react";

const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4a/Google_2015_logo.svg",
];

export default function TrustedBy() {
  return (
    <div className="py-6 mt-10 mb-10 overflow-hidden">
      <h2 className="text-white text-center text-xl font-semibold mb-6">
        Loved by
      </h2>

      {/* Outer container */}
      <div className="relative flex overflow-hidden w-full">
        {/* Track container (duplicated for seamless loop) */}
        <div className="flex animate-marquee will-change-transform">
          {[...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center min-w-[150px] mx-8"
            >
              <img src={logo} alt="" className="h-12 object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Custom animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

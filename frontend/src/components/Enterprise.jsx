import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

function Enterprise() {
  const floatRef = useRef(null);

  useEffect(() => {
    gsap.to(floatRef.current, {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  const tiers = [
    {
      name: "Basic",
      price: "₹299/mo",
      features: [
        "10 GB secure storage",
        "File sharing via links",
        "Basic privacy controls",
        "Email support",
      ],
      description:
        "The Basic plan is perfect for casual users who need simple, secure file storage and sharing options. It includes enough space for personal documents, photos, and light collaboration needs.",
      highlight: false,
    },
    {
      name: "Pro",
      price: "₹999/mo",
      features: [
        "1 TB secure storage",
        "Advanced sharing controls",
        "Malware protection",
        "Priority support",
      ],
      description:
        "The Pro plan is our most popular choice, designed for professionals and power users. With advanced sharing, AI-backed malware protection, and priority support, it offers the perfect balance of power and affordability.",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "₹5999/mo",
      features: [
        "Unlimited storage",
        "Team collaboration tools",
        "AI-powered search & summarization",
        "Dedicated support manager",
      ],
      description:
        "The Enterprise plan is built for organizations that require limitless storage, seamless collaboration tools, and advanced AI features. It also comes with a dedicated support manager to ensure your team’s workflow is never interrupted.",
      highlight: false,
    },
  ];

  return (
    <div className="mt-[60px] p-5 pt-10 text-white font-extralight text-sm text-center">
      <p
        ref={floatRef}
        className="will-change-transform mb-10 max-w-2xl mx-auto"
      >
        Glide offers the best in class pricing options for both, advanced users
        and large enterprises to cater to their needs regarding file storage and
        sharing
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier, index) => (
          <div
            key={index}
            className={`hover:scale-[1.01] font-inter hover:border-purple-500 relative bg-gradient-to-b from-[#1a0b2e] to-[#0f071a] p-6 rounded-2xl shadow-lg border transition-transform duration-300 hover:scale-102 ${
              tier.highlight
                ? "border-violet-500 shadow-[0_0_25px_rgba(139,92,246,0.6)]"
                : "border-gray-800"
            }`}
          >
            {/* Badge for most popular */}
            {tier.highlight && (
              <div className="absolute -top-3 right-4 bg-violet-600 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                Most Popular
              </div>
            )}

            <h2 className="text-2xl font-semibold mb-2">{tier.name}</h2>
            <p className="text-3xl font-bold mb-6 text-violet-400">
              {tier.price}
            </p>

            <ul className="text-sm space-y-3 text-gray-300 text-left">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="text-violet-400 mr-2">✔</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={`mt-8 w-full py-2 rounded-xl font-medium transition shadow-md ${
                tier.highlight
                  ? "bg-violet-600 hover:bg-violet-700"
                  : "bg-gray-700 hover:bg-gray-800"
              }`}
            >
              Choose {tier.name}
            </button>
          </div>
        ))}
      </div>

      {/* Explanations Section */}
      <div className="mt-16 max-w-4xl mx-auto text-left space-y-10">
        {tiers.map((tier, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold text-violet-400 mb-2">
              {tier.name} Plan
            </h3>
            <p className="text-gray-300 leading-relaxed">{tier.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Enterprise;

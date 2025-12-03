import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CipherText from "./CipherText";

const Hero = () => {
  const slides = [
    {
      title: "ENCRYPT",
      subtitle: "< Turn your messages into gibberish />",
    },
    {
      title: "SEND",
      subtitle: "< Fly it under the radar />",
    },
    {
      title: "DECRYPT",
      subtitle: "< Crack the code & read secrets />",
    },
  ];
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const words = containerRef.current.children;
      const tl = gsap.timeline({ repeat: -1 });

      Array.from(words).forEach((word) => {
        tl.fromTo(
          word,
          { opacity: 0, x: -700 }, // Start off-screen left
          { opacity: 1, x: 0, duration: 1, ease: "power3.out" } // Slide in smooth
        ).to(
          word,
          { opacity: 0, x: 700, duration: 0.8, ease: "power3.in" }, // Slide out right
          "+=2.5" // Wait 2.5 seconds (reading time)
        );
      });
    },
    { scope: containerRef }
  );

  return (
    // 2. flex & justify-center: Centers the inner div vertically
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center font-Rubik bg-black text-white overflow-hidden">
      {/* Optional: Add a subtle grid background for tech vibe */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div
        ref={containerRef}
        className="relative h-40 w-full max-w-4xl flex justify-center items-center"
      >
        {/* Slide 1 */}
        {slides.map((el, idx) => (
          <div key={idx} className="absolute w-full text-center opacity-0">
            <CipherText
              text={el.title}
              className={"text-6xl md:text-9xl  tracking-tighter select-none"}
            />
            <p className="text-sm md:text-2xl text-white/80 font-mono mt-4">
              {el.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;

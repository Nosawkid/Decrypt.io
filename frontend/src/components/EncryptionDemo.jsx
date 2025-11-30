import React, { useState } from "react";
// Import your actual utility.
// If not available, I've included a dummy one inside for the demo.
import { encrypt } from "../utils/Caeser";

const EncryptionDemo = () => {
  const [text, setText] = useState("");
  //   const [method, setMethod] = useState("CAESAR");

  // Simple encryption mock if you haven't linked your util yet
  const displayEncryption = (input) => {
    if (!input) return "WAITING FOR INPUT...";
    // Uses your actual encrypt function
    return encrypt(input);
  };

  return (
    <div className="bg-black text-white py-24 px-6 font-Rubik border-t border-white/10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-2">
            THE <span className="text-green-500 font-mono">SIMULATION</span>
          </h2>
          <p className="text-white/50">
            See how your text looks to the outside world in real-time.
          </p>
        </div>

        {/* The Interface */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/20 rounded-xl overflow-hidden shadow-2xl bg-black/50 backdrop-blur-md">
          <div className="p-8 border-b md:border-b-0 md:border-r border-white/10 bg-white/5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono text-white/40 tracking-widest">
                // INPUT_STREAM
              </span>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></span>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your secret message here..."
              className="w-full h-48 bg-transparent border-none outline-none text-xl md:text-2xl font-bold text-white placeholder-white/20 resize-none font-Rubik"
              spellCheck="false"
            />
          </div>

          {/* RIGHT: The Hacker View (Encrypted) */}
          <div className="p-8 bg-black relative group">
            {/* Scanline Effect Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 pointer-events-none bg-[length:100%_4px,3px_100%]"></div>

            <div className="flex justify-between items-center mb-4 relative z-30">
              <span className="text-xs font-mono text-green-500 tracking-widest">
                // ENCRYPTED_OUTPUT
              </span>
              <span className="text-xs font-mono text-green-500 animate-pulse">
                [LIVE]
              </span>
            </div>

            <div className="w-full h-48 break-words font-mono text-green-500/80 text-lg md:text-xl leading-relaxed relative z-30">
              {text === "" ? (
                <span className="animate-pulse">WAITING_FOR_DATA...</span>
              ) : (
                displayEncryption(text)
              )}
              {/* Blinking Cursor */}
              <span className="inline-block w-2 h-5 bg-green-500 ml-1 animate-pulse align-middle"></span>
            </div>

            {/* Decorative "Lock" Icon in background */}
            <div className="absolute bottom-4 right-4 text-green-500/10 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-24 h-24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncryptionDemo;

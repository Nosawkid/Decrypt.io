import React, { useState } from "react";
import { encrypt } from "../utils/Caeser";

const NewTransmission = () => {
  const [pageTitle, setPageTitle] = useState("NEW TRANSMISSION");
  return (
    <div className="mt-24 overflow-y-auto">
      <h1
        onMouseEnter={() => setPageTitle(encrypt(pageTitle))}
        onMouseLeave={() => setPageTitle("New Transmission".toUpperCase())}
        className="mb-4 text-green-600 font-mono font-bold text-2xl md:text-4xl text-center drop-shadow-[0px_0px_50px] tracking-widest  transition-all duration-500 hover:text-green-400"
      >
        {pageTitle}
      </h1>
      <div className="max-w-2xl mx-auto px-4 py-2 text-white/30">
        <form className="flex flex-col gap-6 p-5 ">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="Subject"
              className="text-xs font-mono text-green-500 tracking-wider"
            >
              SUBJECT
            </label>
            <input
              type="text"
              placeholder="Task Master"
              className="w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="transmission"
              className="text-xs font-mono text-green-500 tracking-wider"
            >
              Transmission
            </label>
            <textarea
              rows={7}
              className="resize-none w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300"
            ></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="type"
              className="text-xs font-mono text-green-500 tracking-wider"
            >
              Encryption Type
            </label>
            <select className="w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300">
              <option value="">Choose an encryption method</option>
              <option value="caeser">Caeser Cipher</option>
              <option value="aes">AES Algorithm</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="code"
              className="text-xs font-mono text-green-500 tracking-wider"
            >
              Encryption Code
            </label>
            <input
              type="text"
              placeholder="The Smiling Buddha"
              className="w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300"
            />
            <p className="text-xs font-mono tracking-tighter font-extralight">
              Choose a number between 1 - 10 for Caeser Cipher and go with
              anything on your mind for AES
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="hint"
              className="text-xs font-mono text-green-500 tracking-wider"
            >
              Hint
            </label>
            <input
              type="text"
              placeholder=""
              className="w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300"
            />
            <p className="text-xs text-red-600/70 font-mono tracking-tighter font-extralight">
              If the receiver can't guess the code it's useless
            </p>
          </div>
          <button className="mt-4 bg-green-600 w-full hover:bg-green-500 text-black font-bold py-3 rounded-lg transition-colors shadow-[0_0_15px_rgba(22,163,74,0.4)] font-mono">
            Transmit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTransmission;

import React, { useState } from "react";
import { encrypt } from "../utils/Caeser";

const NewTransmission = () => {
  const [pageTitle, setPageTitle] = useState("NEW TRANSMISSION");

  // Added state to manage inputs (optional, but good for testing)
  const [formData, setFormData] = useState({
    receiverAgentId: "",
    subject: "",
    transmission: "",
    encType: "",
    encCode: "",
    hint: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Transmitting payload:", formData);
    // Connect to your createTransmission backend logic here
  };

  return (
    <div className="mt-24 overflow-y-auto pb-20">
      <h1
        onMouseEnter={() => setPageTitle(encrypt(pageTitle))}
        onMouseLeave={() => setPageTitle("New Transmission".toUpperCase())}
        className="mb-4 text-green-600 font-mono font-bold text-2xl md:text-4xl text-center drop-shadow-[0px_0px_50px] tracking-widest transition-all duration-500 hover:text-green-400"
      >
        {pageTitle}
      </h1>

      <div className="max-w-2xl mx-auto px-4 py-2 text-white/30">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-5">
          {/* --- NEW FIELD: TARGET AGENT ID --- */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="receiverAgentId"
              className="text-xs font-mono text-green-500 tracking-wider flex items-center gap-2"
            >
              TARGET AGENT ID <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="receiverAgentId"
              onChange={handleChange}
              type="text"
              placeholder="e.g. bond.007@decrypt.io"
              className="w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300 tracking-wider"
            />
          </div>

          {/* SUBJECT */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="subject"
              className="text-xs font-mono text-green-500 tracking-wider"
            >
              SUBJECT
            </label>
            <input
              required
              name="subject"
              onChange={handleChange}
              type="text"
              placeholder="Operation: Task Master"
              className="w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300"
            />
          </div>

          {/* TRANSMISSION BODY */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="transmission"
              className="text-xs font-mono text-green-500 tracking-wider"
            >
              TRANSMISSION DATA
            </label>
            <textarea
              required
              name="transmission"
              onChange={handleChange}
              rows={7}
              placeholder="Enter classified intelligence here..."
              className="resize-none w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300"
            ></textarea>
          </div>

          {/* ENCRYPTION TYPE */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="encType"
              className="text-xs font-mono text-green-500 tracking-wider"
            >
              ENCRYPTION PROTOCOL
            </label>
            <select
              name="encType"
              onChange={handleChange}
              required
              className="w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-white/70 font-mono transition-all duration-300 cursor-pointer"
            >
              <option value="">Select Protocol...</option>
              <option value="caeser">Caesar Cipher (Level 1)</option>
              <option value="aes">AES-256 (Military Grade)</option>
            </select>
          </div>

          {/* ENCRYPTION CODE */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="encCode"
              className="text-xs font-mono text-green-500 tracking-wider"
            >
              DECRYPTION KEY (PASSWORD)
            </label>
            <input
              required
              name="encCode"
              onChange={handleChange}
              type="text"
              placeholder={
                formData.encType === "caeser"
                  ? "Enter shift (1-10)"
                  : "Enter secret passphrase"
              }
              className="w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300"
            />
            <p className="text-xs font-mono tracking-tighter font-extralight text-white/40">
              {formData.encType === "caeser"
                ? "Shift Index: Enter a number between 1 - 25."
                : "Passphrase: Create a secure key. e.g. 'The Smiling Buddha'"}
            </p>
          </div>

          {/* HINT */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="hint"
              className="text-xs font-mono text-green-500 tracking-wider"
            >
              HINT FOR RECEIVER
            </label>
            <input
              required
              name="hint"
              onChange={handleChange}
              type="text"
              placeholder="Where did we first meet?"
              className="w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300"
            />
            <p className="text-xs text-red-500/60 font-mono tracking-tighter font-extralight">
              Warning: If the receiver cannot guess the key from this hint, the
              data is lost forever.
            </p>
          </div>

          <button
            type="submit"
            className="mt-4 bg-green-600 w-full hover:bg-green-500 text-black font-bold py-3 rounded-lg transition-all shadow-[0_0_20px_rgba(22,163,74,0.2)] hover:shadow-[0_0_30px_rgba(22,163,74,0.5)] font-mono tracking-wider"
          >
            INITIATE UPLOAD
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTransmission;

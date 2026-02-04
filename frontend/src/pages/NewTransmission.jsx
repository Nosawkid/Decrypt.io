import React, { useState } from "react";
import { encrypt } from "../utils/Caeser";
import { sendTransmission } from "../api/transmissionApi";

const NewTransmission = () => {
  const [pageTitle, setPageTitle] = useState("NEW TRANSMISSION");

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const [formData, setFormData] = useState({
    agentId: "", // Changed from receiverAgentId
    subject: "",
    transmission: "",
    encType: "",
    encCode: "",
    hint: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      // Now sending { agentId, subject, ... } which matches your backend controller
      await sendTransmission(formData);

      setStatus({
        type: "success",
        message: "TRANSMISSION UPLOADED SUCCESSFULLY",
      });

      setFormData({
        agentId: "", // Reset correctly
        subject: "",
        transmission: "",
        encType: "",
        encCode: "",
        hint: "",
      });
    } catch (error) {
      console.error(error);
      const errorMsg =
        error.response?.data?.message || "UPLOAD FAILED. CHECK CONNECTION.";
      setStatus({ type: "error", message: errorMsg });
    } finally {
      setIsLoading(false);
    }
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
        {status.message && (
          <div
            className={`mb-6 p-4 border rounded font-mono text-center text-sm tracking-widest ${
              status.type === "success"
                ? "border-green-500 bg-green-500/10 text-green-500"
                : "border-red-500 bg-red-500/10 text-red-500"
            }`}
          >
            {status.type === "success" ? "✓ " : "⚠ "}
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-5">
          {/* AGENT ID - Now matches backend key */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-green-500 tracking-wider flex items-center gap-2">
              TARGET AGENT ID <span className="text-red-500">*</span>
            </label>
            <input
              required
              name="agentId" // Updated name attribute
              value={formData.agentId}
              onChange={handleChange}
              type="text"
              placeholder="e.g. bond.007@decrypt.io"
              className="w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300 tracking-wider"
            />
          </div>

          {/* ... Rest of the fields remain the same, ensuring 'name' matches formData keys ... */}

          {/* SUBJECT */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-green-500 tracking-wider">
              SUBJECT
            </label>
            <input
              required
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              type="text"
              placeholder="Operation: Task Master"
              className="w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300"
            />
          </div>

          {/* TRANSMISSION DATA */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-green-500 tracking-wider">
              TRANSMISSION DATA
            </label>
            <textarea
              required
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              rows={7}
              placeholder="Enter classified intelligence here..."
              className="resize-none w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300"
            ></textarea>
          </div>

          {/* ENCRYPTION TYPE */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-green-500 tracking-wider">
              ENCRYPTION PROTOCOL
            </label>
            <select
              name="encType"
              value={formData.encType}
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
            <label className="text-xs font-mono text-green-500 tracking-wider">
              DECRYPTION KEY
            </label>
            <input
              required
              name="encCode"
              value={formData.encCode}
              onChange={handleChange}
              type="text"
              placeholder={
                formData.encType === "caeser"
                  ? "Enter shift (1-10)"
                  : "Enter secret passphrase"
              }
              className="w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300"
            />
          </div>

          {/* HINT */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-green-500 tracking-wider">
              HINT FOR RECEIVER
            </label>
            <input
              required
              name="hint"
              value={formData.hint}
              onChange={handleChange}
              type="text"
              placeholder="Where did we first meet?"
              className="w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-4 bg-green-600 w-full hover:bg-green-500 text-black font-bold py-3 rounded-lg transition-all shadow-[0_0_20px_rgba(22,163,74,0.2)] hover:shadow-[0_0_30px_rgba(22,163,74,0.5)] font-mono tracking-wider ${isLoading ? "opacity-50 cursor-wait" : ""}`}
          >
            {isLoading ? "ENCRYPTING & UPLOADING..." : "INITIATE UPLOAD"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTransmission;

import React, { useState } from "react";
import {
  Lock,
  Unlock,
  User,
  Calendar,
  Key,
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react";

const TransmissionView = () => {
  // Mock Data
  const message = {
    id: 1,
    title: "Operation Blackout: Phase 2",
    content:
      "The rendezvous point has been moved to Sector 7. Bring the payload. Do not trust Agent Viper.",
    encryptedContent: "Xj9#kLms@1!aZ... [ENCRYPTED PAYLOAD] ... 010101",
    sentBy: "HQ_Command",
    isEncrypted: true,
    sendDate: "03/12/25",
    hint: "The name of our first pet",
  };

  const [inputKey, setInputKey] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(!message.isEncrypted);
  const [showHint, setShowHint] = useState(false);

  const handleDecrypt = (e) => {
    e.preventDefault();
    if (inputKey.length > 0) {
      setIsUnlocked(true);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8 font-Rubik mt-24">
      {/* 1. THE MESSAGE HEADER */}
      <div className="mb-6 border-b border-white/10 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          {/* Sender Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500">
              <User size={20} />
            </div>
            <div>
              <p className="text-xs text-white/40 font-mono tracking-widest uppercase">
                From
              </p>
              <p className="text-white font-bold font-mono text-lg">
                {message.sentBy}
              </p>
            </div>
          </div>

          {/* Date Badge */}
          <div className="flex items-center gap-3 md:text-right">
            <div className="md:hidden w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-xs text-white/40 font-mono tracking-widest uppercase">
                Received
              </p>
              <p className="text-white font-mono">{message.sendDate}</p>
            </div>
          </div>
        </div>

        {/* --- SUBJECT LINE LOGIC --- */}
        <div className="mt-6">
          <p className="text-xs text-white/40 font-mono tracking-widest uppercase mb-2">
            Subject
          </p>

          {isUnlocked ? (
            // UNLOCKED: Show real title
            <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight animate-in fade-in duration-500">
              {message.title}
            </h1>
          ) : (
            // LOCKED: Show Redacted Bar
            <div className="flex items-center gap-3 animate-pulse">
              <div className="h-8 md:h-10 w-3/4 bg-white/10 rounded-md relative overflow-hidden">
                {/* Optional: Add scanline effect inside the redacted bar */}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)] animate-shimmer"></div>
              </div>
              <span className="text-xs font-mono text-red-500/50 uppercase tracking-widest">
                [REDACTED]
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. THE CONTENT AREA (Conditional) */}
      <div className="relative">
        {isUnlocked ? (
          // ================= UNLOCKED VIEW =================
          <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6 md:p-10 relative overflow-hidden animate-in fade-in zoom-in-95 duration-500">
            {/* Success Banner */}
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_15px_#22c55e]"></div>
            <div className="flex items-center gap-2 mb-6 text-green-500">
              <Unlock size={18} />
              <span className="text-xs font-mono font-bold tracking-widest">
                DECRYPTED SUCCESSFULLY
              </span>
            </div>

            {/* The Real Message */}
            <p className="text-lg md:text-xl text-white/90 font-mono leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>

            {/* Watermark */}
            <div className="absolute -bottom-4 -right-4 text-9xl text-green-500/5 select-none pointer-events-none">
              OPEN
            </div>
          </div>
        ) : (
          // ================= LOCKED VIEW =================
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 md:p-10 relative overflow-hidden">
            {/* Security Warning */}
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_15px_#ef4444]"></div>

            {/* The "Blur" Effect overlaying gibberish */}
            <div className="relative mb-8">
              <p className="text-lg md:text-xl text-red-500/30 font-mono break-all blur-sm select-none">
                {message.encryptedContent} {message.encryptedContent}
              </p>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/80 backdrop-blur-md border border-red-500/30 px-6 py-4 rounded-lg flex items-center gap-3 text-red-500 shadow-xl">
                  <Lock size={24} />
                  <span className="font-bold tracking-widest">
                    ENCRYPTED PAYLOAD
                  </span>
                </div>
              </div>
            </div>

            {/* Decryption Form */}
            <form
              onSubmit={handleDecrypt}
              className="max-w-md mx-auto flex flex-col gap-4"
            >
              <div className="relative group">
                <Key
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-green-500 transition-colors"
                  size={20}
                />
                <input
                  type="password"
                  placeholder="Enter Decryption Key..."
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white font-mono outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                />
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs font-mono text-white/30 hover:text-white flex items-center justify-center gap-2 mx-auto transition-colors"
                >
                  {showHint ? <EyeOff size={14} /> : <Eye size={14} />}
                  {showHint ? "HIDE HINT" : "SHOW HINT CLUE"}
                </button>

                {showHint && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded text-yellow-500 text-xs font-mono animate-in fade-in slide-in-from-top-2">
                    <AlertTriangle size={12} />
                    CLUE: "{message.hint}"
                  </div>
                )}
              </div>

              <button className="w-full bg-white hover:bg-gray-200 text-black font-bold py-3 rounded-lg mt-2 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                UNLOCK MESSAGE
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransmissionView;

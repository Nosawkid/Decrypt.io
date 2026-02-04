import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Lock,
  Unlock,
  User,
  Key,
  Eye,
  EyeOff,
  AlertTriangle,
  Skull,
  Loader2,
  ArrowLeft,
  Star, // Import Star Icon
} from "lucide-react";
// Import toggleStar alongside others
import {
  getMyTransmissions,
  readTransmission,
  toggleStar,
} from "../api/transmissionApi";

const TransmissionView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [metadata, setMetadata] = useState(null);
  const [decryptedText, setDecryptedText] = useState(null);

  const [inputKey, setInputKey] = useState("");
  const [status, setStatus] = useState("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isStarred, setIsStarred] = useState(false); // Track star status

  // 1. ON MOUNT: Fetch Data
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const data = await getMyTransmissions();
        const msg = data.transmissions.find((m) => m._id === id);

        if (!msg) {
          setErrorMsg("Transmission not found.");
          setStatus("error");
          return;
        }

        setMetadata(msg);
        setIsStarred(msg.isStarred); // Set initial star state

        // CHECK STATUS
        if (msg.failedAttempts >= 3 || msg.isLost) {
          setStatus("burned");
        }
        // NEW: If already read/decrypted, show content immediately
        else if (msg.isRead || msg.encType === "none") {
          setDecryptedText(msg.transmission); // The content is now plaintext in DB
          setStatus("unlocked");
        } else {
          setStatus("locked");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };
    fetchMetadata();
  }, [id]);

  // 2. HANDLE STAR TOGGLE
  const handleStar = async () => {
    // Optimistic UI update (update immediately for speed)
    const newStarState = !isStarred;
    setIsStarred(newStarState);

    try {
      await toggleStar(id);
    } catch (err) {
      // Revert if API fails
      console.error("Star failed", err);
      setIsStarred(!newStarState);
    }
  };

  // 3. HANDLE DECRYPT
  const handleDecrypt = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const result = await readTransmission(id, inputKey);
      setDecryptedText(result.decryptedContent);
      setStatus("unlocked");
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "Decryption Failed";
      setErrorMsg(message);
      if (message.includes("Burned") || message.includes("incinerated")) {
        setStatus("burned");
      }
    }
  };

  if (status === "loading")
    return (
      <div className="h-screen flex items-center justify-center text-green-500 font-mono">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (status === "error")
    return (
      <div className="mt-24 text-center text-red-500 font-mono">
        SIGNAL LOST
      </div>
    );

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-8 font-Rubik mt-24">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-white/30 hover:text-green-500 transition-colors font-mono text-xs"
        >
          <ArrowLeft size={14} /> BACK TO ARCHIVES
        </button>

        {/* STAR BUTTON */}
        <button
          onClick={handleStar}
          className={`flex items-center gap-2 border px-3 py-1 rounded transition-all font-mono text-xs ${
            isStarred
              ? "border-yellow-500 text-yellow-500 bg-yellow-500/10"
              : "border-white/10 text-white/30 hover:border-white/30"
          }`}
        >
          <Star size={14} fill={isStarred ? "currentColor" : "none"} />
          {isStarred ? "MARKED IMPORTANT" : "MARK AS IMPORTANT"}
        </button>
      </div>

      {/* METADATA HEADER */}
      <div className="mb-6 border-b border-white/10 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full border flex items-center justify-center ${status === "burned" ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-green-500/10 border-green-500/30 text-green-500"}`}
            >
              {status === "burned" ? <Skull size={20} /> : <User size={20} />}
            </div>
            <div>
              <p className="text-xs text-white/40 font-mono tracking-widest uppercase">
                From
              </p>
              <p className="text-white font-bold font-mono text-lg">
                {metadata?.senderId?.agentId}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/40 font-mono tracking-widest uppercase">
              Received
            </p>
            <p className="text-white font-mono">
              {new Date(metadata?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs text-white/40 font-mono tracking-widest uppercase mb-2">
            Subject
          </p>
          {status === "unlocked" ? (
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              {metadata?.subject}
            </h1>
          ) : (
            <span className="text-xl md:text-3xl font-bold text-white/50 blur-sm select-none">
              {metadata?.subject?.replace(/[a-zA-Z]/g, "X")}
            </span>
          )}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div className="relative">
        {status === "burned" && (
          <div className="bg-red-900/10 border border-red-500/50 rounded-xl p-10 text-center">
            <Skull className="mx-auto text-red-500 mb-4" size={48} />
            <h2 className="text-xl font-bold text-red-500 font-mono">
              TRANSMISSION INCINERATED
            </h2>
          </div>
        )}

        {status === "unlocked" && (
          <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6 md:p-10 relative overflow-hidden animate-in fade-in">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_15px_#22c55e]"></div>
            <div className="flex items-center gap-2 mb-6 text-green-500">
              <Unlock size={18} />
              <span className="text-xs font-mono font-bold tracking-widest">
                DECRYPTED CONTENT
              </span>
            </div>
            <p className="text-lg text-white/90 font-mono whitespace-pre-wrap">
              {decryptedText}
            </p>
          </div>
        )}

        {status === "locked" && (
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 md:p-10">
            {errorMsg && (
              <div className="mb-4 text-red-500 text-xs font-mono text-center">
                {errorMsg}
              </div>
            )}

            <form
              onSubmit={handleDecrypt}
              className="max-w-md mx-auto flex flex-col gap-4"
            >
              <div className="relative">
                <Key
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"
                  size={20}
                />
                <input
                  type="password"
                  placeholder="Enter Decryption Key..."
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white font-mono outline-none focus:border-green-500 focus:ring-1"
                />
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs font-mono text-white/30 hover:text-white flex items-center justify-center gap-2 mx-auto"
                >
                  {showHint ? <EyeOff size={14} /> : <Eye size={14} />}
                  {showHint ? "HIDE HINT" : "SHOW HINT"}
                </button>
                {showHint && (
                  <div className="mt-2 text-yellow-500 text-xs font-mono">
                    CLUE: "{metadata?.hint}"
                  </div>
                )}
              </div>

              <button className="w-full bg-white hover:bg-gray-200 text-black font-bold py-3 rounded-lg mt-2 font-mono">
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

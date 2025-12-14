import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, ArrowLeft, Home, WifiOff } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-black text-white font-Rubik flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Grid Effect (Optional) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-lg text-center">
        {/* The Glitching 404 */}
        <div className="relative mb-8 group">
          <h1 className="text-[120px] md:text-[150px] font-bold font-mono leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-900 drop-shadow-[0_0_25px_rgba(239,68,68,0.5)] select-none">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500/10 blur-xl text-[160px] font-bold font-mono -z-10">
            404
          </div>

          {/* Signal Lost Icon Badge */}
          <div className="absolute top-0 right-10 md:right-20 animate-pulse">
            <div className="bg-red-500 text-black p-2 rounded-sm rotate-12 shadow-[0_0_15px_rgba(239,68,68,0.8)]">
              <WifiOff size={32} />
            </div>
          </div>
        </div>

        {/* Error Terminal Log */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 backdrop-blur-sm mb-8 text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50"></div>

          <div className="flex items-center gap-2 mb-4 text-red-500">
            <AlertTriangle size={18} />
            <span className="font-mono font-bold tracking-widest text-sm">
              SYSTEM FAILURE
            </span>
          </div>

          <div className="space-y-1 font-mono text-xs md:text-sm text-red-400/80">
            <p>{">"} ERR_CODE: INVALID_COORDINATES</p>
            <p>
              {">"} TRACING_ROUTE...{" "}
              <span className="text-red-600 font-bold">FAILED</span>
            </p>
            <p>
              {">"} The requested intel does not exist or has been redacted by
              HQ.
            </p>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 text-white/60 hover:text-white transition-all duration-300 font-mono text-sm"
          >
            <ArrowLeft size={16} />
            GO BACK
          </button>

          <Link to="/home">
            <button className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-green-600 hover:bg-green-500 text-black font-bold shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_30px_rgba(22,163,74,0.5)] transition-all duration-300 font-mono text-sm tracking-wider">
              <Home size={18} />
              RETURN TO BASE
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

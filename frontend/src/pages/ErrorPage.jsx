import React from "react";
import { useRouteError, Link } from "react-router-dom";
import { ShieldAlert, RefreshCcw, Home, Terminal } from "lucide-react";

const ErrorPage = () => {
  const error = useRouteError();

  // Helper to reload the page (Hard Refresh)
  const handleReboot = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen w-full bg-black text-white font-Rubik flex items-center justify-center p-4 relative">
      {/* Background Static/Pulse Effect */}
      <div className="absolute inset-0 bg-red-900/5 animate-pulse pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Header Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-500/10 p-6 rounded-full border-2 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-bounce-slow">
            <ShieldAlert size={48} className="text-red-500" />
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tighter text-red-500 mb-2">
            CRITICAL ERROR
          </h1>
          <p className="text-white/50 font-mono text-sm tracking-wide">
            // RUNTIME_EXCEPTION_DETECTED
          </p>
        </div>

        {/* The "Crash Dump" Box (Shows actual error details) */}
        <div className="bg-black/80 border border-red-500/30 rounded-lg p-6 mb-8 font-mono text-xs md:text-sm shadow-inner relative overflow-hidden group">
          {/* Scanline decoration */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none"></div>

          <div className="flex items-center gap-2 text-red-400 mb-3 border-b border-red-500/20 pb-2">
            <Terminal size={14} />
            <span className="font-bold">SYSTEM_LOG_DUMP</span>
          </div>

          <div className="space-y-2 text-red-300/80 break-words">
            <p>
              {">"} STATUS: {error?.status || 500}
            </p>
            <p>
              {">"} MESSAGE:{" "}
              {error?.statusText || error?.message || "Unknown Error Occurred"}
            </p>
            {error?.data && (
              <p>
                {">"} DETAILS: {JSON.stringify(error.data)}
              </p>
            )}
            <p className="animate-pulse mt-4 text-red-500 font-bold">
              {">"} CONNECTION_TERMINATED
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {/* Reboot (Refresh) */}
          <button
            onClick={handleReboot}
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-3 rounded-md hover:bg-gray-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)] font-mono uppercase tracking-wider"
          >
            <RefreshCcw size={18} />
            System Reboot (Refresh)
          </button>

          {/* Return Home */}
          <Link to="/">
            <button className="w-full flex items-center justify-center gap-3 border border-red-500/30 bg-red-500/10 text-red-400 font-bold py-3 rounded-md hover:bg-red-500/20 transition-all font-mono uppercase tracking-wider">
              <Home size={18} />
              Emergency Evac (Home)
            </button>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;

import { Lock, MoveRight, Unlock } from "lucide-react"; // Added Unlock for unencrypted msgs
import React from "react";
import { Link } from "react-router-dom";

const DisplayMessage = ({ msg }) => {
  return (
    <Link to={`/transmission/${msg.id}`}>
      <div className="p-2 flex flex-col gap-2">
        <div
          key={msg.id}
          className="
            group w-full bg-white/5 rounded-xl 
            flex flex-col md:flex-row md:items-center gap-2 md:gap-4 
            px-4 py-3 md:py-2 text-white
            border-l-4 hover:border-green-400 border border-white/5 
            cursor-pointer transition-all duration-300 
            hover:bg-white/10 hover:scale-[1.01] hover:shadow-lg
          "
        >
          <div className="flex justify-between items-center md:w-auto md:justify-start gap-4">
            <div className="flex items-center gap-2 min-w-max">
              {msg.isEncrypted ? (
                <Lock
                  size={14}
                  className="text-white/30 group-hover:text-green-400 transition-colors"
                />
              ) : (
                <Unlock
                  size={14}
                  className="text-white/30 group-hover:text-gray-400 transition-colors"
                />
              )}
              <span className="font-mono tracking-widest font-bold text-white/50 group-hover:text-white text-xs md:text-sm">
                {msg.sentBy}
              </span>
            </div>

            <div className="md:hidden text-xs text-white/30 font-mono">
              {msg.sendDate}
            </div>
          </div>

          <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-sm">
            <p className="font-bold group-hover:text-green-400 transition-colors truncate">
              {msg.title}
            </p>
            <span className="hidden md:inline text-white/30">-</span>
            <p className="text-white/50 line-clamp-1 text-xs md:text-sm">
              {msg.content}
            </p>
          </div>

          <div className="hidden md:block text-xs md:text-sm text-white/30 whitespace-nowrap font-mono group-hover:text-white">
            <div className="group-hover:hidden"> {msg.sendDate}</div>
            <MoveRight className="font-bold hidden group-hover:block group-hover:text-green-400 animate-pulse" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DisplayMessage;

import { Lock, MoveRight, Unlock, Skull } from "lucide-react";
import { Link } from "react-router-dom";

const DisplayMessage = ({ msg, folderType }) => {
  // FIX: Convert MongoDB 'createdAt' to a readable date
  const date = msg.createdAt
    ? new Date(msg.createdAt).toLocaleDateString()
    : "No Date";

  // FIX: Access populated agentId instead of mock 'sentBy'
  // If we are looking at 'sent' messages, show who we sent it TO.
  const agentLabel =
    folderType === "sent"
      ? msg.receiverId?.agentId || "Unknown Target"
      : msg.senderId?.agentId || "Unknown Sender";

  return (
    <Link to={`/transmission/${msg._id}`}>
      <div className="p-2">
        <div
          className={`
            group w-full bg-white/5 rounded-xl
            flex flex-col md:flex-row md:items-center gap-2 md:gap-4
            px-4 py-3 text-white border border-white/5
            hover:border-green-400 cursor-pointer transition-all duration-300
            hover:bg-white/10 ${msg.failedAttempts >= 3 ? "opacity-50" : ""}
          `}
        >
          <div className="flex items-center gap-2 min-w-[160px]">
            {msg.failedAttempts >= 3 ? (
              <Skull size={14} className="text-red-500" />
            ) : (
              <Lock
                size={14}
                className="text-green-500/30 group-hover:text-green-400 transition-colors"
              />
            )}
            <span className="font-mono tracking-widest font-bold text-white/50 group-hover:text-white text-xs">
              {folderType === "sent" ? "TO: " : "FROM: "}
              {agentLabel}
            </span>
          </div>

          <div className="flex-1 min-w-0 flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
            <p className="font-bold group-hover:text-green-400 transition-colors truncate text-sm">
              {msg.subject}
            </p>
            <span className="hidden md:inline text-white/20">|</span>
            <p className="text-white/40 line-clamp-1 text-xs font-mono italic">
              Hint: {msg.hint}
            </p>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <span className="text-[10px] text-white/20 font-mono group-hover:text-white transition-colors">
              {date}
            </span>
            <MoveRight
              size={16}
              className="text-green-400 opacity-0 group-hover:opacity-100 transition-all animate-pulse"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DisplayMessage;

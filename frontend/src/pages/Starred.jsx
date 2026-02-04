import React from "react";
import MessageDisplayList from "../components/MessageDisplayList";
// 1. Import the specific API function for starred items
import { getStarredTransmissions } from "../api/transmissionApi";

const Starred = () => {
  return (
    <div className="mt-24 max-w-6xl mx-auto px-6">
      {/* Header Section */}
      <div className="mb-8 flex justify-between items-end border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tighter font-mono">
            IMPORTANT <span className="text-yellow-500">INTEL</span>
          </h1>
          <p className="text-xs text-white/30 font-mono italic">
            // Priority objectives and flagged signals
          </p>
        </div>
      </div>

      {/* 2. Pass the fetch function to the list */}
      {/* folderType="inbox" ensures it shows "FROM: Sender" instead of "TO: Target" */}
      <MessageDisplayList
        fetchFn={getStarredTransmissions}
        folderType="inbox"
      />
    </div>
  );
};

export default Starred;

import React from "react";
import MessageDisplayList from "../components/MessageDisplayList";
// 1. Import the API function for lost/burned items
import { getLostTransmissions } from "../api/transmissionApi";

const Lost = () => {
  return (
    <div className="mt-24 max-w-6xl mx-auto px-6">
      {/* Red-Themed Header */}
      <div className="mb-8 flex justify-between items-end border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tighter font-mono">
            LOST <span className="text-red-500">SIGNALS</span>
          </h1>
          <p className="text-xs text-white/30 font-mono italic">
            // Decryption failed. Payloads incinerated.
          </p>
        </div>
      </div>

      {/* 2. Pass the fetch function */}
      {/* folderType="inbox" ensures we see "FROM: Sender" */}
      <MessageDisplayList fetchFn={getLostTransmissions} folderType="inbox" />
    </div>
  );
};

export default Lost;

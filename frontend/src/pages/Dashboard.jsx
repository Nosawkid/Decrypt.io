import React from "react";
import MessageDisplayList from "../components/MessageDisplayList";
import { getMyTransmissions } from "../api/transmissionApi";

const Dashboard = () => {
  return (
    <div className="mt-24 max-w-6xl mx-auto px-6">
      <div className="mb-8 flex justify-between items-end border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tighter font-mono">
            INCOMING <span className="text-green-500">INTEL</span>
          </h1>
          <p className="text-xs text-white/30 font-mono italic">
            // Monitoring active frequency...
          </p>
        </div>
      </div>

      {/* We pass the API function directly as a prop. 
          The List component will call it and handle the loading state.
      */}
      <MessageDisplayList fetchFn={getMyTransmissions} folderType="inbox" />
    </div>
  );
};

export default Dashboard;

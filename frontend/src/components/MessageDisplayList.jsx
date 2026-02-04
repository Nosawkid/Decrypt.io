import React, { useEffect, useState } from "react";
import DisplayMessage from "./DisplayMessage";

const MessageDisplayList = ({ fetchFn, folderType }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // Add error state

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Safety Check: ensure fetchFn exists before calling it
        if (typeof fetchFn !== "function") {
          throw new Error("API function is missing");
        }

        const data = await fetchFn();

        // FIX: Extract the array!
        // Your API returns { transmissions: [...] }, so we need data.transmissions
        // We also fallback to [] if it's undefined to prevent .map() crashes
        setMessages(data.transmissions || []);
      } catch (err) {
        console.error("Failed to load signals:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchFn]);

  if (loading) {
    return (
      <div className="p-10 text-green-500 font-mono animate-pulse text-center">
        RECOVERING SIGNALS...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-red-500 font-mono text-center">
        SIGNAL LOST. CHECK CONNECTION.
      </div>
    );
  }

  return (
    <div className="overflow-y-auto pb-20">
      {/* Safety check: ensure messages is actually an array before mapping */}
      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((msg) => (
          <DisplayMessage key={msg._id} msg={msg} folderType={folderType} />
        ))
      ) : (
        <div className="p-10 text-white/20 font-mono text-center">
          NO DATA IN THIS SECTOR.
        </div>
      )}
    </div>
  );
};

export default MessageDisplayList;

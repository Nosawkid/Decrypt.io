import { Lock, Unlock } from "lucide-react"; // Added Unlock for unencrypted msgs
import React from "react";
import DisplayMessage from "./DisplaMessage";

const MessageDisplayList = () => {
  const messages = [
    {
      id: 1,
      title: "Operation Blackout: Phase 2",
      content: "Xj9#kLms@1!aZ... [ENCRYPTED PAYLOAD]",
      sentBy: "HQ_Command",
      isEncrypted: true,
      sendDate: "03/12/25",
    },
    {
      id: 2,
      title: "Rendezvous Point Compromised",
      content:
        "Sector 7 is hot. Abort mission immediately. Move to extraction point Delta.",
      sentBy: "Agent_Viper",
      isEncrypted: false,
      sendDate: "02/12/25",
    },
    {
      id: 3,
      title: "Regarding the 'Pizza' Incident",
      content: "U2FsdGVkX1+4uJ... The budget does not cover extra cheese.",
      sentBy: "Finance_Dept",
      isEncrypted: true,
      sendDate: "01/12/25",
    },
    {
      id: 4,
      title: "Project: NIGHTSHADE",
      content:
        "The package has been delivered to the drop box. Do not open until 0800 hours.",
      sentBy: "The_Ghost",
      isEncrypted: true,
      sendDate: "30/11/25",
    },
    {
      id: 5,
      title: "Forgot my password again",
      content:
        "Hey, can you reset my clearance? I locked myself out of the mainframe.",
      sentBy: "Intern_Dave",
      isEncrypted: false,
      sendDate: "29/11/25",
    },
    {
      id: 6,
      title: "INTERCEPTED SIGNAL #402",
      content: "01001000 01100101 01101100 01110000",
      sentBy: "System_Bot",
      isEncrypted: true,
      sendDate: "28/11/25",
    },
  ];

  return (
    <>
      {messages.map((msg) => (
        <DisplayMessage key={msg.id} msg={msg} />
      ))}
      {messages.map((msg) => (
        <DisplayMessage key={msg.id} msg={msg} />
      ))}
      {messages.map((msg) => (
        <DisplayMessage key={msg.id} msg={msg} />
      ))}
      {messages.map((msg) => (
        <DisplayMessage key={msg.id} msg={msg} />
      ))}
    </>
  );
};

export default MessageDisplayList;

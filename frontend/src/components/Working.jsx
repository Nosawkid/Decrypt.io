import React from "react";

const Working = () => {
  const steps = [
    {
      step: "Draft & Cloak",
      content:
        "Compose your intel. Scramble it using Caesar Cipher or AES. Your message goes dark before it ever leaves your screen.",
    },
    {
      step: "Establish Clearance",
      content:
        "Set a passkey known only to your ally. Add a hint based on shared history—something no outsider or roommate can guess.",
    },
    {
      step: "Secure Drop",
      content:
        "Deploy the message. Your target unlocks the truth, while prying eyes only see a wall of scrambled chaos.",
    },
  ];

  return (
    <div className="bg-black text-white py-24 px-6 font-Rubik border-t border-white/10 relative overflow-hidden">
      {/* Background Decor (Optional Grid) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            MISSION <span className="text-green-500 font-mono">PROTOCOL</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-lg mx-auto">
            Three steps to total secrecy.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm 
                         hover:border-green-500/50 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300"
            >
              <span className="absolute top-2 right-6 text-8xl font-black text-white/5 group-hover:text-green-500/10 transition-colors duration-300 select-none">
                0{idx + 1}
              </span>

              <h4 className="text-xl md:text-2xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors duration-300 font-mono">
                {item.step}
              </h4>

              <p className="text-white/60 leading-relaxed relative z-10">
                {item.content}
              </p>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-green-500/0 to-transparent group-hover:via-green-500/50 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Working;

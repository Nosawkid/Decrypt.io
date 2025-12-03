import { FileX, SendHorizontal, Star, UserPen, Plus } from "lucide-react";

const SideNav = () => {
  const navItems = [
    { label: "Sent Log", icon: <SendHorizontal size={20} />, active: true },
    { label: "Profile", icon: <UserPen size={20} />, active: false },
    { label: "Starred Intel", icon: <Star size={20} />, active: false },
    { label: "Lost Transmissions", icon: <FileX size={20} />, active: false },
  ];

  return (
    <div className="min-h-screen w-64 hidden md:flex pt-24 border-r border-white/10 px-4 bg-black font-Rubik  flex-col">
      <button
        className="
        group flex items-center justify-center gap-3 w-full py-3 mb-8
        bg-green-600 hover:bg-green-500 
        text-black font-bold font-mono tracking-wider rounded-sm 
        shadow-[0_0_15px_rgba(22,163,74,0.5)] hover:shadow-[0_0_25px_rgba(22,163,74,0.8)] 
        transition-all duration-300
      "
      >
        <Plus
          className="group-hover:rotate-90 transition-transform duration-300"
          size={20}
        />
        <span>NEW TRANSMISSION</span>
      </button>

      <ul className="space-y-2">
        {navItems.map((item, idx) => (
          <li
            key={idx}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all duration-200
              ${
                item.active
                  ? "bg-green-500/10 text-green-400 border-l-2 border-green-500"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }
            `}
          >
            <span className={item.active ? "text-green-400" : "text-white/40"}>
              {item.icon}
            </span>

            <span className="font-mono text-sm tracking-wide">
              {item.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto mb-8 px-4">
        <div className="h-px w-full bg-white/10 mb-4"></div>
        <p className="text-xs text-white/20 font-mono">
          SERVER_STATUS: <span className="text-green-500">ONLINE</span>
        </p>
      </div>
    </div>
  );
};

export default SideNav;

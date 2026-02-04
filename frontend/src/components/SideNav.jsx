import React, { useState } from "react";
import {
  FileX,
  SendHorizontal,
  Star,
  UserPen,
  Plus,
  Menu,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      label: "Transmissions",
      icon: <SendHorizontal size={20} />,
      path: "/home",
    },
    { label: "Profile", icon: <UserPen size={20} />, path: "/profile" },
    { label: "Starred Intel", icon: <Star size={20} />, path: "/starred" },
    { label: "Lost Transmissions", icon: <FileX size={20} />, path: "/lost" },
  ];

  return (
    <>
      {/* =======================================================
          DESKTOP VIEW (The Sidebar)
          Hidden on mobile (hidden), Visible on md screens (md:flex)
         ======================================================= */}
      <div className="hidden md:flex sticky top-0 h-screen overflow-y-auto w-64 pt-24 border-r border-white/10 px-4 bg-black font-Rubik flex-col scrollbar-hide">
        <Link to="/new">
          <button
            className="
            group flex items-center justify-center gap-3 w-full py-3 mb-8
            bg-green-600 hover:bg-green-500 
            text-black font-bold font-mono tracking-wider rounded-sm 
            shadow-[0_0_15px_rgba(22,163,74,0.5)] hover:shadow-[0_0_25px_rgba(22,163,74,0.8)] 
            transition-all duration-300 shrink-0
          "
          >
            <Plus
              className="group-hover:rotate-90 transition-transform duration-300"
              size={20}
            />
            <span>NEW TRANSMISSION</span>
          </button>
        </Link>

        <ul className="space-y-2">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.path}
                end={item.path === "/home"}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all duration-200
                  ${
                    isActive
                      ? "bg-green-500/10 text-green-400 border-l-2 border-green-500"
                      : "text-white/60 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                  }
                `}
              >
                <span>{item.icon}</span>
                <span className="font-mono text-sm tracking-wide">
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-auto mb-8 px-4 shrink-0">
          <div className="h-px w-full bg-white/10 mb-4"></div>
          <p className="text-xs text-white/20 font-mono">
            SERVER_STATUS: <span className="text-green-500">ONLINE</span>
          </p>
        </div>
      </div>

      {/* =======================================================
          MOBILE VIEW (The Floating Dock)
          Visible on mobile (block), Hidden on md screens (md:hidden)
         ======================================================= */}

      {/* 1. The Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          md:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.7)]
          transition-all duration-300 transform active:scale-95
          ${isOpen ? "bg-red-500 rotate-90" : "bg-green-600 rotate-0"}
          text-black font-bold border-2 border-white/10
        `}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 2. The Pop-up Menu */}
      <div
        className={`
          md:hidden fixed bottom-24 right-6 z-40 flex flex-col items-end gap-3
          transition-all duration-300 origin-bottom-right
          ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-50 translate-y-10 pointer-events-none"
          }
        `}
      >
        <Link to="/new" onClick={() => setIsOpen(false)}>
          <button
            className="
            flex items-center gap-3 px-6 py-3 bg-green-600 text-black font-bold font-mono rounded-full 
            shadow-[0_0_15px_rgba(22,163,74,0.5)] active:bg-green-500 transition-colors
            mb-4 mr-1
          "
          >
            <span>NEW TRANSMISSION</span>
            <Plus size={20} />
          </button>
        </Link>

        {navItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            end={item.path === "/home"}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `
              flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 backdrop-blur-md
              transition-all duration-200 shadow-xl
              ${
                isActive
                  ? "bg-green-500 text-black font-bold border-green-400"
                  : "bg-black/90 text-white/70 active:bg-white/10"
              }
            `}
          >
            <span className="font-mono text-sm tracking-wide">
              {item.label}
            </span>
            <span>{item.icon}</span>
          </NavLink>
        ))}
      </div>

      {/* 3. Backdrop Dimmer (Mobile Only) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-30 animate-in fade-in duration-200"
        />
      )}
    </>
  );
};

export default SideNav;

import React, { useState } from "react";
import {
  User,
  Mail,
  Shield,
  Key,
  Copy,
  Check,
  LogOut,
  Terminal,
} from "lucide-react";

const Profile = () => {
  // Mock User Data
  const user = {
    username: "ShadowWalker_99",
    realEmail: "john.doe@gmail.com",
    cipherMail: "shadow.walker@decrypt.io",
    uniqueId: "8f7a-2b1c-9d4e-3f5g",
    clearanceLevel: "LEVEL 4 (TOP SECRET)",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  // Helper to handle copying text
  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000); // Reset after 2s
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 font-Rubik mt-24">
      {/* Header Section */}
      <div className="mb-8 border-b border-white/10 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            AGENT <span className="text-green-500 font-mono">PROFILE</span>
          </h2>
          <p className="text-white/40 font-mono text-sm">
            // AUTHORIZED_PERSONNEL_ONLY // ID: {user.uniqueId}
          </p>
        </div>

        {/* Clearance Badge */}
        <div className="bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-md">
          <p className="text-green-400 font-mono text-xs tracking-widest font-bold">
            {user.clearanceLevel}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Avatar & Quick Actions */}
        <div className="md:col-span-1 flex flex-col gap-6">
          {/* Avatar Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-center text-center backdrop-blur-sm">
            <div className="w-32 h-32 rounded-full bg-black border-2 border-green-500/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(22,163,74,0.2)]">
              <User size={64} className="text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">
              {user.username}
            </h3>
            <p className="text-white/40 text-sm font-mono">Field Operative</p>
          </div>

          {/* Quick Stats / Actions */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <button className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 py-3 rounded-lg transition-all duration-300 font-mono text-sm font-bold">
              <LogOut size={16} /> TERMINATE SESSION
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: The Data Fields */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {/* Field: Username */}
          <div className="group bg-white/5 border border-white/10 p-5 rounded-xl hover:border-green-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Terminal size={18} className="text-green-500" />
              <label className="text-xs font-mono text-white/40 tracking-widest uppercase">
                Codename / Username
              </label>
            </div>
            <p className="text-xl text-white font-bold tracking-wide">
              {user.username}
            </p>
          </div>

          {/* Field: Decrypt Mail */}
          <div className="group bg-green-500/5 border border-green-500/20 p-5 rounded-xl hover:bg-green-500/10 transition-colors relative">
            <div className="flex items-center gap-3 mb-2">
              <Shield size={18} className="text-green-500" />
              <label className="text-xs font-mono text-green-500/60 tracking-widest uppercase">
                Official Decrypt.io Address
              </label>
            </div>
            <p className="text-lg md:text-xl text-green-400 font-mono truncate pr-10">
              {user.cipherMail}
            </p>

            <button
              onClick={() => handleCopy(user.cipherMail, "email")}
              className="absolute top-1/2 -translate-y-1/2 right-4 text-white/20 hover:text-green-400 transition-colors"
            >
              {copiedField === "email" ? (
                <Check size={20} />
              ) : (
                <Copy size={20} />
              )}
            </button>
          </div>

          {/* Field: Real Email */}
          <div className="group bg-white/5 border border-white/10 p-5 rounded-xl hover:border-green-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Mail
                size={18}
                className="text-white/40 group-hover:text-green-500 transition-colors"
              />
              <label className="text-xs font-mono text-white/40 tracking-widest uppercase">
                Linked Recovery Email
              </label>
            </div>
            <p className="text-lg text-white/80 font-mono">{user.realEmail}</p>
          </div>

          {/* Field: Unique ID */}
          <div className="group bg-white/5 border border-white/10 p-5 rounded-xl hover:border-green-500/30 transition-colors relative">
            <div className="flex items-center gap-3 mb-2">
              <Key
                size={18}
                className="text-white/40 group-hover:text-green-500 transition-colors"
              />
              <label className="text-xs font-mono text-white/40 tracking-widest uppercase">
                Unique Agent ID
              </label>
            </div>
            <p className="text-lg text-white/80 font-mono tracking-widest">
              {user.uniqueId}
            </p>

            <button
              onClick={() => handleCopy(user.uniqueId, "id")}
              className="absolute top-1/2 -translate-y-1/2 right-4 text-white/20 hover:text-green-400 transition-colors"
            >
              {copiedField === "id" ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>

          {/* Field: Password */}
          <div className="group bg-white/5 border border-white/10 p-5 rounded-xl hover:border-green-500/30 transition-colors flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <LockIcon show={showPassword} />
                <label className="text-xs font-mono text-white/40 tracking-widest uppercase">
                  Security Clearance
                </label>
              </div>
              <p className="text-lg text-white/80 font-mono">
                {showPassword ? "mySecretPass123" : "••••••••••••••••"}
              </p>
            </div>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="text-xs font-bold text-green-500 hover:text-green-400 border border-green-500/30 px-3 py-1 rounded hover:bg-green-500/10 transition-colors"
            >
              {showPassword ? "HIDE" : "REVEAL"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple sub-component for the lock icon swap
const LockIcon = ({ show }) => {
  return show ? (
    <div className="text-red-400">
      <Key size={18} />
    </div>
  ) : (
    <div className="text-white/40">
      <Key size={18} />
    </div>
  );
};

export default Profile;

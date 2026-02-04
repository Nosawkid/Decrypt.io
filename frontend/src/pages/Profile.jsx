import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/userApi"; // <--- 1. Import your new service function
import api from "../api/axios"; // Still needed for logout, or move logout to authApi.js

const Profile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // 2. Use the service function
        // No need to write axios logic here anymore!
        const data = await getUserProfile();
        setUserData(data);
      } catch (err) {
        console.error("Failed to load profile", err);
        setError("Failed to retrieve agent dossier.");
        if (err.response?.status === 401) navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      navigate("/login");
    }
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center text-green-500 font-mono">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mb-4"></div>
        <p className="animate-pulse">DECRYPTING DOSSIER...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-32 text-center text-red-500 font-mono">
        <h2 className="text-2xl font-bold">ACCESS DENIED</h2>
        <p>{error}</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 border border-red-500 px-4 py-2 hover:bg-red-500/20"
        >
          RETURN TO LOGIN
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 font-Rubik mt-24">
      {/* Header Section */}
      <div className="mb-8 border-b border-white/10 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            AGENT <span className="text-green-500 font-mono">PROFILE</span>
          </h2>
          <p className="text-white/40 font-mono text-sm">
            // AUTHORIZED_PERSONNEL_ONLY // REF:{" "}
            {userData?._id?.slice(-6).toUpperCase()}
          </p>
        </div>

        <div className="bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-md">
          <p className="text-green-400 font-mono text-xs tracking-widest font-bold">
            LEVEL 4 (FIELD AGENT)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Avatar & Actions */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-center text-center backdrop-blur-sm">
            <div className="w-32 h-32 rounded-full bg-black border-2 border-green-500/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(22,163,74,0.2)]">
              <User size={64} className="text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">
              {userData?.username}
            </h3>
            <p className="text-white/40 text-sm font-mono">Active Operative</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 py-3 rounded-lg transition-all duration-300 font-mono text-sm font-bold"
            >
              <LogOut size={16} /> TERMINATE SESSION
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Data Fields */}
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
              {userData?.username}
            </p>
          </div>

          {/* Field: Agent ID */}
          <div className="group bg-green-500/5 border border-green-500/20 p-5 rounded-xl hover:bg-green-500/10 transition-colors relative">
            <div className="flex items-center gap-3 mb-2">
              <Shield size={18} className="text-green-500" />
              <label className="text-xs font-mono text-green-500/60 tracking-widest uppercase">
                Official Decrypt.io Address
              </label>
            </div>
            <p className="text-lg md:text-xl text-green-400 font-mono truncate pr-10">
              {userData?.agentId}
            </p>
            <button
              onClick={() => handleCopy(userData?.agentId, "email")}
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
            <p className="text-lg text-white/80 font-mono">{userData?.email}</p>
          </div>

          {/* Field: System ID */}
          <div className="group bg-white/5 border border-white/10 p-5 rounded-xl hover:border-green-500/30 transition-colors relative">
            <div className="flex items-center gap-3 mb-2">
              <Key
                size={18}
                className="text-white/40 group-hover:text-green-500 transition-colors"
              />
              <label className="text-xs font-mono text-white/40 tracking-widest uppercase">
                System Reference ID
              </label>
            </div>
            <p className="text-lg text-white/80 font-mono tracking-widest">
              {userData?._id}
            </p>
            <button
              onClick={() => handleCopy(userData?._id, "id")}
              className="absolute top-1/2 -translate-y-1/2 right-4 text-white/20 hover:text-green-400 transition-colors"
            >
              {copiedField === "id" ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

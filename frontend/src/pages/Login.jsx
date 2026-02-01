import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi"; // Import the API function directly

const Login = () => {
  const navigate = useNavigate();

  const [agentId, setAgentId] = useState("");
  const [password, setPassword] = useState("");

  // UI States
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // 1. Call API
      const data = await loginUser({ agentId, password });

      console.log("Login Success", data);

      // 2. Save Token manually (Since we have no Context to do it)
      localStorage.setItem("token", data.accessToken);

      // 3. Save User info (Optional, but useful for displaying name later)
      // We convert the object to a string to store it
      localStorage.setItem("userInfo", JSON.stringify(data.agent));

      // 4. Redirect to Dashboard
      navigate("/profile");
    } catch (err) {
      console.log("Error Login", err);
      setError(
        err.response?.data?.message || "Invalid Agent ID or Security Code",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex justify-center items-center font-Rubik">
      <div className="max-w-md w-full border bg-white/5 backdrop-blur-lg border-white/10 text-white p-8 rounded-xl shadow-2">
        <div className="mb-8 text-center">
          <h3 className="font-bold text-2xl md:text-3xl tracking-widest">
            ACCESS <span className="font-light text-green-500">POINT</span>
          </h3>
          <p className="text-white/30 text-xs mt-2 font-mono">
            AUTHORIZED_PERSONNEL_ONLY
          </p>
        </div>

        {/* ERROR MESSAGE BOX */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-xs font-mono text-center">
            ⚠ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="agentId"
              className="text-xs font-mono text-green-500 tracking-wider"
            >
              AGENT ID
            </label>
            <input
              type="text"
              name="agentId"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
              placeholder="ENTER ID CODE"
              required
              className="w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-xs font-mono text-green-500 tracking-wider"
            >
              SECURITY CODE
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              required
              className="w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300"
            />
          </div>

          <button
            disabled={isLoading}
            className={`mt-4 bg-green-600 w-full hover:bg-green-500 text-black font-bold py-3 rounded-lg transition-colors shadow-[0_0_15px_rgba(22,163,74,0.4)] font-mono ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "AUTHENTICATING..." : "AUTHENTICATE"}
          </button>
        </form>

        <p className="text-center mt-4 font-mono text-xs">
          Don't have an account?{" "}
          <Link
            className="underline text-green-400 hover:text-green-300"
            to={"/signup"}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

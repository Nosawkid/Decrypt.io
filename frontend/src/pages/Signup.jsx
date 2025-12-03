import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen w-full bg-black flex  pt-20 justify-center items-center font-Rubik ">
      <div className="max-w-md w-full border bg-white/5 backdrop-blur-lg border-white/10 text-white p-8 rounded-xl shadow-2 ">
        <div className="mb-8 text-center">
          <h3 className="font-bold text-2xl md:text-3xl tracking-widest">
            RECRUITMENT <span className="font-light text-green-500">POINT</span>
          </h3>
          <p className="text-white/30 text-xs mt-2 font-mono">
            Establish a secure connection to the network.
          </p>
        </div>
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="id"
              className="text-xs font-mono text-green-500 tracking-wider"
            >
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Task Master"
              className="w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus-ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="id"
              className="text-xs font-mono text-green-500 tracking-wider"
            >
              EMAIL
            </label>
            <input
              type="email"
              placeholder="jamesbond@gmail.com"
              className="w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus-ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300"
            />
            <p className="text-[10px] font-mono tracking-tighter text-white/30 hover:text-green-500 ">
              Your will receive a Decrypt.io mail after successful registration
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="pass"
              className="text-xs font-mono text-green-500 tracking-wider"
            >
              Security Code
            </label>
            <input
              type="password"
              placeholder="******"
              className="w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus-ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="pass"
              className="text-xs font-mono text-green-500 tracking-wider"
            >
              Confirm Security Code
            </label>
            <input
              type="password"
              placeholder="******"
              className="w-full border bg-black/50 px-4 py-3 rounded-lg border-white/10 outline-none focus:border-green-500 focus-ring-1 focus:ring-green-500 placeholder:text-white/20 font-mono transition-all duration-300"
            />
          </div>
          <button className="mt-4 bg-green-600 w-full hover:bg-green-500 text-black font-bold py-3 rounded-lg transition-colors shadow-[0_0_15px_rgba(22,163,74,0.4)] font-mono">
            Request Access
          </button>
        </form>
        <p className="text-center mt-4 font-mono text-xs">
          Already have an account{" "}
          <Link className="underline" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

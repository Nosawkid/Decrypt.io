import { useState } from "react";
import { Link } from "react-router-dom";

import { encrypt } from "../utils/Caeser";

const Navbar = () => {
  const navItems = {
    logo: "Decrypt.io",
    login: "Login",
    signup: "Sign Up",
    signOut: "Signout",
  };

  const isUser = false;

  const [logoText, setLogoText] = useState(navItems.logo);
  const [loginText, setLoginText] = useState(navItems.login);
  const [signupText, setSignupText] = useState(navItems.signup);

  const handleHover = (text, setter) => {
    setter(encrypt(text));
  };

  const handleLeave = (original, setter) => {
    setter(original);
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4 
                    bg-black/30 backdrop-blur-md border-b border-white/10 font-mono"
    >
      {/* Logo Section */}
      <div className="cursor-pointer group">
        <Link to={"/"}>
          <h1
            className="text-lg md:text-2xl font-bold text-white transition-colors duration-300 group-hover:text-green-400"
            onMouseEnter={() => handleHover(navItems.logo, setLogoText)}
            onMouseLeave={() => handleLeave(navItems.logo, setLogoText)}
          >
            {logoText}
          </h1>
        </Link>
      </div>

      {/* Buttons Section */}
      <div className="flex items-center gap-6">
        {/* Login Button */}
        {!isUser ? (
          <>
            {" "}
            <Link to={"/home"}>
              {" "}
              <button
                onMouseEnter={() => handleHover(navItems.login, setLoginText)}
                onMouseLeave={() => handleLeave(navItems.login, setLoginText)}
                className="text-white/80 hover:text-white font-bold transition-colors"
              >
                {loginText}
              </button>
            </Link>
            {/* Sign Up Button - Cyberpunk Style */}
            <Link to={"/signup"}>
              <button
                onMouseEnter={() => handleHover(navItems.signup, setSignupText)}
                onMouseLeave={() => handleLeave(navItems.signup, setSignupText)}
                className="px-6 py-2 font-bold text-black bg-white rounded-md shadow-[0_0_15px_rgba(255,255,255,0.3)] 
                     hover:bg-green-400 hover:shadow-[0_0_20px_rgba(74,222,128,0.6)] transition-all duration-300"
              >
                {signupText}
              </button>
            </Link>
          </>
        ) : (
          <button
            className="
  px-6 py-2 rounded-sm
  bg-black border-l-2 border-red-600 
  text-red-600 font-mono font-bold tracking-tighter uppercase
  hover:bg-red-600 hover:text-black 
  transition-colors duration-300
  shadow-[0_0_10px_rgba(220,38,38,0.2)]
"
          >
            Disconnect_
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

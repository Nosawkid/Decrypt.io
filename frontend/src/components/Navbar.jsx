import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Added useLocation to force re-render on route change

import { encrypt } from "../utils/Caeser";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to detect page changes

  const navItems = {
    logo: "Decrypt.io",
    login: "Login",
    signup: "Sign Up",
    signOut: "Signout",
  };

  // 1. STATE: Track if user is logged in
  const [isUser, setIsUser] = useState(false);

  const [logoText, setLogoText] = useState(navItems.logo);
  const [loginText, setLoginText] = useState(navItems.login);
  const [signupText, setSignupText] = useState(navItems.signup);

  // 2. CHECK LOGIN STATUS
  // We run this whenever the route changes (location) to ensure Navbar stays updated
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsUser(!!token); // !! converts string to boolean (true if token exists)
  }, [location]);

  const handleHover = (text, setter) => {
    setter(encrypt(text));
  };

  const handleLeave = (original, setter) => {
    setter(original);
  };

  // 3. HANDLE LOGOUT
  const handleLogout = () => {
    // Remove items
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");

    // Update local state immediately
    setIsUser(false);

    // Redirect to login
    navigate("/login");
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4 
                    bg-black/30 backdrop-blur-md border-b border-white/10 font-mono select-none"
    >
      {/* Logo Section */}
      <div className="cursor-pointer group">
        <Link to={isUser ? "/home" : "/"}>
          {" "}
          {/* Redirect to dashboard if logged in */}
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
        {/* CONDITIONAL RENDERING */}
        {!isUser ? (
          <>
            <Link to={"/login"}>
              <button
                onMouseEnter={() => handleHover(navItems.login, setLoginText)}
                onMouseLeave={() => handleLeave(navItems.login, setLoginText)}
                className="text-white/80 hover:text-white font-bold transition-colors"
              >
                {loginText}
              </button>
            </Link>

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
            onClick={handleLogout}
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

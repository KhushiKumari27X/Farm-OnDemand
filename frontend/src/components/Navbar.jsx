import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="sticky top-0 z-50 pt-4 px-6 pb-2">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-2xl border border-gray-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl px-6 py-2 flex items-center justify-between transition-all">

        {/* LOGO */}
        <Link to="/" className="flex-shrink-0 hover:opacity-90 transition-opacity">
          <img src={logo} alt="Farm On-Demand Logo" className="h-16 md:h-20 object-contain w-auto scale-110 origin-left" />
        </Link>

        {/* CENTER NAV PILL */}
        <nav className="hidden md:flex items-center gap-2 bg-gray-50/50 p-1.5 rounded-full border border-gray-100">
          {[
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
            { name: "Equipment", path: "/register" }, 
            { name: "Contact", path: "/contact" }
          ].map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive 
                    ? "bg-white text-green-700 shadow-sm border border-gray-200/50" 
                    : "text-gray-500 hover:text-gray-900 hover:bg-white/60"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:block px-5 py-2.5 text-sm font-bold text-gray-700 hover:text-green-600 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-green-200 hover:-translate-y-0.5 hover:shadow-xl transition-all"
          >
            Get Started
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
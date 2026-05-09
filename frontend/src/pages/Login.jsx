import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
// ❌ remove footer
import API from "../utils/api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", formData);
      localStorage.setItem("user", JSON.stringify(data));

      if (data.role === "admin") navigate("/admin");
      else if (data.role === "farmer") navigate("/farmer");
      else if (data.role === "owner") navigate("/owner");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Navbar />

      {/* CENTER WRAPPER */}
      <div className="flex-1 flex items-center justify-center px-6 relative">

        {/* Background */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-green-300 opacity-20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-400 opacity-10 blur-[100px] rounded-full"></div>

        {/* CARD */}
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl grid md:grid-cols-2 overflow-hidden border border-gray-100 z-10">

          {/* LEFT SIDE */}
          <div className="hidden md:flex flex-col justify-center p-10 relative">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
                alt="Farm"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/95 via-green-800/80 to-transparent"></div>
            </div>

            <div className="relative z-10 text-white">
              <h2 className="text-3xl font-bold mb-3">
                Welcome Back
              </h2>

              <p className="text-green-100 text-sm mb-6 max-w-xs">
                Manage bookings, equipment, and grow your farming business.
              </p>

              <div className="space-y-2 text-sm">
                <p>✓ Smart Booking</p>
                <p>✓ Verified Owners</p>
                <p>✓ Secure Payments</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">

              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Sign In
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                Enter your credentials to continue
              </p>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3">

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                />

                <div className="flex justify-end text-sm">
                  <span className="text-green-600 cursor-pointer hover:underline">
                    Forgot password?
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold mt-2"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-5">
                Don’t have an account?{" "}
                <Link to="/register" className="text-green-600 font-medium">
                  Create account
                </Link>
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
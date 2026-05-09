import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
// ❌ Footer removed for auth page
import API from "../utils/api";
import { FiUser, FiTruck, FiShield } from "react-icons/fi";

function Register() {
  const [role, setRole] = useState("farmer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      const { data } = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role
      });
      
      localStorage.setItem("user", JSON.stringify(data));

      if (data.role === "admin") navigate("/admin");
      else if (data.role === "farmer") navigate("/farmer");
      else if (data.role === "owner") navigate("/owner");

    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-hidden">
      <Navbar />

      {/* ✅ PERFECT CENTER WRAPPER */}
      <div className="flex-1 flex items-center justify-center px-6 relative">

        {/* Background */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-green-300 opacity-20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-400 opacity-10 blur-[100px] rounded-full pointer-events-none"></div>

        {/* MAIN CARD */}
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl grid md:grid-cols-2 overflow-hidden border border-gray-100 z-10">

          {/* LEFT SIDE */}
          <div className="hidden md:flex flex-col justify-center p-10 relative">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80" 
                alt="Farming"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/95 via-green-800/80 to-transparent"></div>
            </div>

            <div className="relative z-10 text-white">
              <h2 className="text-3xl font-bold mb-3">
                Join Farm On-Demand
              </h2>

              <p className="text-green-100 text-sm mb-6 max-w-xs">
                Start renting or listing equipment easily.
              </p>

              <div className="space-y-2 text-sm">
                <p>✓ Fast setup</p>
                <p>✓ Connect locally</p>
                <p>✓ Boost productivity</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">

              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Create Account
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                Choose your role and continue
              </p>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}

              {/* ROLE */}
              <div className="flex gap-2 mb-5 p-1 bg-gray-100 rounded-xl">
                {[
                  { key: "farmer", icon: <FiUser />, label: "Farmer" },
                  { key: "owner", icon: <FiTruck />, label: "Owner" },
                  { key: "admin", icon: <FiShield />, label: "Admin" }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setRole(item.key)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium ${
                      role === item.key
                        ? "bg-white text-green-600 shadow"
                        : "text-gray-500"
                    }`}
                  >
                    {item.icon} {item.label}
                  </button>
                ))}
              </div>

              {/* FORM */}
              <form onSubmit={handleRegister} className="space-y-3">

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold mt-2"
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-5">
                Already have an account?{" "}
                <Link to="/login" className="text-green-600 font-medium">
                  Sign in
                </Link>
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;
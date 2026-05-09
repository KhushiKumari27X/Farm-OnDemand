import React from "react";
import tractor from "../assets/tractor.png";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FiCalendar, FiShield, FiDollarSign } from "react-icons/fi";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 relative overflow-hidden">
        {/* BACKGROUND BLOBS */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-300 opacity-20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-emerald-400 opacity-10 blur-[100px] rounded-full pointer-events-none"></div>

        {/* HERO */}
        <section className="relative max-w-7xl mx-auto px-6 min-h-screen flex items-start pt-10 lg:pt-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">

            {/* LEFT */}
            <div className="z-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-700 font-semibold text-sm mb-2 mt-[-10px] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Connecting Farmers with Equipment Owners
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                Rent Farm <br /> Equipment <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                  The Smart Way
                </span>
              </h1>

              <p className="mt-4 text-gray-600 text-base lg:text-lg xl:text-xl max-w-lg leading-relaxed">
                Access high-quality tractors, harvesters, and tools exactly when you need them. Connect with local owners and increase your agricultural productivity without the heavy investment.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-xl shadow-lg shadow-green-200 hover:shadow-xl hover:-translate-y-1 transition-all font-semibold text-base lg:text-lg flex items-center justify-center"
                >
                  Start Renting Now
                </Link>

                <Link
                  to="/about"
                  className="bg-white border-2 border-gray-100 text-gray-700 px-6 py-3 lg:px-8 lg:py-4 rounded-xl hover:border-green-200 hover:bg-green-50 transition-all font-semibold text-base lg:text-lg flex items-center justify-center shadow-sm"
                >
                  How It Works
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center lg:justify-end items-center w-full">
              <img
                src={tractor}
                alt="Premium Farm Tractor"
                className="w-full max-w-sm lg:max-w-md xl:max-w-md drop-shadow-2xl transform hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

          </div>
        </section>

        {/* FEATURES */}
        <section className="relative py-20 bg-white/50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                Why Choose Farm On-Demand?
              </h2>
              <p className="text-gray-600 text-lg">
                We bridge the gap between equipment owners and farmers, providing a seamless, secure, and affordable rental experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 text-green-600 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  <FiCalendar />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Easy Booking
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Browse available equipment in your area and book instantly with our streamlined scheduling system.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  <FiShield />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Trusted Platform
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  All users and equipment listings are verified. Rent with confidence knowing your transactions are secure.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 text-orange-600 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  <FiDollarSign />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Affordable Prices
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Pay only for the time you need. Competitive daily rates help you maximize your return on investment.
                </p>
              </div>

            </div>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}

export default Home;
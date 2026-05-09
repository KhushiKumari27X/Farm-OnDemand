import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen">

        {/* HERO */}
        <section className="max-w-5xl mx-auto px-6 pt-12 pb-10 text-center">
          
          <h1 className="text-4xl font-bold text-gray-800">
            About Us
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            Connecting Farmers with Tools
          </p>

          <p className="mt-5 text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Farm On Demand is a platform designed to make farm equipment easily
            accessible to farmers. Instead of buying expensive machinery, farmers
            can rent equipment when needed from trusted owners nearby.
          </p>

        </section>

        {/* MISSION + VISION */}
        <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-6">

          {/* MISSION */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Our Mission
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              To empower farmers by providing easy access to modern farming
              equipment at affordable prices, improving productivity and reducing
              costs.
            </p>
          </div>

          {/* VISION */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              Our Vision
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              To build a connected agricultural ecosystem where farmers,
              equipment owners, and administrators collaborate efficiently for
              better farming outcomes.
            </p>
          </div>

        </section>

        {/* WHY US */}
        <section className="bg-white pt-12 pb-12">
          <div className="max-w-6xl mx-auto px-6 text-center">

            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Why Choose Farm On Demand?
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              <div className="p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-base font-semibold text-green-600 mb-2">
                  Convenient Access
                </h3>
                <p className="text-gray-600 text-sm">
                  Easily rent equipment anytime, anywhere.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-base font-semibold text-green-600 mb-2">
                  Cost Effective
                </h3>
                <p className="text-gray-600 text-sm">
                  Save money by renting instead of purchasing machinery.
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-base font-semibold text-green-600 mb-2">
                  Reliable Network
                </h3>
                <p className="text-gray-600 text-sm">
                  Connect with verified equipment owners you can trust.
                </p>
              </div>

            </div>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}

export default About;
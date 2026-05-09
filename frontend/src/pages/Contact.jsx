import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen flex flex-col">

        {/* MAIN WRAPPER */}
        <div className="flex-1 flex items-start justify-center pt-10 px-6">

          <div className="w-full max-w-6xl">

            {/* HEADER */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                Contact Us
              </h1>
              <p className="mt-2 text-gray-600 text-sm">
                We’re here to help you with your farming needs
              </p>
            </div>

            {/* CONTENT */}
            <div className="grid md:grid-cols-2 gap-6 items-start">

              {/* LEFT SIDE */}
              <div className="space-y-3">

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-sm font-semibold text-green-600 mb-1">
                    Address
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Bhubaneswar, Odisha, India
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-sm font-semibold text-green-600 mb-1">
                    Phone
                  </h2>
                  <p className="text-gray-600 text-sm">
                    +91 96670 48935
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-sm font-semibold text-green-600 mb-1">
                    Email
                  </h2>
                  <p className="text-gray-600 text-sm">
                    support@farmondemand.com
                  </p>
                </div>

              </div>

              {/* RIGHT SIDE */}
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">

                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Send a Message
                </h2>

                <form className="space-y-3">

                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <textarea
                    rows="3"
                    placeholder="Your Message"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  ></textarea>

                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Send Message
                  </button>

                </form>

              </div>

            </div>

          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default Contact;
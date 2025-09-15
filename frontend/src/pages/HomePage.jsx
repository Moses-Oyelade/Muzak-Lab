import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col justify-center items-center px-6 py-6">
      {/* Header */}
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">Lab Sample Tracker</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Streamline your lab operations with real-time tracking of patients, samples, and test results. 
          Stay organized, reduce errors, and boost efficiency with our modern digital solution.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/result-tracker"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Get Result
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg shadow hover:bg-gray-200 transition"
          >
            View Dashboard
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        <div className="p-6 bg-white rounded-2xl shadow-md border text-center">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Patients</h3>
          <p className="text-gray-600">
            Manage patient records efficiently with quick access to their details and history.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md border text-center">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Samples</h3>
          <p className="text-gray-600">
            Track samples across collection, processing, and completion stages in real time.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-md border text-center">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">Results</h3>
          <p className="text-gray-600">
            Generate and monitor test results with advanced filtering and reporting tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

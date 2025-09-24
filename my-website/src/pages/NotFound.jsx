import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="mb-6 text-gray-600">Oops! Page not found.</p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

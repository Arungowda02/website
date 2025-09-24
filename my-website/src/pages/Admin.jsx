import React from "react";

export default function Admin() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-700">
        This page will show form submissions from Firestore for review/update.
      </p>
    </div>
  );
}

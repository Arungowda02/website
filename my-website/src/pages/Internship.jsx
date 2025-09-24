import React, { useState } from "react";
import internshipsData from "../data/internships.json";
import FormModal from "../components/FormModal";
import toast from "react-hot-toast";

export default function Internships() {
  const [showFullDesc, setShowFullDesc] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);

  // handle form submission -> send to WhatsApp
  const handleFormSubmit = (formData) => {
    if (!selectedInternship) return;

    const message =
      `👋 Hello, I would like to apply for the *${selectedInternship.title}* internship.\n\n` +
      `👤 Name: ${formData.name}\n` +
      `📧 Email: ${formData.email}\n` +
      `📱 Phone: ${formData.phone || "N/A"}\n` +
      `📝 Message: ${formData.message || "N/A"}`;

    const whatsappNumber = "919876543210"; // replace with your number
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    // open WhatsApp in new tab
    window.open(whatsappURL, "_blank");

    // success toast
    toast.success("Submitted successfully! ✅ Your details were sent via WhatsApp.");

    // close modal
    setModalOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6 space-y-12">
        {/* Page Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 relative group">
          <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Internship Opportunities
          </span>
          <span className="block w-20 h-1 bg-blue-500 mx-auto mt-2 transition-all group-hover:w-32"></span>
        </h1>

        {/* Internship List */}
        <div className="grid gap-8">
          {internshipsData.map((internship) => (
            <div
              key={internship.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              {/* Title */}
              <h2 className="text-xl md:text-2xl font-bold mb-3 hover:text-green-600 transition">
                {internship.title}
              </h2>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-3">
                <p>
                  <span className="font-semibold">Duration:</span>{" "}
                  {internship.duration}
                </p>
                <p>
                  <span className="font-semibold">Mode:</span> {internship.mode}
                </p>
                <p>
                  <span className="font-semibold">Fees:</span> {internship.fees}
                </p>
              </div>

              {/* Topics */}
              <div className="mb-3">
                <span className="font-semibold text-gray-800">
                  Topics Covered:
                </span>
                <ul className="list-disc list-inside text-gray-600 mt-1">
                  {internship.topics.map((topic, idx) => (
                    <li key={idx}>{topic}</li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <p className="text-gray-700">
                {showFullDesc[internship.id]
                  ? internship.description
                  : internship.description.slice(0, 120) + "..."}
              </p>
              <button
                onClick={() =>
                  setShowFullDesc((prev) => ({
                    ...prev,
                    [internship.id]: !prev[internship.id],
                  }))
                }
                className="mt-2 text-blue-600 hover:underline"
              >
                {showFullDesc[internship.id] ? "View Less" : "View More"}
              </button>

              {/* Apply Button */}
              <div className="mt-4">
                <button
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition"
                  onClick={() => {
                    setSelectedInternship(internship);
                    setModalOpen(true);
                  }}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form Modal */}
      {modalOpen && (
        <FormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleFormSubmit}
          internship={selectedInternship}
        />
      )}
    </div>
  );
}

import React, { useState } from "react";
import internshipsData from "../data/internships.json";
import FormModal from "../components/FormModal";
// import toast from "react-hot-toast";

export default function Internships() {
  const [showFullDesc, setShowFullDesc] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);

  // handle form submission -> send to WhatsApp
  // const handleFormSubmit = (formData) => {
  //   if (!selectedInternship) return;

  //   const message =
  //     `👋 Hello, I would like to apply for the *${selectedInternship.title}* internship.\n\n` +
  //     `👤 Name: ${formData.name}\n` +
  //     `📧 Email: ${formData.email}\n` +
  //     `📱 Phone: ${formData.phone || "N/A"}\n` +
  //     `📝 Message: ${formData.message || "N/A"}`;

  //   const whatsappNumber = "919876543210"; // replace with your number
  //   const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  //     message
  //   )}`;

  //   // open WhatsApp in new tab
  //   window.open(whatsappURL, "_blank");

  //   // success toast
  //   toast.success(
  //     "Submitted successfully! ✅ Your details were sent via WhatsApp."
  //   );

  //   // close modal
  //   setModalOpen(false);
  // };

  return (
    <div className="bg-gradient-to-b from-gray-500 via-white to-gray-500 min-h-screen py-12">
      <div className="container mx-auto px-6 space-y-12">
        {/* Page Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 relative group">
          <span className="text-white font-extrabold drop-shadow-md">
            Internship Opportunities
          </span>

          <span className="block w-20 h-1 bg-blue-500 mx-auto mt-2 transition-all group-hover:w-32"></span>
        </h1>

        {/* Internship List */}
        <div className="grid gap-10">
          {internshipsData.map((internship) => (
            <div
              key={internship.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition overflow-hidden"
            >
              {/* Title */}
              <h2 className="text-xl md:text-2xl font-bold mb-4 hover:text-green-600 transition">
                {internship.title}
              </h2>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                <div className="bg-gray-100 p-3 rounded-lg text-center shadow-sm">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Duration
                  </p>
                  <p className="text-sm md:text-base font-medium text-gray-800">
                    {internship.duration}
                  </p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg text-center shadow-sm">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Mode
                  </p>
                  <p className="text-sm md:text-base font-medium text-gray-800">
                    {internship.mode}
                  </p>
                </div>
                <div className="bg-gray-100 p-3 rounded-lg text-center shadow-sm">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Fees
                  </p>
                  <p className="text-sm md:text-base font-medium text-gray-800">
                    {internship.fees}
                  </p>
                </div>
              </div>

              {/* Topics */}
              <div className="mb-5 text-center">
                <span className="font-semibold text-gray-800 block mb-3">
                  Topics Covered:
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {internship.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs md:text-sm bg-green-100 text-green-700 rounded-full shadow-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description + View More */}
              <div>
                <p className="text-gray-700">
                  {showFullDesc[internship.id]
                    ? internship.description
                    : internship.description.slice(0, 120) + "..."}
                </p>
                {internship.description.length > 120 && (
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
                )}
              </div>

              {/* Apply Button */}
              <div className="mt-5">
                <button
                  className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition w-full sm:w-auto"
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
          defaultType="internship"
          defaultSelection={selectedInternship?.title || ""}
        />
      )}
    </div>
  );
}

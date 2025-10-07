/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function FormModal({ open, onClose, onSubmit, defaultType = "project", defaultSelection = "" }) {
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    type: defaultType,
    selection: defaultSelection,
    message: "",
  });

  // Reset defaults when modal opens
  useEffect(() => {
    if (open) {
      setFormValues({
        name: "",
        phone: "",
        type: defaultType,
        selection: defaultSelection,
        message: "",
      });
    }
  }, [open, defaultType, defaultSelection]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build WhatsApp message
    const message =
      `👋 Hello, I want to register for *${formValues.type.toUpperCase()}*.\n\n` +
      `👤 Name: ${formValues.name}\n` +
      `📱 WhatsApp: ${formValues.phone}\n` +
      `📌 Selection: ${formValues.selection || "N/A"}\n` +
      `📝 Message: ${formValues.message || "N/A"}`;

    const whatsappNumber = "919876543210"; // <-- Replace with your number
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

    toast.success("✅ Submitted successfully! Details sent via WhatsApp.");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative z-10 max-w-xl w-full bg-white rounded-lg p-6 shadow-xl"
      >
        <h4 className="text-xl font-semibold mb-3">
          Register for Project / Internship
        </h4>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Full name</label>
            <input
              name="name"
              value={formValues.name}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Your full name"
            />
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className="block text-sm font-medium">WhatsApp Number</label>
            <input
              name="phone"
              type="tel"
              value={formValues.phone}
              onChange={handleChange}
              required
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="e.g. 9876543210"
            />
          </div>

          {/* Registering For */}
          <div>
            <label className="block text-sm font-medium">
              I want to register for
            </label>
            <select
              name="type"
              value={formValues.type}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md px-3 py-2"
            >
              <option value="project">Project</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          {/* Selection */}
          <div>
            <label className="block text-sm font-medium">
              Selection (Project/Internship Name)
            </label>
            <input
              name="selection"
              value={formValues.selection}
              onChange={handleChange}
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Which project or internship"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              name="message"
              value={formValues.message}
              onChange={handleChange}
              rows="3"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Any notes or portfolio links..."
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

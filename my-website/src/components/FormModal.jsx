/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

export default function FormModal({ open, onClose, onSubmit }) {
  if (!open) return null; // Don't render when closed

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

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Full name</label>
            <input
              name="name"
              required
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              I want to register for
            </label>
            <select
              name="type"
              className="mt-1 w-full border rounded-md px-3 py-2"
              defaultValue="project"
            >
              <option value="project">Project</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Selection (optional)
            </label>
            <input
              name="selection"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Which project or internship (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              name="message"
              rows="3"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="Any notes or portfolio links..."
            />
          </div>

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
              className="px-4 py-2 rounded-md bg-blue-600 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

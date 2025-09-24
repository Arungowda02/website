import React from "react";

export default function ImageModal({
  project,
  index,
  onClose,
  onPrev,
  onNext,
}) {
  if (!project || index === null) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative max-w-4xl w-full p-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-red-500 text-2xl font-bold"
        >
          ✕
        </button>

        {/* Image */}
        <img
          src={project.images[index]}
          alt="Preview"
          className="w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
        />

        {/* Prev/Next Arrows */}
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl bg-black/50 hover:bg-black/70 rounded-full px-3 py-1"
        >
          ‹
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl bg-black/50 hover:bg-black/70 rounded-full px-3 py-1"
        >
          ›
        </button>
      </div>
    </div>
  );
}

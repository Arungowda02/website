/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import projectsData from "../data/projects.json";
import { motion } from "framer-motion";
import ImageModal from "../components/ImageModal";

export default function Projects() {
  const [showFullDesc, setShowFullDesc] = useState({});
  const [galleryProject, setGalleryProject] = useState(null);

  // Modal state
  const [modalProject, setModalProject] = useState(null);
  const [modalIndex, setModalIndex] = useState(null);

  const [offsets, setOffsets] = useState({});

  // Auto-slide effect
  useEffect(() => {
    const intervals = {};
    projectsData.forEach((project) => {
      intervals[project.id] = setInterval(() => {
        setOffsets((prev) => ({
          ...prev,
          [project.id]:
            ((prev[project.id] || 0) - 1) % (project.images.length * 200),
        }));
      }, 20);
    });
    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, []);

  // Open modal
  const openModal = (project, index) => {
    setModalProject(project);
    setModalIndex(index);
  };

  // Modal navigation
  const prevImage = () => {
    setModalIndex(
      (modalIndex - 1 + modalProject.images.length) % modalProject.images.length
    );
  };
  const nextImage = () => {
    setModalIndex((modalIndex + 1) % modalProject.images.length);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-6 space-y-12">
        {/* Page Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 relative group">
          <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Our Projects
          </span>
          <span className="block w-16 h-1 bg-green-500 mx-auto mt-2 transition-all group-hover:w-28"></span>
        </h1>

        {projectsData.map((project) => (
          <div
            key={project.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
          >
            {/* Left: Auto Sliding Carousel */}
            <div className="overflow-hidden relative h-56 sm:h-64 bg-gray-200 rounded-lg shadow">
              <motion.div
                className="flex gap-4"
                animate={{ x: offsets[project.id] || 0 }}
                transition={{ ease: "linear", duration: 0 }}
              >
                {[...project.images, ...project.images].map((img, idx) => (
                  <div
                    key={idx}
                    className="flex-shrink-0 cursor-pointer"
                    onClick={() =>
                      openModal(project, idx % project.images.length)
                    }
                  >
                    <img
                      src={img}
                      alt={project.title}
                      className="h-56 sm:h-64 w-48 sm:w-56 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Details */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-3 hover:text-orange-600 transition">
                {project.title}
              </h2>
              <p className="text-lg font-semibold text-green-600 mb-3">
                Price: {project.price}
              </p>
              <p className="text-gray-700">
                {showFullDesc[project.id]
                  ? project.description
                  : project.description.slice(0, 120) + "..."}
              </p>
              <button
                onClick={() =>
                  setShowFullDesc((prev) => ({
                    ...prev,
                    [project.id]: !prev[project.id],
                  }))
                }
                className="mt-3 text-blue-600"
              >
                {showFullDesc[project.id] ? "View Less" : "View More"}
              </button>

              {/* View All Images */}
              <div className="mt-4">
                <button
                  onClick={() => setGalleryProject(project)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition"
                >
                  View All Images
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Reusable Image Modal */}
        <ImageModal
          project={modalProject}
          index={modalIndex}
          onClose={() => {
            setModalProject(null);
            setModalIndex(null);
          }}
          onPrev={prevImage}
          onNext={nextImage}
        />

        {/* Gallery Modal */}
        {galleryProject && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setGalleryProject(null)}
                className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-xl"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4">
                {galleryProject.title} - Gallery
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {galleryProject.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${galleryProject.title}-${idx}`}
                    className="w-full h-40 object-cover rounded-lg shadow cursor-pointer hover:scale-105 transition"
                    onClick={() => openModal(galleryProject, idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

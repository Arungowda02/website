/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import projects from "../data/Projects.json";
import { motion } from "framer-motion";
import ImageModal from "../components/ImageModal";
import FormModal from "../components/FormModal";

export default function Projects() {
  const [hovered, setHovered] = useState(null);
  const [modalProject, setModalProject] = useState(null);
  const [modalIndex, setModalIndex] = useState(null);
  const [galleryProject, setGalleryProject] = useState(null);
  const [offsets, setOffsets] = useState({});
  const [showFullDesc, setShowFullDesc] = useState({});
  const [formOpen, setFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const marqueeRefs = useRef({});

  // Auto-slide marquee
  useEffect(() => {
    const intervals = {};
    projects.forEach((project) => {
      intervals[project.id] = setInterval(() => {
        if (!marqueeRefs.current[project.id]?.hovered) {
          setOffsets((prev) => ({
            ...prev,
            [project.id]:
              ((prev[project.id] || 0) - 1) % (project.images.length * 200),
          }));
        }
      }, 20);
    });
    return () => Object.values(intervals).forEach(clearInterval);
  }, []);

  const openModal = (project, index) => {
    setModalProject(project);
    setModalIndex(index);
    setGalleryProject(null); // close gallery if open
  };

  const prevImage = () => {
    if (!modalProject) return;
    setModalIndex(
      (modalIndex - 1 + modalProject.images.length) % modalProject.images.length
    );
  };

  const nextImage = () => {
    if (!modalProject) return;
    setModalIndex((modalIndex + 1) % modalProject.images.length);
  };

  const openForm = (project) => {
    setSelectedProject(project);
    setFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-500 via-white to-gray-500 py-12">
      <div className="container mx-auto px-4 space-y-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 relative group">
          <span className="text-white font-extrabold drop-shadow-md">
  Our Projects
</span>

          <span className="block w-16 h-1 bg-green-500 mx-auto mt-2 transition-all group-hover:w-28"></span>
        </h1>

        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition overflow-hidden"
          >
            {/* Project title and price */}
            <div className="mb-4">
              <h2 className="text-xl md:text-2xl font-bold mb-1 hover:text-green-600 transition">
                {project.title}
              </h2>
              <p className="text-green-600 font-semibold mb-2">
                Price: {project.price}
              </p>
            </div>

            {/* Marquee container */}
            <div
              className="overflow-hidden relative rounded-lg"
              onMouseEnter={() => {
                marqueeRefs.current[project.id] = { hovered: true };
              }}
              onMouseLeave={() => {
                marqueeRefs.current[project.id] = { hovered: false };
              }}
            >
              <div
                className="flex gap-4"
                style={{
                  transform: `translateX(${offsets[project.id] || 0}px)`,
                  transition: "transform linear 0s",
                }}
              >
                {[...project.images, ...project.images].map((img, idx) => (
                  <motion.div
                    key={idx}
                    className={`flex-shrink-0 cursor-pointer rounded-lg shadow-md relative ${
                      hovered === idx ? "z-20" : "z-10"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    onHoverStart={() => setHovered(idx)}
                    onHoverEnd={() => setHovered(null)}
                    onClick={() =>
                      openModal(project, idx % project.images.length)
                    }
                  >
                    <img
                      src={img}
                      alt={project.title}
                      className="h-44 sm:h-52 md:h-56 w-48 sm:w-56 object-cover rounded-lg pointer-events-none"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Description + toggle */}
            <div className="mt-4">
              <p className="text-gray-700">
                {showFullDesc[project.id]
                  ? project.description
                  : project.description.slice(0, 120) + "..."}
              </p>
              {project.description.length > 120 && (
                <button
                  onClick={() =>
                    setShowFullDesc((prev) => ({
                      ...prev,
                      [project.id]: !prev[project.id],
                    }))
                  }
                  className="mt-2 text-blue-600 hover:underline"
                >
                  {showFullDesc[project.id] ? "View Less" : "View More"}
                </button>
              )}
            </div>

            {/* Buy this Project Button */}
            <div className="mt-4">
              <button
                onClick={() => openForm(project)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition"
              >
                Buy this Project
              </button>
            </div>
          </div>
        ))}

        {/* Big Image Modal */}
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

        {/* Form Modal */}
        {formOpen && selectedProject && (
          <FormModal
            open={formOpen}
            onClose={() => setFormOpen(false)}
            defaultType="project"
            defaultSelection={selectedProject.title}
          />
        )}
      </div>
    </div>
  );
}

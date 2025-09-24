/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import projects from "../../data/Projects.json"; // make sure path is correct

export default function ProjectsSection() {
  const navigate = useNavigate();

  const goToProjects = (id) => {
    navigate("/projects", { state: { projectId: id } });
  };

  return (
    <section>
      <h2
        className="text-2xl md:text-3xl font-semibold mb-4 
        transition duration-300 hover:text-green-600 hover:scale-105 inline-block"
      >
        Our Projects
      </h2>

      {/* marquee container */}
      <div className="overflow-hidden relative">
        <div className="flex items-center gap-6 animate-marquee">
          {[...projects, ...projects].map((p, idx) => (
            <motion.div
              key={`${p.id}-${idx}`}
              className="flex-shrink-0 cursor-pointer text-center"
              onClick={() => goToProjects(p.id)}
            >
              {/* Image wrapper - only this zooms */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-lg shadow-md inline-block"
              >
                <img
                  src={p.images[0]} // from JSON images array
                  alt={p.title}
                  className="h-36 sm:h-44 md:h-56 w-auto object-cover"
                />
              </motion.div>

              {/* Title stays clear and visible */}
              <p className="mt-2 text-sm text-gray-700 text-center font-medium whitespace-normal">
                {p.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

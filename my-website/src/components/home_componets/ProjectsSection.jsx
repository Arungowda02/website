/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import projects from "../../data/Projects.json";

export default function ProjectsSection() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const idleTimeoutRef = useRef(null);

  // Auto-scroll function
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = 1; // pixels per frame
    let requestId;

    const scrollStep = () => {
      if (!isPaused) {
        container.scrollLeft += scrollAmount;
        // Infinite loop: reset scroll when reaching half of scrollWidth
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      requestId = requestAnimationFrame(scrollStep);
    };

    requestId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(requestId);
  }, [isPaused]);

  // Pause auto-scroll on hover or touch
  const handlePause = () => {
    setIsPaused(true);
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    idleTimeoutRef.current = setTimeout(() => {
      setIsPaused(false); // Resume after 3 seconds of no interaction
    }, 3000);
  };

  const goToProjects = (id) => {
    navigate("/projects", { state: { projectId: id } });
  };

  // Arrow click handlers
  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 via-white to-gray-50 py-10 rounded-lg relative">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 
        transition duration-300 hover:text-green-600 hover:scale-105 inline-block">
        Our Projects
      </h2>

      {/* Arrows */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/100 rounded-full p-2 shadow-md z-20"
      >
        &#10094;
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/100 rounded-full p-2 shadow-md z-20"
      >
        &#10095;
      </button>

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-6 overflow-x-auto px-4 scrollbar-hide"
        onMouseEnter={handlePause}
        onMouseLeave={handlePause}
        onTouchStart={handlePause}
        onTouchEnd={handlePause}
      >
        {[...projects, ...projects].map((p, idx) => (
          <motion.div
            key={`${p.id}-${idx}`}
            className="flex-shrink-0 cursor-pointer text-center"
            onClick={() => goToProjects(p.id)}
          >
            {/* Image wrapper */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-lg shadow-md inline-block w-48 sm:w-56 md:w-64 h-40 sm:h-48 md:h-56"
            >
              <img
                src={p.images[0]}
                alt={p.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Title */}
            <p className="mt-2 text-sm md:text-base text-gray-700 font-medium">
              {p.title}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

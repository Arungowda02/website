/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import internships from "../../data/internships.json"; // path to your JSON file

export default function InternshipSection() {
  const navigate = useNavigate();

  const goToInternship = (id) => {
    navigate("/internship", { state: { internshipId: id } });
  };

  return (
    <section>
      <h2
        className="text-2xl md:text-3xl font-semibold mb-4 
        transition duration-300 hover:text-green-600 hover:scale-105 inline-block"
      >
        Internships For You
      </h2>

      {/* marquee container */}
      <div className="overflow-hidden relative">
        <div className="flex items-center gap-6 animate-marquee-reverse">
          {[...internships, ...internships].map((it, idx) => (
            <motion.div
              key={`${it.id}-${idx}`}
              className="flex-shrink-0 cursor-pointer text-center"
              onClick={() => goToInternship(it.id)}
            >
              {/* Image wrapper - only this zooms */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-lg shadow-md inline-block"
              >
                <img
                  src={it.image}
                  alt={it.title}
                  className="h-36 sm:h-44 md:h-56 w-auto object-cover"
                />
              </motion.div>

              {/* Title - not affected by zoom */}
              <p className="mt-2 text-sm text-gray-700 font-medium whitespace-normal">
                {it.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

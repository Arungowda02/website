/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import "../styles/Home.css";
import FormModal from "../components/FormModal";
import ProjectsSection from "../components/home_componets/ProjectsSection";
import InternshipSection from "../components/home_componets/InternshipSection";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  // Handle local submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      email: form.email.value,
      type: form.type.value,
      selection: form.selection.value,
      message: form.message.value,
      submittedAt: new Date().toISOString(),
    };

    console.log("Register submitted:", data);

    setModalOpen(false);
    toast.success("✅ Submitted successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* HERO */}
      <header
        className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] flex items-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?cs=srgb&dl=pexels-pixabay-163100.jpg&fm=jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            Welcome — glad you visited our website!
          </h1>
          <p className="mt-4 text-white/90 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Explore our projects and internships. Click any item to see more
            details or register to get started.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-5 py-3 rounded-lg hover:bg-white/10 transition"
            >
              View Projects
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main
        className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-20 bg-gradient-to-b from-gray-500 via-white to-gray-500
"
      >
        {/* Projects Section with fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <ProjectsSection />
        </motion.div>

        {/* Internships Section with fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <InternshipSection />
        </motion.div>

        {/* Commitment + CTA with fade-in */}
        <motion.section
          className="text-center py-10 bg-gradient-to-r from-green-50 to-green-100 rounded-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-xl md:text-2xl font-medium">
            Your commitment is our commitment.
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-600">
            We review every application and provide feedback as soon as
            possible.
            <br />
            <span className="font-semibold text-red-600">
              50% of the fees are required in advance once you confirm the
              project.
            </span>
          </p>

          <div className="mt-8 flex flex-col items-center">
            <p className="text-xs md:text-sm text-gray-500 mb-2 text-center">
              For faster response, contact us on WhatsApp
            </p>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white 
               px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-sm rounded-lg shadow-md 
               transition animate-zoom-pulse w-full max-w-xs box-border"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4 sm:w-5 sm:h-5"
              >
                <path d="M12 2a10 10 0 0 0-8.94 14.58l-1.06 3.88 3.99-1.05A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.09-1.11l-.29-.18-2.36.62.63-2.31-.19-.3A8 8 0 1 1 12 20zm4.41-5.59c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12s-.62.78-.76.94-.28.18-.52.06a6.6 6.6 0 0 1-1.94-1.2 7.23 7.23 0 0 1-1.33-1.64c-.14-.24 0-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.42.06-.64.3s-.84.82-.84 2c0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.26 1.04.42 1.4.54.58.18 1.1.16 1.52.1.46-.06 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
              </svg>
              Say Hi on WhatsApp
            </a>
          </div>
        </motion.section>
      </main>

      {/* Form Modal */}
      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleRegisterSubmit}
      />
    </div>
  );
}

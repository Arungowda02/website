/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Home.css";
import FormModal from "../components/FormModal";
import ProjectsSection from "../components/home_componets/ProjectsSection";
import InternshipSection from "../components/home_componets/InternshipSection";



export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  // Handle local submit (replace with Firestore addDoc logic when ready)
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

    // TODO: Replace the console.log with Firestore (addDoc) call:
    // import { addDoc, collection } from "firebase/firestore";
    // await addDoc(collection(db, "applications"), data);

    console.log("Register submitted:", data);
    setModalOpen(false);
    alert("Thanks! Your submission was received (frontend-only demo).");
  };

  // Utility: navigate to projects page and pass project id in state
  const goToProjects = (projectId) => {
    navigate("/projects", { state: { projectId } });
  };

  return (
    <div className="min-h-screen flex flex-col">
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
        <div className="container mx-auto relative z-10 px-6 py-20 text-center">
          <h1 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            Welcome — glad you visited our website!
          </h1>
          <p className="mt-4 text-white/90 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
            Explore our projects and internships. Click any item to see more
            details or register to get started.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
            >
              Register Here
            </button>

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
      <main className="flex-1 container mx-auto px-6 py-7 space-y-16 bg-gray-150">
        {/* Projects Section */}
       <ProjectsSection/>

        {/* Internships Section */}
        <InternshipSection/>

        {/* Commitment + CTA */}
        <section className="text-center py-10 bg-gradient-to-r from-white/50 to-white/20 rounded-lg">
          <h3 className="text-xl md:text-2xl font-medium">
            Your commitment is our commitment.
          </h3>
          <p className="mt-3 text-sm md:text-base text-gray-600">
            We review every application and get back with feedback as soon as
            possible.
          </p>

          {/* Buttons Container */}
          <div className="mt-8 flex flex-col items-center gap-6">
            {/* WhatsApp Section with Label */}
            <div className="flex flex-col items-center">
              <p className="text-xs md:text-sm text-gray-500 mb-2">
                For faster response, contact us on WhatsApp
              </p>
              <a
                href="https://wa.me/919876543210" // replace with your WhatsApp number
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition animate-pulse-glow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M12 2a10 10 0 0 0-8.94 14.58l-1.06 3.88 3.99-1.05A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.09-1.11l-.29-.18-2.36.62.63-2.31-.19-.3A8 8 0 1 1 12 20zm4.41-5.59c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12s-.62.78-.76.94-.28.18-.52.06a6.6 6.6 0 0 1-1.94-1.2 7.23 7.23 0 0 1-1.33-1.64c-.14-.24 0-.37.1-.49.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.42.06-.64.3s-.84.82-.84 2c0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.26 1.04.42 1.4.54.58.18 1.1.16 1.52.1.46-.06 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
                </svg>
                Say Hi on WhatsApp
              </a>
            </div>

            {/* OR Separator */}
            <div className="flex items-center w-full max-w-xs">
              <hr className="flex-grow border-gray-300" />
              <span className="px-3 text-gray-500 text-sm">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Register Button */}
            <button
              onClick={() => setModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition w-full max-w-xs"
            >
              Register Here
            </button>
          </div>
        </section>
      </main>

      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleRegisterSubmit}
      />
    </div>
  );
}

import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black border-t mt-12 text-gray-100">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Left - Brand / Copyright */}
        <div>
          <h3 className="text-lg font-semibold mb-3">MyWebsite</h3>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} MyWebsite. All rights reserved.
          </p>
        </div>

        {/* Middle - Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <div className="flex flex-col gap-2">
            <Link to="/" className="hover:text-blue-400 transition">
              Home
            </Link>
            <Link to="/projects" className="hover:text-blue-400 transition">
              Projects
            </Link>
            <Link to="/internship" className="hover:text-blue-400 transition">
              Internships
            </Link>
            <Link to="/admin" className="hover:text-blue-400 transition">
              Admin
            </Link>
          </div>
        </div>

        {/* Right - Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              📧{" "}
              <a
                href="mailto:info@mywebsite.com"
                className="hover:text-blue-400 transition"
              >
                info@mywebsite.com
              </a>
            </li>
            <li>
              📞{" "}
              <a
                href="tel:+919876543210"
                className="hover:text-blue-400 transition"
              >
                +91 98765 43210
              </a>
            </li>
            <li>📍 123 Main Street, Bengaluru, India</li>
          </ul>
        </div>
      </div>

      {/* Social Media Row */}
      <div className="border-t border-gray-700 mt-6 pt-6">
        <div className="flex justify-center gap-6 text-2xl">
          <a
            href="https://www.linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 hover:scale-110 transition-transform"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 hover:scale-110 transition-transform"
          >
            <FaGithub />
          </a>
          <a
            href="https://twitter.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 hover:scale-110 transition-transform"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 hover:scale-110 transition-transform"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
}

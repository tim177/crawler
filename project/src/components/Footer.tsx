import { motion } from "framer-motion";
import { Brain, Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const footerSections = [
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
        { label: "Blog", href: "/pages/blog" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "AI Consulting", href: "/solutions#consulting" },
        { label: "Machine Learning", href: "/solutions#ml" },
        { label: "Data Analytics", href: "/solutions#analytics" },
        { label: "Custom AI", href: "/solutions#custom" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Case Studies", href: "#" },
        { label: "Support", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                AI Hub
              </span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Empowering the future with artificial intelligence solutions.
            </p>
            <div className="mt-6 flex space-x-4">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                >
                  <Icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} AI Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

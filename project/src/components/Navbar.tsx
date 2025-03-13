import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/solutions", label: "Solutions" },
  { path: "/features", label: "Features" },
  { path: "/about", label: "About" },
  { path: "/pricing", label: "Pricing" },
  { path: "/careers", label: "Careers" },
  { path: "/contact", label: "Contact" },
  { path: "/logIn", label: "logIn" },
  { path: "/SignUp", label: "SignUp" },
  { path: "/LogOut", label: "LogOut" },
];

export function Navbar() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </motion.div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              AI Hub
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label }) => (
              <Link key={path} to={path} className="relative">
                <span className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  {label}
                </span>
                {location.pathname === path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </motion.nav>
  );
}

import { motion } from "framer-motion";
import { Brain, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { AnimatedBackground } from "../ui/AnimatedBackground";
import { AlertMessage } from "../Alert";
import ToggleSections from "../ToggleSections";
import ChatBotDetail from "../ChatBotDetail/ChatBotDetail";
import { ChatBotList } from "../ChatBotDetail/ChatBotSection";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <Container className="pt-20 pb-16">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-block"
          >
            <Brain className="h-24 w-24 mx-auto text-purple-600 dark:text-purple-400" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
          >
            Next Generation
            <span className="text-purple-600 dark:text-purple-400">
              {" "}
              AI Solutions
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300"
          >
            Empower your business with cutting-edge artificial intelligence
            technology. Transform the way you work with our innovative
            solutions.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex justify-center space-x-4"
          >
            <Link
              to="/solutions"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              Explore Solutions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
          <div className="w-2/4 m-auto mt-16 flex justify-center align-center">
            <AlertMessage />
          </div>
        </div>
        <div className="w-full m-auto mt-16 ">
          <ToggleSections />
        </div>
        {/* <div className="w-full m-auto mt-16 ">
          <ChatBotDetail />
        </div>
        <div className="w-full m-auto mt-16 bg-amber-300 ">
          <ChatComponent />
        </div>
        <div className="w-full m-auto mt-16 ">
          <ChatBotDetail />
        </div> */}
        <div className="w-full m-auto mt-16 ">
          <ChatBotList />
          <ChatBotDetail />
        </div>
      </Container>
      <AnimatedBackground />
    </div>
  );
}

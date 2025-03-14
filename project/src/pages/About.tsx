import { motion } from 'framer-motion';
import { Users, Award, Globe } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { TeamMember } from '../components/about/TeamMember';
import { Stats } from '../components/about/Stats';
import { Values } from '../components/about/Values';

export function About() {
  return (
    <PageTransition>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Pioneering the future of AI technology
          </motion.p>
        </section>

        <Values />
        <Stats />
        <TeamMember />
      </main>
    </PageTransition>
  );
}
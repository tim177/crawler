import { motion } from 'framer-motion';

export function Culture() {
  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Culture
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We're building a culture of innovation, collaboration, and continuous learning.
            Our team is passionate about pushing the boundaries of AI technology while
            maintaining a supportive and inclusive environment.
          </p>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300">
            <li>✓ Innovation-driven environment</li>
            <li>✓ Collaborative team spirit</li>
            <li>✓ Continuous learning and growth</li>
            <li>✓ Work-life balance</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
            alt="Team collaboration"
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}
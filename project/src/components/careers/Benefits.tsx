import { motion } from 'framer-motion';
import { Heart, Globe, Book, Coffee } from 'lucide-react';
import { Card } from '../Card';

const benefits = [
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Comprehensive health insurance and wellness programs',
  },
  {
    icon: Globe,
    title: 'Remote Work',
    description: 'Work from anywhere in the world',
  },
  {
    icon: Book,
    title: 'Learning Budget',
    description: 'Annual budget for courses and conferences',
  },
  {
    icon: Coffee,
    title: 'Work-Life Balance',
    description: 'Flexible hours and unlimited PTO',
  },
];

export function Benefits() {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Benefits & Perks
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full p-6">
                <Icon className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
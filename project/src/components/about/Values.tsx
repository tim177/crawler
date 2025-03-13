import { motion } from 'framer-motion';
import { Users, Award, Globe } from 'lucide-react';
import { Card } from '../Card';

const values = [
  {
    icon: Users,
    title: 'Customer First',
    description: 'We put our customers at the heart of everything we do',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in every aspect of our work',
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description: 'Making a positive impact on a global scale',
  },
];

export function Values() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {values.map((value, index) => {
        const Icon = value.icon;
        return (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="text-center p-6">
              <Icon className="h-12 w-12 mx-auto text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
            </Card>
          </motion.div>
        );
      })}
    </section>
  );
}
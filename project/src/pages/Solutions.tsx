import { motion } from 'framer-motion';
import { Brain, Database, LineChart, Cpu } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Card } from '../components/Card';
import { cn } from '../lib/utils';

const solutions = [
  {
    title: 'AI Consulting',
    description: 'Expert guidance on implementing AI solutions in your business',
    icon: Brain,
    color: 'text-blue-500',
  },
  {
    title: 'Machine Learning',
    description: 'Custom ML models trained on your specific business needs',
    icon: Cpu,
    color: 'text-purple-500',
  },
  {
    title: 'Data Analytics',
    description: 'Transform raw data into actionable business insights',
    icon: LineChart,
    color: 'text-green-500',
  },
  {
    title: 'Big Data Solutions',
    description: 'Handle and analyze large-scale data efficiently',
    icon: Database,
    color: 'text-orange-500',
  },
];

export function Solutions() {
  return (
    <PageTransition>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            AI Solutions for Every Business
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Transform your business with our cutting-edge AI solutions
          </motion.p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="flex items-start space-x-4">
                    <div className={cn("p-3 rounded-lg", solution.color)}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {solution.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {solution.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </section>
      </main>
    </PageTransition>
  );
}

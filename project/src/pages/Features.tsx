import { motion } from 'framer-motion';
import { Zap, Shield, Clock, Cpu } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { Card } from '../components/Card';
import { cn } from '../lib/utils';

const features = [
  {
    title: 'Lightning Fast',
    description: 'Our AI processes data at unprecedented speeds',
    icon: Zap,
    color: 'text-yellow-500',
  },
  {
    title: 'Secure by Design',
    description: 'Enterprise-grade security for your data',
    icon: Shield,
    color: 'text-green-500',
  },
  {
    title: 'Real-time Processing',
    description: 'Get insights as they happen',
    icon: Clock,
    color: 'text-blue-500',
  },
  {
    title: 'Advanced AI Models',
    description: 'State-of-the-art machine learning algorithms',
    icon: Cpu,
    color: 'text-purple-500',
  },
];

export function Features() {
  return (
    <PageTransition>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Powerful Features
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Experience the next generation of AI technology
          </motion.p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="flex items-start space-x-4">
                    <div className={cn("p-3 rounded-lg", feature.color)}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </section>

        <section className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-purple-600 dark:bg-purple-500 rounded-lg p-8 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg mb-6">Join thousands of businesses already using our AI solutions</p>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              Start Free Trial
            </button>
          </motion.div>
        </section>
      </main>
    </PageTransition>
  );
}
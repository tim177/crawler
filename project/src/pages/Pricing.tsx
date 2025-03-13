import { motion } from 'framer-motion';
// import { Check } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { PricingCard } from '../components/pricing/PricingCard';
import { FAQ } from '../components/pricing/FAQ';

const plans = [
  {
    name: 'Starter',
    price: 49,
    features: [
      'Basic AI model access',
      '5,000 API calls/month',
      'Email support',
      'Basic analytics',
    ],
  },
  {
    name: 'Professional',
    price: 99,
    popular: true,
    features: [
      'Advanced AI models',
      '50,000 API calls/month',
      'Priority support',
      'Advanced analytics',
      'Custom model training',
    ],
  },
  {
    name: 'Enterprise',
    price: 299,
    features: [
      'All AI models',
      'Unlimited API calls',
      '24/7 dedicated support',
      'Full analytics suite',
      'Custom model training',
      'On-premise deployment',
    ],
  },
];

export function Pricing() {
  return (
    <PageTransition>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Choose the plan that's right for you
          </motion.p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </section>

        <FAQ />
      </main>
    </PageTransition>
  );
}
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Card } from '../Card';
import { Button } from '../Button';
import { cn } from '../../lib/utils';

interface PricingCardProps {
  plan: {
    name: string;
    price: number;
    features: string[];
    popular?: boolean;
  };
  index: number;
}

export function PricingCard({ plan, index }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        className={cn(
          'relative p-6',
          plan.popular && 'border-2 border-purple-500 dark:border-purple-400'
        )}
      >
        {plan.popular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm">
            Most Popular
          </div>
        )}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {plan.name}
          </h3>
          <div className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ${plan.price}
            <span className="text-lg font-normal text-gray-600 dark:text-gray-400">
              /month
            </span>
          </div>
          <Button
            variant={plan.popular ? 'primary' : 'outline'}
            className="w-full"
          >
            Get Started
          </Button>
        </div>
        <ul className="space-y-4">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center text-gray-600 dark:text-gray-300">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
}
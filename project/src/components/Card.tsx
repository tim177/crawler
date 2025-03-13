import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6',
        'border border-gray-200 dark:border-gray-700',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
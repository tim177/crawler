import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Card } from '../Card';

const jobs = [
  {
    title: 'Senior AI Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'Machine Learning Researcher',
    department: 'Research',
    location: 'New York',
    type: 'Full-time',
  },
  {
    title: 'Product Manager',
    department: 'Product',
    location: 'San Francisco',
    type: 'Full-time',
  },
  {
    title: 'Data Scientist',
    department: 'Data',
    location: 'Remote',
    type: 'Full-time',
  },
];

export function JobList() {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Open Positions
      </h2>
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <motion.div
            key={job.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:border-purple-500 dark:hover:border-purple-400 transition-colors">
              <div className="flex items-center justify-between p-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {job.title}
                  </h3>
                  <div className="flex space-x-4 text-gray-600 dark:text-gray-300">
                    <span>{job.department}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <ArrowRight className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
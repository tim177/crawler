import { motion } from "framer-motion";

const stats = [
  { label: "Customers", value: "1000+" },
  { label: "Countries", value: "50+" },
  { label: "Team Members", value: "100+" },
  { label: "Projects Completed", value: "500+" },
];

export function Stats() {
  return (
    <section className="py-12 bg-purple-600 dark:bg-purple-500 rounded-lg mb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className="text-3xl font-bold text-white mb-2">
              {stat.value}
            </div>
            <div className="text-purple-100">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    content: "123 AI Street, Tech Valley, CA 94043",
  },
  {
    icon: Phone,
    title: "Call Us",
    content: "+1 (555) 123-4567",
  },
  {
    icon: Mail,
    title: "Email Us",
    content: "contact@aihub.com",
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Mon-Fri: 9AM - 6PM EST",
  },
];

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      {contactInfo.map((info, index) => {
        const Icon = info.icon;
        return (
          <motion.div
            key={info.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-4"
          >
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
              <Icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {info.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{info.content}</p>
            </div>
          </motion.div>
        );
      })}

      <div className="mt-8">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.6282365564086!2d-122.08374688469227!3d37.42199997982362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4v1629910817570!5m2!1sen!2sus"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: "0.5rem" }}
          allowFullScreen
          loading="lazy"
          className="mt-8"
        ></iframe>
      </div>
    </motion.div>
  );
}

export default ContactInfo;

import { motion } from "framer-motion";

export const SectionHeading = ({ title, description }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center">
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-accent mb-2 md:mb-5 xl:mb-6">{title}</h2>
            <p className="text-gray-400 text-sm md:text-base xl:text-lg">{description}</p>
        </motion.div>
    );
};
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";
import CampCard from "../../components/CampCard/CampCard";
import { Link } from "react-router-dom";

const PopularCamps = () => {
    const [popularCamps, setPopularCamps] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchPopularCamps = async () => {
            try {
                const response = await axiosPublic.get("/popular-camps");
                setPopularCamps(response.data);
            } catch (error) {
                console.error("Error fetching popular camps:", error);
            }
        };
        fetchPopularCamps();
    }, [axiosPublic]);

    return (
        <motion.div
            className="w-[90%] mx-auto py-8 sm:py-12 md:py-14 xl:py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <SectionHeading
                title="Popular Camps"
                description="Explore our most popular camps that have transformed thousands of lives."
            />

            {popularCamps.length > 0 ? (
                <div
                    className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 my-8 sm:my-10 md:my-14 xl:my-16"
                >
                    {popularCamps.map((camp) => (
                        <div
                            key={camp._id}
                        >
                            <CampCard camp={camp} />
                        </div>
                    ))}
                </div>
            ) : (
                <motion.div
                    className="text-center text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <p>No popular camps available at the moment.</p>
                </motion.div>
            )}
            <div className="flex justify-center">
                <Link to={`/available-camps`}>
                    <motion.button
                        className="btn btn-ghost border-accent text-accent hover:bg-accent hover:text-white px-6 py-3 text-lg font-semibold"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        See All Camps
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    );
};

export default PopularCamps;
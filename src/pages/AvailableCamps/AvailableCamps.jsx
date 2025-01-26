import { motion } from "framer-motion";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import CampCard from "../../components/CampCard/CampCard";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const AvailableCamps = () => {
    const axiosPublic = useAxiosPublic();

    const { data: camps = {}, isLoading } = useQuery({
        queryKey: ["camps"],
        queryFn: async () => {
            const res = await axiosPublic.get("/camps");
            return res.data;
        },
    });

    if (isLoading) {
        return <LoadingPage></LoadingPage>;
    }

    return (
        <motion.div
            className="min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Header Section */}
            <div className="bg-accent relative">
                <div className="w-[90%] mx-auto pt-36 pb-24 text-center lg:text-left text-white">
                    <motion.p
                        className="text-lg mb-2"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        Home / Available Camps
                    </motion.p>
                    <motion.h2
                        className="text-4xl font-bold"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Available Camps
                    </motion.h2>
                </div>
                <div className="h-full absolute top-0 right-0">
                    <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="h-full" src="https://i.ibb.co.com/JFhHWG8/image.png" />
                </div>
            </div>

            {/* Camps Section */}
            <div className="w-[90%] mx-auto py-10 sm:py-14 md:py-16 xl:py-20">
                {camps.length > 0 ? (
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8"
                    >
                        {camps.map((camp) => (
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
                        <p>No camps available at the moment.</p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default AvailableCamps;

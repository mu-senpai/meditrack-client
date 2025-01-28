import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaMoneyCheckAlt, FaCommentAlt, FaTrash } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

const RegisteredCamps = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    // const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(0);

    const { data: registeredCamps = [], isLoading, refetch } = useQuery({
        queryKey: ["registeredCamps"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/registered-camps/${user.email}`);
            return res.data;
        },
    });

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won’t be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/delete-registered-camp/${id}`);
                    refetch();
                    Swal.fire({
                        icon: "success",
                        title: "Camp deleted successfully!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Failed to delete camp",
                        text: error.message,
                    });
                }
            }
        });
    };

    const handleFeedback = async (campId, campName) => {
        const { value: feedback } = await Swal.fire({
            title: "Submit your feedback",
            html: `
                    <div class="mb-4 text-center">
                        <span class="text-lg font-semibold">Your Rating:</span>
                        <div id="star-rating" class="flex justify-center mt-2 gap-2">
                            ${[1, 2, 3, 4, 5]
                    .map(
                        (star) =>
                            `<span class="star cursor-pointer text-4xl text-gray-300" data-value="${star}">★</span>`
                    )
                    .join("")}
                        </div>
                    </div>
                `,
            input: "textarea",
            inputPlaceholder: "Write your feedback here...",
            inputClass: "w-full p-2 border rounded-lg",
            showCancelButton: true,
            confirmButtonText: "Submit",
            customClass: {
                popup: "rounded-lg shadow-lg p-6",
                confirmButton: "bg-accent text-white px-4 py-2 rounded-lg",
                cancelButton: "bg-gray-200 text-gray-700 px-4 py-2 rounded-lg",
            },
            didOpen: () => {
                const stars = document.querySelectorAll(".star");
                stars.forEach((star) => {
                    star.addEventListener("click", () => {
                        const value = parseInt(star.getAttribute("data-value"), 10);
                        setRating(value);
                        stars.forEach((s) => s.classList.replace("text-yellow-400", "text-gray-300")); 
                        for (let i = 0; i < value; i++) {
                            stars[i].classList.replace("text-gray-300", "text-yellow-400");
                        }
                    });
                });
            },
        });


        if (feedback && rating) {

            const feedbackInfo = {
                name: user.displayName,
                photo: user.photoURL,
                email: user.email,
                feedback,
                rating,
                campName
            }

            try {
                axiosSecure.post(`/feedback`, feedbackInfo)
                .then(() => {
                    axiosSecure.patch(`/update-feedback/${campId}`, { feedback: true })
                    .then(() => {
                        refetch();
                        Swal.fire({
                            icon: "success",
                            title: "Feedback submitted successfully!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                })
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Failed to submit feedback!",
                    text: error.message,
                });
            }
        }
    };

    if (isLoading) {
        return (
            <div className="w-full h-[40rem] flex items-center justify-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="w-[90%] mx-auto py-8 sm:py-12 md:py-14 xl:py-16">
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl sm:text-3xl xl:text-4xl text-accent font-bold text-center mb-6 sm:mb-8 lg:mb-10 xl:mb-12">
                Registered Camps
            </motion.h2>
            <div className="overflow-x-auto">
                <table className="table border border-base-300">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className="min-w-[250px]">Camp Name</th>
                            <th className="min-w-[200px]">Date & Time</th>
                            <th className="min-w-[400px]">Location</th>
                            <th className="min-w-[100px]">Status</th>
                            <th className="min-w-[100px]">Payment</th>
                            <th className="min-w-[230px]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registeredCamps.map((camp, index) => (
                            <motion.tr
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                key={camp._id}>
                                <td>{index + 1}</td>
                                <td>{camp.campName}</td>
                                <td>{new Date(camp.registrationTime).toLocaleString()}</td>
                                <td>{camp.location}</td>
                                <td>{camp.status}</td>
                                <td>{camp.paymentStatus}</td>
                                <td className="flex gap-2">
                                    {camp.paymentStatus === "Unpaid" && (
                                        <Link
                                            to={`/dashboard/payment`}
                                            state={{
                                                campName: camp.campName,
                                                campFees: camp.campFees,
                                                campLocation: camp.location,
                                                campId: camp._id
                                            }}
                                        >
                                            <button className="btn btn-sm btn-accent text-white">
                                                <FaMoneyCheckAlt /> Pay
                                            </button>
                                        </Link>
                                    )}
                                    {camp.paymentStatus === "Unpaid" && (
                                        <button
                                            className="btn btn-sm btn-error text-white"
                                            onClick={() => handleDelete(camp._id)}
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    )}
                                    {camp.paymentStatus === "Paid" && (
                                        <button
                                            className="btn btn-sm btn-primary text-white"
                                            onClick={() => handleFeedback(camp._id, camp.campName)}
                                            disabled={camp.status !== "Approved" || camp.feedback}
                                        >
                                            <FaCommentAlt /> {camp.feedback ? "Feedback Given" : "Feedback"}
                                        </button>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegisteredCamps;

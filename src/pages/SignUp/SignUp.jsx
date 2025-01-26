import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const imageFile = data.image[0];
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const res = await axiosPublic.post(image_hosting_api, formData);
            if (res.data.success) {
                const imageUrl = res.data.data.display_url;

                createUser(data.email, data.password)
                    .then((result) => {
                        const userUID = result.user.uid;
                        updateUserProfile(data.name, imageUrl)
                            .then(() => {
                                const userInfo = {
                                    name: data.name,
                                    email: data.email,
                                    photoURL: imageUrl,
                                    phone: data.phone,
                                    uid: userUID,
                                    createdAt: new Date().toISOString(),
                                    role: 'user'
                                };

                                axiosPublic.post('/users', userInfo)
                                    .then((res) => {
                                        if (res.data.insertedId) {
                                            reset();
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'User created successfully.',
                                                showConfirmButton: false,
                                                timer: 1500
                                            });
                                            navigate('/');
                                        }
                                    });
                            })
                            .catch((error) => toast.error(error.message));
                    });
            }
        } catch (error) {
            toast.error("Image upload failed. Please try again.");
        }
    };

    const handleGoogleSignup = () => {
        console.log("Google signup clicked");
        // Add logic for Google authentication here
    };

    return (
        <div className="flex flex-col md:flex-row h-[90rem] md:h-[60rem] 2xl:h-screen bg-base-100">
            {/* Left Section */}
            <div className="md:w-1/2 w-full h-[40%] md:h-full bg-accent flex items-center justify-center p-6 relative">
                <motion.img
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    src="https://i.ibb.co/5hyfb5T/image.png"
                    alt="Doctor illustration"
                    className="max-w-[80%] lg:max-w-[60%] h-full object-contain z-10"
                />
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 right-0 h-[50%] object-contain"
                    src="https://i.ibb.co/JFhHWG8/image.png"
                />
            </div>

            {/* Right Section */}
            <div className="md:w-1/2 w-full h-[60%] md:h-full flex flex-col items-center justify-center p-6">
                <motion.form
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full md:w-3/4 space-y-6"
                >
                    <h2 className="text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-accent text-center">
                        Create an Account
                    </h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Enter your name"
                            className="input input-bordered w-full"
                        />
                        {errors.name && <span className="text-sm text-red-600">Name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            placeholder="Enter your email"
                            className="input input-bordered w-full"
                        />
                        {errors.email && <span className="text-sm text-red-600">Email is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input
                            type="text"
                            {...register("phone", { required: true })}
                            placeholder="Enter your phone number"
                            className="input input-bordered w-full"
                        />
                        {errors.phone && <span className="text-sm text-red-600">Phone number is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <input
                            type="file"
                            {...register("image", { required: true })}
                            className="file-input file-input-bordered w-full"
                        />
                        {errors.image && <span className="text-sm text-red-600">Photo is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })}
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                        />
                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                        {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one uppercase, one lower case, one number and one special character</p>}
                    </div>
                    <button type="submit" className="btn btn-accent text-white w-full">
                        Create Account
                    </button>
                    <div className="divider">OR</div>
                    <button
                        type="button"
                        className="btn btn-outline btn-accent hover:text-white w-full"
                        onClick={handleGoogleSignup}
                    >
                        Sign Up with Google
                    </button>
                    <p className="text-center mt-4">
                        Already registered?{" "}
                        <Link to={`/auth/login`} className="text-accent underline">
                            Log In
                        </Link>
                    </p>
                </motion.form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;

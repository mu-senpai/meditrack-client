import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Login = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleGoogleLogin = () => {
        console.log("Google login clicked");
        // Add logic for Google authentication here
    };

    return (
        <div className="flex flex-col md:flex-row h-[70rem] md:h-[50rem] 2xl:h-screen bg-base-100">
            {/* Left Section */}
            <div
                className="md:w-1/2 w-full h-[40%] md:h-full bg-accent flex items-center justify-center p-6 relative"
            >
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
                    animate={{ opacity: 1}}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 right-0 h-[50%] object-contain"
                    src="https://i.ibb.co/JFhHWG8/image.png"
                />
            </div>

            {/* Right Section */}
            <div
                className="md:w-1/2 w-full h-[60%] md:h-full flex flex-col items-center justify-center p-6"
            >
                <motion.form
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full md:w-3/4 space-y-6"
                >
                    <h2 className="text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-accent text-center">
                        Login to MediTrack
                    </h2>
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
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            {...register("password", { required: true })}
                            placeholder="Enter your password"
                            className="input input-bordered w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-accent text-white w-full"
                    >
                        Login
                    </button>
                    <div className="divider">OR</div>
                    <button
                        type="button"
                        className="btn btn-outline btn-accent hover:text-white w-full"
                        onClick={handleGoogleLogin}
                    >
                        Login with Google
                    </button>
                    <p className="text-center mt-4">
                        Don't have an account?{" "}
                        <Link to={`/auth/signup`} className="text-accent underline">
                            Sign Up
                        </Link>
                    </p>
                </motion.form>
            </div>
        </div>
    );
};

export default Login;

import { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    FaHome,
    FaUser,
    FaSignOutAlt,
    FaBars,
    FaHandHoldingMedical,
    FaChartBar,
    FaPlus,
    FaClipboardList,
    FaMoneyCheckAlt,
    FaTasks
} from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../../hooks/useAdmin";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: userData = {}, refetch } = useQuery({
        queryKey: ["userProfile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            refetch();
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleLogout = () => {
        logOut()
            .then(() => {
                setTimeout(() => {
                    navigate('/');
                }, 5);
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: `${error.code}`,
                    icon: 'error',
                    confirmButtonText: 'Close'
                })
            });
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="w-full h-full min-h-screen bg-base-200">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 z-50 h-screen bg-accent text-white w-64 lg:w-72 transform ${isSidebarOpen && window.innerWidth < 1024 ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 transition-transform duration-300`}
            >
                <div className="flex items-center justify-between p-4 shadow-md">
                    <Link to="/" className="text-2xl text-white font-semibold hidden lg:flex items-center gap-2">
                        <FaHandHoldingMedical />
                        MediTrack
                    </Link>
                    <h2 className="text-2xl font-bold lg:hidden">Dashboard</h2>
                    <button
                        className="btn btn-ghost btn-circle lg:hidden text-white text-2xl"
                        onClick={toggleSidebar}
                    >
                        ✕
                    </button>
                </div>

                <nav className="mt-4 space-y-1">
                    {/* Common for both Admin & User */}
                    <NavLink to="/" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-4 rounded-md hover:bg-accent-focus">
                        <FaHome className="mr-3" /> Home
                    </NavLink>
                    <NavLink to="/dashboard/profile" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-4 rounded-md hover:bg-accent-focus">
                        <FaUser className="mr-3" /> Profile
                    </NavLink>

                    {/* Admin Routes */}
                    {isAdmin ? (
                        <>
                            <NavLink to="/dashboard/add-camp" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-4 rounded-md hover:bg-accent-focus">
                                <FaPlus className="mr-3" /> Add Camp
                            </NavLink>
                            <NavLink to="/dashboard/manage-camps" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-4 rounded-md hover:bg-accent-focus">
                                <FaClipboardList className="mr-3" /> Manage Camps
                            </NavLink>
                            <NavLink to="/dashboard/registered-camps-management" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-4 rounded-md hover:bg-accent-focus">
                                <FaTasks className="mr-3" /> Manage Registrations
                            </NavLink>
                        </>
                    ) : (
                        <>
                            {/* User Routes */}
                            <NavLink to="/dashboard/registered-camps" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-4 rounded-md hover:bg-accent-focus">
                                <FaClipboardList className="mr-3" /> Registered Camps
                            </NavLink>
                            <NavLink to="/dashboard/payment-history" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-4 rounded-md hover:bg-accent-focus">
                                <FaMoneyCheckAlt className="mr-3" /> Payment History
                            </NavLink>
                            <NavLink to="/dashboard/analytics" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-4 rounded-md hover:bg-accent-focus">
                                <FaChartBar className="mr-3" /> Analytics
                            </NavLink>
                        </>
                    )}

                    <button onClick={() => {handleLogout; setIsSidebarOpen(false)}} className="flex cursor-pointer items-center p-4 rounded-md hover:bg-accent-focus">
                        <FaSignOutAlt className="mr-3" /> Logout
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="w-full h-full flex flex-col lg:pl-72">
                {/* Top Navbar */}
                <div className="w-full bg-accent shadow-md sticky top-0 z-40">
                    <div className="w-[95%] mx-auto navbar">
                        <div className="flex items-center">
                            <Link to="/" className="text-2xl text-white font-semibold lg:hidden inline-flex">
                                <FaHandHoldingMedical />
                                MediTrack
                            </Link>
                        </div>
                        <div className="flex items-center space-x-2 lg:space-x-4 ml-auto">
                            <Link to="/dashboard/profile" className="avatar cursor-pointer flex items-center space-x-2">
                                <div className="w-10 rounded-full">
                                    <img src={userData?.photoURL || "https://via.placeholder.com/150"} alt="User Avatar" />
                                </div>
                            </Link>
                            <button className="btn btn-sm btn-ghost btn-circle lg:hidden text-2xl" onClick={toggleSidebar}>
                                <FaBars color="#FFFFFF" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="w-full h-full relative">
                    <section className="w-full h-full z-10">
                        <Outlet />
                    </section>
                </div>
            </div>
            <ScrollToTop></ScrollToTop>
        </div>
    );
};

export default Dashboard;

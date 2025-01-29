import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { FaHandHoldingMedical, FaUser } from "react-icons/fa";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        if (location.pathname === "/") {
            const handleScroll = () => {
                setIsScrolled(window.scrollY > 170);
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        } else {
            setIsScrolled(true);
        }
    }, [location.pathname]);

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

    const NavigationList = (
        <>
            <li>
                <NavLink
                    to={`/`}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                        `${isActive ? "text-accent" : "hover:text-accent"}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={`/available-camps`}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                        `${isActive ? "text-accent" : "hover:text-accent"}`
                    }
                >
                    Available Camps
                </NavLink>
            </li>
            {!user ? (
                <>
                    {/* <li>
                        <Link
                            to={`/auth/signup`}
                        >
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="font-bold lg:btn lg:btn-sm lg:btn-accent lg:text-white lg:border-none"
                            >Join Us</button>
                        </Link>
                    </li> */}
                </>
            ) : (
                <>
                    {/* <li>
                        <NavLink
                            to={`/about`}
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `${isActive ? "text-accent" : "hover:text-accent"}`
                            }
                        >
                            About Us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={`/contact`}
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `${isActive ? "text-accent" : "hover:text-accent"}`
                            }
                        >
                            Contact
                        </NavLink>
                    </li> */}
                    {/* <li>
                        <button
                            onClick={() => {
                                handleLogout();
                                setIsMenuOpen(false);
                            }}
                            className="font-bold lg:btn lg:btn-sm lg:btn-accent lg:text-white lg:border-none"
                        >
                            Log Out
                        </button>
                    </li> */}
                </>
            )}
        </>
    );

    return (
        <nav
            className={`w-full min-[1920px]:max-w-[120rem] mx-auto fixed top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-base-200' : 'bg-transparent text-white'}`}
        >
            <div className="w-[97%] mx-auto flex justify-between items-center px-4 py-2 sm:py-3">
                {/* Logo */}
                <Link
                    to="/"
                    className={`text-2xl text-accent md:text-3xl font-rubik inline-flex items-center gap-2 font-semibold`}
                >
                    <FaHandHoldingMedical />
                    MediTrack
                </Link>


                {/* Desktop Navigation */}
                <ul className="hidden lg:flex lg:space-x-5 xl:space-x-6 items-center">

                    {NavigationList}

                    {(user ?
                        (<div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt={user.displayName}
                                        src={user.photoURL} />
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 text-base-content z-1 mt-3 w-52 shadow">
                                <div className="card-body p-4">
                                    <div className="card-actions">
                                        <button className="btn btn-ghost btn-block">
                                            <FaUser /> {user.displayName.split(" ")[0]}
                                        </button>
                                    </div>
                                    <Link to={`/dashboard/profile`} className="card-actions">
                                        <button className="btn btn-accent text-white btn-block">Dashboard</button>
                                    </Link>
                                    <div className="card-actions">
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsMenuOpen(false);
                                            }}
                                            className="btn btn-error text-white btn-block">Logout</button>
                                    </div>
                                </div>
                            </div>
                        </div>)
                        : (
                            <Link
                                to={`/auth/signup`}
                            >
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="btn btn-sm btn-accent text-white border-none"
                                >Join Us</button>
                            </Link>
                        )
                    )}
                </ul>

                <div className="flex lg:hidden items-center gap-2 sm:gap-3">

                    {/* Avatar */}
                    {(user ?
                        (<div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt={user.displayName}
                                        src={user.photoURL} />
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 text-base-content z-1 mt-3 w-52 shadow">
                                <div className="card-body p-4">
                                    <div className="card-actions">
                                        <button className="btn btn-ghost btn-block">
                                            <FaUser /> {user.displayName.split(" ")[0]}
                                        </button>
                                    </div>
                                    <Link to={`/dashboard/profile`} className="card-actions">
                                        <button className="btn btn-accent text-white btn-block">Dashboard</button>
                                    </Link>
                                    <div className="card-actions">
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsMenuOpen(false);
                                            }}
                                            className="btn btn-error text-white btn-block">Logout</button>
                                    </div>
                                </div>
                            </div>
                        </div>)
                        : (
                            <Link
                                to={`/auth/signup`}
                            >
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="btn btn-xs sm:btn-sm btn-accent text-white border-none"
                                >Join Us</button>
                            </Link>
                        )
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="block lg:hidden text-2xl text-accent"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Dropdown for Small Devices */}
            <div
                className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${isMenuOpen && window.innerWidth < 768 ? "translate-y-0" : "translate-y-[-100%]"
                    } bg-white/95 text-black p-14 h-[11rem] md:hidden`}
                // ${user ? 'h-[22rem]' : 'h-44'} 
                style={{ zIndex: 1000 }}
            >
                {/* Close Button */}
                <button
                    className="absolute top-4 right-6 text-2xl bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300"
                    onClick={() => setIsMenuOpen(false)}
                >
                    ✕
                </button>

                {/* Menu Items */}
                <ul className="flex flex-col items-center justify-center space-y-4 text-center text-lg font-semibold tracking-wide">
                    {NavigationList}
                </ul>
            </div>

            {/* Sidebar for Medium Devices */}
            <div
                className={`fixed top-0 right-0 z-50 h-screen transition-transform duration-300 ${isMenuOpen && window.innerWidth >= 768 ? "translate-x-0" : "translate-x-full"
                    } bg-white/95 text-black w-72 hidden md:block lg:hidden`}
            >
                {/* Close Button */}
                <button
                    className="absolute top-4 right-6 text-2xl bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300"
                    onClick={() => setIsMenuOpen(false)}
                >
                    ✕
                </button>

                {/* Menu Items */}
                <ul className="flex flex-col items-center justify-center h-full space-y-6 text-center text-lg font-semibold tracking-wide">
                    {NavigationList}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
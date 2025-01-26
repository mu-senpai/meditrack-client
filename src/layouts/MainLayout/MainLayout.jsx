import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CampCard from "../../components/CampCard/CampCard";

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;
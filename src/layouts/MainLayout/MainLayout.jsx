import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import CampCard from "../../components/CampCard/CampCard";

const MainLayout = () => {
    return (
        <div className="min-h-[300vh]">
            <Navbar></Navbar>
            <Outlet></Outlet>
            {/*  */}
        </div>
    );
};

export default MainLayout;
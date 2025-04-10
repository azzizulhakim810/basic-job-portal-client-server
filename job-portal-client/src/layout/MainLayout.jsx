import { Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";
const MainLayout = () => {
  return (
    <div className="w-10/12 mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;

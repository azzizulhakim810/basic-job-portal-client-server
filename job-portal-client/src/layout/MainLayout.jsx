import { Outlet } from "react-router-dom";
import Footer from "../pages/shared/Footer";
import Navbar from "../pages/shared/Navbar";
const MainLayout = () => {
  return (
    <div className="w-10/12 mx-auto">
      <Navbar />
      <div className="mt-8 mb-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;

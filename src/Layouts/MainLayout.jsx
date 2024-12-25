import { Outlet } from "react-router-dom";
import ScrollToTop from "../Utilities/ScrollToTop/ScrollToTop";
import { NavbarMain } from "../Components/Navbar/Navbar";
// import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <NavbarMain />
      <ScrollToTop />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;

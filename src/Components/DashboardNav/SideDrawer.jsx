import React, { useContext } from "react";
import { Card, Drawer, List, ListItemPrefix } from "@material-tailwind/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";
import { authContext } from "../../Contexts/AuthContext";
import { MdReviews } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";
import useRole from "../../Hooks/useRole";
import { IoFastFood } from "react-icons/io5";
import { BsFillArrowDownLeftCircleFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { BiSolidOffer } from "react-icons/bi";

const SideDrawer = () => {
  const [open, setOpen] = React.useState(false);

  let { logOut, user } = useContext(authContext);
  let navigate = useNavigate();
  let [role] = useRole();

  let handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success(`Successfully Logged Out!!`, {
          style: {
            border: "2px solid green",
            padding: "8px",
            color: "#713200",
          },
          iconTheme: {
            primary: "green",
            secondary: "#FFFAEE",
          },
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <div>
      <div>
        <GiHamburgerMenu onClick={openDrawer} className="text-[25px]" />

        <Drawer open={open} onClose={closeDrawer} className="p-4">
          <Card className="w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
              <div className="mb-2 p-4 flex items-center gap-3">
                <img
                  src={user?.photoURL || "https://i.ibb.co/HN9NtYY/user.png"}
                  className="w-[60px] h-[60px] border-2 border-blue-500 rounded-full object-cover"
                />
                <h1 className="text-sm font-bold">{user?.displayName}</h1>
              </div>
            </div>
            <List>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "text-lg rounded-lg hover:bg-blue-100"
                }
                to="/dashboard/overview"
                onClick={closeDrawer}
              >
                <div className="flex p-3 font-bold">Experience</div>
              </NavLink>

              {/* Admin routes */}
              {role === "admin" && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "text-lg rounded-lg hover:bg-blue-100"
                  }
                  to="/admin/dashboard/manage-vendors"
                  onClick={closeDrawer}
                >
                  <div className="flex p-3 font-bold">Personal Projects</div>
                </NavLink>
              )}

              {role === "admin" && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "text-lg rounded-lg hover:bg-blue-100"
                  }
                  to="/admin/dashboard/manage-categories"
                  onClick={closeDrawer}
                >
                  <div className="flex p-3 font-bold">Skills</div>
                </NavLink>
              )}

              {/* Restaurant handlers routes */}
              {role === "restaurant-handler" && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "text-lg rounded-lg hover:bg-blue-100"
                  }
                  to="/restaurant/dashboard/orders"
                  onClick={closeDrawer}
                >
                  <div className="flex p-3 font-bold">
                    <ListItemPrefix>
                      <IoIosNotifications fontSize={"20"} />
                    </ListItemPrefix>
                    Orders
                  </div>
                </NavLink>
              )}

              {role === "restaurant-handler" && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "text-lg rounded-lg hover:bg-blue-100"
                  }
                  to="/restaurant/dashboard/add-new-food"
                  onClick={closeDrawer}
                >
                  <div className="flex p-3 font-bold">
                    <ListItemPrefix>
                      <IoMdAddCircle fontSize={"20"} />
                    </ListItemPrefix>
                    Add New Food
                  </div>
                </NavLink>
              )}

              {role === "restaurant-handler" && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "text-lg rounded-lg hover:bg-blue-100"
                  }
                  to="/restaurant/dashboard/my-foods"
                  onClick={closeDrawer}
                >
                  <div className="flex p-3 font-bold">
                    <ListItemPrefix>
                      <IoFastFood fontSize={"20"} />
                    </ListItemPrefix>
                    My Foods
                  </div>
                </NavLink>
              )}

              {role === "restaurant-handler" && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "text-lg rounded-lg hover:bg-blue-100"
                  }
                  to="/restaurant/dashboard/create-offer"
                  onClick={closeDrawer}
                >
                  <div className="flex p-3 font-bold">
                    <ListItemPrefix>
                      <BiSolidOffer fontSize={"20"} />
                    </ListItemPrefix>
                    Create Offer
                  </div>
                </NavLink>
              )}

              {role === "restaurant-handler" && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "text-lg rounded-lg hover:bg-blue-100"
                  }
                  to="/restaurant/dashboard/reviews"
                  onClick={closeDrawer}
                >
                  <div className="flex p-3 font-bold">
                    <ListItemPrefix>
                      <MdReviews fontSize={"20"} />
                    </ListItemPrefix>
                    Manage Reviews
                  </div>
                </NavLink>
              )}

              {/* Rider routes */}
              {role === "rider" && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "text-lg rounded-lg hover:bg-blue-100"
                  }
                  to="/rider/dashboard/incoming-deliveries"
                  onClick={closeDrawer}
                >
                  <div className="flex p-3 font-bold">
                    <ListItemPrefix>
                      <BsFillArrowDownLeftCircleFill fontSize={"20"} />
                    </ListItemPrefix>
                    Incoming Deliveries
                  </div>
                </NavLink>
              )}

              {role === "rider" && (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active" : "text-lg rounded-lg hover:bg-blue-100"
                  }
                  to="/rider/dashboard/accepted-deliveries"
                  onClick={closeDrawer}
                >
                  <div className="flex p-3 font-bold">
                    <ListItemPrefix>
                      <FaCheckCircle fontSize={"20"} />
                    </ListItemPrefix>
                    Accepted Deliveries
                  </div>
                </NavLink>
              )}

              {/* Common route */}
              <button className="bg-transparent" onClick={handleLogOut}>
                <div className="flex p-3 font-bold rounded-lg hover:bg-blue-100">
                  <ListItemPrefix>
                    <FaPowerOff fontSize={"20"} />
                  </ListItemPrefix>
                  Log Out
                </div>
              </button>
            </List>
          </Card>
        </Drawer>
      </div>
    </div>
  );
};

export default SideDrawer;

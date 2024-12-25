import { List, ListItemPrefix } from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoFastFood } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa6";
import { useContext } from "react";
import { authContext } from "../../Contexts/AuthContext";
import { MdReviews } from "react-icons/md";
import useRole from "../../Hooks/useRole";
import { IoIosNotifications, IoMdAddCircle } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import toast from "react-hot-toast";

const SideBar = () => {
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

  return (
    <div className="hidden md:hidden lg:block">
      <div>
        <div className="w-full max-w-[20rem] bg-[#F9FFA4] rounded-xl p-4 shadow-xl shadow-blue-gray-900/5">
          <div className="mb-2 p-4 flex items-center gap-3">
            <img
              src={user?.photoURL || "https://i.ibb.co/HN9NtYY/user.png"}
              className="w-[60px] h-[60px] border-2 border-blue-500 rounded-full object-cover"
            />
            <h1 className="text-lg font-bold">{user?.displayName}</h1>
          </div>
          <List>
            <NavLink
              className={({ isActive }) =>
                isActive ? "active" : "text-lg rounded-lg hover:bg-blue-100"
              }
              to="/dashboard/overview"
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
              >
                <div className="flex items-center p-3 font-bold">
                  Personal Projects
                </div>
              </NavLink>
            )}

            {role === "admin" && (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "text-lg rounded-lg hover:bg-blue-100"
                }
                to="/admin/dashboard/manage-categories"
              >
                <div className="flex items-center p-3 font-bold">Skills</div>
              </NavLink>
            )}

            {/* Restaurant handlers routes */}
            {role === "restaurant-handler" && (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "text-lg rounded-lg hover:bg-blue-100"
                }
                to="/restaurant/dashboard/orders"
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
              >
                <div className="flex p-3 font-bold">
                  <ListItemPrefix>
                    <BiSolidOffer fontSize={"22"} />
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
              >
                <div className="flex p-3 font-bold">
                  <ListItemPrefix>
                    <MdReviews fontSize={"22"} />
                  </ListItemPrefix>
                  Manage Reviews
                </div>
              </NavLink>
            )}

            {/* Common route */}
            <button
              className="bg-transparent hover:bg-blue-100 rounded-lg"
              onClick={handleLogOut}
            >
              <div className="flex p-3 font-bold">
                <ListItemPrefix>
                  <FaPowerOff fontSize={"20"} />
                </ListItemPrefix>
                Log Out
              </div>
            </button>
          </List>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

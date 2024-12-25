import { MdOutlineAlternateEmail } from "react-icons/md";
import useAxios from "../../Hooks/useAxios";
import { useContext, useState } from "react";
import { authContext } from "../../Contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { imageUpload } from "../../Utilities/ImageUpload/ImageUpload";
import toast from "react-hot-toast";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoFastFood } from "react-icons/io5";
import { Button } from "@material-tailwind/react";

import { Helmet } from "react-helmet";
import restaurantsLogo from "../../Assets/restaurants.jpg";

const Home = () => {
  let axios = useAxios();
  let { createUser, update, logOut, user } = useContext(authContext);
  let navigate = useNavigate();

  let [loading, setLoading] = useState(false);

  let [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  let [restaurant, setRestaurant] = useState("");
  const handleRestaurantChange = (e) => {
    setRestaurant(e.target.value);
  };

  let [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  let handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);
    const passRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:;<>,.?/~`])(.{6,})$/;
    const validPassword = passRegex.test(password);

    if (!validPassword) {
      Swal.fire({
        icon: "warning",
        text: "Password must be at least 6 characters long, containing at least one upper case and special character",
      });
      setLoading(false);
      return;
    }

    if (!selectedFile) {
      Swal.fire({
        icon: "warning",
        text: "You must select your restaurant logo",
      });
      setLoading(false);
      return;
    }

    let imgData = null;

    if (selectedFile) {
      let imageData = await imageUpload(selectedFile, setLoading);
      imgData = imageData;
    }

    createUser(email, password)
      .then(() => {
        update(restaurant, imgData?.data?.display_url)
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });

        logOut()
          .then(() => {
            setLoading(false);
            navigate("/login");
          })
          .catch((error) => {
            console.log(error);
          });

        toast.success(`Registration Successful!!`, {
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

        axios
          .post("/register-restaurant", {
            email: email,
            restaurantName: restaurant,
            thumbnail: imgData?.data?.display_url,
          })
          .then(() => {});
      })
      .catch(() => {
        toast.error(`User Already Exists`, {
          style: {
            border: "2px solid red",
            padding: "8px",
            color: "#713200",
          },
          iconTheme: {
            primary: "red",
            secondary: "#FFFAEE",
          },
        });
        setLoading(false);

        return;
      });
  };

  if (user) {
    return <Navigate to="/dashboard/overview" />;
  }

  return (
    <div>
      <Helmet>
        <title>Register Your Restaurant</title>
      </Helmet>

      <div className="flex w-full py-20 items-center justify-center bg-gray-100">
        <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg sm:flex">
          <div
            className="m-2 w-full rounded-2xl bg-gray-400 bg-cover bg-center text-white sm:w-2/5"
            style={{
              backgroundImage: `url(${restaurantsLogo})`,
            }}
          ></div>
          <div className="w-full sm:w-3/5">
            <div className="p-8">
              <h1 className="text-2xl font-black text-slate-700">
                Register your restaurant
              </h1>
              <p className="mt-2 mb-5 text-base leading-tight text-gray-600">
                Enter information about your restaurant carefully
              </p>

              <form onSubmit={handleRegister}>
                {/* Email */}
                <div className="flex flex-col mb-5 mt-7">
                  <div className="relative">
                    <div
                      className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                    >
                      <MdOutlineAlternateEmail className="text-blue-500 font-bold" />
                    </div>

                    <input
                      required
                      type="email"
                      name="email"
                      onChange={handleEmailChange}
                      className={`
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400`}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col mb-5">
                  <div className="relative">
                    <div
                      className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                    >
                      <RiLockPasswordFill className="text-blue-500 font-bold" />
                    </div>

                    <input
                      required
                      type="password"
                      name="password"
                      onBlur={handlePasswordChange}
                      className={`
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                      `}
                      placeholder="Enter a password"
                    />
                  </div>
                </div>

                {/* Restaurant name */}
                <div className="flex flex-col mb-5 mt-7">
                  <div className="relative">
                    <div
                      className="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                    >
                      <IoFastFood className="text-blue-500 font-bold" />
                    </div>

                    <input
                      required
                      type="text"
                      name="email"
                      onChange={handleRestaurantChange}
                      className={`
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400`}
                      placeholder="Enter your restaurant name"
                    />
                  </div>
                </div>

                {/* Logo */}
                <div className="w-full mt-4 mb-5">
                  <div>
                    <label className="flex gap-4 p-2 cursor-pointer border-2 border-gray-400 rounded-lg shadow-xl justify-center items-center">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                      </svg>
                      <span className="text-base line-clamp-1 font-medium">
                        {selectedFile
                          ? selectedFile.name
                          : "Select your restaurant logo"}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        id="image"
                        name="image"
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>

                <Button
                  disabled={loading}
                  type="submit"
                  fullWidth
                  className={`bg-blue-500 capitalize text-[16px]`}
                >
                  {loading ? "Please Wait..." : "Register"}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Already a vendor?{" "}
                  <span className="text-blue-600 hover:underline">
                    <Link to="/login">Login to your dashboard</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import { Button } from "@material-tailwind/react";
import { ImSpinner9 } from "react-icons/im";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { authContext } from "../../Contexts/AuthContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import loginImage from "../../Assets/loginImage.svg";

const Login = () => {
  const [loading, setLoading] = useState(false);
  let { login, user } = useContext(authContext);
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  let handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    login(formData.email, formData.password)
      .then(() => {
        navigate("/dashboard/overview");
        toast.success(`Successfully Logged In!!`, {
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
      })
      .catch((error) => {
        setLoading(false);
        if (error) {
          toast.error(`Invalid email or password!!`, {
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
        }
      });
  };

  if (user) {
    return <Navigate to={`/dashboard/overview`} />;
  }

  return (
    <div>
      <Helmet>
        <title>Login to your dashboard</title>
      </Helmet>

      <div className="bg-gray-100">
        <div className="py-20">
          <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
            <div className="hidden lg:flex lg:w-1/2">
              <img src={loginImage} className="object-cover" />
            </div>

            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
              <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                Login to your Dashboard
              </p>

              <form className="mt-5" onSubmit={handleLogin}>
                {/* Email */}
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
                      <MdOutlineAlternateEmail className="text-blue-500 font-bold" />
                    </div>

                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
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
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
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
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  className={`bg-blue-500 capitalize text-[16px] mt-7`}
                  disabled={loading ? true : false}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-5 ">
                      <ImSpinner9 className="animate-spin text-[20px]" />
                      Logging In
                    </div>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

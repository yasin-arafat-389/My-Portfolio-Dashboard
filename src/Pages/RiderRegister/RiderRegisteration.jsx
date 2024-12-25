import { useContext, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { authContext } from "../../Contexts/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { imageUpload } from "../../Utilities/ImageUpload/ImageUpload";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button, Dialog } from "@material-tailwind/react";
import { ImSpinner9 } from "react-icons/im";
import { MdOutlineAlternateEmail, MdPendingActions } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
import { IoWarningOutline } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import deliveryRiderImage from "../../Assets/delivery-man-with-face-mask-delivering-order-motorcycle-154993-160.jpg";

const RiderRegisteration = () => {
  let axios = useAxios();
  let { createUser, update, logOut, user } = useContext(authContext);
  let navigate = useNavigate();

  let [loading, setLoading] = useState(false);
  let [nextStep, setNextStep] = useState(false);

  let [riderName, setRiderName] = useState("");
  let [riderPhone, setRiderPhone] = useState("");
  let [riderRegion, setRiderRegion] = useState("");

  let [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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

  // States to manage displaying modals
  const [openModalForEmptyInput, setOpenModalForEmptyInput] = useState(false);
  const [openModalToSendRiderRequest, setopenModalToSendRiderRequest] =
    useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openUnderReview, setOpenUnderReview] = useState(false);

  let handleNextStep = async () => {
    setLoading(true);

    if (!email) {
      setOpenModalForEmptyInput(!openModalForEmptyInput);
      setLoading(false);
      return;
    }

    axios.get(`/rider-request-status?email=${email}`).then((res) => {
      if (!res.data) {
        setLoading(false);
        setopenModalToSendRiderRequest(!openModalToSendRiderRequest);
        return;
      } else if (res.data.status === "pending") {
        setLoading(false);
        setOpenUnderReview(!openUnderReview);
        return;
      } else if (res.data.status === "rejected") {
        setLoading(false);
        Swal.fire({
          icon: "warning",
          text: "We are extremely sorry to inform you that your rider request has been rejected. ",
        });
        return;
      } else if (res.data.resolved === true) {
        setLoading(false);
        setOpenSuccess(!openSuccess);
        return;
      } else {
        setLoading(false);
        setNextStep(true);
      }

      setRiderName(res.data.name);
      setRiderPhone(res.data.phone);
      setRiderRegion(res.data.region);
    });
  };

  let handleRegister = async () => {
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
        text: "You must select your profile picture",
      });
      setLoading(false);
      return;
    }

    let imgData = null;

    if (selectedFile) {
      let imageData = await imageUpload(selectedFile, setLoading);
      imgData = imageData;
    }

    axios
      .post("/register-rider", {
        email: email,
        name: riderName,
        phone: riderPhone,
        region: riderRegion,
      })
      .then(() => {});

    createUser(email, password)
      .then(() => {
        update(riderName, imgData?.data?.display_url)
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

        toast.success(`Registration Successfull!!`, {
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
      });
  };

  if (user) {
    return <Navigate to="/dashboard/overview" />;
  }

  return (
    <div>
      <Helmet>
        <title>Register As a Rider</title>
      </Helmet>

      <div className="flex w-full py-20 items-center justify-center bg-gray-100">
        <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg sm:flex">
          <div
            className="m-2 w-full rounded-2xl bg-gray-400 bg-cover bg-center text-white sm:w-2/5"
            style={{
              backgroundImage: `url(${deliveryRiderImage})`,
            }}
          ></div>
          <div className="w-full sm:w-3/5">
            <div className="p-8">
              <h1 className="text-2xl font-black text-slate-700">
                Register as a rider
              </h1>
              <p className="mt-2 mb-5 text-base leading-tight text-gray-600">
                Enter the following informations carefully
              </p>

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
                    focus:outline-none focus:border-blue-400 ${
                      nextStep && "cursor-not-allowed"
                    }`}
                    disabled={nextStep ? true : false}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {nextStep && (
                <>
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
                </>
              )}

              <Button
                onClick={nextStep ? handleRegister : handleNextStep}
                fullWidth
                className={`bg-blue-500 capitalize text-[16px]`}
                disabled={loading ? true : false}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-4">
                    <ImSpinner9 className="animate-spin text-[20px]" />
                    Please Wait
                  </div>
                ) : (
                  "Next"
                )}
              </Button>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Already a rider?{" "}
                  <span className="text-blue-600 hover:underline">
                    <Link to="/login">Login to your dashboard</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Modal to show if the input is empty */}
          <Dialog
            size="xs"
            open={openModalForEmptyInput}
            handler={handleNextStep}
            className="py-10"
          >
            <div className="flex flex-col items-center rounded-md text-gray-800">
              <div className="bg-yellow-300 p-5 rounded-lg">
                <CiWarning size={"50"} />
              </div>
              <p className="mt-4 text-center text-xl font-bold">
                Please enter a valid gmail.
              </p>
              <div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                <Button
                  onClick={() =>
                    setOpenModalForEmptyInput(!openModalForEmptyInput)
                  }
                  className=""
                >
                  Okay
                </Button>
              </div>
            </div>
          </Dialog>

          {/* Modal to show if the user had not sent partner request yet */}
          <Dialog
            open={openModalToSendRiderRequest}
            handler={handleNextStep}
            className="p-10"
          >
            <div className="flex justify-center">
              <IoWarningOutline size={"60"} className="text-yellow-800" />
            </div>

            <h1 className="text-center mt-5 text-xl font-bold text-gray-600">
              You have not sent a request to be a rider yet.
            </h1>

            <div className="flex gap-3 justify-center mt-5">
              <Link
                target="_blank"
                to={"https://dine-dash-client.web.app/rider-request"}
                onClick={() =>
                  setopenModalToSendRiderRequest(!openModalToSendRiderRequest)
                }
              >
                <Button className="bg-green-600 capitalize">
                  Send Rider Request
                </Button>
              </Link>

              <Button
                onClick={() =>
                  setopenModalToSendRiderRequest(!openModalToSendRiderRequest)
                }
                className="bg-red-600 capitalize"
              >
                Cancel
              </Button>
            </div>
          </Dialog>

          {/* Modal to show if the user is already a rider */}
          <Dialog open={openSuccess} handler={handleNextStep} className="p-10">
            <div className="flex justify-center">
              <FaCheckCircle size={"60"} className="text-green-600" />
            </div>

            <h1 className="text-center mt-5 text-xl font-bold text-gray-600">
              You are already a rider. Login to your dashboard to manage
              deliveries.
            </h1>

            <div className="flex justify-center mt-5">
              <Button
                onClick={() => setOpenSuccess(!openSuccess)}
                className="bg-blue-600 capitalize"
              >
                Ok
              </Button>
            </div>
          </Dialog>

          {/* Modal to show if the rider request is under review */}
          <Dialog
            open={openUnderReview}
            handler={handleNextStep}
            className="p-10"
          >
            <div className="flex justify-center">
              <MdPendingActions size={"60"} className="text-blue-600" />
            </div>

            <h1 className="text-center mt-5 text-xl font-bold text-gray-600">
              Your rider request is still under review. You will get an email
              once admin approves your request.
            </h1>

            <div className="flex justify-center mt-5">
              <Button
                onClick={() => setOpenUnderReview(!openUnderReview)}
                className="bg-blue-600 capitalize"
              >
                Ok
              </Button>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default RiderRegisteration;

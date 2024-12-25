import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import Loader from "../../../Utilities/Loader/Loader";
import { useContext, useState } from "react";
import { authContext } from "../../../Contexts/AuthContext";
import { Button, Dialog } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { FaBangladeshiTakaSign, FaHashtag } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";

const AcceptedDeliveries = () => {
  let axios = useAxios();
  let { user } = useContext(authContext);

  let {
    data: acceptedDeliveries = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["acceptedDeliveries"],
    queryFn: async () => {
      let res = await axios
        .get(`/deliveries/accepted?riderName=${user.displayName}`)
        .then();
      return res.data;
    },
  });

  const [open, setOpen] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = (details) => {
    setOpen(!open);
    setDeliveryDetails(details);
  };

  const handleDeliverToCustomer = () => {
    setLoading(true);

    axios
      .post(
        `/deliver/food?orderId=${deliveryDetails.orderId}&type=${deliveryDetails.orderType}&riderName=${user.displayName}`
      )
      .then(() => {
        setLoading(false);
        setOpen(!open);
        refetch();
        toast.success(`Order successfully delivered!!`, {
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
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h2 className={`flex flex-row flex-nowrap items-center mt-3 `}>
        <span className="flex-grow block border-t border-green-600"></span>
        <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-green-400 text-white">
          Accepted Deliveries
        </span>
        <span className="flex-grow block border-t border-green-600"></span>
      </h2>

      <div>
        {acceptedDeliveries.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full bg-gray-100 py-7 mt-5 rounded-lg">
            <div className="mx-auto bg-gray-300 p-8 rounded-full shadow-lg shadow-blue-400">
              <img
                src="https://i.ibb.co/8KQFVmW/rejected.png"
                className="w-[100px]"
              />
            </div>
            <h2 className="text-center text-[20px] md:text-[30px] lg:text-[30px] font-bold leading-tight text-gray-800 pt-10">
              You have not accepted any delivery yet.
            </h2>

            <Link
              className="w-full flex"
              to={"/rider/dashboard/incoming-deliveries"}
            >
              <Button className="mx-auto capitalize text-lg w-[40%] bg-blue-600 mt-7">
                Accept delivery to get started
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
                {acceptedDeliveries.map((item, index) => (
                  <div className="relative" key={index}>
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                    <div className="relative p-6 bg-white border-2 border-indigo-500 rounded-lg">
                      {/* Pickup Location */}
                      <div className="flex items-center">
                        <img
                          src="https://i.ibb.co/jzwgkrV/location.png"
                          className="w-[40px]"
                        />
                        <div className="my-2 ml-3 text-lg text-gray-800">
                          Pickup Point:{" "}
                          <span className="italic text-indigo-600">
                            {item.restaurant}
                          </span>
                        </div>
                      </div>

                      {/* Drop off Location */}
                      <div className="flex items-center mt-3">
                        <img
                          src="https://i.ibb.co/vV0P1QV/parcel.png"
                          className="w-[40px]"
                        />
                        <div className="my-2 ml-3 text-lg text-gray-800 line-clamp-1">
                          Drop Off:{" "}
                          <span className="italic text-indigo-600">
                            {item.address}
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleOpen(item)}
                        className="capitalize mt-5 w-full bg-indigo-500 text-[15px]"
                      >
                        See Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Details Modal */}
              <Dialog open={open} handler={handleOpen}>
                <div className="py-5 px-7">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-700 text-lg">
                      Delivery Details
                    </span>

                    <button onClick={() => setOpen(!open)}>
                      <IoMdCloseCircle size={"20"} color="red" />
                    </button>
                  </div>

                  <div className="mt-5">
                    <h2 className="text-lg text-gray-800">
                      Pick up{" "}
                      <span className="text-blue-700">
                        {deliveryDetails.quantity || "one"}
                      </span>{" "}
                      <span className="text-blue-700">
                        {deliveryDetails.name || "Custom Burger"}
                      </span>{" "}
                      from{" "}
                      <span className="text-blue-700">
                        {deliveryDetails.restaurant}
                      </span>{" "}
                      and drop it off to{" "}
                      <span className="text-blue-700">
                        {deliveryDetails.address}
                      </span>
                    </h2>

                    <div className="mt-5">
                      <div className="flex items-center gap-2 text-lg text-gray-700">
                        <FaHashtag />
                        <h2>
                          Order ID:{" "}
                          <span className="text-blue-700">
                            {deliveryDetails.orderId}
                          </span>
                        </h2>
                      </div>

                      <div className="flex items-center gap-2 text-lg text-gray-700 mt-3">
                        <FaPhoneAlt />
                        <h2>
                          Customer phone number:{" "}
                          <span className="text-blue-700">
                            {deliveryDetails.phone}
                          </span>
                        </h2>
                      </div>

                      <div className="flex items-center gap-2 text-lg text-gray-700 mt-3">
                        <FaBangladeshiTakaSign size={"20"} />
                        <h2>
                          Payment:{" "}
                          <span className="text-blue-700">
                            {deliveryDetails.paymentMethod === "SSLCOMMERZ"
                              ? "Paid Online"
                              : `Please collect ${deliveryDetails.totalPrice} taka from customer`}
                          </span>
                        </h2>
                      </div>

                      <div className="flex gap-3 justify-center mt-6">
                        <Button
                          className="bg-green-600"
                          onClick={handleDeliverToCustomer}
                          disabled={isLoading ? true : false}
                        >
                          {loading ? (
                            <div className="flex items-center justify-center gap-5 ">
                              <ImSpinner9 className="animate-spin text-[20px]" />
                              Delivering
                            </div>
                          ) : (
                            "Deliver To Cutomer"
                          )}
                        </Button>

                        <Button
                          className="bg-red-600"
                          onClick={() => setOpen(!open)}
                          disabled={loading ? true : false}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AcceptedDeliveries;

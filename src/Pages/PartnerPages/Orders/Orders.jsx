import { useContext, useState } from "react";
import { authContext } from "../../../Contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import Loader from "../../../Utilities/Loader/Loader";
import NoDataFound from "../../../Utilities/NoDataFound/NoDataFound";
import { Button, Chip, Dialog } from "@material-tailwind/react";
import { MdOutlineCallReceived } from "react-icons/md";
import { PiCookingPotFill } from "react-icons/pi";
import { MdDeliveryDining } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { ImSpinner9 } from "react-icons/im";
import { IoWarningOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const Orders = () => {
  let { user } = useContext(authContext);
  let axios = useAxios();

  let {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["ordersFilteredByRestaurant"],
    queryFn: async () => {
      let res = await axios
        .get(`/orders/partner?name=${user.displayName}`)
        .then();
      return res.data;
    },
  });

  const [open, setOpen] = useState(false);
  const [foodDetails, setFoodDetails] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const [loadingDeliverOrder, setLoadingDeliverOrder] = useState(false);
  const [openReadyToDeliverModal, setOpenReadyToDeliverModal] = useState(false);
  const [foodInfo, setFoodInfo] = useState(false);

  const handleOpen = (foodDetails, customerInfo) => {
    setOpen(!open);
    setFoodDetails(foodDetails);
    setCustomerInfo(customerInfo);
  };

  const handleAcceptOrder = () => {
    setLoading(true);

    axios
      .post(`/accept/order/regular?name=${user.displayName}`, {
        orderId: foodDetails.orderId,
      })
      .then((res) => {
        console.log(res);

        if (!res.data.success) {
          setLoading(false);
          setOpen(!open);

          toast.error(`Your account has been blacklisted!!`, {
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

          return;
        } else {
          setLoading(false);
          setOpen(!open);
          refetch();
          toast.success(`Order accepted!!`, {
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
        }
      });
  };

  const handleRejectOrder = () => {
    setLoadingReject(true);

    axios
      .post(`/reject/order/regular`, {
        orderId: foodDetails.orderId,
      })
      .then(() => {
        setLoadingReject(false);
        setOpen(!open);
        refetch();
        toast.success(`Order Rejected!!`, {
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

  const openConfirmation = (foodInfo) => {
    setOpenReadyToDeliverModal(!openReadyToDeliverModal);
    setFoodInfo(foodInfo);
  };

  const handleDeliverOrder = () => {
    setLoadingDeliverOrder(true);

    axios
      .post(`/deliver/order/regular`, {
        orderId: foodInfo.orderId,
      })
      .then(() => {
        setLoadingDeliverOrder(false);
        setOpenReadyToDeliverModal(!openReadyToDeliverModal);
        refetch();
        toast.success(`Order is out for delivery!!`, {
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
      {orders.length === 0 ? (
        <>
          <NoDataFound text={"No orders yet!!"} />
        </>
      ) : (
        <>
          <div>
            <section className="antialiased text-gray-600 mt-5 mb-20">
              <div className="flex flex-col h-full ">
                <div className="w-full bg-gray-200 shadow-lg rounded-sm border border-gray-200">
                  <div className="p-3">
                    <div className="overflow-x-auto">
                      <table className="table-auto w-full ">
                        <thead className="text-md font-semibold uppercase text-white bg-[#0866ff]">
                          <tr>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold text-center capitalize">
                                Food
                              </div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold capitalize text-center">
                                Total Price
                              </div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold capitalize text-center">
                                Status
                              </div>
                            </th>
                            <th className="p-2 whitespace-nowrap">
                              <div className="font-semibold text-center capitalize">
                                Action
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                          {orders.map((customerData) =>
                            customerData.cartFood?.map((item, index) => (
                              <tr key={index}>
                                <td className="p-2 whitespace-nowrap">
                                  <div className="flex items-center justify-center">
                                    <div className="font-bold text-xl text-gray-800">
                                      {item.name}
                                    </div>
                                  </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-center text-xl font-bold text-gray-800">
                                    ৳ {item.totalPrice}
                                  </div>
                                </td>

                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-center font-medium text-green-500">
                                    {/* Conditional Chip */}
                                    <div
                                      className={`custom-chip text-base font-bold w-[80%] mx-auto py-1 rounded-lg capitalize flex justify-center items-center gap-2 ${
                                        item.status === "order received" &&
                                        "bg-brown-500 text-white"
                                      } ${
                                        item.status === "cooking" &&
                                        "bg-indigo-500 text-white"
                                      } ${
                                        item.status === "out for delivery" &&
                                        "bg-teal-500 text-white"
                                      } ${
                                        item.status === "completed" &&
                                        "bg-green-500 text-white"
                                      } ${
                                        item.status === "cancelled" &&
                                        "bg-red-500 text-white"
                                      }`}
                                    >
                                      {item.status === "order received" && (
                                        <MdOutlineCallReceived size={"20"} />
                                      )}
                                      {item.status === "cooking" && (
                                        <PiCookingPotFill size={"30"} />
                                      )}
                                      {item.status === "out for delivery" && (
                                        <MdDeliveryDining size={"30"} />
                                      )}
                                      {item.status === "completed" && (
                                        <FaCheckCircle size={"20"} />
                                      )}
                                      {item.status === "cancelled" && (
                                        <MdCancel size={"20"} />
                                      )}
                                      <span>{item.status}</span>
                                    </div>
                                  </div>
                                </td>

                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-center font-bold text-lg text-gray-800">
                                    {item.status === "cancelled" && (
                                      <div>N/A</div>
                                    )}
                                    {item.status === "out for delivery" && (
                                      <div>N/A</div>
                                    )}
                                    {item.status === "completed" && (
                                      <div>N/A</div>
                                    )}

                                    {item.status === "order received" && (
                                      <Button
                                        onClick={() =>
                                          handleOpen(item, customerData)
                                        }
                                        className="bg-[#0866ff]"
                                      >
                                        See Details
                                      </Button>
                                    )}

                                    {item.status === "cooking" && (
                                      <Button
                                        className="bg-light-green-500 capitalize"
                                        onClick={() => openConfirmation(item)}
                                      >
                                        Ready To Deliver
                                      </Button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Order Details Modal */}
            <Dialog className="p-3" size="lg" open={open} handler={handleOpen}>
              <div className="flex gap-5">
                <div className="image-and-title flex flex-col justify-center w-2/5">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={foodDetails.image}
                    alt=""
                  />
                </div>

                <div className="flex flex-col w-3/5">
                  <div className="w-full bg-amber-500 text-center text-black text-xl rounded-lg p-1 font-bold">
                    {foodDetails.name}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Chip
                      value={`Quantity: ${foodDetails.quantity}`}
                      className="capitalize text-white text-base bg-gray-600"
                    />

                    <Chip
                      value={`Unit Price: ৳ ${foodDetails.price}.00`}
                      className="capitalize text-white text-base bg-gray-600"
                    />

                    <Chip
                      value={`Total Price: ৳ ${foodDetails.totalPrice}.00`}
                      className="capitalize text-white text-base bg-gray-600"
                    />

                    <Chip
                      value={`Customer: ${customerInfo?.name}`}
                      className="capitalize text-white text-base bg-gray-600"
                    />

                    <Chip
                      value={`Phone: ${customerInfo?.phone}`}
                      className="capitalize text-white text-base bg-gray-600"
                    />

                    <Chip
                      value={`Address: ${customerInfo?.address}`}
                      className="capitalize text-white text-base bg-gray-600 overflow-hidden whitespace-nowrap text-ellipsis"
                    />

                    <Chip
                      value={`region: ${customerInfo?.region}`}
                      className="capitalize text-white text-base bg-gray-600"
                    />

                    <Chip
                      value={`Payment: ${customerInfo?.paymentMethod}`}
                      className="capitalize text-white text-base bg-gray-600"
                    />
                  </div>

                  <div className="mt-5 flex gap-3">
                    <Button
                      className="capitalize bg-green-500"
                      onClick={handleAcceptOrder}
                      disabled={loading || loadingReject ? true : false}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-4">
                          <ImSpinner9 className="animate-spin text-[20px]" />
                          Accepting
                        </div>
                      ) : (
                        "Accept Order"
                      )}
                    </Button>

                    <Button
                      className="capitalize bg-red-500"
                      onClick={handleRejectOrder}
                      disabled={loadingReject || loading ? true : false}
                    >
                      {loadingReject ? (
                        <div className="flex items-center justify-center gap-4">
                          <ImSpinner9 className="animate-spin text-[20px]" />
                          Rejecting
                        </div>
                      ) : (
                        "Reject Order"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Dialog>

            {/* Ready to deliver confirmation modal */}
            <Dialog
              open={openReadyToDeliverModal}
              handler={openConfirmation}
              className="bg-transparent"
            >
              <div>
                <div className="w-full flex flex-col p-4 relative items-center justify-center bg-white border border-gray-800 shadow-lg rounded-2xl">
                  <div className="">
                    <div className="text-center p-3 flex-auto justify-center">
                      <div className="flex justify-center">
                        <IoWarningOutline
                          size={"80"}
                          className="text-yellow-700"
                        />
                      </div>
                      <h2 className="text-xl font-bold py-4 text-gray-800">
                        Are you sure{" "}
                        <span className="text-blue-500">
                          {foodInfo.quantity} {foodInfo.name}
                        </span>{" "}
                        is ready to be delivered?
                      </h2>

                      <div className="mb-5">
                        <h2 className="text-lg text-gray-800">
                          Order ID:{" "}
                          <span className="italic text-indigo-600">
                            {foodInfo.orderId}
                          </span>
                        </h2>
                      </div>
                    </div>
                    <div className="flex gap-4 justify-center items-center">
                      <Button
                        className="bg-green-500"
                        onClick={handleDeliverOrder}
                        disabled={loadingDeliverOrder ? true : false}
                      >
                        {loadingDeliverOrder ? (
                          <div className="flex items-center justify-center gap-4">
                            <ImSpinner9 className="animate-spin text-[20px]" />
                            Delivering
                          </div>
                        ) : (
                          "Yes"
                        )}
                      </Button>

                      <Button
                        className="bg-red-500"
                        onClick={() =>
                          setOpenReadyToDeliverModal(!openReadyToDeliverModal)
                        }
                        disabled={loadingDeliverOrder ? true : false}
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
  );
};

export default Orders;

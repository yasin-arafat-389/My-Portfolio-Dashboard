import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import Loader from "../../../Utilities/Loader/Loader";
import { useContext, useState } from "react";
import { authContext } from "../../../Contexts/AuthContext";
import BeCustomBurgerProvider from "../../../Components/BeCustomBurgerProvider/BeCustomBurgerProvider";
import { Button, Chip, Dialog, Input } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";
import { FaCheckCircle, FaRegEdit } from "react-icons/fa";
import { MdOutlineStickyNote2 } from "react-icons/md";
import {
  MdCancel,
  MdDeliveryDining,
  MdOutlineCallReceived,
} from "react-icons/md";
import { PiCookingPotFill } from "react-icons/pi";
import { IoWarningOutline } from "react-icons/io5";

const CustomBurger = () => {
  let { user } = useContext(authContext);
  let axios = useAxios();

  let {
    data: providerInfo = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["providerInformation"],
    queryFn: async () => {
      let res = await axios
        .get(`/provider/status?name=${user.displayName}`)
        .then();
      return res.data;
    },
  });

  // Handle Update Price
  const [openUpdatePriceModal, setOpenUpdatePriceModal] = useState(false);
  const [ingredientsInfo, setIngredientsInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const openUpdatePrice = (ingredientsInfo) => {
    setOpenUpdatePriceModal(!openUpdatePriceModal);
    setIngredientsInfo(ingredientsInfo);
  };

  const handlePriceChange = (event) => {
    setIngredientsInfo({
      ...ingredientsInfo,
      price: event.target.value,
    });
  };

  const handleUpdatePrice = () => {
    setLoading(true);

    axios
      .post("/update/ingredients/price", {
        updatedPrice: ingredientsInfo.price,
        provider: user.displayName,
        ingredientToUpdate: ingredientsInfo.name,
      })
      .then(() => {
        setLoading(false);
        refetch();
        toast.success(`Price Updated Successfully!!`, {
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
        setOpenUpdatePriceModal(!openUpdatePriceModal);
      });
  };

  // Logics to display custom burger orders
  const [open, setOpen] = useState(false);
  const [foodDetails, setFoodDetails] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(false);
  const [openReadyToDeliverModal, setOpenReadyToDeliverModal] = useState(false);
  const [foodInfo, setFoodInfo] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingDeliverOrder, setLoadingDeliverOrder] = useState(false);

  let {
    data: orders = [],
    isLoading: customOrdersLoading,
    refetch: customOrdersRefetch,
  } = useQuery({
    queryKey: ["customOrdersFilteredByRestaurant"],
    queryFn: async () => {
      let res = await axios
        .get(`/custom/orders/partner?name=${user.displayName}`)
        .then();
      return res.data;
    },
  });

  const handleOpen = (foodDetails, customerInfo) => {
    setOpen(!open);
    setFoodDetails(foodDetails);
    setCustomerInfo(customerInfo);
  };

  const openConfirmation = (foodInfo) => {
    setOpenReadyToDeliverModal(!openReadyToDeliverModal);
    setFoodInfo(foodInfo);
  };

  const handleRejectOrder = () => {
    setLoadingReject(true);

    axios
      .post(`/reject/order/custom`, {
        orderId: foodDetails.orderId,
      })
      .then(() => {
        setLoadingReject(false);
        setOpen(!open);
        customOrdersRefetch();
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

  const handleAcceptOrder = () => {
    setLoadingAccept(true);

    axios
      .post(`/accept/order/custom`, {
        orderId: foodDetails.orderId,
      })
      .then(() => {
        setLoadingAccept(false);
        setOpen(!open);
        customOrdersRefetch();
        toast.success(`Order Accepted!!`, {
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

  const handleDeliverOrder = () => {
    setLoadingDeliverOrder(true);

    axios
      .post(`/deliver/order/custom`, {
        orderId: foodInfo.orderId,
      })
      .then(() => {
        setLoadingDeliverOrder(false);
        setOpenReadyToDeliverModal(!openReadyToDeliverModal);
        customOrdersRefetch();
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

  if (isLoading || customOrdersLoading) {
    return <Loader />;
  }

  return (
    <div>
      {providerInfo.length === 0 ? (
        <div>
          <BeCustomBurgerProvider refetch={refetch} />
        </div>
      ) : (
        <>
          <h2 className="flex flex-row flex-nowrap items-center mt-3">
            <span className="flex-grow block border-t border-green-600"></span>
            <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-green-400 text-white">
              Your Offered Ingredients
            </span>
            <span className="flex-grow block border-t border-green-600"></span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {providerInfo.ing.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 border-2 border-gray-600 p-3 rounded-lg shadow-xl hover:shadow-2xl"
              >
                <div className="text-xl flex items-center gap-3">
                  <span>{item.name}</span>{" "}
                  <div>
                    {item.name === "Tomato" && (
                      <img src="/tomato.png" className="w-14 h-14" />
                    )}

                    {item.name === "Meat" && (
                      <img src="/burger-patty.png" className="w-12 h-12" />
                    )}

                    {item.name === "Lettuse" && (
                      <img src="/lettuce.png" className="w-12 h-12" />
                    )}

                    {item.name === "Cheese" && (
                      <img src="/cheese.png" className="w-12 h-12" />
                    )}
                  </div>
                </div>
                <span className="text-lg">Price: ৳ {item.price}</span>
                <button
                  onClick={() => openUpdatePrice(item)}
                  className="flex justify-center items-center text-lg gap-2 mt-2 bg-transparent text-green-800"
                >
                  <div>
                    <FaRegEdit />
                  </div>
                  <span>Update Price</span>
                </button>
              </div>
            ))}
          </div>

          {/* Section to display custom burger orders */}
          <div className="customBurger-orders mt-16">
            <h2 className="flex flex-row flex-nowrap items-center mt-3">
              <span className="flex-grow block border-t border-green-600"></span>
              <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-green-400 text-white">
                Custom Burger Orders
              </span>
              <span className="flex-grow block border-t border-green-600"></span>
            </h2>

            <div>
              {orders.length === 0 ? (
                <>
                  <div className="my-10">
                    <div className="my-10">
                      <div className="flex flex-col justify-center items-center">
                        <img
                          src="https://i.ibb.co/cy5395Z/empty-cart.png"
                          className="w-[100px]"
                        />

                        <h1 className="text-4xl font-bold my-5 italic text-gray-700">
                          No custom burger order yet!!
                        </h1>
                      </div>
                    </div>
                  </div>
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
                                    customerData.burger.map((item, index) => (
                                      <tr key={index}>
                                        <td className="p-2 whitespace-nowrap">
                                          <div className="flex items-center justify-center">
                                            <div className="font-bold text-xl text-gray-800">
                                              ৳ {item.totalPrice}
                                            </div>
                                          </div>
                                        </td>

                                        <td className="p-2 whitespace-nowrap">
                                          <div className="text-center font-medium text-green-500">
                                            {/* Conditional Chip */}
                                            <div
                                              className={`custom-chip text-base font-bold w-[50%] mx-auto py-1 rounded-lg capitalize flex justify-center items-center gap-2 ${
                                                item.status ===
                                                  "order received" &&
                                                "bg-brown-500 text-white"
                                              } ${
                                                item.status === "cooking" &&
                                                "bg-indigo-500 text-white"
                                              } ${
                                                item.status ===
                                                  "out for delivery" &&
                                                "bg-teal-500 text-white"
                                              } ${
                                                item.status === "completed" &&
                                                "bg-green-500 text-white"
                                              } ${
                                                item.status === "cancelled" &&
                                                "bg-red-500 text-white"
                                              }`}
                                            >
                                              {item.status ===
                                                "order received" && (
                                                <MdOutlineCallReceived
                                                  size={"20"}
                                                />
                                              )}
                                              {item.status === "cooking" && (
                                                <PiCookingPotFill size={"30"} />
                                              )}
                                              {item.status ===
                                                "out for delivery" && (
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
                                            {item.status ===
                                              "out for delivery" && (
                                              <div>N/A</div>
                                            )}
                                            {item.status === "completed" && (
                                              <div>N/A</div>
                                            )}

                                            {item.status ===
                                              "order received" && (
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
                                                onClick={() =>
                                                  openConfirmation(item)
                                                }
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
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Order Details Modal */}
          <Dialog className="p-3" size="lg" open={open} handler={handleOpen}>
            <div className="flex gap-5">
              <div className="flex flex-col justify-center items-center w-3/5">
                {foodDetails.note && (
                  <div className="userNote mb-3">
                    <div
                      className="flex justify-center items-center gap-2 bg-yellow-500 rounded-lg p-2 mb-4 text-lg text-black"
                      role="alert"
                    >
                      <MdOutlineStickyNote2 className="text-2xl" />
                      <div>{foodDetails.note}</div>
                    </div>
                  </div>
                )}

                <img
                  src="https://i.ibb.co/HYR6fx4/top.jpg"
                  className="w-[250px]"
                />

                {foodDetails.ingredients?.map((item, index) => (
                  <img src={item.image} key={index} className="w-[250px]" />
                ))}

                <img
                  src="https://i.ibb.co/LQ6StVG/bottom.jpg"
                  className="w-[250px]"
                />
              </div>

              <div className="flex flex-col w-2/5">
                <div className="mt-2 flex flex-wrap gap-2">
                  <Chip
                    value={`Total Price: ৳ ${foodDetails.totalPrice}`}
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
                    className="capitalize text-white text-base bg-gray-600"
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
                    disabled={loadingAccept || loadingReject ? true : false}
                  >
                    {loadingAccept ? (
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
                    disabled={loadingReject || loadingAccept ? true : false}
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
                      <span className="text-blue-500">custom burger</span> is
                      ready to be delivered?
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

          {/* Modal to update ingredients price */}
          <Dialog
            size="xs"
            open={openUpdatePriceModal}
            handler={openUpdatePrice}
          >
            <div className="p-5">
              <span className="text-xl text-gray-800">
                Update price of {ingredientsInfo.name}
              </span>

              <div className="mt-3">
                <Input
                  type="number"
                  label="Price"
                  defaultValue={ingredientsInfo.price}
                  onChange={handlePriceChange}
                />
              </div>

              <div className="mt-4 flex gap-3">
                <Button
                  onClick={handleUpdatePrice}
                  className="bg-green-600"
                  disabled={loading || !ingredientsInfo.price ? true : false}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-5 ">
                      <ImSpinner9 className="animate-spin text-[20px]" />
                      Updating
                    </div>
                  ) : (
                    "Update"
                  )}
                </Button>

                <Button
                  className="bg-red-600"
                  onClick={() => setOpenUpdatePriceModal(!openUpdatePriceModal)}
                  disabled={loading ? true : false}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default CustomBurger;

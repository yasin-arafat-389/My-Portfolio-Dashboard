import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { authContext } from "../../../Contexts/AuthContext";
import { useContext, useState } from "react";
import Loader from "../../../Utilities/Loader/Loader";
import Swal from "sweetalert2";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";
import { BiSolidOffer } from "react-icons/bi";
import { Button } from "@material-tailwind/react";
import { format } from "date-fns";

const CreateOffer = () => {
  let axios = useAxios();
  let { user } = useContext(authContext);

  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [expiresIn, setExpiresIn] = useState("");
  const [selectedFood, setSelectedFood] = useState("");

  const [loading, setLoading] = useState(false);

  let { data: myOfferedFoods = [], isLoading } = useQuery({
    queryKey: ["myOfferedFoods"],
    queryFn: async () => {
      let res = await axios
        .get(`/offered/foods?restaurant=${user.displayName}`)
        .then();
      return res.data;
    },
  });

  let {
    data: myOffers = [],
    isLoading: isMyOffersLoading,
    refetch,
  } = useQuery({
    queryKey: ["myOffers"],
    queryFn: async () => {
      let res = await axios
        .get(`/get-coupons?restaurant=${user.displayName}`)
        .then();
      return res.data;
    },
  });

  const handleCreateOffer = (e) => {
    e.preventDefault();

    setLoading(true);

    let parsedDiscountAmount = parseInt(discountAmount);

    if (!selectedFood) {
      setLoading(false);

      Swal.fire({
        title: "You must select a food!",
        icon: "warning",
      });
      return;
    }

    const currentDateTime = new Date();
    const expirationDateTime = new Date(expiresIn);

    if (expirationDateTime <= currentDateTime) {
      setLoading(false);

      Swal.fire({
        title: "Select valid date time!",
        icon: "warning",
      });
      return;
    }

    if (selectedFood.price < parsedDiscountAmount) {
      setLoading(false);

      Swal.fire({
        title: "Discount amount can not be bigger than actual price!!",
        icon: "warning",
      });

      return;
    }

    const payload = {
      couponCode,
      discountAmount: parsedDiscountAmount,
      expiresIn,
      selectedFood: selectedFood,
      restaurant: user.displayName,
      couponUsedBy: [],
    };

    axios.post("/create-offer", payload).then((response) => {
      if (response.data.success === false) {
        setLoading(false);
        Swal.fire({
          title: response.data.message,
          icon: "warning",
        });
        return;
      }

      refetch();
      setLoading(false);
      toast.success("Offer created successfully!");

      setCouponCode("");
      setDiscountAmount("");
      setExpiresIn("");
      setSelectedFood("");
    });
  };

  const handleDeleteOffer = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this offer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/delete-coupon?id=${id}`).then(() => {
          refetch();
          toast.success("Offer deleted successfully!");
        });
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd MMMM, yyyy, hh:mm a");
  };

  if (isLoading || isMyOffersLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div
        className="w-full bg-indigo-50 rounded shadow flex flex-col justify-between p-3"
        id="login"
      >
        <form onSubmit={handleCreateOffer} className="text-[#0866ff]">
          <fieldset className="border-4 border-dotted border-[#0866ff] p-5">
            <legend className="px-2 italic -mx-2 text-xl font-bold">
              Create an offer
            </legend>

            <label className="text-lg after:text-red-400">Coupon Code</label>
            <input
              required
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500"
            />

            <label className="text-lg after:text-red-400">
              Discount amount in Taka
            </label>
            <input
              required
              type="number"
              value={discountAmount}
              onChange={(e) => setDiscountAmount(e.target.value)}
              className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500"
            />

            <label className="text-lg after:text-red-400">
              Coupon Expires in
            </label>
            <input
              required
              type="datetime-local"
              value={expiresIn}
              onChange={(e) => setExpiresIn(e.target.value)}
              className="w-full p-2 mb-2 mt-1 outline-none ring-none focus:ring-2 focus:ring-indigo-500"
            />

            <select
              className="w-full py-3 px-5 outline-none mt-3"
              value={selectedFood?._id || ""}
              onChange={(e) => {
                const selectedFoodItem = myOfferedFoods.find(
                  (item) => item._id === e.target.value
                );
                setSelectedFood(selectedFoodItem);
              }}
            >
              <option value="" disabled selected>
                Select Food
              </option>

              {myOfferedFoods.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            <button
              disabled={loading}
              className="w-full mt-4 rounded bg-[#0866ff] text-indigo-50 p-2 text-center font-bold hover:bg-indigo-400"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-5 ">
                  <ImSpinner9 className="animate-spin text-[20px]" />
                  Creating Offer
                </div>
              ) : (
                "Create Offer"
              )}
            </button>
          </fieldset>
        </form>
      </div>

      <div className="mt-9">
        <h2 className={`flex flex-row flex-nowrap items-center mt-3`}>
          <span className="flex-grow block border-t border-green-600"></span>
          <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-green-400 text-white">
            My Offers
          </span>
          <span className="flex-grow block border-t border-green-600"></span>
        </h2>

        <div>
          <div
            className={`${
              myOffers.length === 0 ? "" : "grid grid-cols-3 gap-5 my-10"
            } `}
          >
            {myOffers.length === 0 ? (
              <div className="flex flex-col gap-8 bg-gray-200 py-8 justify-center items-center w-full mt-8 rounded-xl mb-10">
                <img
                  src="https://i.ibb.co/mytKbqf/no-active-offer.webp"
                  className="w-[150px]"
                />

                <h1 className="text-3xl font-bold italic text-gray-700">
                  You currently have no active offers!!
                </h1>
              </div>
            ) : (
              myOffers.map((item, index) => (
                <div key={index} className="relative w-full">
                  <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#0866ff] rounded-lg"></span>
                  <div className="relative h-full p-3 bg-white border-2 border-[#0866ff] rounded-lg">
                    <div className="flex items-center -mt-1">
                      <BiSolidOffer
                        fontSize={"35"}
                        className="text-[#0866ff]"
                      />
                      <h3 className="my-2 ml-3 text-xl font-bold text-gray-800">
                        {item.discountAmount} taka discount
                      </h3>
                    </div>

                    <p className="my-2 text-gray-800 text-xl">
                      on {item.selectedFood.name}
                    </p>

                    <p className="my-2 text-gray-800 text-lg">
                      Valid till {formatDate(item.expiresIn)}
                    </p>

                    <Button
                      onClick={() => handleDeleteOffer(item._id)}
                      className="bg-red-600 mt-3"
                      size="sm"
                    >
                      Delete Offer
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOffer;

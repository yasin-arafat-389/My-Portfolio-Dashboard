import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { authContext } from "../../../Contexts/AuthContext";
import useAxios from "../../../Hooks/useAxios";
import Loader from "../../../Utilities/Loader/Loader";
import {
  Button,
  Dialog,
  DialogHeader,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";
import notOfferingFoodYet from "./notOfferingFoodsYet.json";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

const MyFoods = () => {
  let { user } = useContext(authContext);
  let axios = useAxios();

  let {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myOfferedFoods"],
    queryFn: async () => {
      let res = await axios
        .get(`/offered/foods?restaurant=${user.displayName}`)
        .then();
      return res.data;
    },
  });

  // Update Food details modal
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [foodDetails, setFoodDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenUpdateModal = (foodDetails) => {
    setOpenUpdateModal(!openUpdateModal);
    setFoodDetails(foodDetails);

    setFormData({
      name: foodDetails.name,
      category: foodDetails.category,
      price: foodDetails.price,
      description: foodDetails.description,
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateFoodDetails = () => {
    setLoading(true);
    let convertedPrice = parseInt(formData.price);
    formData.price = convertedPrice;

    axios.post(`/update/food?id=${foodDetails._id}`, formData).then(() => {
      setLoading(false);
      refetch();
      toast.success(`Updated Successfully!!`, {
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
      setOpenUpdateModal(!openUpdateModal);
    });
  };

  // Handle delete food
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [foodToDelete, setFoodToDelete] = useState(false);

  const openDeleteFoodModal = (details) => {
    setOpenDeleteModal(!openDeleteModal);
    setFoodToDelete(details);
  };

  const handleDeleteFood = () => {
    axios.post(`/delete/food?id=${foodToDelete._id}`).then(() => {
      setLoading(false);
      refetch();
      toast.success(`Deleted Successfully!!`, {
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
      setOpenDeleteModal(!openDeleteModal);
    });
  };

  // Fetch categories for the update modal
  const { data: categories = [], isLoading: isCatLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get("/all-category");
      return response.data;
    },
  });

  const handleDuplicateFood = async (foodDetails) => {
    const duplicateFoodData = {
      name: `${foodDetails.name} (Copy)`,
      category: foodDetails.category,
      price: foodDetails.price,
      description: foodDetails.description,
      image: foodDetails.image,
      restaurant: user.displayName,
    };

    try {
      await axios.post("/add/new/food", duplicateFoodData).then(() => {
        setLoading(false);
        toast.success(`Food Added Successfully`, {
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
      refetch();
    } catch (error) {
      console.error("Error duplicating food:", error);
      toast.error("Failed to duplicate food. Please try again.");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h2
        className={`flex flex-row flex-nowrap items-center mt-3 ${
          data.length === 0 && "hidden"
        }`}
      >
        <span className="flex-grow block border-t border-green-600"></span>
        <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-green-400 text-white">
          My Foods
        </span>
        <span className="flex-grow block border-t border-green-600"></span>
      </h2>

      {/* My Foods cards */}
      <div>
        <div className={`mb-20 ${data.length > 0 && "mt-10"}`}>
          {data.length === 0 && (
            <div>
              <div className="flex flex-col justify-center items-center h-full bg-gray-100 py-7 rounded-lg">
                <div className="w-full">
                  <Lottie
                    animationData={notOfferingFoodYet}
                    loop={true}
                    className="w-[300px] h-[300px] mx-auto bg-gray-300 rounded-full shadow-xl shadow-blue-200"
                  />
                </div>
                <h2 className="text-center text-[30px] md:text-[40px] lg:text-[40px] font-bold leading-tight text-gray-800 pt-10">
                  You are not offering any food yet!!
                </h2>

                <Link
                  className="w-full flex"
                  to={"/restaurant/dashboard/add-new-food"}
                >
                  <Button className="mx-auto capitalize text-lg w-[40%] bg-blue-600 mt-7">
                    Add Food To Get Started
                  </Button>
                </Link>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {data.map((item, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-2xl flex flex-col bg-[#FFD966]"
              >
                <div className="relative">
                  <div>
                    <img
                      className="w-full h-[200px] object-cover"
                      src={item.image}
                    />
                    <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                  </div>
                  <span>
                    <div className="text-xs absolute top-0 right-0 bg-blue-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                      {item.category}
                    </div>
                  </span>
                </div>
                <div className="px-6 py-4">
                  <span className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2">
                    {item.name}
                  </span>
                  <p className="text-gray-800 text-sm line-clamp-3">
                    {item.description}
                  </p>
                </div>
                <div className="flex flex-row text-lg items-center justify-center">
                  <div>Price: ৳ {item.price}</div>
                </div>

                <div className="flex flex-col gap-3 justify-center items-center p-5">
                  <Button
                    className="bg-blue-600"
                    fullWidth
                    onClick={() => handleOpenUpdateModal(item)}
                  >
                    Update
                  </Button>

                  <Button
                    fullWidth
                    className="bg-red-600"
                    onClick={() => openDeleteFoodModal(item)}
                  >
                    Delete
                  </Button>

                  <Button
                    fullWidth
                    className=""
                    onClick={() => handleDuplicateFood(item)}
                  >
                    Duplicate
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Update modal */}
          <Dialog
            open={openUpdateModal}
            size="lg"
            handler={handleOpenUpdateModal}
          >
            <div className="pb-8 pt-2 px-8">
              <DialogHeader>
                Update details of &nbsp;{" "}
                <span className="p-2 bg-yellow-400 rounded-lg italic">
                  {foodDetails.name}
                </span>
              </DialogHeader>

              <div className="flex flex-col gap-5">
                <Input
                  label="Name"
                  defaultValue={foodDetails.name}
                  name="name"
                  onChange={handleInputChange}
                />

                <select
                  className="w-full border-2 border-blue-500 p-2 rounded-lg"
                  value={formData.category} // Bind the category to formData
                  name="category"
                  onChange={handleInputChange}
                >
                  <option disabled selected>
                    Select category
                  </option>
                  {isCatLoading ? (
                    <option>Loading categories...</option>
                  ) : (
                    categories.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))
                  )}
                </select>

                <Input
                  label="Price"
                  type="number"
                  defaultValue={foodDetails.price}
                  name="price"
                  onChange={handleInputChange}
                />
                <Textarea
                  label="Description"
                  defaultValue={foodDetails.description}
                  name="description"
                  onChange={handleInputChange}
                />

                <div className="flex gap-3 justify-center items-center">
                  <Button
                    className="bg-green-600"
                    onClick={handleUpdateFoodDetails}
                    disabled={loading ? true : false}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-5">
                        <ImSpinner9 className="animate-spin text-[20px]" />
                        Updating
                      </div>
                    ) : (
                      "Update"
                    )}
                  </Button>

                  <Button
                    className="bg-red-600"
                    onClick={() => setOpenUpdateModal(!openUpdateModal)}
                    disabled={loading ? true : false}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Dialog>

          {/* Delete Modal */}
          <Dialog
            open={openDeleteModal}
            size="sm"
            handler={openDeleteFoodModal}
          >
            <div className="w-full flex flex-col p-4 relative items-center justify-center shadow-lg rounded-2xl">
              <div className="">
                <div className="text-center p-3 flex-auto justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 flex items-center text-red-600 mx-auto"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <h2 className="text-xl font-bold py-4 text-gray-700">
                    Are you sure you want to delete {foodToDelete.name}?
                  </h2>
                </div>

                <div className="flex gap-3 justify-center items-center">
                  <Button className="bg-red-600" onClick={handleDeleteFood}>
                    Delete
                  </Button>

                  <Button
                    className="bg-gray-600"
                    onClick={() => setOpenDeleteModal(!openDeleteModal)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default MyFoods;

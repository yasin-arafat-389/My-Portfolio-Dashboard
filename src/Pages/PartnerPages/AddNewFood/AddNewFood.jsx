import { Button, Input, Textarea } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { authContext } from "../../../Contexts/AuthContext";
import Swal from "sweetalert2";
import { imageUpload } from "../../../Utilities/ImageUpload/ImageUpload";
import useAxios from "../../../Hooks/useAxios";
import { ImSpinner9 } from "react-icons/im";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const AddNewFood = () => {
  let { user } = useContext(authContext);
  let axios = useAxios();
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.category) {
      setLoading(false);
      return Swal.fire({
        text: "You must select a category",
        icon: "warning",
      });
    }

    if (!selectedFile) {
      setLoading(false);
      return Swal.fire({
        text: "You must upload a food image",
        icon: "warning",
      });
    }

    let imgData = null;

    if (selectedFile) {
      let imageData = await imageUpload(selectedFile, setLoading);
      imgData = imageData;
    }

    let dataToSubmit = {
      ...formData,
      image: imgData?.data?.display_url,
      restaurant: user.displayName,
    };

    axios
      .post(`/add/new/food?name=${user.displayName}`, dataToSubmit)
      .then((res) => {
        if (!res.data.success) {
          setLoading(false);
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
        }

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
        navigate("/restaurant/dashboard/my-foods");
      });
  };

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get("/all-category");
      return response.data;
    },
  });

  return (
    <div>
      <h2 className="flex flex-row flex-nowrap items-center mt-3">
        <span className="flex-grow block border-t border-green-600"></span>
        <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-green-400 text-white">
          Add New Food
        </span>
        <span className="flex-grow block border-t border-green-600"></span>
      </h2>

      {/* Add new food form */}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="w-[60%] mt-10 flex flex-col gap-8">
            <div className="flex gap-3">
              <Input
                color="blue"
                label="Food Name"
                required
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <Input
                type="number"
                color="blue"
                label="Price"
                required
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <select
                className="w-full border-2 border-blue-500 p-2 rounded-lg"
                name="category"
                onChange={handleInputChange}
              >
                <option disabled selected>
                  {isLoading ? "Loading categories..." : "Select category"}
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Textarea
                required
                color="blue"
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="w-full">
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
                      : "Select your Food Image"}
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

            <div>
              <Button type="submit" className="bg-blue-600" fullWidth>
                {loading ? (
                  <div className="flex items-center justify-center gap-5 ">
                    <ImSpinner9 className="animate-spin text-[20px]" />
                    Adding
                  </div>
                ) : (
                  "Add Food"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewFood;

import { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Overview = () => {
  const axios = useAxios();

  let { data = [], refetch } = useQuery({
    queryKey: ["experience"],
    queryFn: async () => {
      let res = await axios.get(`/experience`).then();
      return res.data;
    },
  });

  console.log(data);

  const [formData, setFormData] = useState({
    companyName: "",
    joinDate: "",
    endDate: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/experience", formData).then(() => {
      refetch();
      toast.success("Experience added successfully!");
      setFormData({
        companyName: "",
        joinDate: "",
        endDate: "",
        description: "",
      });
    });
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`/experience/${id}`).then(() => {
            toast.success("Experience deleted successfully!");
            refetch();
          });
        }
      });
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Experience</h2>
      </div>
      <form
        className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="companyName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Company Name:
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            placeholder="Enter company name"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="joinDate"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Join Date:
          </label>
          <input
            type="text"
            id="joinDate"
            name="joinDate"
            value={formData.joinDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="endDate"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            End Date:
          </label>
          <input
            type="text"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter a brief description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>

      <div className="w-full max-w-2xl mt-8">
        <h3 className="text-xl font-bold mb-4">All Experiences</h3>
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Company Name</th>
              <th className="p-3">Join Date</th>
              <th className="p-3">End Date</th>
              <th className="p-3">Description</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((experience) => (
              <tr key={experience._id} className="border-b">
                <td className="p-3">{experience.companyName}</td>
                <td className="p-3">{experience.joinDate}</td>
                <td className="p-3">{experience.endDate}</td>
                <td className="p-3">{experience.description}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(experience._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Overview;

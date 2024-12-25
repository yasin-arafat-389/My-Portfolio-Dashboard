import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageCategories = () => {
  const axios = useAxios();

  let { data = [], refetch } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      let res = await axios.get(`/skills`).then();
      return res.data;
    },
  });

  const [formData, setFormData] = useState({
    skill: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/skills", formData).then(() => {
      refetch();
      toast.success("Skill added successfully!");
      setFormData({
        skill: "",
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
          axios.delete(`/skills/${id}`).then(() => {
            toast.success("Skill deleted successfully!");
            refetch();
          });
        }
      });
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  return (
    <div>
      <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-6">Add a skill</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6"
        >
          <div className="mb-4">
            <label
              htmlFor="companyName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Skill:
            </label>
            <input
              type="text"
              id="skill"
              name="skill"
              value={formData.skill}
              onChange={handleChange}
              placeholder="Enter skill name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>

        <div className="w-full max-w-2xl mt-8">
          <h3 className="text-xl font-bold mb-4">All Skills</h3>
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3">Skill</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((skill) => (
                <tr key={skill._id} className="border-b">
                  <td className="p-3">{skill.skill}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(skill._id)}
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
    </div>
  );
};

export default ManageCategories;

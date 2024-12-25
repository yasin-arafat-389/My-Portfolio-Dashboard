import { useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageVendor = () => {
  let axios = useAxios();

  let { data = [], refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      let res = await axios.get(`/projects`).then();
      return res.data;
    },
  });

  const [formData, setFormData] = useState({
    title: "",
    thumbnail: "",
    description: "",
    feature1: "",
    feature2: "",
    feature3: "",
    feature4: "",
    tech1: "",
    tech2: "",
    tech3: "",
    tech4: "",
    githubLink: "",
    liveLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("/projects", formData).then(() => {
      refetch();
      toast.success("Project added successfully!!");
      setFormData({
        title: "",
        thumbnail: "",
        description: "",
        feature1: "",
        feature2: "",
        feature3: "",
        feature4: "",
        tech1: "",
        tech2: "",
        tech3: "",
        tech4: "",
        githubLink: "",
        liveLink: "",
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
          axios.delete(`/projects/${id}`).then(() => {
            toast.success("Project deleted successfully!");
            refetch();
          });
        }
      });
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Add Project Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Project Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter project title"
              required
            />
          </div>

          {/* Project Thumbnail */}
          <div>
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-700"
            >
              Project thumbnail or cover image URL
            </label>
            <input
              type="text"
              id="thumbnail"
              name="thumbnail"
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Short Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Short Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter a short description of the project"
            ></textarea>
          </div>

          {/* Project Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Project Features
            </h3>
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <label
                  htmlFor={`feature${index + 1}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Feature {index + 1}
                </label>
                <input
                  type="text"
                  id={`feature${index + 1}`}
                  name={`feature${index + 1}`}
                  value={formData[`feature${index + 1}`]}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={`Enter feature ${index + 1}`}
                  required
                />
              </div>
            ))}
          </div>

          {/* Technologies Used */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">
              Technologies Used
            </h3>
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <label
                  htmlFor={`tech${index + 1}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Technology {index + 1}
                </label>
                <input
                  type="text"
                  required
                  id={`tech${index + 1}`}
                  name={`tech${index + 1}`}
                  value={formData[`tech${index + 1}`]}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={`Enter technology ${index + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Links */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="githubLink"
                className="block text-sm font-medium text-gray-700"
              >
                GitHub Repository Link
              </label>
              <input
                type="url"
                id="githubLink"
                required
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter GitHub repository link"
              />
            </div>
            <div>
              <label
                htmlFor="liveLink"
                className="block text-sm font-medium text-gray-700"
              >
                Live Link
              </label>
              <input
                type="url"
                required
                id="liveLink"
                name="liveLink"
                value={formData.liveLink}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter live project link"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit Project
            </button>
          </div>
        </form>
      </div>

      <div className="w-full max-w-2xl mt-8">
        <h3 className="text-xl font-bold mb-4">All Projects</h3>
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Project</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((project) => (
              <tr key={project._id} className="border-b">
                <td className="p-3">{project.title}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(project._id)}
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

export default ManageVendor;

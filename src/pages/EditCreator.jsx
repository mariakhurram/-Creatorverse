import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 
  // Update state to match the required fields for the form
  const [formData, setFormData] = useState({
    name: "",
    youtubeURL: "",
    twitterURL: "",
    instagramURL: "",
    description: "",
    imageURL: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        // Fetch all the required fields, including the new social media URLs
        const { data, error } = await supabase
          .from("creators")
          .select("name, youtubeURL, twitterURL, instagramURL, description, imageURL")
          .eq("id", id)
          .single();

        if (error) {
          throw error;
        }

        // Set the form data, handling null values gracefully
        setFormData({
          name: data.name || "",
          youtubeURL: data.youtubeURL || "",
          twitterURL: data.twitterURL || "",
          instagramURL: data.instagramURL || "",
          description: data.description || "",
          imageURL: data.imageURL || "",
        });
      } catch (err) {
        console.error("Error fetching creator:", err.message);
        alert("Failed to load creator data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("creators")
        .update(formData)
        .eq("id", id);

      if (error) {
        throw error;
      }

      alert("Creator updated successfully!");
      navigate(`/creator/${id}`); // Corrected redirect path to the details page
    } catch (err) {
      console.error("Error updating creator:", err.message);
      alert("Failed to update creator.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this creator?")) return;

    try {
      const { error } = await supabase
        .from("creators")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      alert("Creator deleted successfully!");
      navigate("/"); // Redirect to the homepage after deletion
    } catch (err) {
      console.error("Error deleting creator:", err.message);
      alert("Failed to delete creator.");
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-white">Loading creator...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 shadow-xl rounded-xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Creator</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 text-white border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 text-white border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="url"
              name="imageURL"
              placeholder="Image URL"
              value={formData.imageURL}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-2">Social Media Links</h3>
          <div>
            <label className="block text-sm font-medium mb-1">YouTube URL</label>
            <input
              type="url"
              name="youtubeURL"
              placeholder="YouTube URL"
              value={formData.youtubeURL}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Twitter URL</label>
            <input
              type="url"
              name="twitterURL"
              placeholder="Twitter URL"
              value={formData.twitterURL}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Instagram URL</label>
            <input
              type="url"
              name="instagramURL"
              placeholder="Instagram URL"
              value={formData.instagramURL}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700 transition-colors"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex-1 bg-red-600 text-white py-2 rounded-md font-bold hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCreator;
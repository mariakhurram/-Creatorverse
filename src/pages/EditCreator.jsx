import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase
          .from("creators")
          .select("name, url, description, imageURL")
          .eq("id", id)
          .single();

        if (error) throw error;
        setFormData(data);
      } catch (err) {
        console.error("Error fetching creator:", err.message);
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

      if (error) throw error;
      alert("Creator updated successfully!");
      navigate(`/view/${id}`);
    } catch (err) {
      console.error("Error updating creator:", err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this creator?")) return;

    try {
      const { error } = await supabase
        .from("creators")
        .delete()
        .eq("id", id);

      if (error) throw error;
      alert("Creator deleted successfully!");
      navigate("/"); 
    } catch (err) {
      console.error("Error deleting creator:", err.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading creator...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Edit Creator</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="url"
          name="url"
          placeholder="URL"
          value={formData.url}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          type="text"
          name="imageURL"
          placeholder="Image URL (optional)"
          value={formData.imageURL || ""}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

 
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 mb-3"
        >
          Update Creator
        </button>

 
        <button
          type="button"
          onClick={handleDelete}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Delete Creator
        </button>
      </form>
    </div>
  );
};

export default EditCreator;

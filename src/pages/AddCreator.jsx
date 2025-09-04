import React, { useState } from "react";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";

const AddCreator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    twitterURL: "",
    instagramURL: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("creators")
        .insert([formData])
        .select();

      if (error) {
        throw error;
      }

      console.log('Creator added:', data);
      alert("Creator added successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error adding creator:", err.message);
      alert("Failed to add creator. Check the console for details.");
    }
  };

  return (
    <div className="creator-form-page">
      <form
        onSubmit={handleSubmit}
        className="creator-form"
      >
        <h2>Add a New Creator</h2>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="The Korean Vegan"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Provide a description of the creator."
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="url"
            name="imageURL"
            placeholder="https://via.placeholder.com/150"
            value={formData.imageURL}
            onChange={handleChange}
          />
        </div>

        <h3>Social Media Links</h3>

        <div className="form-group">
          <label>Twitter URL</label>
          <input
            type="url"
            name="twitterURL"
            placeholder="https://twitter.com/thekoreanvegan"
            value={formData.twitterURL}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Instagram URL</label>
          <input
            type="url"
            name="instagramURL"
            placeholder="https://instagram.com/thekoreanvegan"
            value={formData.instagramURL}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">
          Add Creator
        </button>
      </form>
    </div>
  );
};

export default AddCreator;

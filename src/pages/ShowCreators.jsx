import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../client";
import { FaYoutube, FaTwitter, FaInstagram, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import ContentCreator from "../components/ContentCreator";

const ShowCreators = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const { data, error } = await supabase
          .from("creators")
          .select()
          // .eq("id", id)
          // .single();

        if (error) {
          throw error;
        }

        if (data) {
          setCreator(data);
          setError(null);
        } else {
          setError("Creator not found.");
        }
       
      } catch (err) {
        console.error("Error fetching creator:", err.message);
        setError("Failed to load creator data. Please check the ID.");
      } finally {
        setLoading(false);
      }
    };
    fetchCreator();
  }, [id]);

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

      navigate("/");
    } catch (err) {
      console.error("Error deleting creator:", err.message);
      alert("Failed to delete creator.");
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-white text-xl">Loading creator...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500 text-xl">{error}</p>;
  }
console.log(creator);

  return (
    <div className="show-creator-page">
     
        {creator.map((c)=>(<div className="creator-details-container"><ContentCreator creator={c}></ContentCreator></div>))}
         {/* <img
          src={creator.imageURL || 'https://via.placeholder.com/200x200.png?text=No+Image'}
          alt={creator.name}
        />
        <div className="creator-details-content">
          <h1>{creator.name}</h1>
          <p>{creator.description}</p>
          <div className="creator-details-links">
            {creator.youtubeURL && (
              <a href={creator.youtubeURL} target="_blank" rel="noopener noreferrer">
                <FaYoutube /> @thekoreanvegan
              </a>
            )}
            {creator.twitterURL && (
              <a href={creator.twitterURL} target="_blank" rel="noopener noreferrer">
                <FaTwitter /> @thekoreanvegan
              </a>
            )}
            {creator.instagramURL && (
              <a href={creator.instagramURL} target="_blank" rel="noopener noreferrer">
                <FaInstagram /> @thekoreanvegan
              </a>
            )}
          </div>
          <div className="creator-details-actions">
            <Link
              to={`/edit/${id}`}
              className="edit-button"
            >
              <FaPencilAlt /> Edit
            </Link>
            <button
              onClick={handleDelete}
              className="delete-button"
            >
              <FaTrashAlt /> Delete
            </button>
          </div> */}
        {/* </div> */}
  
    </div>
  );
};

export default ShowCreators;
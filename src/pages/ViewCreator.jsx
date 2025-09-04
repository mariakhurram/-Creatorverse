import React, { useEffect, useState } from "react";
import { supabase } from "../client";
import ContentCreator from "../components/ContentCreator";
import { Link } from "react-router-dom";

const ViewCreator = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase.from("creators").select("*");
        if (error) throw error;
        setCreators(data);
      } catch (err) {
        console.error("Error fetching creators:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCreators();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-white">Loading creators...</p>;
  }
  
  if (error) {
    return<p className="text-center mt-10 text-red-500 text-xl">{error}</p>
  }
  
  return (
    <div className="view-creator-page">
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text"> CREATORVERSE</h1>
      <div className="flex justify-center md:justify-start space-x-4 mb-8">
        <Link
          to="/"
          className="button">
          View All Creators
        </Link>
        <Link
          to="/add"
          className="button">
          Add a Creator
        </Link>
      </div>
    </div>

      
    </div>
  );
};

export default ViewCreator;
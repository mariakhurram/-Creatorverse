import React, { useState, useEffect } from "react";
import { supabase } from "../client";
import ContentCreator from "../components/ContentCreator";
import { Link } from "react-router-dom";

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        let { data, error } = await supabase.from("creators").select("*");
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

  if (loading) return <p className="text-center mt-10">Loading creators...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">💫 Creatorverse</h1>
        <Link to="/new">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
            ➕ Add Creator
          </button>
        </Link>
      </div>

      {creators.length === 0 ? (
        <p className="text-center text-gray-500">No content creators found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {creators.map((creator) => (
            <ContentCreator
              key={creator.id}
              id={creator.id}
              name={creator.name}
              url={creator.url}
              description={creator.description}
              imageURL={creator.imageURL}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowCreators;

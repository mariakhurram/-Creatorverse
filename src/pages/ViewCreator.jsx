import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import ContentCreator from "../components/ContentCreator";

const ViewCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
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
        setCreator(data);
      } catch (err) {
        console.error("Error fetching creator:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading creator...</p>;
  }

  if (!creator) {
    return <p className="text-center mt-10 text-gray-500">Creator not found.</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ContentCreator
        name={creator.name}
        url={creator.url}
        description={creator.description}
        imageURL={creator.imageURL}
      />
    </div>
  );
};

export default ViewCreator;

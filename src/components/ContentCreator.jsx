import React from "react";
import { Link } from "react-router-dom";

const ContentCreator = ({ id, name, url, description, imageURL }) => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-2xl overflow-hidden p-4">
      {imageURL && (
        <img
          src={imageURL}
          alt={name}
          className="w-full h-48 object-cover rounded-xl"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-medium mt-3 inline-block"
          >
            Visit Creator
          </a>
        )}
        <Link
          to={`/edit/${id}`}
          className="text-green-600 font-medium ml-4"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default ContentCreator;

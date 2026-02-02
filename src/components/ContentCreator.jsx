import React from "react";
import { Link } from "react-router-dom";
import { FaYoutube, FaTwitter, FaInstagram, FaPencilAlt, FaInfoCircle } from 'react-icons/fa';

const ContentCreator = ({ creator }) => {
  const { id, name, description, imageURL, youtubeURL, twitterURL, instagramURL } = creator;

  return (
    <div className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <Link to={`/edit/${id}`}>
        <img
          src={imageURL}
          alt={name}
          className="w-full h-48 object-cover object-center"
        />
        <div className="absolute top-2 right-2 flex space-x-2 p-2 rounded-full">
          <FaInfoCircle className="text-white text-lg" />
          <FaPencilAlt className="text-white text-lg" />
        </div>
      </Link>
      <div className="p-4 flex flex-col items-start text-left">
        <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{description}</p>
        <div className="flex space-x-4 mt-auto">
          {youtubeURL && (
            <a href={youtubeURL} target="_blank" rel="noopener noreferrer">
              <FaYoutube className="text-red-500 text-2xl transition-colors hover:text-red-600" />
            </a>
          )}
          {twitterURL && (
            <a href={twitterURL} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-blue-400 text-2xl transition-colors hover:text-blue-500" />
            </a>
          )}
          {instagramURL && (
            <a href={instagramURL} target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-pink-500 text-2xl transition-colors hover:text-pink-600" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentCreator;

import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Share2, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
          Share Your Story Through Images
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Join our community and share your moments with the world. Connect with others through the power of visual storytelling.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-white rounded-lg shadow-md transform transition-all hover:scale-105">
            <Camera className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Share Photos</h3>
            <p className="text-gray-600">Upload and share your favorite moments with our community</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md transform transition-all hover:scale-105">
            <Share2 className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p className="text-gray-600">Build connections with people who share your interests</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md transform transition-all hover:scale-105">
            <Users className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">Join a vibrant community of creators and storytellers</p>
          </div>
        </div>

        <div className="space-x-4">
          <Link
            to="/register"
            className="inline-block px-8 py-3 text-lg font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="inline-block px-8 py-3 text-lg font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
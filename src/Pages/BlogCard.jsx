import React from 'react';
import { Link } from 'react-router'; 
import { motion } from 'framer-motion';

const BlogCard = ({ blog, handleWishlist }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: '0px 10px 30px rgba(0,0,0,0.1)' }}
      className="bg-gray-200 rounded-xl shadow-md hover:shadow-xl transition duration-300  md:h-140  p-4 flex flex-col justify-between font-[sora] text-gray-800 mx-auto"
    >
      <img
        src={blog.image}
        alt={blog.title}
        className=" w-full h-60 rounded-lg mb-4"
      />

      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded mb-2">
        {blog.category}
      </span>

      <h2 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h2>

      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
        {blog.shortDescription}
      </p>

      
      <div className="flex items-center gap-3 mb-4">
        <img
          src={blog.photoURL || '/default-avatar.png'}
          referrerPolicy='no-referrer'
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="text-sm text-gray-500">
          <p className="font-semibold text-gray-700">{blog.name}</p>
          
        </div>
      </div>

     
      <div className="mt-auto flex justify-between">
        <Link
          to={`/allBlogs/${blog._id}`}
          className="px-4 py-1.5 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          See Details
        </Link>
        <button
          onClick={() => handleWishlist(blog._id)}
          className="px-4 py-1.5 text-sm rounded bg-rose-500 text-white hover:bg-rose-600"
        >
          Wishlist
        </button>
      </div>
    </motion.div>
  );
};

export default BlogCard;

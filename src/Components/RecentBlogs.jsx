import React from 'react';
import { BsBookmarkStarFill } from 'react-icons/bs';
import { BiMessageRounded } from 'react-icons/bi';
import { motion } from 'framer-motion';
const RecentBlogs = ({ blogData }) => {
  const { _id, title, category, name, photoURL } =
    blogData;
  const formattedDate = () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-US', options);
  };
  const reactions = Math.floor(Math.random() * 10);
  const readingTime = Math.floor(Math.random() * 10) + 1; 
  const comments = Math.floor(Math.random() * 10) +2;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, boxShadow: '0px 10px 30px rgba(0,0,0,0.1)' }}
      className="card bg-gray-100 w-90 h-68 shadow-sm font-[sora]"
    >
      <div className="flex gap-10 mt-2 p-3 items-center ">
        <div className="flex items-center gap-2">
          <img src={photoURL} className="rounded-full w-10 h-10 object-cover" />
          <h1 className="font-bold text-orange-600 text-xs">{name}</h1>
        </div>
        <small className="text-xs text-gray-500">{formattedDate()}</small>
      </div>

      <div className="card-body ">
        <h2 className="card-title text-sm text-gray-600">{title}</h2>
        <p className="text-xs text-green-800 font-bold"># {category}</p>
        <div className="flex flex-col justify-between items-baseline mt-2 text-sm text-gray-500">
          <div className="flex gap-10 justify-around items-center">
            <div>
              <span>💖</span>
              <span>👏</span>
              <span>🔥</span>
              <span>{reactions} reactions</span>
            </div>
            <div className='flex items-center gap-1 text-gray-800 text-sm'>
              <BiMessageRounded /> {comments} comments
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between w-full">
            <button className="btn btn-sm bg-red-400 text-white hover:bg-red-500  px-4 py-1 text-xs rounded-md">
              Read More
            </button>
            <button className="flex gap-2 text-gray-500 ">
              <span>⏱️ {readingTime} min read</span>
              <BsBookmarkStarFill
                size="20px"
                className="cursor-pointer hover:text-red-500"
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentBlogs;
import React, { useEffect, useState } from 'react';
import { BsBookmarkStarFill } from 'react-icons/bs';
import { BiMessageRounded } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import UseAuth from '../Hooks/UseAuth';

import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';

const RecentBlogs = ({ blogData }) => {
  const { _id, title, category, name, photoURL } = blogData;
  const formattedDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  const reactions = Math.floor(Math.random() * 10);
  const readingTime = Math.floor(Math.random() * 10) + 1;
  const comments = Math.floor(Math.random() * 10) + 2;
  const { post, get } = useAxios();
  const { user } = UseAuth();
  const [isWished, setIsWished] = useState(false);
  const queryClient = useQueryClient();

  const addToWishList = useMutation({
    mutationFn: async ({ blogId, userEmail }) => {
      const res = await post('/wishList', {
        blogId,
        userEmail,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Added to wishlist');
      setIsWished(true); 
      queryClient.invalidateQueries(['wishListBlogs', user?.email]); 
    },
    onError: err => {
      toast.error(err?.response?.data?.message || 'Failed to add to wishlist');
    },
  });

  useEffect(() => {
    const fetchWishlistStatus = async () => {
      try {
        const res = await get(
          `/wishList/${user?.email}`
        );
        const wishedIds = res.data.map(item => item._id.toString());
        setIsWished(wishedIds.includes(_id));
      } catch (error) {
        console.error('Failed to fetch wishlist:', error);
      }
    };

    if (user?.email) fetchWishlistStatus();
  }, [user, _id, get]);

  return (
    <>
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

      <div className="card-body">
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
            <div className="flex items-center gap-1 text-gray-800 text-sm">
              <BiMessageRounded /> {comments} comments
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between w-full">
            <Link
              to={`/allBlogs/${_id}`}
              className="btn btn-sm bg-red-400 text-white hover:bg-red-500 px-4 py-1 text-xs rounded-md"
            >
              Read More
            </Link>
            <button
              onClick={() => {
                if (!user?.email) {
                  return toast.error('Please login to add to wishlist');
                }
                if (isWished) {
                  return toast('Already in wishlist');
                }
                addToWishList.mutate({ blogId: _id, userEmail: user.email });
              }}
              className="flex items-center gap-1 text-blue-600 hover:text-red-500 disabled:opacity-50"
              disabled={isWished || addToWishList.isLoading}
            >
              <BsBookmarkStarFill size="20px" />
            </button>
              <span>⏱️ {readingTime} min read</span>
          </div>
        </div>
      </div>
    </motion.div>
        
    </>
  );
};

export default RecentBlogs;

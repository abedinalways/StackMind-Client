import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import BlogCard from './BlogCard';
import UseAuth from '../Hooks/UseAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { user } = UseAuth();
  const queryClient = useQueryClient();

  const loadBlogs = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/allBlogs`, {
        params: { category, search },
      });
      setBlogs(res.data);
    } catch (err) {
      toast.error('Error loading blogs');
    }
  };

  useEffect(() => {
    axios.get('http://localhost:3000/categories').then(res => {
      setCategories(['All', ...res.data]);
    });
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [category, search]);

  const handleSearch = e => {
    e.preventDefault();
    loadBlogs();
  };

  const handleCategoryChange = e => {
    setCategory(e.target.value === 'All' ? '' : e.target.value);
  };
  
  
  //
  const { data: wishlistedBlogs = [] } = useQuery({
    queryKey: ['wishListBlogs', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axios.get(
        `http://localhost:3000/wishList/${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const wishlistedIds = wishlistedBlogs.map(blog => blog._id);

  const mutation = useMutation({
    mutationFn: async ({ blogId }) => {
      return await axios.post('http://localhost:3000/wishList', {
        blogId,
        userEmail: user.email,
      });
    },
    onSuccess: (data, variables) => {
      toast.success('Added to wishlist');
      queryClient.invalidateQueries(['wishListBlogs', user?.email]);
    },
    onError: err => {
      toast.error(err?.response?.data?.message || 'Failed to add to wishlist');
    },
  });

  const handleWishlist = blogId => {
    if (!user?.email) return toast.error('Please login to add to wishlist');
    if (wishlistedIds.includes(blogId)) {
      return toast('Already in wishlist');
    }
    mutation.mutate({ blogId });
  };

  return (
    <div className="container mx-auto px-4 py-10 ">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <form
          onSubmit={handleSearch}
          className="flex mx-auto justify-center items-center font-[mulish]"
        >
          <input
            type="text"
            className="input md:w-80  border-amber-200 bg-white"
            placeholder="Search blogs by title"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="btn bg-orange-500 text-white ml-1" type="submit">
            Search
          </button>
        </form>
        <select
          value={category || 'All'}
          onChange={handleCategoryChange}
          className="select border-amber-200 bg-white w-60 mx-auto font-[mulish] text-gray-700"
          aria-label="Select Category"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {blogs.map(blog => (
          <BlogCard
            key={blog._id}
            blog={blog}
            isWished={wishlistedIds.includes(blog._id)}
            onWishlist={handleWishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;

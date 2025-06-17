import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import BlogCard from './BlogCard';
import UseAuth from '../Hooks/UseAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxios from '../Hooks/useAxios';

const AllBlogs = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { user } = UseAuth();
  const { get, post } = useAxios();
  const queryClient = useQueryClient();

  const {
    data: blogs = [],
    isLoading: loadingBlogs,
    error: blogsError,
  } = useQuery({
    queryKey: ['blogs', category, search],
    queryFn: async () => {
      const res = await get('/allBlogs', {
        params: { category: category || undefined, search },
      });
      return res;
    },
    enabled: true,
  });

  const {
    data: categories = [],
    isLoading: loadingCategories,
    error: categoriesError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await get('/categories');
      return ['All', ...res];
    },
  });

  const { data: wishlistedBlogs = [], isLoading: loadingWishlist } = useQuery({
    queryKey: ['wishListBlogs', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await get(`/wishList/${user.email}`);
      return res;
    },
    enabled: !!user?.email,
  });

  const wishlistedIds = wishlistedBlogs.map(blog => blog._id);

  const mutation = useMutation({
    mutationFn: async ({ blogId }) => {
      return await post('/wishList', { blogId, userEmail: user.email });
    },
    onSuccess: () => {
      toast.success('Added to wishlist');
      queryClient.invalidateQueries(['wishListBlogs', user?.email]);
    },
    onError: err => {
      toast.error(err?.response?.data?.error || 'Failed to add to wishlist');
    },
  });

  const handleSearch = e => {
    e.preventDefault();
  };

  const handleCategoryChange = e => {
    setCategory(e.target.value === 'All' ? '' : e.target.value);
  };

  const handleWishlist = blogId => {
    if (!user?.email) return toast.error('Please login to add to wishlist');
    if (wishlistedIds.includes(blogId)) {
      return toast('Already in wishlist');
    }
    mutation.mutate({ blogId });
  };

  useEffect(() => {
    if (blogsError && !blogsError.response?.status === 401) {
      toast.error('Error loading blogs');
    }
    if (categoriesError && !categoriesError.response?.status === 401) {
      toast.error('Error loading categories');
    }
  }, [blogsError, categoriesError]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <form
          onSubmit={handleSearch}
          className="flex mx-auto justify-center items-center font-[mulish]"
        >
          <input
            type="text"
            className="input md:w-80 border-amber-200 bg-white"
            placeholder="Search blogs by title"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            className="btn bg-orange-500 text-white ml-1"
            type="submit"
            disabled={loadingBlogs || loadingCategories}
          >
            Search
          </button>
        </form>
        <select
          value={category || 'All'}
          onChange={handleCategoryChange}
          className="select border-amber-200 bg-white w-60 mx-auto font-[mulish] text-gray-700"
          aria-label="Select Category"
          disabled={loadingCategories}
        >
          {loadingCategories ? (
            <option>Loading categories...</option>
          ) : (
            categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))
          )}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {loadingBlogs || loadingWishlist ? (
          <p className="text-center">Loading blogs...</p>
        ) : blogsError ? (
          <p className="text-center text-red-500">Failed to load blogs</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found</p>
        ) : (
          blogs.map(blog => (
            <BlogCard
              key={blog._id}
              blog={blog}
              isWished={wishlistedIds.includes(blog._id)}
              onWishlist={handleWishlist}
              disabled={mutation.isLoading}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AllBlogs;

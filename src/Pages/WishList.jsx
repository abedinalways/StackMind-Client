import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';

import toast from 'react-hot-toast';
import UseAuth from '../Hooks/UseAuth';
import useAxios from '../Hooks/useAxios';



const columnHelper = createColumnHelper();

const WishList = () => {
  const { user } = UseAuth();
  const queryClient = useQueryClient();
  const [sorting, setSorting] = useState([]);
  const { get, del } = useAxios();
  
  
  const {
    data: blogs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['wishListBlogs', user?.email],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error('User not logged in');
      }
      const res = await get(
        `http://localhost:3000/wishList/${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email, 
  });

  
  const removeFromWishList = useMutation({
    mutationFn: async blogId => {
      const res = await del(
        `http://localhost:3000/wishList/${blogId}?email=${user.email}`
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['wishListBlogs', user?.email]);
      toast.success('Blog removed from wishlist');
    },
    onError: err => {
     
      console.error('Error removing from wishlist:', err);
    },
  });

  
  const columns = [
    columnHelper.accessor('title', {
      header: 'Title',
      cell: info => (
        <Link
          to={`/allBlogs/${info.row.original._id}`}
          className="text-blue-600 hover:underline"
        >
          {info.getValue()}
        </Link>
      ),
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: info => <span className="capitalize">{info.getValue()}</span>,
    }),
    columnHelper.accessor('name', {
      header: 'Author',
    }),
    columnHelper.accessor('wordCount', {
      header: 'Word Count',
      cell: info => info.getValue().toLocaleString(),
    }),
    columnHelper.accessor('createdAt', {
      header: 'Published Date',
      cell: info =>
        new Date(info.getValue()).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: info => (
        <div className="flex gap-2">
          <Link
            to={`/allBlogs/${info.row.original._id}`}
            className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs sm:text-sm"
          >
            Details
          </Link>
          <button
            onClick={() => removeFromWishList.mutate(info.row.original._id)}
            className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs sm:text-sm"
            disabled={removeFromWishList.isLoading}
          >
            {removeFromWishList.isLoading ? 'Removing...' : 'Remove'}
          </button>
        </div>
      ),
    }),
  ];

  
  const table = useReactTable({
    data: blogs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

 
  useEffect(() => {
    if (error) {
      console.error('Error fetching wishlist:', error);
    }
  }, [error]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-lg text-gray-600">
          Please log in to view your wishlist.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 font-[Sora] min-h-screen">
      <h1 className="text-3xl sm:text-4xl text-orange-500 font-bold text-center mb-6">
        My Wishlisted Blogs
      </h1>
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        {/* Table for larger screens */}
        <table className="w-full border-collapse hidden md:table">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="bg-blue-600 text-white">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="p-3 text-left cursor-pointer text-sm sm:text-base"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <span>↑</span>,
                        desc: <span>↓</span>,
                      }[header.column.getIsSorted()] || null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="p-3 text-gray-800 text-sm sm:text-base"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Stacked layout for mobile */}
        <div className="md:hidden divide-y divide-gray-200">
          {blogs.map(blog => (
            <div key={blog._id} className="p-4 hover:bg-gray-50">
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Title: </span>
                <Link
                  to={`/allBlogs/${blog._id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {blog.title}
                </Link>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Category: </span>
                <span className="capitalize text-sm">{blog.category}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Author: </span>
                <span className="text-sm">{blog.name}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">
                  Word Count:{' '}
                </span>
                <span className="text-sm">
                  {blog.wordCount.toLocaleString()}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">
                  Published Date:{' '}
                </span>
                <span className="text-sm">
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                <Link
                  to={`/allBlogs/${blog._id}`}
                  className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                >
                  Details
                </Link>
                <button
                  onClick={() => removeFromWishList.mutate(blog._id)}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                  disabled={removeFromWishList.isLoading}
                >
                  {removeFromWishList.isLoading ? 'Removing...' : 'Remove'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {blogs.length === 0 && (
          <p className="text-center text-gray-500 py-4 text-sm sm:text-base">
            No blogs in your wishlist.
          </p>
        )}
      </div>

      
    </div>
  );
};

export default WishList;

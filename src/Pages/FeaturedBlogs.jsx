import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from '@tanstack/react-table';
import axios from 'axios';
import toast from 'react-hot-toast';

// Define column helper
const columnHelper = createColumnHelper();

const FeaturedBlogs = () => {
  // Fetch featured blogs
  const {
    data: blogs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['featuredBlogs'],
    queryFn: async () => {
      try {
        const res = await axios.get('http://localhost:3000/featuredBlogs');
        return res.data;
      } catch (err) {
        console.error('Axios error:', err.response?.data, err.message);
        throw err;
      }
    },
  });

  // Define columns
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
    
  ];

  // Initialize table
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data: blogs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  // Handle error
  useEffect(() => {
    if (error) {
      toast.error(`Failed to fetch featured blogs: ${error.message}`);
      console.error('Error fetching featured blogs:', error);
    }
  }, [error]);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-6 font-[Mulish] md:font-[sora] min-h-screen">
      <h1 className="text-2xl md:text-4xl text-orange-500 font-bold text-center mb-6">
        Featured Blogs: Top 10 by Word Count
      </h1>
      <div className="bg-white rounded-xl shadow-md">
        {/* Table for larger screens */}
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="bg-blue-600 text-white">
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="p-3 text-left cursor-pointer md:text-lg text-[10px]"
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
                    className="p-2 text-gray-800 md:text-sm text-[8px]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {blogs.length === 0 && (
          <p className="text-center text-gray-500 py-4 text-[8px] md:text-md">
            No featured blogs found.
          </p>
        )}
      </div>

      
    </div>
  );
};

export default FeaturedBlogs;

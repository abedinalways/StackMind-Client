import React from 'react';
import Banner from '../Components/Banner';
import { useLoaderData } from 'react-router';
import RecentBlogs from '../Components/RecentBlogs';
import Newsletter from '../Components/Newsletter';

const Home = () => {
  const blogs = useLoaderData();

  return (
    <div className="bg-red-50 dark:bg-gray-900 min-h-screen">
      <Banner />
      <div className="container mx-auto px-4 py-10">
        {/* Main content with blogs and newsletter sidebar */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Recent Blogs Section */}
          <div className="flex-1">
            <h1
              className="text-center font-extrabold font-[Suse] text-3xl md:text-5xl mt-4 text-orange-500 dark:text-white"
              aria-label="Recent Blogs Section"
            >
              Recent Blogs
            </h1>
            <p className="text-center font-[Suse] text-lg md:text-xl mb-4 text-orange-500 dark:text-white">
              Explore the latest blogs on various topics
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2  gap-4 px-2 md:px-6 my-5 justify-center items-center">
              {blogs && blogs.length > 0 ? (
                blogs.map(blogData => (
                  <RecentBlogs key={blogData._id} blogData={blogData} />
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-300">
                  No blogs available at the moment.
                </p>
              )}
            </div>
          </div>
          {/* Newsletter Sidebar */}
          <div className="md:w-[30%] md:mt-28">
            <Newsletter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import Banner from '../Components/Banner';
import { Link, useLoaderData } from 'react-router';
import RecentBlogs from '../Components/RecentBlogs';
import Newsletter from '../Components/Newsletter';
import { FaLongArrowAltRight } from 'react-icons/fa';
import StarPerson from '../Components/StarPerson';
import WorkshopPromo from '../Components/WorkshopPromo';
import StackMindFamily from '../Components/StackMindFamily';
const Home = () => {
  const blogs = useLoaderData();

  return (
    <div className="bg-red-50 dark:bg-gray-900 min-h-screen">
      <Banner />
      <div className="container mx-auto px-4 py-10">
        
        <div className="flex flex-col lg:flex-row gap-10">
         
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
            <div className="flex justify-center">
              <Link to="/blogs" className="font-[Suse] btn btn-link text-lg text-gray-800 cursor-pointer dark:text-white">
                SEE MORE LATEST ARTICLES <span><FaLongArrowAltRight /></span>
              </Link>
            </div>
          </div>
          {/* Newsletter Sidebar */}
          <div className="md:w-[30%] md:mt-28">
            <Newsletter />
          </div>
        </div>
      </div>
      <StarPerson />
      <WorkshopPromo />
      <StackMindFamily/>
    </div>
  );
};

export default Home;

import React from 'react';

import { Link } from 'react-router';
import './404.css';
import Navbar from '../Components/Navbar';


const ErrorPage = () => {
  return (
    <>
      <Navbar/>
      <section className="page_404 min-h-screen">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="col-sm-10 col-sm-offset-1 text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center mb-2">404</h1>
                </div>

                <div className="content_box_404 mt-8">
                  <h3 className="h2">Looks like you're lost</h3>

                  <p>The page you are looking for is not available!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex justify-center md:mr-40">
        <Link to={'/'}>
          <button className="btn btn-link border-yellow-300 bg-gray-100 text-blue-600 ml-2">
            ⬅️ Go to Homepage
          </button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;

import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Root = () => {
  return (
    <div>
      <Navbar/>
      <div className="min-h-[calc(100vh-290px)]">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
};

export default Root;
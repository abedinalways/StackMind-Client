
import React, { use } from 'react';
import { IoMenu } from 'react-icons/io5';
import { LuBrainCircuit } from 'react-icons/lu';
import { NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';
const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success('Log Out Successfully');
      })
      .catch(error => console.log(error));
  };

  const nav = (
    <>
      {user ? (
        <div></div>
      ) : (
        <div className='flex flex-col gap-2'>
          <NavLink
            to="/login"
            className="btn btn-ghost bg-white text-red-500 font-bold font-[sora] border-1 border-cyan-200 rounded-sm text-md hover:bg-red-500 hover:text-white px-6 md:hidden mb-2"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="btn btn-ghost bg-white text-red-500 font-bold font-[sora] border-1 border-cyan-200 rounded-sm text-md hover:bg-red-500 hover:text-white px-6 md:hidden mb-2"
          >
            SignUp
          </NavLink>
        </div>
      )}

      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'text-lg font-bold text-yellow-200 underline' : ''
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/addBlog"
        className={({ isActive }) =>
          isActive ? 'text-lg font-bold text-yellow-200 underline' : ''
        }
      >
        Add Blog
      </NavLink>
      <NavLink
        to="/blogs"
        className={({ isActive }) =>
          isActive ? 'text-lg font-bold text-yellow-200 underline' : ''
        }
      >
        All Blogs
      </NavLink>
      <NavLink
        to="/featuredBlogs"
        className={({ isActive }) =>
          isActive ? 'text-lg font-bold text-yellow-200 underline' : ''
        }
      >
        Featured Blogs
      </NavLink>
      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          isActive ? 'text-lg font-bold text-yellow-200 underline' : ''
        }
      >
        Wishlist
      </NavLink>
    </>
  );

  const navEnd = (
    <div className="flex gap-2">
      {user ? (
        <>
          <NavLink
            onClick={handleSignOut}
            to="/login"
            className="btn bg-white text-red-500 font-bold font-[sora] border-1 border-cyan-200 rounded-sm text-md hover:bg-red-500 hover:text-white px-6  md:flex hidden"
          >
            Logout
          </NavLink>
        </>
      ) : (
        <NavLink
          to="/login"
          className="btn bg-white text-red-500 font-bold font-[sora] border-1 border-cyan-200 rounded-sm text-md hover:bg-red-500 hover:text-white px-6 md:flex hidden"
        >
          Login
        </NavLink>
      )}

      {user ? (
        <>
          {' '}
          <div className="dropdown dropdown-hover">
            <div tabIndex={0}>
              <button className="btn btn-circle bg-red-500 w-10 h-10 border-1 border-cyan-200 hover:bg-red-500">
                <img
                  src={user?.photoURL}
                  className="w-10 h-10 rounded-full mt-1"
                />
              </button>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-30 md:mr-40 shadow-sm"
            >
              <li className="text-orange-600 font-bold font-[sora] text-[12px] mt-3 ml-4 md:flex">
                {user?.displayName}
              </li>
              <li>
                <NavLink
                  onClick={handleSignOut}
                  to="/login"
                  className="btn bg-red-500 text-white font-bold font-[sora] border-1 border-cyan-200 rounded-sm text-md hover:bg-white hover:text-red-500 px-6 md:hidden"
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>{' '}
        </>
      ) : (
        <NavLink
          to="/register"
          className="btn bg-white text-red-500 font-bold font-[sora] border-1 border-cyan-200 rounded-sm text-md hover:bg-red-500 hover:text-white px-6 md:flex hidden"
        >
          SingUp
        </NavLink>
      )}
    </div>
  );

  return (
    <div className="navbar shadow-sm bg-red-500">
      <div className="navbar-start">
        <div className="flex text-white">
          {/* dropdown menu */}
          <div className="drawer md:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer"
                className="btn btn-md bg-red-500 drawer-button"
              >
                <IoMenu />
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-white min-h-full w-70 p-4 font-[suse] font-bold">
                {/* Sidebar content here */}
                {nav}
              </ul>
            </div>
          </div>
          <span className="flex items-center px-4 ml-10 md:ml-0">
            {' '}
            <LuBrainCircuit size="30px" />{' '}
            <h3 className="font-[Sora] text-xl font-bold">StackMind</h3>
          </span>
        </div>
      </div>
      <div className="navbar-center font-bold font-[suse] text-white ">
        <div className="md:flex hidden gap-5 justify-center items-center">
          {nav}
        </div>
        <div className="md:hidden flex-col ml-10">{navEnd}</div>
      </div>
      <div className="navbar-end mx-20 md:flex gap-2 font-[sora] font-bold hidden">
        {navEnd}
      </div>
    </div>
  );
};

export default Navbar;
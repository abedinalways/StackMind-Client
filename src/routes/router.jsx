import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../Pages/Root';
import Home from '../Pages/Home';
import Login from '../Components/Login';
import Register from '../Components/Register';
import AddBlog from '../Pages/AddBlog';
import PrivateRoute from './PrivateRoute';
import AllBlogs from '../Pages/AllBlogs';
import BlogDetails from '../Components/BlogDetails';
import UpdateBlog from '../Pages/UpdateBlog';
import FeaturedBlogs from '../Pages/FeaturedBlogs';
import WishList from '../Pages/WishList';
import ErrorPage from '../ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        path: '/',
        hydrateFallbackElement: (
          <span className="loading loading-ball loading-xs"></span>
        ),
        loader: async() =>{
          const res = await fetch('http://localhost:3000/blogs', { credentials: 'include' });
          if (!res.ok) throw new Error('Failed to fetch blogs');
         return res.json();
        },
        Component: Home,
      },
      {
        path: 'addBlog',
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
      {
        path: '/blogs',
        hydrateFallbackElement: (
          <span className="loading loading-ball loading-xs"></span>
        ),
        loader: () =>
          fetch('http://localhost:3000/allBlogs', { credentials: 'include' }),
        element: (
          
            <AllBlogs></AllBlogs>
          
        ),
      },
      {
        path: '/allBlogs/:id',
        hydrateFallbackElement: (
          <span className="loading loading-ball loading-xs"></span>
        ),
        loader: async ({ params }) => {
    const res = await fetch(`http://localhost:3000/allBlogs/${params.id}`, {
      credentials: 'include',
    });
    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        return null; // Handle unauthenticated access
      }
      throw new Error('Failed to fetch blog');
    }
    return res.json();
  },
  element: <BlogDetails />,
},
     
      {
        path: '/updateBlog/:id',
        hydrateFallbackElement: (
          <span className="loading loading-ball loading-xs"></span>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/allBlogs/${params.id}`, {
            credentials: 'include',
          }),
        element: (
          <PrivateRoute>
            <UpdateBlog></UpdateBlog>
          </PrivateRoute>
        ),
      },
      {
        path: '/featuredBlogs',
        hydrateFallbackElement: (
          <span className="loading loading-ball loading-xs"></span>
        ),
        loader: () =>
          fetch('http://localhost:3000/featuredBlogs', {
            credentials: 'include',
          }),
        element: <FeaturedBlogs></FeaturedBlogs>,
      },
      {
        path: '/wishList',
        element: (
          <PrivateRoute>
            <WishList></WishList>
          </PrivateRoute>
        ),
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      },
    ],
  },
]);

export default router;
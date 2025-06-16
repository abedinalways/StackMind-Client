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

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        path: '/',
        hydrateFallbackElement: (
          <span className="loading loading-ball loading-xs"></span>
        ),
        loader: () =>
          fetch('http://localhost:3000/blogs', { credentials: 'include' }),
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
          <PrivateRoute>
            <AllBlogs></AllBlogs>
          </PrivateRoute>
        ),
      },
      {
        path: '/allBlogs/:id',
        hydrateFallbackElement: (
          <span className="loading loading-ball loading-xs"></span>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/allBlogs/${params.id}`, {
            credentials: 'include',
          }),
        element: (
          <PrivateRoute>
            <BlogDetails></BlogDetails>
          </PrivateRoute>
        ),
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
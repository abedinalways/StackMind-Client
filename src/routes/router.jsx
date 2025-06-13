import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../Pages/Root';
import Home from '../Pages/Home';
import Login from '../Components/Login';
import Register from '../Components/Register';
import AddBlog from '../Pages/AddBlog';
import PrivateRoute from './PrivateRoute';
import AllBlogs from '../Pages/AllBlogs';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        path:'/',
        hydrateFallbackElement: (
          <span className="loading loading-ball loading-xs"></span>
        ),
        loader: () => fetch('http://localhost:3000/blogs'),
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
        path:'/allBlogs',
        hydrateFallbackElement: (
          <span className="loading loading-ball loading-xs"></span>
        ),
        loader: () => fetch('http://localhost:3000/allBlogs'),
        element:<PrivateRoute><AllBlogs></AllBlogs></PrivateRoute>
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
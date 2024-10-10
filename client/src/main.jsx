import React from "react";
import  ReactDOM  from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import { Error404 } from './components/common/Error404.jsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <>
        <Error404 />
      </>
    ),
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

      <RouterProvider router={router} />
  </React.StrictMode>
)
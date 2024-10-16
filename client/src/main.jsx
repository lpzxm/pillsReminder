import React from "react";
import './index.css'
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Error404 } from './components/common/Error404.jsx';
import { HomePage } from "./pages/homePage.jsx";
import { AddAlarm } from "./components/common/alarms/addAlarms.jsx";
import { ViewAlarms } from "./components/common/alarms/viewAlarms.jsx";
import { AlarmChecker } from "./components/common/alarms/alarmChecker.jsx";

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <>
        <Error404 />
      </>
    ),
  },
  {
    path: "/",
    element: (
      <>
        <HomePage />
      </>
    ),
  },
  {
    path: "/alarms",
    element: (
      <>
        <ViewAlarms />
        <AlarmChecker />
      </>
    ),
  },
  {
    path: "/alarms/addAlarms",
    element: (
      <>
        <AddAlarm />
      </>
    ),
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
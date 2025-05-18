import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About/About";
import AddJob from "../pages/AddJob/AddJob";
import Contact from "../pages/Contact/Contact";
import Home from "../pages/Home/Home";
import JobApply from "../pages/JobApply/JobApply";
import JobDetails from "../pages/JobDetails/JobDetails";
import MyApplications from "../pages/MyApplications/MyApplications";
import MyPostedJobs from "../pages/MyPostedJobs/MyPostedJobs";
import Register from "../pages/Register/Register";
import Services from "../pages/Services/Services";
import SignIn from "../pages/SignIn/SignIn";
import ViewApplicationsAdmin from "../pages/ViewApplications(Admin)/ViewApplicationsAdmin";
import PrivateRoute from "./PrivateRoute";
import AllJobs from "../pages/AllJobs/AllJobs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h2>Route not found</h2>,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("http://localhost:5000/jobsCount"),
      },
      {
        path: "/allJobs",
        element: (
          <PrivateRoute>
            <AllJobs />
          </PrivateRoute>
        ),
        // loader: ({ params }) =>
        //   fetch(`http://localhost:5000/jobs/${params.id}`),
      },
      {
        path: "/jobs/:id",
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/jobs/${params.id}`),
      },
      {
        path: "/myApplications",
        element: (
          <PrivateRoute>
            <MyApplications />
          </PrivateRoute>
        ),
      },
      {
        path: "/jobApply/:id",
        element: (
          <PrivateRoute>
            <JobApply />
          </PrivateRoute>
        ),
      },
      {
        path: "/addJob",
        element: (
          <PrivateRoute>
            <AddJob />
          </PrivateRoute>
        ),
      },
      {
        path: "/myPostedJobs",
        element: (
          <PrivateRoute>
            <MyPostedJobs />
          </PrivateRoute>
        ),
      },
      {
        path: "/viewApplicationsAdmin/:job_id",
        element: (
          <PrivateRoute>
            <ViewApplicationsAdmin />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/viewApplicationsAdmin/${params.job_id}`),
      },
      {
        path: "/contact",
        element: (
          <PrivateRoute>
            <Contact />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: (
          <PrivateRoute>
            <About />
          </PrivateRoute>
        ),
      },
      {
        path: "/services",
        element: (
          <PrivateRoute>
            <Services />
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
]);

export default router;

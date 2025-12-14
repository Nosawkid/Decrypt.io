import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserLayout from "./layouts/UserLayout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Starred from "./pages/Starred";
import Lost from "./pages/Lost";
import NewTransmission from "./pages/NewTransmission";
import TransmissionView from "./pages/TransmissionView";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",

        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "starred",
        element: <Starred />,
      },
      {
        path: "lost",
        element: <Lost />,
      },
      {
        path: "/new",
        element: <NewTransmission />,
      },
      {
        path: "/transmission/:id",
        element: <TransmissionView />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

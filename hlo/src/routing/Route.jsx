
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; 
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />, 
  },
  {
    path:'/login',
    element:<Login/>
  },

]);

export default function Route() {
  return (
    <RouterProvider router={router} />
  );
}

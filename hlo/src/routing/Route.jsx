import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import AddEvent from '../pages/addEvent/AddEvent';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/createEvent',
    element: <AddEvent />,
  },
]);

export default function Route() {
  return (
    <RouterProvider router={router} />
  );
}

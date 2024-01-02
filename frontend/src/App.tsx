import './App.css'
import Dashboard from './pages/Dashboard';
import Videos from './pages/Videos';

import {
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/videos",
    element: <Videos />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App

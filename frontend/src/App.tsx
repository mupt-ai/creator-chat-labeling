import './App.css'
import Dashboard from './pages/Dashboard';

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App

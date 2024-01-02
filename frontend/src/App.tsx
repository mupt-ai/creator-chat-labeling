import './App.css'
import Dashboard from './pages/Dashboard';
import Videos from './pages/Videos';
import TrainingData from './pages/TrainingData';

import {
  createBrowserRouter,
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
  },
  {
    path: "/training-data",
    element: <TrainingData />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Profile from "./components/Profile";
import Content from "./components/Content";
import People from "./components/People";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path:"/",
        element: <Content/>
      },
      {
        path: "/Profile",
        element: <Profile />,
      },
      {
        path: "/People",
        element: <People />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

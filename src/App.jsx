import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Profile from "./components/Profile";
import Content from "./components/Content";
import People from "./components/People";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Welcome from "./pages/Welcome";
import { useSelector } from "react-redux";



function App() {
  const isLoggedIn= useSelector((state)=>state.auth.isLoggedIn)
  console.log(isLoggedIn)
  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <Home /> : <Welcome/>,
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
    {
      path:"/signup",
      element: <SignUp/>
    },
    {
      path:"/login",
      element: <Login/>
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;

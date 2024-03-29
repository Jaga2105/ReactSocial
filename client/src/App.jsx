import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Content from "./components/content/Content";
import People from "./pages/People";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Welcome from "./pages/Welcome";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

function App() {
  const user = useSelector((state) => state.auth.user);
  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Home /> : <Welcome/>,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute redirectTo={"/login"}>
              <Content />
            </ProtectedRoute>
          ),
        },
        {
          path: "/Profile/:id",
          element: (
            <ProtectedRoute redirectTo={"/login"}>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "/People",
          element: (
            <ProtectedRoute redirectTo={"/login"}>
              <People />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
      // element: (
      //   <ProtectedRoute redirectTo={`${user ? "/" : "/login"}`}>
      //         <Login />
      //       </ProtectedRoute>
      // )
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
}
export const ProtectedRoute = ({ children, redirectTo }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  if (!user) {
    if (redirectTo) {
      navigate(redirectTo);
    } else {
      // Handle the case where redirectTo is not specified
      console.error("ProtectedRoute: redirectTo prop is not specified");
    }

    // Render nothing or a loading/error component if you prefer
    return null;
  }
  return children;
};

export default App;

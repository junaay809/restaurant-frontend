import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PageLoader from "./components/PageLoader";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Appetizers from "./pages/Appetizers";
import Entrees from "./pages/Entrees";
import MainCourses from "./pages/MainCourses";
import Desserts from "./pages/Desserts";
import Drinks from "./pages/Drinks";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import MyOrders from "./pages/MyOrders";
import Checkout from "./pages/Checkout";
import Discover from "./pages/Discover";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Reviews from "./pages/Reviews";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);

  const timer = setTimeout(() => {
    setLoading(false);
  }, 300);

  return () => clearTimeout(timer);
}, [location.pathname]);

  return (
    <>
      <PageLoader loading={loading} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/menu" element={<Menu />} />

        <Route
          path="/menu/appetizers"
          element={<Appetizers />}
        />

        <Route
          path="/menu/entrees"
          element={<Entrees />}
        />

        <Route
          path="/menu/main-courses"
          element={<MainCourses />}
        />

        <Route
          path="/menu/desserts"
          element={<Desserts />}
        />

        <Route
          path="/menu/drinks"
          element={<Drinks />}
        />

        <Route
          path="/auth"
          element={<Auth />}
        />

        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

        <Route
          path="/orders"
          element={<MyOrders />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/reset-password/:uid/:token"
          element={<ResetPassword />}
        />

        <Route
  path="/reviews/:itemId"
  element={<Reviews />}
/>

        <Route
          path="/discover"
          element={<Discover />}
        />
      </Routes>
    </>
  );
}

export default App;
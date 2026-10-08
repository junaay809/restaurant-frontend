import { Navigate } from "react-router-dom";
import { useRestaurant } from "../context/RestaurantContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useRestaurant();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default ProtectedRoute;
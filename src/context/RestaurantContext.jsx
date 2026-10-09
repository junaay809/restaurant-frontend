import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const RestaurantContext = createContext();

const API_BASE_URL = "https://restaurant-backend-production-b36b.up.railway.app";
/* =========================================
   AUTHENTICATED FETCH
========================================= */

const authenticatedFetch = async (url, options = {}) => {
  let accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    throw new Error("Please log in to continue.");
  }

  const makeRequest = (token) =>
    fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });

  let response = await makeRequest(accessToken);

  /* Refresh token if access token expired */
  if (response.status === 401) {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      throw new Error("Please log in again.");
    }

    const refreshResponse = await fetch(
      `${API_BASE_URL}/api/auth/token/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }
    );

    if (!refreshResponse.ok) {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("username");
  localStorage.removeItem("user");

  window.dispatchEvent(
    new CustomEvent("dammy-spice-session-expired")
  );

  throw new Error(
    "Your session has expired. Please log in again."
  );
}

    const refreshData = await refreshResponse.json();

    const newAccessToken = refreshData.access;

    if (!newAccessToken) {
      throw new Error(
        "Unable to refresh your session. Please log in again."
      );
    }

    localStorage.setItem(
      "access_token",
      newAccessToken
    );

    response = await makeRequest(newAccessToken);
  }

  return response;
};


export function RestaurantProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(
  Boolean(
    localStorage.getItem("access_token") &&
    localStorage.getItem("username")
  )
);

const [authUser, setAuthUser] = useState(() => {
  const storedUser = localStorage.getItem("user");

  return storedUser ? JSON.parse(storedUser) : null;
});

useEffect(() => {
  const handleSessionExpired = () => {
    setIsAuthenticated(false);
    setAuthUser(null);
    setCartItems([]);
  };

  window.addEventListener(
    "dammy-spice-session-expired",
    handleSessionExpired
  );

  return () => {
    window.removeEventListener(
      "dammy-spice-session-expired",
      handleSessionExpired
    );
  };
}, []);

  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem(
        "dammySpiceFavorites"
      );

      return savedFavorites
        ? JSON.parse(savedFavorites)
        : [];
    } catch (error) {
      return [];
    }
  });


  /* =========================================
     LOAD CART FROM DJANGO
  ========================================= */

  const loadCart = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setCartItems([]);
      return;
    }

    try {

      const response = await authenticatedFetch(
        `${API_BASE_URL}/api/cart/`
      );

      if (!response.ok) {
        throw new Error("Unable to load cart.");
      }

      const cartData = await response.json();

      const formattedCartItems =
        (cartData.items || []).map((cartItem) => ({
          id: cartItem.menu_item,
          cartItemId: cartItem.id,
          name: cartItem.menu_item_name,
          image: cartItem.menu_item_image,
          price: Number(cartItem.unit_price),
          quantity: Number(cartItem.quantity),
        }));

      setCartItems(formattedCartItems);

    } catch (error) {

      console.error(
        "Error loading cart:",
        error
      );

    }
  };


  /* =========================================
     LOAD CART WHEN APP STARTS
  ========================================= */

 useEffect(() => {

  // Load cart when the app starts
  loadCart();

  // Refresh cart whenever another component
  // changes the Django cart
  const handleCartUpdated = () => {
    loadCart();
  };

  window.addEventListener(
    "dammy-spice-cart-updated",
    handleCartUpdated
  );

  return () => {
    window.removeEventListener(
      "dammy-spice-cart-updated",
      handleCartUpdated
    );
  };

}, []);


  /* =========================================
     ADD TO CART
  ========================================= */

  const addToCart = async (item) => {

    try {

      const response = await authenticatedFetch(
        `${API_BASE_URL}/api/cart/add/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            menu_item_id: item.id,
            quantity: 1,
          }),
        }
      );

      if (!response.ok) {

        const errorData =
          await response.json().catch(() => ({}));

        throw new Error(
          errorData.detail ||
          errorData.error ||
          "Unable to add item to cart."
        );
      }

      const cartData = await response.json();

      const formattedCartItems =
        (cartData.items || []).map((cartItem) => ({
          id: cartItem.menu_item,
          cartItemId: cartItem.id,
          name: cartItem.menu_item_name,
          image: cartItem.menu_item_image,
          price: Number(cartItem.unit_price),
          quantity: Number(cartItem.quantity),
        }));

      setCartItems(formattedCartItems);

    } catch (error) {

      console.error(
        "Error adding item to cart:",
        error
      );

      alert(
        error.message ||
        "Unable to add item to your cart."
      );
    }
  };


  /* =========================================
     REMOVE FROM CART
  ========================================= */

  const removeFromCart = async (cartItemId) => {

    try {

      const response = await authenticatedFetch(
        `${API_BASE_URL}/api/cart/item/${cartItemId}/remove/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to remove item from cart."
        );
      }

      await loadCart();

    } catch (error) {

      console.error(
        "Error removing cart item:",
        error
      );

      alert(
        error.message ||
        "Unable to remove item."
      );
    }
  };


  /* =========================================
     INCREASE QUANTITY
  ========================================= */

  const increaseQuantity = async (cartItemId) => {

    try {

      const item = cartItems.find(
        (cartItem) =>
          cartItem.cartItemId === cartItemId
      );

      if (!item) return;

      const response = await authenticatedFetch(
        `${API_BASE_URL}/api/cart/item/${cartItemId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: item.quantity + 1,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to increase quantity."
        );
      }

      await loadCart();

    } catch (error) {

      console.error(
        "Error increasing quantity:",
        error
      );

      alert(
        error.message ||
        "Unable to increase quantity."
      );
    }
  };


  /* =========================================
     DECREASE QUANTITY
  ========================================= */

  const decreaseQuantity = async (cartItemId) => {

    try {

      const item = cartItems.find(
        (cartItem) =>
          cartItem.cartItemId === cartItemId
      );

      if (!item) return;

      const newQuantity =
        item.quantity - 1;

      /* If quantity reaches zero,
         remove the cart item */

      if (newQuantity <= 0) {

        await removeFromCart(cartItemId);

        return;
      }

      const response = await authenticatedFetch(
        `${API_BASE_URL}/api/cart/item/${cartItemId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: newQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to decrease quantity."
        );
      }

      await loadCart();

    } catch (error) {

      console.error(
        "Error decreasing quantity:",
        error
      );

      alert(
        error.message ||
        "Unable to decrease quantity."
      );
    }
  };


  /* =========================================
     CLEAR CART
  ========================================= */

  const clearCart = async () => {

    try {

      const response = await authenticatedFetch(
        `${API_BASE_URL}/api/cart/clear/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to clear cart."
        );
      }

      setCartItems([]);

    } catch (error) {

      console.error(
        "Error clearing cart:",
        error
      );

      alert(
        error.message ||
        "Unable to clear cart."
      );
    }
  };


  /* =========================================
     FAVORITES
  ========================================= */

  const toggleFavorite = (item) => {
  setFavorites((previousFavorites) => {
    const category = item.category || "Unknown";

    const favoriteId = `${category}-${item.id}`;

    const exists = previousFavorites.some(
      (favorite) => favorite.favoriteId === favoriteId
    );

    const updatedFavorites = exists
      ? previousFavorites.filter(
          (favorite) => favorite.favoriteId !== favoriteId
        )
      : [
          ...previousFavorites,
          {
            ...item,
            category,
            favoriteId,
          },
        ];

    localStorage.setItem(
      "dammySpiceFavorites",
      JSON.stringify(updatedFavorites)
    );

    window.dispatchEvent(
      new CustomEvent("dammy-spice-favorites-updated", {
        detail: updatedFavorites,
      })
    );

    return updatedFavorites;
  });
};

  /* =========================================
     CHECK FAVORITE
  ========================================= */

 const isFavorite = (itemOrId, category) => {
  return favorites.some((favorite) => {
    // When a complete food object is provided
    if (typeof itemOrId === "object" && itemOrId !== null) {
      const itemCategory = itemOrId.category || category;

      return (
        String(favorite.id) === String(itemOrId.id) &&
        (!itemCategory || favorite.category === itemCategory)
      );
    }

    // When only the food ID is provided
    return String(favorite.id) === String(itemOrId);
  });
};


  /* =========================================
     CART COUNT
  ========================================= */

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  /* =========================================
     CART TOTAL
  ========================================= */

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );


  /* =========================================
     SAVE FAVORITES
  ========================================= */

  useEffect(() => {

    localStorage.setItem(
      "dammySpiceFavorites",
      JSON.stringify(favorites)
    );

  }, [favorites]);


  /* =========================================
     CONTEXT
  ========================================= */

  return (

    <RestaurantContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        isAuthenticated,
        authUser,
        setIsAuthenticated,
        setAuthUser,
        loadCart,

        favorites,

        addToCart,
        removeFromCart,

        increaseQuantity,
        decreaseQuantity,

        clearCart,

        toggleFavorite,
        isFavorite,
      }}
    >

      {children}

    </RestaurantContext.Provider>

  );
}


/* =========================================
   CUSTOM HOOK
========================================= */

export function useRestaurant() {

  const context =
    useContext(RestaurantContext);

  if (!context) {

    throw new Error(
      "useRestaurant must be used inside RestaurantProvider"
    );

  }

  return context;
}
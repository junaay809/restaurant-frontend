import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useRestaurant
} from "../context/RestaurantContext";

import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Search,
  ClipboardList,
  User,
  ShoppingBag,
  MapPin,
  CreditCard,
  Heart,
  Wallet,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Plus,
  Trash2,
  Pencil,
  Clock3,
  X,
  AlertTriangle,
  Bell,
  ArrowLeft,
  ShoppingCart,
  PackageOpen,
} from "lucide-react";

import "./Profile.css";
import dammysLogo from "../assets/Dammy's Logo.png";


/* =========================================
   STORAGE KEYS
========================================= */

const PROFILE_USER_KEY = "dammySpiceUser";
const PROFILE_WALLET_KEY = "dammySpiceWallet";
const PROFILE_ADDRESSES_KEY = "dammySpiceAddresses";
const PROFILE_PAYMENT_KEY = "dammySpicePaymentMethods";
const PROFILE_FAVORITES_KEY = "dammySpiceFavorites";
const PROFILE_ORDERS_KEY = "dammySpiceOrders";
const PROFILE_NOTIFICATIONS_KEY =
  "dammySpiceNotifications";
const API_BASE_URL = "https://restaurant-backend-production-b36b.up.railway.app";
/* =========================================
   AUTHENTICATED API REQUEST
========================================= */

const authenticatedFetch = async (url, options = {}) => {
  let accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    throw new Error("Please log in again.");
  }

  const makeRequest = (token) => {
    return fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });
  };

  let response = await makeRequest(accessToken);

  /* -----------------------------------------
     ACCESS TOKEN EXPIRED / INVALID
  ----------------------------------------- */

  if (response.status !== 401) {
    return response;
  }

  const refreshToken =
    localStorage.getItem("refresh_token");

  if (!refreshToken) {
    throw new Error("Please log in again.");
  }

  /* -----------------------------------------
     GET A NEW ACCESS TOKEN
  ----------------------------------------- */

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
    throw new Error(
      "Your session has expired. Please log in again."
    );
  }

  const refreshData =
    await refreshResponse.json();

  const newAccessToken =
    refreshData.access;

  if (!newAccessToken) {
    throw new Error(
      "Unable to refresh your session. Please log in again."
    );
  }

  /* -----------------------------------------
     SAVE NEW ACCESS TOKEN
  ----------------------------------------- */

  localStorage.setItem(
    "access_token",
    newAccessToken
  );

  /* -----------------------------------------
     TRY ORIGINAL REQUEST AGAIN
  ----------------------------------------- */

  response =
    await makeRequest(newAccessToken);

  return response;
};

/* =========================================
   DEFAULT USER
========================================= */

const defaultUser = {
  firstName: "Junaid",
  lastName: "Oluwadamilare",
  phone: "+234 801 234 5678",
  email: "junaid@example.com",
  username: "junaid",
};


/* =========================================
   DEFAULT ADDRESS
========================================= */

const defaultAddresses = [
  {
    id: 1,
    title: "Home",
    address: "12 Example Street, Lagos",
    default: true,
  },
];


/* =========================================
   DEFAULT DATA
========================================= */

const defaultPaymentMethods = [];

const defaultFavorites = [];

const defaultNotifications = [
  {
    id: 1,
    title: "Welcome to Dammy & Spice",
    message:
      "Your account is ready. Start exploring our menu.",
    type: "system",
    read: false,
    date: "Just now",
  },
];


/* =========================================
   SAFE STORAGE READER
========================================= */

const getStoredData = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);

    if (!saved) {
      return fallback;
    }

    return JSON.parse(saved);
  } catch (error) {
    console.error(
      `Unable to read ${key} from localStorage.`,
      error
    );

    return fallback;
  }
};


/* =========================================
   PROFILE COMPONENT
========================================= */

function Profile() {

  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated, setAuthUser } = useRestaurant();
  const { cartCount } = useRestaurant();

  const [newPhone, setNewPhone] = useState("");
const [phoneSaving, setPhoneSaving] = useState(false);

const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [passwordSaving, setPasswordSaving] = useState(false);

const savePassword = async () => {
  if (!currentPassword || !newPassword || !confirmPassword) {
    alert("Please fill in all password fields.");
    return;
  }

  if (newPassword.length < 8) {
    alert("Your new password must be at least 8 characters.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("The new passwords do not match.");
    return;
  }

  const token = localStorage.getItem("access_token");

  if (!token) {
    alert("Please log in again.");
    return;
  }

  setPasswordSaving(true);

  try {
    const response = await fetch(
      "https://restaurant-backend-production-b36b.up.railway.app/api/auth/password/change/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password: currentPassword,
          new_password: newPassword,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Failed to change password."
      );
    }

    alert("Password changed successfully!");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setActiveModal(null);
  } catch (error) {
    alert(error.message || "Something went wrong.");
  } finally {
    setPasswordSaving(false);
  }
};

const [newEmail, setNewEmail] = useState("");
const [emailSaving, setEmailSaving] = useState(false);

const saveEmail = async () => {
  if (!newEmail.trim()) {
    alert("Please enter your new email address.");
    return;
  }

  const token = localStorage.getItem("access_token");

  if (!token) {
    alert("Please log in again.");
    return;
  }

  setEmailSaving(true);

  try {
    const response = await fetch(
      "https://restaurant-backend-production-b36b.up.railway.app/api/auth/profile/update/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: newEmail.trim(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.email?.[0] ||
        data.error ||
        "Failed to update email address."
      );
    }

    alert("Email address updated successfully!");
    setActiveModal(null);
    setNewEmail("");
  } catch (error) {
    alert(error.message || "Something went wrong.");
  } finally {
    setEmailSaving(false);
  }
};

const savePhoneNumber = async () => {
  if (!newPhone.trim()) {
    alert("Please enter your new phone number.");
    return;
  }

  const token = localStorage.getItem("access_token");

  if (!token) {
    alert("Please log in again.");
    return;
  }

  setPhoneSaving(true);

  try {
    const response = await fetch(
      "https://restaurant-backend-production-b36b.up.railway.app/api/auth/profile/update/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phone: newPhone.trim(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.phone?.[0] ||
        data.error ||
        "Failed to update phone number."
      );
    }

    alert("Phone number updated successfully!");
    setActiveModal(null);
    setNewPhone("");
  } catch (error) {
    alert(error.message || "Something went wrong.");
  } finally {
    setPhoneSaving(false);
  }
};

  /* =========================================
     SIDE MENU
  ========================================= */

  const [menuOpen, setMenuOpen] = useState(false);


  const openMenu = () => {
    setMenuOpen(true);
  };


  const closeMenu = () => {
    setMenuOpen(false);
  };


  /* =========================================
     NAVIGATION
  ========================================= */

  const goToHome = () => {
    navigate("/");
    closeMenu();
  };


  const goToDiscover = () => {
    navigate("/discover");
    closeMenu();
  };


  const goToOrders = () => {
    navigate("/orders");
    closeMenu();
  };


  const goToProfile = () => {
    navigate("/profile");
    closeMenu();
  };


  /* =========================================
     BACK BUTTON
  ========================================= */

  const handleProfileBack = () => {

    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }

  };


  /* =========================================
     CART BUTTON
  ========================================= */

  const handleProfileCart = () => {
    navigate("/orders");
  };


  /* =========================================
     USER
  ========================================= */

  const [user, setUser] = useState(() => {
  const storedUser = localStorage.getItem("user");
  const storedUsername = localStorage.getItem("username");

  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);

      return {
        id: parsedUser.id,
        username:
          parsedUser.username ||
          storedUsername ||
          "",
        email: parsedUser.email || "",
        firstName: parsedUser.first_name || "",
        lastName: parsedUser.last_name || "",
        phone: parsedUser.phone || "",
        profilePicture:
          parsedUser.profile_picture || null,
      };
    } catch {
      // Ignore invalid stored user data
    }
  }

  return {
    id: null,
    username: storedUsername || "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    profilePicture: null,
  };
});

  const [userLoading, setUserLoading] = useState(true);

  
  useEffect(() => {
  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setUserLoading(false);
      return;
    }

    try {
      const response = await authenticatedFetch(
  `${API_BASE_URL}/api/auth/me/`,
  {
    method: "GET",
  }
);

      if (!response.ok) {
        throw new Error("Unable to load your account.");
      }

      const data = await response.json();

      const formattedUser = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        phone: data.phone || "",
        profilePicture: data.profile_picture || null,
      };

      setUser(formattedUser);

      localStorage.setItem(
        PROFILE_USER_KEY,
        JSON.stringify(formattedUser)
      );

      // Keep the username used by the Header in sync
      localStorage.setItem(
        "username",
        data.username
      );

localStorage.setItem(
  "user",
  JSON.stringify(data)
);

    } catch (error) {
      console.error(
        "Unable to load current user:",
        error
      );
    } finally {
      setUserLoading(false);
    }
  };

  fetchCurrentUser();
}, []);

  /* =========================================
     WALLET
  ========================================= */

const [walletBalance, setWalletBalance] = useState(0);
const [walletLoading, setWalletLoading] = useState(true);
const [walletError, setWalletError] = useState("");

/* =========================================
   LOAD WALLET FROM BACKEND
========================================= */

useEffect(() => {
  const fetchWallet = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setWalletLoading(false);
      return;
    }

    try {
      setWalletLoading(true);
      setWalletError("");

      const response = await authenticatedFetch(
        `${API_BASE_URL}/api/wallet/`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
          data.error ||
          "Unable to load your wallet."
        );
      }

      setWalletBalance(Number(data.balance || 0));

    } catch (error) {
      console.error(
        "Error loading wallet:",
        error
      );

      setWalletError(
        "We couldn't load your wallet balance."
      );

    } finally {
      setWalletLoading(false);
    }
  };

  fetchWallet();
}, []);


  /* =========================================
     ADDRESSES
  ========================================= */

const [addresses, setAddresses] = useState([]);
const [addressesLoading, setAddressesLoading] = useState(true);
const [addressesError, setAddressesError] = useState("");

/* =========================================
   LOAD ADDRESSES FROM BACKEND
========================================= */

useEffect(() => {

  const fetchAddresses = async () => {

    try {

      setAddressesLoading(true);
      setAddressesError("");

      const token =
        localStorage.getItem("access_token");

      if (!token) {
        setAddresses([]);
        return;
      }

      const response = await authenticatedFetch(
        `${API_BASE_URL}/api/auth/addresses/`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {

        throw new Error(
          "Unable to load addresses."
        );

      }

      const data =
        await response.json();

      const backendAddresses =
        Array.isArray(data)
          ? data
          : data.results || [];

      const formattedAddresses =
        backendAddresses.map((address) => ({
          id: address.id,
          title: address.title,
          address: address.address,
          default: Boolean(address.is_default),
        }));

      setAddresses(formattedAddresses);

    } catch (error) {

      console.error(
        "Error loading addresses:",
        error
      );

      setAddressesError(
        "We couldn't load your addresses."
      );

    } finally {

      setAddressesLoading(false);

    }

  };

  fetchAddresses();

}, []);


  /* =========================================
     PAYMENT METHODS
  ========================================= */

  const [paymentMethods, setPaymentMethods] =
    useState(() =>
      getStoredData(
        PROFILE_PAYMENT_KEY,
        defaultPaymentMethods
      )
    );


  /* =========================================
     FAVORITES
  ========================================= */

  const [favorites, setFavorites] =
    useState(() =>
      getStoredData(
        PROFILE_FAVORITES_KEY,
        defaultFavorites
      )
    );


  /* =========================================
     NOTIFICATIONS
  ========================================= */

  const [notifications, setNotifications] =
    useState(() =>
      getStoredData(
        PROFILE_NOTIFICATIONS_KEY,
        defaultNotifications
      )
    );


  /* =========================================
     ACTIVE MODAL
  ========================================= */

  const [activeModal, setActiveModal] =
    useState(null);


  /* =========================================
     EDIT PROFILE
  ========================================= */

  const [editUsername, setEditUsername] = useState(
  user.username || ""
);

const [profileSaving, setProfileSaving] = useState(false);


  /* =========================================
     ADD ADDRESS FORM
  ========================================= */

  const [newAddressTitle, setNewAddressTitle] =
    useState("");

  const [newAddressValue, setNewAddressValue] =
    useState("");


  /* =========================================
     USER INITIAL
  ========================================= */

 const userInitial = useMemo(
  () =>
    user.username
      ?.trim()
      ?.charAt(0)
      ?.toUpperCase() || "U",
  [user.username]
);


  /* =========================================
     DEFAULT ADDRESS
  ========================================= */

  const defaultAddress =
    addresses.find(
      (address) => address.default
    ) || addresses[0] || null;


  /* =========================================
     UNREAD NOTIFICATIONS
  ========================================= */

  const unreadNotifications =
    notifications.filter(
      (notification) =>
        !notification.read
    ).length;


  /* =========================================
     ACTIVE NAVIGATION
  ========================================= */

  const isHome =
    location.pathname === "/";

  const isDiscover =
    location.pathname.startsWith("/discover");

  const isOrders =
    location.pathname.startsWith("/orders");

  const isProfile =
    location.pathname.startsWith("/profile");


  /* =========================================
     SAVE USER
  ========================================= */

  useEffect(() => {

    localStorage.setItem(
      PROFILE_USER_KEY,
      JSON.stringify(user)
    );

  }, [user]);


  /* =========================================
     SAVE ADDRESSES
  ========================================= */

  useEffect(() => {

    localStorage.setItem(
      PROFILE_ADDRESSES_KEY,
      JSON.stringify(addresses)
    );

    window.dispatchEvent(
      new CustomEvent(
        "dammy-spice-address-updated",
        {
          detail: addresses,
        }
      )
    );

  }, [addresses]);


  /* =========================================
     SAVE PAYMENT METHODS
  ========================================= */

  useEffect(() => {

    localStorage.setItem(
      PROFILE_PAYMENT_KEY,
      JSON.stringify(paymentMethods)
    );

  }, [paymentMethods]);


  /* =========================================
     SAVE FAVORITES
  ========================================= */

  useEffect(() => {

    localStorage.setItem(
      PROFILE_FAVORITES_KEY,
      JSON.stringify(favorites)
    );

    window.dispatchEvent(
      new CustomEvent(
        "dammy-spice-favorites-updated",
        {
          detail: favorites,
        }
      )
    );

  }, [favorites]);


  const [orders, setOrders] = useState([]);
const [ordersLoading, setOrdersLoading] = useState(true);
const [ordersError, setOrdersError] = useState("");

useEffect(() => {
  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      setOrdersError("");

      const token = localStorage.getItem("access_token");

      if (!token) {
        setOrders([]);
        return;
      }

      const response = await authenticatedFetch(
        `${API_BASE_URL}/api/orders/`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Unable to load orders.");
      }

      const data = await response.json();

      setOrders(
        Array.isArray(data)
          ? data
          : data.results || []
      );
    } catch (error) {
      console.error("Error loading orders:", error);
      setOrdersError("We couldn't load your orders.");
    } finally {
      setOrdersLoading(false);
    }
  };

  fetchOrders();
}, []);


  /* =========================================
     SAVE NOTIFICATIONS
  ========================================= */

  useEffect(() => {

    localStorage.setItem(
      PROFILE_NOTIFICATIONS_KEY,
      JSON.stringify(notifications)
    );

  }, [notifications]);


  /* =========================================
     SYNC FAVORITES IN SAME TAB
  ========================================= */

  useEffect(() => {

    const handleFavoritesUpdate = (event) => {

      if (event.detail) {
        setFavorites(event.detail);
      }

    };


    window.addEventListener(
      "dammy-spice-favorites-updated",
      handleFavoritesUpdate
    );


    return () => {

      window.removeEventListener(
        "dammy-spice-favorites-updated",
        handleFavoritesUpdate
      );

    };

  }, []);


  /* =========================================
     SYNC OTHER PROFILE DATA
  ========================================= */

  useEffect(() => {

    const handleStorageChange = (event) => {

      if (event.key === PROFILE_USER_KEY) {
        setUser(
          getStoredData(
            PROFILE_USER_KEY,
            defaultUser
          )
        );
      }


      if (event.key === PROFILE_WALLET_KEY) {
        setWalletBalance(
          getStoredData(
            PROFILE_WALLET_KEY,
            5000
          )
        );
      }


      if (event.key === PROFILE_ADDRESSES_KEY) {
        setAddresses(
          getStoredData(
            PROFILE_ADDRESSES_KEY,
            defaultAddresses
          )
        );
      }


      if (event.key === PROFILE_PAYMENT_KEY) {
        setPaymentMethods(
          getStoredData(
            PROFILE_PAYMENT_KEY,
            defaultPaymentMethods
          )
        );
      }


      if (event.key === PROFILE_FAVORITES_KEY) {
        setFavorites(
          getStoredData(
            PROFILE_FAVORITES_KEY,
            defaultFavorites
          )
        );
      }


      if (event.key === PROFILE_NOTIFICATIONS_KEY) {
        setNotifications(
          getStoredData(
            PROFILE_NOTIFICATIONS_KEY,
            defaultNotifications
          )
        );
      }

    };


    window.addEventListener(
      "storage",
      handleStorageChange
    );


    return () => {

      window.removeEventListener(
        "storage",
        handleStorageChange
      );

    };

  }, []);


/* =========================================
   CONTINUE WITH PART 2
========================================= */

/* =========================================
     SAVE PROFILE
  ========================================= */

  const saveProfile = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    alert("Please log in again.");
    return;
  }

  const username = editUsername.trim();

  if (!username) {
    alert("Username cannot be empty.");
    return;
  }

  try {
    setProfileSaving(true);

    const response = await authenticatedFetch(
  `${API_BASE_URL}/api/auth/profile/update/`,
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  }
);

    const data = await response.json();

    if (!response.ok) {
      const errorMessage =
        data.username?.[0] ||
        data.detail ||
        data.error ||
        "Unable to update your username.";

      throw new Error(errorMessage);
    }

    const updatedUser = {
      ...user,
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.first_name || "",
      lastName: data.last_name || "",
      phone: data.phone || "",
      profilePicture: data.profile_picture || null,
    };

    setUser(updatedUser);

    setEditUsername(data.username);

    localStorage.setItem(
      PROFILE_USER_KEY,
      JSON.stringify(updatedUser)
    );

    localStorage.setItem(
      "username",
      data.username
    );

    window.dispatchEvent(
      new Event("dammy-spice-user-updated")
    );

    setActiveModal(null);

  } catch (error) {
    console.error(
      "Profile update error:",
      error
    );

    alert(error.message);

  } finally {
    setProfileSaving(false);
  }
};


  /* =========================================
     OPEN ADD ADDRESS FORM
  ========================================= */

  const openAddAddressForm = () => {

    setNewAddressTitle("");
    setNewAddressValue("");

    setActiveModal("add-address");

  };

/* =========================================
   SAVE NEW ADDRESS
========================================= */

const saveNewAddress = async (event) => {

  event.preventDefault();

  const title =
    newAddressTitle.trim() || "Address";

  const address =
    newAddressValue.trim();

  if (!address) {

    alert(
      "Please enter your delivery address."
    );

    return;

  }

  try {

    const response = await authenticatedFetch(
      `${API_BASE_URL}/api/auth/addresses/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          address,
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.detail ||
        data.error ||
        "Unable to save address."
      );

    }

    const newAddress = {
      id: data.id,
      title: data.title,
      address: data.address,
      default: Boolean(data.is_default),
    };

    setAddresses((previous) => [
      ...previous,
      newAddress,
    ]);

    setNewAddressTitle("");
    setNewAddressValue("");

    setActiveModal("addresses");

  } catch (error) {

    console.error(
      "Error saving address:",
      error
    );

    alert(
      error.message ||
      "Unable to save address."
    );

  }

};


/* =========================================
   SET DEFAULT ADDRESS
========================================= */

const setDefaultAddress = async (id) => {

  try {

    const response = await authenticatedFetch(
      `${API_BASE_URL}/api/auth/addresses/${id}/default/`,
      {
        method: "POST",
      }
    );

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.detail ||
        data.error ||
        "Unable to set default address."
      );

    }

    setAddresses((previous) =>
      previous.map((address) => ({
        ...address,

        default:
          address.id === id,
      }))
    );

  } catch (error) {

    console.error(
      "Error setting default address:",
      error
    );

    alert(
      error.message ||
      "Unable to set default address."
    );

  }

};


/* =========================================
   DELETE ADDRESS
========================================= */

const deleteAddress = async (id) => {

  try {

    const response = await authenticatedFetch(
      `${API_BASE_URL}/api/auth/addresses/${id}/`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {

      let data = {};

      try {
        data = await response.json();
      } catch {
        // No JSON response
      }

      throw new Error(
        data.detail ||
        data.error ||
        "Unable to delete address."
      );

    }

    setAddresses((previous) => {

      const remaining =
        previous.filter(
          (address) =>
            address.id !== id
        );

      /*
        The backend handles the actual
        default-address rules.

        We only update the UI here.
      */

      return remaining;

    });

  } catch (error) {

    console.error(
      "Error deleting address:",
      error
    );

    alert(
      error.message ||
      "Unable to delete address."
    );

  }

};


  /* =========================================
     UPDATE ADDRESS
  ========================================= */

  const updateAddress = (
    id,
    field,
    value
  ) => {

    setAddresses((previous) =>

      previous.map((address) =>

        address.id === id

          ? {
              ...address,
              [field]: value,
            }

          : address

      )

    );

  };


  /* =========================================
     PAYMENT METHODS
  ========================================= */

  const addPaymentMethod = () => {

    setActiveModal("add-payment");

  };


  const savePaymentMethod = (card) => {

    const newCard = {

      id: Date.now(),

      type: "card",

      name:
        card.cardName.trim() ||
        "Card",

      lastFour:
        card.cardNumber
          .replace(/\s/g, "")
          .slice(-4),

      default:
        paymentMethods.length === 0,

    };


    setPaymentMethods((previous) => [

      ...previous,

      newCard,

    ]);


    setActiveModal("payments");

  };


  /* =========================================
     SET DEFAULT PAYMENT METHOD
  ========================================= */

  const setDefaultPaymentMethod = (id) => {

    setPaymentMethods((previous) =>

      previous.map((method) => ({

        ...method,

        default:
          method.id === id,

      }))

    );

  };


  /* =========================================
     DELETE PAYMENT METHOD
  ========================================= */

  const deletePaymentMethod = (id) => {

    setPaymentMethods((previous) => {

      const methodBeingDeleted =
        previous.find(
          (method) =>
            method.id === id
        );


      const remaining =
        previous.filter(
          (method) =>
            method.id !== id
        );


      if (
        methodBeingDeleted?.default &&
        remaining.length > 0
      ) {

        return remaining.map(
          (method, index) => ({

            ...method,

            default:
              index === 0,

          })
        );

      }


      if (
        remaining.length > 0 &&
        !remaining.some(
          (method) =>
            method.default
        )
      ) {

        return remaining.map(
          (method, index) => ({

            ...method,

            default:
              index === 0,

          })
        );

      }


      return remaining;

    });

  };


  /* =========================================
     FAVORITES
  ========================================= */

  const removeFavorite = (id) => {

    setFavorites((previous) =>

      previous.filter(
        (item) =>
          item.id !== id
      )

    );

  };


  const addFavorite = (item) => {

    setFavorites((previous) => {

      const alreadyExists =
        previous.some(
          (favorite) =>
            favorite.id === item.id
        );


      if (alreadyExists) {

        return previous;

      }


      return [

        ...previous,

        {

          id: item.id,

          name: item.name,

          price: item.price,

          image: item.image,

          category: item.category,

        },

      ];

    });

  };


  /* =========================================
     ORDER AGAIN
  ========================================= */

  const orderAgain = (order) => {

    const currentCart =
      getStoredData(
        "dammySpiceOrders",
        []
      );


    const updatedCart = [
      ...currentCart,
    ];


    order.items.forEach((itemName) => {

      const existingItem =
        updatedCart.find(
          (item) =>
            item.name === itemName
        );


      if (existingItem) {

        existingItem.quantity =
          (existingItem.quantity || 1) + 1;

      } else {

        updatedCart.push({

          id:
            `${order.id}-${itemName}`,

          name: itemName,

          price: 0,

          quantity: 1,

        });

      }

    });


    setOrders(updatedCart);


    localStorage.setItem(
      PROFILE_ORDERS_KEY,
      JSON.stringify(updatedCart)
    );


    window.dispatchEvent(
      new CustomEvent(
        "dammy-spice-cart-updated",
        {
          detail: updatedCart,
        }
      )
    );


    alert(
      "Previous items have been added to your cart."
    );

  };


  /* =========================================
     WALLET
  ========================================= */
const addMoneyToWallet = async () => {
  const enteredAmount = window.prompt(
    "Enter amount to add to your wallet:"
  );

  if (enteredAmount === null) {
    return;
  }

  const amount = Number(
    enteredAmount
      .replace(/,/g, "")
      .trim()
  );

  if (
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    alert("Please enter a valid amount.");
    return;
  }

  try {
    const response = await authenticatedFetch(
      `${API_BASE_URL}/api/wallet/add-money/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error ||
        data.detail ||
        "Unable to initialize wallet funding."
      );
    }

    if (!data.authorization_url) {
      throw new Error(
        "Paystack did not return a payment link."
      );
    }

    window.location.href =
      data.authorization_url;

  } catch (error) {
    console.error(
      "Wallet funding error:",
      error
    );

    alert(
      error.message ||
      "Unable to start wallet funding."
    );
  }
};

  const clearWallet = () => {

    if (walletBalance <= 0) {

      alert(
        "Your wallet is already empty."
      );

      return;

    }


    const confirmed =
      window.confirm(
        "Are you sure you want to clear your wallet?"
      );


    if (!confirmed) {
      return;
    }


    setWalletBalance(0);

  };


  /* =========================================
     NOTIFICATIONS
  ========================================= */

  const markNotificationAsRead = (id) => {

    setNotifications((previous) =>

      previous.map((notification) =>

        notification.id === id

          ? {
              ...notification,
              read: true,
            }

          : notification

      )

    );

  };


  const markAllNotificationsAsRead = () => {

    setNotifications((previous) =>

      previous.map((notification) => ({

        ...notification,

        read: true,

      }))

    );

  };


  const deleteNotification = (id) => {

    setNotifications((previous) =>

      previous.filter(
        (notification) =>
          notification.id !== id
      )

    );

  };


  /* =========================================
     LOG OUT
  ========================================= */

  const handleLogout = () => {

    setActiveModal("logout");

  };


const confirmLogout = () => {
  // Remove authentication
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  // Remove logged-in user information
  localStorage.removeItem("username");
  localStorage.removeItem("user");
  localStorage.removeItem(PROFILE_USER_KEY);

  setIsAuthenticated(false);
setAuthUser(null);

  // Close logout modal
  setActiveModal(null);

  // Go back to the login screen
  navigate("/auth", {
    state: {
      mode: "login",
    },
  });
};


  /* =========================================
     DELETE ACCOUNT
  ========================================= */

  const confirmDeleteAccount = () => {

    localStorage.removeItem(
      PROFILE_USER_KEY
    );

    localStorage.removeItem(
      PROFILE_WALLET_KEY
    );

    localStorage.removeItem(
      PROFILE_ADDRESSES_KEY
    );

    localStorage.removeItem(
      PROFILE_PAYMENT_KEY
    );

    localStorage.removeItem(
      PROFILE_FAVORITES_KEY
    );

    localStorage.removeItem(
      PROFILE_ORDERS_KEY
    );

    localStorage.removeItem(
      PROFILE_NOTIFICATIONS_KEY
    );


    setUser(defaultUser);

    setWalletBalance(0);

    setAddresses([]);

    setPaymentMethods([]);

    setFavorites([]);

    setOrders([]);

    setNotifications([]);


    setActiveModal(null);


    navigate("/signup");

  };


  /* =========================================
     OPEN EDIT PROFILE
  ========================================= */

  const openEditProfile = () => {
  setEditUsername(user.username || "");
  setActiveModal("edit-profile");
}; 


  /* =========================================
     OPEN SETTINGS
  ========================================= */

  const openSettings = () => {

    setActiveModal("settings");

  };


  /* =========================================
     OPEN NOTIFICATIONS
  ========================================= */

  const openNotifications = () => {

    setActiveModal("notifications");

  };


  /* =========================================
     OPEN FAVORITES
  ========================================= */

  const openFavorites = () => {

    setActiveModal("favorites");

  };


  /* =========================================
     OPEN PAYMENTS
  ========================================= */

  const openPayments = () => {

    setActiveModal("payments");

  };


  /* =========================================
     OPEN ORDERS
  ========================================= */

  const openOrders = () => {

    setActiveModal("orders");

  };


  /* =========================================
     OPEN ADDRESSES
  ========================================= */

  const openAddresses = () => {

    setActiveModal("addresses");

  };


  /* =========================================
     OPEN WALLET
  ========================================= */

  const openWallet = () => {

    setActiveModal("wallet");

  };


  /* =========================================
     OPEN HELP
  ========================================= */

  const openHelp = () => {

    setActiveModal("help");

  };


  /* =========================================
     OPEN PRIVACY
  ========================================= */

  const openPrivacy = () => {

    setActiveModal("privacy");

  };


  /* =========================================
     RENDER START
  ========================================= */

  return (

    <div className="profile-page">


      {/* =====================================
          DESKTOP SIDE MENU
      ===================================== */}

      {menuOpen && (

        <>

          <div
            className="profile-side-menu-overlay"
            onClick={closeMenu}
          ></div>


          <aside className="profile-side-menu">

            <div className="profile-side-menu-header">

              {/* LOGO */}
    <img
      src={dammysLogo}
      alt="Dammy & Spice"
      className="profile-side-menu-logo"
    />


              <button
                type="button"
                className="profile-side-menu-close"
                onClick={closeMenu}
                aria-label="Close menu"
              >

                <X />

              </button>

            </div>


            <nav className="profile-side-menu-navigation">


              <button
                type="button"
                onClick={goToHome}
              >

                <HomeIcon />

                <span>
                  Home
                </span>

              </button>


              <button
                type="button"
                onClick={goToDiscover}
              >

                <Search />

                <span>
                  Discover
                </span>

              </button>


              <button
                type="button"
                onClick={goToOrders}
              >

                <ClipboardList />

                <span>
                  My Orders
                </span>

              </button>


              <button
                type="button"
                className="active"
                onClick={goToProfile}
              >

                <User />

                <span>
                  Profile
                </span>

              </button>


            </nav>

          </aside>

        </>

      )}

<header className="profile-top-header">

  {/* DESKTOP / TABLET HAMBURGER */}

  <button
    type="button"
    className="profile-header-icon profile-menu-button"
    onClick={openMenu}
    aria-label="Open navigation menu"
  >
    <MenuIcon />
  </button>


  {/* MOBILE BACK BUTTON */}

  <button
    type="button"
    className="profile-header-icon profile-back-button"
    onClick={handleProfileBack}
    aria-label="Go back"
  >
    <ArrowLeft />
  </button>


  {/* DESKTOP / TABLET TITLE */}

  <div className="profile-header-title">
    <h1>My Profile</h1>
  </div>


  {/* MOBILE LOGO */}

  <div className="profile-header-logo" onClick={() => navigate("/")}>

    <img
      src={dammysLogo}
      alt="Dammy & Spice"
    />
  </div>


  {/* CART */}

  <button
    type="button"
    className="profile-header-icon profile-cart-button"
    onClick={handleProfileCart}
    aria-label="Open cart"
  >
    <ShoppingCart size={26} />

  {cartCount > 0 && (
    <span className="profile-cart-count">
      {cartCount > 99 ? "99+" : cartCount}
    </span>
  )}
  </button>

</header>


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="profile-content">

        <div className="profile-page-title">
  <span></span>
  <h1>My Profile</h1>
  <span></span>
</div>

        {/* ===================================
            USER CARD
        =================================== */}

        <section className="profile-user-card">

          <div className="profile-avatar">

            {userInitial}

          </div>

          <div className="profile-user-name">
  {user.username}
</div>

          <button
            type="button"
            className="profile-edit-profile-button"
            onClick={openEditProfile}
            aria-label="Edit profile"
          >

            <Pencil />

          </button>

        </section>


        {/* ===================================
            ACCOUNT MENU
        =================================== */}

        <section className="profile-menu">


          {/* ORDER HISTORY */}

          <button
            type="button"
            className="profile-menu-item"
            onClick={() =>
  navigate("/orders", {
    state: { activeTab: "completed" },
  })
}
          >

            <span className="profile-menu-icon">
              <ClipboardList />
            </span>

            <span className="profile-menu-text">

              <strong>
                Order History
              </strong>

              <small>
                View your previous orders
              </small>

            </span>

            <ChevronRight
              className="profile-menu-arrow"
            />

          </button>


          {/* ADDRESSES */}

          <button
            type="button"
            className="profile-menu-item"
            onClick={openAddresses}
          >

            <span className="profile-menu-icon">
              <MapPin />
            </span>

            <span className="profile-menu-text">

              <strong>
                Addresses
              </strong>

              <small>
                Manage your delivery addresses
              </small>

            </span>

            <ChevronRight
              className="profile-menu-arrow"
            />

          </button>


          {/* PAYMENT METHODS */}

          <button
            type="button"
            className="profile-menu-item"
            onClick={openPayments}
          >

            <span className="profile-menu-icon">
              <CreditCard />
            </span>

            <span className="profile-menu-text">

              <strong>
                Payment Methods
              </strong>

              <small>
                Manage your saved cards
              </small>

            </span>

            <ChevronRight
              className="profile-menu-arrow"
            />

          </button>


          {/* FAVORITES */}

          <button
            type="button"
            className="profile-menu-item"
            onClick={openFavorites}
          >

            <span className="profile-menu-icon">
              <Heart />
            </span>

            <span className="profile-menu-text">

              <strong>
                Favorites
              </strong>

              <small>
                Your saved meals and drinks
              </small>

            </span>

            <ChevronRight
              className="profile-menu-arrow"
            />

          </button>


          {/* WALLET */}

          <button
            type="button"
            className="profile-menu-item"
            onClick={openWallet}
          >

            <span className="profile-menu-icon">
              <Wallet />
            </span>

            <span className="profile-menu-text">

              <strong>
                Wallet
              </strong>

              <small>
                Your Dammy & Spice balance
              </small>

            </span>

            <span className="profile-wallet-balance">
              ₦{walletBalance.toLocaleString()}
            </span>

            <ChevronRight
              className="profile-menu-arrow"
            />

          </button>

          {/* NOTIFICATIONS */}

          <button
            type="button"
            className="profile-menu-item"
            onClick={openNotifications}
          >

            <span className="profile-menu-icon">
              <Bell />
            </span>

            <span className="profile-menu-text">

              <strong>
                Notifications
              </strong>

              <small>
                Order updates and important alerts
              </small>

            </span>


            {unreadNotifications > 0 && (

              <span className="profile-notification-count">
                {unreadNotifications}
              </span>

            )}


            <ChevronRight
              className="profile-menu-arrow"
            />

          </button>


          {/* SETTINGS */}

          <button
            type="button"
            className="profile-menu-item"
            onClick={openSettings}
          >

            <span className="profile-menu-icon">
              <Settings />
            </span>

            <span className="profile-menu-text">

              <strong>
                Settings
              </strong>

              <small>
                Account and app preferences
              </small>

            </span>

            <ChevronRight
              className="profile-menu-arrow"
            />

          </button>


          {/* HELP */}

          <button
            type="button"
            className="profile-menu-item"
            onClick={openHelp}
          >

            <span className="profile-menu-icon">
              <HelpCircle />
            </span>

            <span className="profile-menu-text">

              <strong>
                Help & Support
              </strong>

              <small>
                FAQs and customer support
              </small>

            </span>

            <ChevronRight
              className="profile-menu-arrow"
            />

          </button>


          {/* LOG OUT */}

          <button
            type="button"
            className="profile-menu-item profile-logout-item"
            onClick={handleLogout}
          >

            <span className="profile-menu-icon">
              <LogOut />
            </span>

            <span className="profile-menu-text">

              <strong>
                Log Out
              </strong>

              <small>
                Sign out of your account
              </small>

            </span>

            <ChevronRight
              className="profile-menu-arrow"
            />

          </button>


        </section>


        {/* ===================================
            DELETE ACCOUNT
        =================================== */}

        <button
          type="button"
          className="profile-delete-account"
          onClick={() =>
            setActiveModal("delete-account")
          }
        >

          <Trash2 />

          Delete Account & Data

        </button>


      </main>

      {/* =====================================
          EDIT PROFILE MODAL
      ===================================== */}

      {activeModal === "edit-profile" && (

        <div
          className="profile-modal-overlay"
          onClick={() => setActiveModal(null)}
        >

          <div
            className="profile-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="profile-modal-header">

              <h2>
                Edit Profile
              </h2>

              <button
                type="button"
                className="profile-modal-close"
                onClick={() => setActiveModal(null)}
                aria-label="Close"
              >
                <X />
              </button>

            </div>


            <div className="profile-edit-form">

              <label>
    Username
  </label>

  <input
    type="text"
    value={editUsername}
    onChange={(event) =>
      setEditUsername(event.target.value)
    }
    placeholder="Enter your username"
    autoComplete="username"
  />

  <button
    type="button"
    onClick={saveProfile}
    disabled={profileSaving}
  >
    {profileSaving
      ? "Saving..."
      : "Save Changes"}
  </button>
            </div>

          </div>

        </div>

      )}


      {/* =====================================
    CHANGE EMAIL MODAL
===================================== */}

{activeModal === "change-email" && (
  <div
    className="profile-modal-overlay"
    onClick={() => setActiveModal(null)}
  >
    <div
      className="profile-modal"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="profile-modal-header">
        <h2>Change Email Address</h2>

        <button
          type="button"
          className="profile-modal-close"
          onClick={() => setActiveModal(null)}
          aria-label="Close"
        >
          <X />
        </button>
      </div>

      <div className="profile-edit-form">
        <label>New Email Address</label>

        <input
          type="email"
          value={newEmail}
          onChange={(event) =>
            setNewEmail(event.target.value)
          }
          placeholder="Enter your new email address"
          autoComplete="email"
        />

        <button
          type="button"
          onClick={saveEmail}
          disabled={emailSaving}
        >
          {emailSaving ? "Saving..." : "Save Email Address"}
        </button>
      </div>
    </div>
  </div>
)}


{/* =====================================
    CHANGE PASSWORD MODAL
===================================== */}

{activeModal === "change-password" && (
  <div
    className="profile-modal-overlay"
    onClick={() => setActiveModal(null)}
  >
    <div
      className="profile-modal"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="profile-modal-header">
        <h2>Change Password</h2>

        <button
          type="button"
          className="profile-modal-close"
          onClick={() => setActiveModal(null)}
          aria-label="Close"
        >
          <X />
        </button>
      </div>

      <div className="profile-edit-form">
        <label>Current Password</label>

        <input
          type="password"
          value={currentPassword}
          onChange={(event) =>
            setCurrentPassword(event.target.value)
          }
          placeholder="Enter your current password"
          autoComplete="current-password"
        />

        <label>New Password</label>

        <input
          type="password"
          value={newPassword}
          onChange={(event) =>
            setNewPassword(event.target.value)
          }
          placeholder="Enter your new password"
          autoComplete="new-password"
        />

        <label>Confirm New Password</label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(event) =>
            setConfirmPassword(event.target.value)
          }
          placeholder="Confirm your new password"
          autoComplete="new-password"
        />

        <button
          type="button"
          onClick={savePassword}
          disabled={passwordSaving}
        >
          {passwordSaving ? "Saving..." : "Change Password"}
        </button>
      </div>
    </div>
  </div>
)}


      {/* =====================================
    CHANGE PHONE NUMBER MODAL
===================================== */}

{activeModal === "change-phone" && (
  <div
    className="profile-modal-overlay"
    onClick={() => setActiveModal(null)}
  >
    <div
      className="profile-modal"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="profile-modal-header">
        <h2>Change Phone Number</h2>

        <button
          type="button"
          className="profile-modal-close"
          onClick={() => setActiveModal(null)}
          aria-label="Close"
        >
          <X />
        </button>
      </div>

      <div className="profile-edit-form">
        <label>New Phone Number</label>

        <input
          type="tel"
          value={newPhone}
          onChange={(event) =>
            setNewPhone(event.target.value)
          }
          placeholder="Enter your new phone number"
          autoComplete="tel"
        />

        <button
          type="button"
          onClick={savePhoneNumber}
          disabled={phoneSaving}
        >
          {phoneSaving ? "Saving..." : "Save Phone Number"}
        </button>
      </div>
    </div>
  </div>
)}


      {/* =====================================
          ORDER HISTORY MODAL
      ===================================== */}

      {activeModal === "orders" && (

        <div
          className="profile-modal-overlay"
          onClick={() => setActiveModal(null)}
        >

          <div
            className="profile-modal profile-large-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="profile-modal-header">

              {ordersLoading ? (
  <div className="profile-orders-loading">
    <p>Loading your orders...</p>
  </div>
) : ordersError ? (
  <div className="profile-orders-error">
    <p>{ordersError}</p>

    <button
      type="button"
      onClick={() => window.location.reload()}
    >
      Try Again
    </button>
  </div>
) : orders.length === 0 ? (
  <div className="profile-orders-empty">
    <PackageOpen size={45} />

    <h3>No orders yet</h3>

    <p>
      Your completed and ongoing orders will appear here.
    </p>

    <button
      type="button"
      onClick={() => navigate("/menu")}
    >
      Browse Menu
    </button>
  </div>
) : (
  <div className="profile-orders-list">
    {orders.map((order) => {
      const itemCount =
        order.items?.reduce(
          (total, item) =>
            total + Number(item.quantity || 0),
          0
        ) || 0;

      return (
        <button
          type="button"
          key={order.id}
          className="profile-order-card"
          onClick={() => {
            navigate("/orders");
          }}
        >
          <div className="profile-order-card-info">
            <strong>
              #{order.order_number}
            </strong>

            <span>
              {itemCount}{" "}
              {itemCount === 1 ? "item" : "items"}
            </span>

            <small>
              {order.created_at
                ? new Date(
                    order.created_at
                  ).toLocaleDateString(
                    "en-NG",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : ""}
            </small>
          </div>

          <div className="profile-order-card-right">
            <strong>
              ₦
              {Number(
                order.total_amount || 0
              ).toLocaleString("en-NG")}
            </strong>

            <span
              className={`profile-order-status ${order.status}`}
            >
              {order.status === "delivered"
                ? "Delivered"
                : order.status === "cancelled"
                ? "Cancelled"
                : "Ongoing"}
            </span>
          </div>
        </button>
      );
    })}
  </div>
)}

              <button
                type="button"
                className="profile-modal-close"
                onClick={() => setActiveModal(null)}
                aria-label="Close"
              >
                <X />
              </button>

            </div>


            <div className="profile-order-list">

              {orders.length === 0 ? (

                <div className="profile-empty-state">

                </div>

              ) : (

                orders.map((order) => (

                  <article
                    key={order.id}
                    className="profile-order-card"
                  >

                    <div className="profile-order-top">

                      <div>

                        <strong>
                          Order #{order.id}
                        </strong>

                        <span>
                          {order.date}
                        </span>

                      </div>

                      <span className="profile-order-status">
                        {order.status}
                      </span>

                    </div>

                    <div className="profile-order-items">

  {(order.items || []).map(
    (item, index) => (

      <div
        key={`${order.id}-${index}`}
      >
        {item}
      </div>

    )
  )}

</div>


                    <div className="profile-order-bottom">

                      <strong>
                        ₦{Number(order.total).toLocaleString()}
                      </strong>


                      <button
                        type="button"
                        className="profile-secondary-button"
                        onClick={() => orderAgain(order)}
                      >

                        <ShoppingBag />

                        Order Again

                      </button>

                    </div>

                  </article>

                ))

              )}

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          ADDRESSES MODAL
      ===================================== */}

      { activeModal === "addresses" && (
        
        <div
          className="profile-modal-overlay"
          onClick={() => setActiveModal(null)}
        >

          <div
            className="profile-modal profile-large-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="profile-modal-header">

              <h2>
                Addresses
              </h2>

              <button
                type="button"
                className="profile-modal-close"
                onClick={() => setActiveModal(null)}
                aria-label="Close"
              >
                <X />
              </button>

            </div>


            <div className="profile-address-list">

              {addresses.length === 0 ? (

                <div className="profile-empty-state">

                  <MapPin />

                  <h3>
                    No addresses saved
                  </h3>

                  <p>
                    Add a delivery address to make
                    ordering faster.
                  </p>

                </div>

              ) : (

                addresses.map((address) => (

                  <article
                    key={address.id}
                    className={
                      address.default
                        ? "profile-address-card default"
                        : "profile-address-card"
                    }
                  >

                    <div className="profile-address-icon">
                      <MapPin />
                    </div>


                    <div className="profile-address-information">

                      <div className="profile-address-title">

                        <strong>
                          {address.title}
                        </strong>

                        {address.default && (

                          <span>
                            Default
                          </span>

                        )}

                      </div>


                      <p>
                        {address.address}
                      </p>


                      <button
  type="button"
  className="profile-address-default-button"
  onClick={() => setDefaultAddress(address.id)}
  disabled={address.default}
>
  {address.default
    ? "Default Address"
    : "Set as Default"}
</button>

                    </div>


                    <button
                      type="button"
                      className="profile-delete-small"
                      onClick={() =>
                        deleteAddress(address.id)
                      }
                      aria-label="Delete address"
                    >

                      <Trash2 />

                    </button>

                  </article>

                ))

              )}


              {/* ADD NEW ADDRESS */}

              <button
                type="button"
                className="profile-add-button"
                onClick={openAddAddressForm}
              >

                <Plus />

                Add New Address

              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          ADD NEW ADDRESS MODAL
      ===================================== */}

      { activeModal === "add-address" && (

        <div
          className="profile-modal-overlay"
          onClick={() =>
            setActiveModal("addresses")
          }
        >

          <div
            className="profile-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="profile-modal-header">

              <h2>
                Add New Address
              </h2>


              <button
                type="button"
                className="profile-modal-close"
                onClick={() =>
                  setActiveModal("addresses")
                }
                aria-label="Close"
              >

                <X />

              </button>

            </div>


            <form
              className="profile-form"
              onSubmit={saveNewAddress}
            >

              <label>
                Address Name
              </label>

              <input
                type="text"
                value={newAddressTitle}
                onChange={(event) =>
                  setNewAddressTitle(
                    event.target.value
                  )
                }
                placeholder="e.g. Home, Work"
              />


              <label>
                Delivery Address
              </label>

              <input
                type="text"
                value={newAddressValue}
                onChange={(event) =>
                  setNewAddressValue(
                    event.target.value
                  )
                }
                placeholder="Enter your full delivery address"
                required
              />


              <button
                type="submit"
                className="profile-primary-button"
              >

                <MapPin />

                Save Address

              </button>

            </form>

          </div>

        </div>

      )}


      {/* =====================================
          PAYMENT METHODS MODAL
      ===================================== */}

      { activeModal === "payments" && (

        <div
          className="profile-modal-overlay"
          onClick={() => setActiveModal(null)}
        >

          <div
            className="profile-modal profile-large-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="profile-modal-header">

              <h2>
                Payment Methods
              </h2>

              <button
                type="button"
                className="profile-modal-close"
                onClick={() => setActiveModal(null)}
                aria-label="Close"
              >

                <X />

              </button>

            </div>


            <div className="profile-payment-list">

              {paymentMethods.length === 0 ? (

                <div className="profile-empty-state">

                  <CreditCard />

                  <h3>
                    No payment methods
                  </h3>

                  <p>
                    Add a card to make checkout faster.
                  </p>

                </div>

              ) : (

                paymentMethods.map((method) => (

                  <article
                    key={method.id}
                    className={
                      method.default
                        ? "profile-payment-card default"
                        : "profile-payment-card"
                    }
                  >

                    <div className="profile-payment-icon">

                      <CreditCard />

                    </div>


                    <div className="profile-payment-information">

                      <div>

                        <strong>
                          {method.name}
                        </strong>


                        {method.default && (

                          <span>
                            Default
                          </span>

                        )}

                      </div>


                      <p>
                        •••• {method.lastFour}
                      </p>


                      <button
                        type="button"
                        className="profile-payment-default-button"
                        onClick={() =>
                          setDefaultPaymentMethod(
                            method.id
                          )
                        }
                        disabled={method.default}
                      >

                        {method.default
                          ? "Default Card"
                          : "Set as Default"}

                      </button>

                    </div>


                    <button
                      type="button"
                      className="profile-delete-small"
                      onClick={() =>
                        deletePaymentMethod(
                          method.id
                        )
                      }
                      aria-label="Delete payment method"
                    >

                      <Trash2 />

                    </button>

                  </article>

                ))

              )}


              <button
                type="button"
                className="profile-add-button"
                onClick={addPaymentMethod}
              >

                <Plus />

                Add Payment Method

              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          FAVORITES MODAL
      ===================================== */}

      {activeModal === "favorites" && (

        <div
          className="profile-modal-overlay"
          onClick={() => setActiveModal(null)}
        >

          <div
            className="profile-modal profile-large-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="profile-modal-header">

              <h2>
                Favorites
              </h2>

              <button
                type="button"
                className="profile-modal-close"
                onClick={() => setActiveModal(null)}
                aria-label="Close"
              >

                <X />

              </button>

            </div>


            <div className="profile-favorites-list">

              {favorites.length === 0 ? (

                <div className="profile-empty-state">

                  <Heart />

                  <h3>
                    No favorites yet
                  </h3>

                  <p>
                    Meals and drinks you save will
                    appear here.
                  </p>

                </div>

              ) : (

                favorites.map((item) => (

                  <article
  key={`${item.category}-${item.id}`}
  className="profile-favorite-card"
  onClick={() => {
    const routes = {
      Appetizers: "/menu/appetizers",
      Entrees: "/menu/entrees",
      "Main Courses": "/menu/main-courses",
      Desserts: "/menu/desserts",
      Drinks: "/menu/drinks",
    };

    navigate(routes[item.category] || "/menu");
    setActiveModal(null);

    sessionStorage.setItem(
      "favoriteTarget",
      `${item.category}-${item.id}`
    );
  }}
  style={{ cursor: "pointer" }}
>

                    <div className="profile-favorite-icon">

                      <Heart fill="currentColor" />

                    </div>


                    <div className="profile-favorite-information">

                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        ₦{Number(item.price).toLocaleString()}
                      </span>

                    </div>


                    <button
                      type="button"
                      className="profile-delete-small"
                      onClick={() =>
                        removeFavorite(item.id)
                      }
                      aria-label="Remove favorite"
                    >

                      <Trash2 />

                    </button>

                  </article>

                ))

              )}

            </div>

          </div>

        </div>

      )}

      {/* =====================================
          WALLET MODAL
      ===================================== */}

      {activeModal === "wallet" && (

        <div
          className="profile-modal-overlay"
          onClick={() => setActiveModal(null)}
        >

          <div
            className="profile-modal profile-wallet-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="profile-modal-header">

              <h2>
                Dammy & Spice Wallet
              </h2>

              <button
                type="button"
                className="profile-modal-close"
                onClick={() => setActiveModal(null)}
                aria-label="Close"
              >

                <X />

              </button>

            </div>


            <div className="profile-wallet-card">

              <span>
                Available Balance
              </span>

              <strong>
                ₦{walletBalance.toLocaleString()}
              </strong>

            </div>


            <div className="profile-wallet-actions">

              <button
                type="button"
                className="profile-primary-button"
                onClick={addMoneyToWallet}
              >

                <Plus />

                Add Money

              </button>


              <button
                type="button"
                className="profile-secondary-button"
                onClick={clearWallet}
              >

                <Trash2 />

                Clear Wallet

              </button>

            </div>


            <div className="profile-wallet-information">

              <Wallet />

              <p>
                Your Dammy & Spice wallet can
                be used to pay for food and
                drink orders.
              </p>

              <p>
                You can add money to your
                wallet and use your balance
                during checkout.
              </p>

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          ADD PAYMENT METHOD MODAL
      ===================================== */}

      {activeModal === "add-payment" && (

        <AddPaymentModal
          onClose={() =>
            setActiveModal("payments")
          }
          onSave={savePaymentMethod}
        />

      )}


      {/* =====================================
          NOTIFICATIONS MODAL
      ===================================== */}

      {activeModal === "notifications" && (

        <div
          className="profile-modal-overlay"
          onClick={() => setActiveModal(null)}
        >

          <div
            className="profile-modal profile-large-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="profile-modal-header">

              <div>

                <h2>
                  Notifications
                </h2>

                {unreadNotifications > 0 && (

                  <small>
                    {unreadNotifications} unread
                  </small>

                )}

              </div>


              <button
                type="button"
                className="profile-modal-close"
                onClick={() => setActiveModal(null)}
                aria-label="Close"
              >

                <X />

              </button>

            </div>


            {unreadNotifications > 0 && (

              <div className="profile-notifications-actions">

                <button
                  type="button"
                  onClick={
                    markAllNotificationsAsRead
                  }
                >

                  Mark all as read

                </button>

              </div>

            )}


            <div className="profile-notifications-list">

              {notifications.length === 0 ? (

                <div className="profile-empty-state">

                  <Bell />

                  <h3>
                    No notifications
                  </h3>

                  <p>
                    Important updates about
                    your orders will appear here.
                  </p>

                </div>

              ) : (

                notifications.map(
                  (notification) => (

                    <article
                      key={notification.id}
                      className={
                        notification.read
                          ? "profile-notification-card"
                          : "profile-notification-card unread"
                      }
                      onClick={() =>
                        markNotificationAsRead(
                          notification.id
                        )
                      }
                    >

                      <div className="profile-notification-icon">

                        <Bell />

                      </div>


                      <div className="profile-notification-information">

                        <strong>
                          {notification.title}
                        </strong>

                        <p>
                          {notification.message}
                        </p>

                        <span>
                          {notification.date}
                        </span>

                      </div>


                      <button
                        type="button"
                        className="profile-delete-small"
                        onClick={(event) => {

                          event.stopPropagation();

                          deleteNotification(
                            notification.id
                          );

                        }}
                        aria-label="Delete notification"
                      >

                        <Trash2 />

                      </button>

                    </article>

                  )
                )

              )}

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          SETTINGS MODAL
      ===================================== */}

      {activeModal === "settings" && (

        <div
          className="profile-modal-overlay"
          onClick={() => setActiveModal(null)}
        >

          <div
            className="profile-modal profile-large-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="profile-modal-header">

              <h2>
                Settings
              </h2>

              <button
                type="button"
                className="profile-modal-close"
                onClick={() => setActiveModal(null)}
                aria-label="Close"
              >

                <X />

              </button>

            </div>


            <div className="profile-settings-list">


              {/* EDIT PERSONAL INFORMATION */}

              <button
                type="button"
                className="profile-settings-item"
                onClick={openEditProfile}
              >

                <div>

                  <Pencil />

                  <span>
                    Edit Personal Information
                  </span>

                </div>

                <ChevronRight />

              </button>


              {/* CHANGE PHONE */}

<button
  type="button"
  className="profile-settings-item"
  onClick={() => setActiveModal("change-phone")}
>
  <div>
    <User />
    <span>Change Phone Number</span>
  </div>

  <ChevronRight />
</button>


              {/* CHANGE EMAIL */}

<button
  type="button"
  className="profile-settings-item"
  onClick={() => setActiveModal("change-email")}
>
  <div>
    <CreditCard />
    <span>Change Email Address</span>
  </div>

  <ChevronRight />
</button>


              {/* CHANGE PASSWORD */}

<button
  type="button"
  className="profile-settings-item"
  onClick={() => setActiveModal("change-password")}
>
  <div>
    <Settings />
    <span>Change Password</span>
  </div>

  <ChevronRight />
</button>


              {/* PRIVACY */}

              <button
                type="button"
                className="profile-settings-item"
                onClick={openPrivacy}
              >

                <div>

                  <Settings />

                  <span>
                    Privacy & Data
                  </span>

                </div>

                <ChevronRight />

              </button>


              {/* NOTIFICATIONS */}

              <button
                type="button"
                className="profile-settings-item"
                onClick={openNotifications}
              >

                <div>

                  <Bell />

                  <span>
                    Notifications
                  </span>

                </div>

                <ChevronRight />

              </button>


              {/* FAQ */}

              <button
                type="button"
                className="profile-settings-item"
                onClick={openHelp}
              >

                <div>

                  <HelpCircle />

                  <span>
                    FAQs
                  </span>

                </div>

                <ChevronRight />

              </button>


            </div>

          </div>

        </div>

      )}

      {/* =====================================
          PRIVACY MODAL
      ===================================== */}

      {activeModal === "privacy" && (

        <div
          className="profile-modal-overlay"
          onClick={() => setActiveModal(null)}
        >

          <div
            className="profile-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="profile-modal-header">

              <h2>
                Privacy & Data
              </h2>

              <button
                type="button"
                className="profile-modal-close"
                onClick={() => setActiveModal(null)}
                aria-label="Close"
              >

                <X />

              </button>

            </div>


            <div className="profile-privacy-content">

              <Settings />

              <h3>
                Your Privacy Matters
              </h3>

              <p>
                Manage how your personal
                information and account data
                are handled.
              </p>


              <div className="profile-privacy-option">

                <strong>
                  Personal Information
                </strong>

                <span>
                  Your name, phone number
                  and email.
                </span>

              </div>


              <div className="profile-privacy-option">

                <strong>
                  Saved Addresses
                </strong>

                <span>
                  Addresses used for
                  food delivery.
                </span>

              </div>


              <div className="profile-privacy-option">

                <strong>
                  Payment Information
                </strong>

                <span>
                  Your saved payment methods.
                </span>

              </div>


              <div className="profile-privacy-option">

                <strong>
                  Notifications
                </strong>

                <span>
                  Order updates and
                  important alerts.
                </span>

              </div>

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          HELP & FAQ MODAL
      ===================================== */}

      {activeModal === "help" && (

        <div
          className="profile-modal-overlay"
          onClick={() => setActiveModal(null)}
        >

          <div
            className="profile-modal profile-large-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="profile-modal-header">

              <h2>
                Help & Support
              </h2>

              <button
                type="button"
                className="profile-modal-close"
                onClick={() => setActiveModal(null)}
              >

                <X />

              </button>

            </div>


            <div className="profile-help-content">


              <div className="profile-faq-item">

                <strong>
                  How do I place an order?
                </strong>

                <p>
                  Browse the menu, select your
                  meal or drink, add it to your
                  cart and proceed to checkout.
                </p>

              </div>


              <div className="profile-faq-item">

                <strong>
                  Can I save my payment card?
                </strong>

                <p>
                  Yes. You can add and manage
                  your saved payment methods
                  from your profile.
                </p>

              </div>


              <div className="profile-faq-item">

                <strong>
                  Can I use my wallet to pay?
                </strong>

                <p>
                  Yes. Your Dammy & Spice
                  wallet can be selected as a
                  payment method during checkout.
                </p>

              </div>


              <div className="profile-faq-item">

                <strong>
                  Can I order something again?
                </strong>

                <p>
                  Open Order History and select
                  Order Again on a previous order.
                </p>

              </div>


              <div className="profile-faq-item">

                <strong>
                  How do I manage my addresses?
                </strong>

                <p>
                  Open Addresses from your
                  profile. You can save multiple
                  addresses and choose one as
                  your default delivery address.
                </p>

              </div>


              <div className="profile-faq-item">

                <strong>
                  How do notifications work?
                </strong>

                <p>
                  Important order and account
                  updates will appear in your
                  Notifications section.
                </p>

              </div>


              <div className="profile-faq-item">

                <strong>
                  How do I delete my account?
                </strong>

                <p>
                  Use the Delete Account & Data
                  option at the bottom of your
                  profile.
                </p>

              </div>


              <button
                type="button"
                className="profile-primary-button"
                onClick={() =>
                  alert(
                    "Customer support will be connected later."
                  )
                }
              >

                Contact Support

              </button>


            </div>

          </div>

        </div>

      )}


      {/* =====================================
          LOGOUT CONFIRMATION
      ===================================== */}

      {activeModal === "logout" && (

        <div
          className="profile-modal-overlay"
          onClick={() => setActiveModal(null)}
        >

          <div
            className="profile-confirm-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="profile-confirm-icon">

              <LogOut />

            </div>


            <h2>
              Log Out?
            </h2>


            <p>
              Are you sure you want to log out
              of your Dammy & Spice account?
            </p>


            <div className="profile-confirm-actions">

              <button
                type="button"
                className="profile-secondary-button"
                onClick={() => setActiveModal(null)}
              >

                Cancel

              </button>


              <button
                type="button"
                className="profile-danger-button"
                onClick={confirmLogout}
              >

                Log Out

              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          DELETE ACCOUNT CONFIRMATION
      ===================================== */}

      {activeModal === "delete-account" && (

        <div
          className="profile-modal-overlay"
          onClick={() => setActiveModal(null)}
        >

          <div
            className="profile-confirm-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="profile-confirm-icon profile-danger-icon">

              <AlertTriangle />

            </div>


            <h2>
              Delete Account?
            </h2>


            <p>
              This will permanently delete your
              account and all associated data.
              This action cannot be undone.
            </p>


            <div className="profile-confirm-actions">

              <button
                type="button"
                className="profile-secondary-button"
                onClick={() => setActiveModal(null)}
              >

                Cancel

              </button>


              <button
                type="button"
                className="profile-danger-button"
                onClick={confirmDeleteAccount}
              >

                Delete Everything

              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          MOBILE BOTTOM NAVIGATION
      ===================================== */}

      <nav className="profile-mobile-navigation">


        {/* HOME */}

        <button
          type="button"
          className={
            isHome
              ? "profile-mobile-nav-item active"
              : "profile-mobile-nav-item"
          }
          onClick={goToHome}
        >

          <HomeIcon />

          <span>
            Home
          </span>

        </button>


        {/* DISCOVER */}

        <button
          type="button"
          className={
            isDiscover
              ? "profile-mobile-nav-item active"
              : "profile-mobile-nav-item"
          }
          onClick={goToDiscover}
        >

          <Search />

          <span>
            Discover
          </span>

        </button>


        {/* MY ORDERS */}

        <button
          type="button"
          className={
            isOrders
              ? "profile-mobile-nav-item active"
              : "profile-mobile-nav-item"
          }
          onClick={goToOrders}
        >

          <ClipboardList />

          <span>
            My Orders
          </span>

        </button>


        {/* PROFILE */}

        <button
          type="button"
          className={
            isProfile
              ? "profile-mobile-nav-item active"
              : "profile-mobile-nav-item"
          }
          onClick={goToProfile}
        >

          <User />

          <span>
            Profile
          </span>

        </button>

      </nav>

    </div>

  );

}


/* =========================================
   ADD PAYMENT MODAL
========================================= */

function AddPaymentModal({
  onClose,
  onSave,
}) {

  const [cardName, setCardName] =
    useState("");

  const [cardNumber, setCardNumber] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const [cvv, setCvv] =
    useState("");


  /* =========================================
     FORMAT CARD NUMBER
  ========================================= */

  const handleCardNumberChange =
    (event) => {

      let value =
        event.target.value
          .replace(/\D/g, "")
          .slice(0, 19);


      value =
        value
          .replace(
            /(.{4})/g,
            "$1 "
          )
          .trim();


      setCardNumber(value);

    };


  /* =========================================
     FORMAT EXPIRY
  ========================================= */

  const handleExpiryChange =
    (event) => {

      let value =
        event.target.value
          .replace(/\D/g, "")
          .slice(0, 4);


      if (value.length >= 3) {

        value =
          `${value.slice(0, 2)}/${value.slice(2)}`;

      }


      setExpiry(value);

    };


  /* =========================================
     SAVE CARD
  ========================================= */

  const handleSubmit = (
    event
  ) => {

    event.preventDefault();


    const cleanCardNumber =
      cardNumber.replace(
        /\s/g,
        ""
      );


    if (
      !cardName.trim() ||
      cleanCardNumber.length < 12 ||
      expiry.length !== 5 ||
      cvv.length < 3
    ) {

      alert(
        "Please fill in all card information correctly."
      );

      return;

    }


    onSave({

      cardName,

      cardNumber,

      expiry,

      cvv,

    });

  };


  return (

    <div
      className="profile-modal-overlay"
      onClick={onClose}
    >

      <div
        className="profile-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        <div className="profile-modal-header">

          <h2>
            Add Payment Method
          </h2>


          <button
            type="button"
            className="profile-modal-close"
            onClick={onClose}
            aria-label="Close"
          >

            <X />

          </button>

        </div>


        <form
          className="profile-form"
          onSubmit={handleSubmit}
        >

          <label>
            Card Name
          </label>

          <input
            type="text"
            value={cardName}
            onChange={(event) =>
              setCardName(event.target.value)
            }
            placeholder="e.g. Visa"
            required
          />


          <label>
            Card Number
          </label>

          <input
            type="text"
            inputMode="numeric"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            required
          />


          <div className="profile-payment-form-row">

            <div>

              <label>
                Expiry
              </label>

              <input
                type="text"
                inputMode="numeric"
                value={expiry}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                required
              />

            </div>


            <div>

              <label>
                CVV
              </label>

              <input
                type="password"
                inputMode="numeric"
                value={cvv}
                onChange={(event) =>
                  setCvv(
                    event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 4)
                  )
                }
                placeholder="•••"
                required
              />

            </div>

          </div>


          <button
            type="submit"
            className="profile-primary-button"
          >

            Save Payment Method

          </button>

        </form>

      </div>

    </div>

  );

}


export default Profile;
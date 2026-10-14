import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  useRestaurant,
} from "../context/RestaurantContext";

import {
  Menu as MenuIcon,
  ShoppingCart,
  ChevronRight,
  MapPin,
  X,
  Home as HomeIcon,
  Search,
  ClipboardList,
  User,
  ArrowLeft,
  ChevronDown,
  Plus,
  Check,
} from "lucide-react";

import "./Menu.css";

/* =========================================
   LOCAL IMAGES
========================================= */

import mainCourse from "../assets/main-course.jpg";
import desert from "../assets/desert.jpg";
import drinks from "../assets/drinks.jpg";
import appertizer from "../assets/appertizer.jpg";
import entree from "../assets/entree.jpg";

/* =========================================
   LOGO
========================================= */

import dammysLogo from "../assets/Dammy's Logo.png";


/* =========================================
   MENU COMPONENT
========================================= */

function Menu() {

  const navigate = useNavigate();
  const location = useLocation();

  /* =========================================
     RESTAURANT CONTEXT / CART
  ========================================= */

  const {
    cartCount,
  } = useRestaurant();


  /* =========================================
     MENU CATEGORIES
  ========================================= */

  const [menuCategories, setMenuCategories] =
    useState([]);

  const [categoriesLoading, setCategoriesLoading] =
    useState(true);

  const [categoriesError, setCategoriesError] =
    useState("");


  /* =========================================
     FETCH MENU CATEGORIES
  ========================================= */

  useEffect(() => {

    const fetchCategories = async () => {

      try {

        setCategoriesLoading(true);
        setCategoriesError("");

        const response = await fetch(
          `${API_BASE_URL}/api/menu/categories/`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load menu categories."
          );
        }

        const data = await response.json();

        setMenuCategories(data);

      } catch (error) {

        console.error(
          "Menu category error:",
          error
        );

        setCategoriesError(
          "Unable to load menu categories."
        );

      } finally {

        setCategoriesLoading(false);

      }

    };

    fetchCategories();

  }, []);


  /* =========================================
     SIDE MENU
  ========================================= */

  const [menuOpen, setMenuOpen] =
    useState(false);


  /* =====================================
   ADDRESS
===================================== */

const [addressModalOpen, setAddressModalOpen] = useState(false);

const [selectedAddress, setSelectedAddress] = useState(() => {
  try {
    const saved = localStorage.getItem(
      "dammySpiceSelectedAddress"
    );

    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
});

const [addresses, setAddresses] = useState([]);


useEffect(() => {
  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("access_token");

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
        throw new Error("Unable to load addresses.");
      }

      const data = await response.json();

      const backendAddresses = Array.isArray(data)
        ? data
        : data.results || [];

      const formattedAddresses = backendAddresses.map((address) => ({
        id: address.id,
        title: address.title,
        address: address.address,
        is_default: Boolean(address.is_default),
      }));

      setAddresses(formattedAddresses);

      // Automatically use the backend default address
      const defaultAddress = formattedAddresses.find(
        (address) => address.is_default
      );

      if (defaultAddress) {
        setSelectedAddress(defaultAddress);

        localStorage.setItem(
          "dammySpiceSelectedAddress",
          JSON.stringify(defaultAddress)
        );
      }
    } catch (error) {
      console.error("Error loading addresses:", error);
    }
  };

  fetchAddresses();
}, []);


/* =====================================
   SYNC ADDRESS CHANGES FROM PROFILE
===================================== */

useEffect(() => {
  const handleAddressUpdate = (event) => {
    const updatedAddresses =
      event.detail;

    if (!Array.isArray(updatedAddresses)) {
      return;
    }

    setAddresses(updatedAddresses);

    const defaultAddress =
      updatedAddresses.find(
        (address) => address.is_default
      );

    if (defaultAddress) {
      setSelectedAddress(defaultAddress);

      localStorage.setItem(
        "dammySpiceSelectedAddress",
        JSON.stringify(defaultAddress)
      );
    }
  };

  window.addEventListener(
    "dammy-spice-address-updated",
    handleAddressUpdate
  );

  return () => {
    const handleAddressUpdate = (updatedAddresses) => {
  if (!Array.isArray(updatedAddresses)) {
    return;
  }

  setAddresses(updatedAddresses);

  const defaultAddress = updatedAddresses.find(
    (address) => address.is_default
  );

  if (defaultAddress) {
    setSelectedAddress(defaultAddress);

    localStorage.setItem(
      "dammySpiceSelectedAddress",
      JSON.stringify(defaultAddress)
    );
  }
};
  };
}, []);


/* =====================================
   SELECT ADDRESS
===================================== */

const handleAddressSelect = (address) => {
  setSelectedAddress(address);

  localStorage.setItem(
    "dammySpiceSelectedAddress",
    JSON.stringify(address)
  );

  setAddressModalOpen(false);
};


  /* =========================================
     SAVE SELECTED ADDRESS
  ========================================= */

  useEffect(() => {

    localStorage.setItem(
      "dammySpiceSelectedAddress",
      JSON.stringify(selectedAddress)
    );

  }, [selectedAddress]);


  /* =========================================
     SAVE ADDRESSES
  ========================================= */

  useEffect(() => {

    localStorage.setItem(
      "dammySpiceAddresses",
      JSON.stringify(addresses)
    );

  }, [addresses]);


  /* =========================================
     CATEGORY CLICK
  ========================================= */

  const handleCategoryClick =
    (category) => {

      navigate(
        `/menu/${category.slug}`
      );

    };


  /* =========================================
     DESKTOP HAMBURGER
  ========================================= */

  const handleMenu = () => {

    setMenuOpen(true);

  };


  /* =========================================
     CLOSE SIDE MENU
  ========================================= */

  const closeMenu = () => {

    setMenuOpen(false);

  };


  /* =========================================
     CART
  ========================================= */

  const handleCart = () => {

    navigate("/orders");

  };


  /* =========================================
     MOBILE BACK BUTTON
  ========================================= */

  const handleBack = () => {

    if (window.history.length > 1) {

      navigate(-1);

    } else {

      navigate("/");

    }

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
     ACTIVE NAVIGATION
     
     IMPORTANT:
     Discover is NOT active on Menu.
  ========================================= */

  const isHomeActive =
    location.pathname === "/";

  const isDiscoverActive =
    location.pathname === "/discover";

  const isOrdersActive =
    location.pathname === "/orders";

  const isProfileActive =
    location.pathname === "/profile";


  /* =========================================
     OPEN ADDRESS SELECTOR
  ========================================= */

  const openAddressSelector = () => {

    setAddressModalOpen(true);

  };


  /* =========================================
     CLOSE ADDRESS SELECTOR
  ========================================= */

  const closeAddressSelector = () => {

    setAddressModalOpen(false);

  };


  /* =========================================
     SELECT ADDRESS
  ========================================= */

  // const handleAddressSelect =
  //   (address) => {

  //     setSelectedAddress(address);

  //     setAddressModalOpen(false);

  //   };


  /* =========================================
     ADD NEW ADDRESS
  ========================================= */

  const handleAddNewAddress = () => {

    const newAddress = {

      id: Date.now(),

      label: "New Address",

      address:
        "Enter your delivery address",

    };


    setAddresses(
      (previousAddresses) => [
        ...previousAddresses,
        newAddress,
      ]
    );


    setSelectedAddress(newAddress);

    setAddressModalOpen(false);

  };


  return (

    <div className="menu-page">


      {/* =========================================
          DESKTOP SIDE MENU
      ========================================= */}

      {menuOpen && (

        <>

          <div
            className="menu-page-side-menu-overlay"
            onClick={closeMenu}
          ></div>


          <aside
            className="menu-page-side-menu"
          >

            <div
              className="menu-page-side-menu-header"
            >

              <img
                src={dammysLogo}
                alt="Dammy's Spice"
                className="menu-side-menu-logo"
              />


              <button
                type="button"
                className="menu-side-menu-close"
                onClick={closeMenu}
                aria-label="Close menu"
              >

                <X />

              </button>

            </div>


            <nav
              className="menu-page-side-menu-navigation"
            >

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
  className={
    location.pathname === "/discover"
      ? "menu-mobile-bottom-item active"
      : "menu-mobile-bottom-item"
  }
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


      {/* =========================================
          HEADER
      ========================================= */}

      <header
        className="menu-page-header"
      >

        <div
          className="menu-page-top-header"
        >


          {/* HAMBURGER */}

          <button
            type="button"
            className="menu-page-icon-button menu-page-menu-button"
            onClick={handleMenu}
            aria-label="Open navigation menu"
          >

            <MenuIcon />

          </button>


          {/* MOBILE BACK */}

          <button
            type="button"
            className="menu-page-icon-button menu-page-back-button"
            onClick={handleBack}
            aria-label="Go back"
          >

            <ArrowLeft />

          </button>


          {/* LOGO */}

          <button
            type="button"
            className="menu-page-logo"
            onClick={() =>
              navigate("/")
            }
            aria-label="Go to home"
          >

            <img
              src={dammysLogo}
              alt="Dammy's Spice"
            />

          </button>


          {/* CART */}

          <button
            type="button"
            className="menu-page-icon-button menu-page-cart-button"
            onClick={handleCart}
            aria-label="Open cart"
          >

            <ShoppingCart />

            {cartCount > 0 && (

              <span
                className="menu-page-cart-count"
              >
                {cartCount}
              </span>

            )}

          </button>

        </div>


        {/* ======================================
            ADDRESS
        ====================================== */}

        <button
          type="button"
          className="menu-page-address"
          onClick={
            openAddressSelector
          }
          aria-label="Change delivery address"
        >

          <MapPin
            size={19}
            strokeWidth={2}
          />


          <span>

            {selectedAddress.address}

          </span>


          <ChevronDown
            className="menu-page-address-arrow"
          />

        </button>

      </header>


      {/* =========================================
          ADDRESS MODAL
      ========================================= */}

      {addressModalOpen && (

        <div
          className="menu-address-overlay"
          onClick={
            closeAddressSelector
          }
        >

          <div
            className="menu-address-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* HEADER */}

            <div
              className="menu-address-modal-header"
            >

              <div>

                <h2>
                  Delivery Address
                </h2>

                <p>
                  Where should we deliver your order?
                </p>

              </div>


              <button
                type="button"
                className="menu-address-close"
                onClick={
                  closeAddressSelector
                }
                aria-label="Close address selector"
              >

                <X />

              </button>

            </div>


            {/* SAVED ADDRESSES */}

            <div
              className="menu-address-list"
            >

              {addresses.map(
                (address) => {

                  const isSelected =
                    selectedAddress.id ===
                    address.id;


                  return (

                    <button
                      type="button"
                      key={address.id}
                      className={
                        isSelected
                          ? "menu-address-option selected"
                          : "menu-address-option"
                      }
                      onClick={() =>
                        handleAddressSelect(
                          address
                        )
                      }
                    >

                      <div
                        className="menu-address-option-icon"
                      >

                        <MapPin />

                      </div>


                      <div
                        className="menu-address-option-information"
                      >

                        <strong>
                          {address.label}
                        </strong>

                        <span>
                          {address.address}
                        </span>

                      </div>


                      {isSelected && (

                        <Check
                          className="menu-address-check"
                        />

                      )}

                    </button>

                  );

                }
              )}

            </div>


            {/* ADD NEW ADDRESS */}

            <button
              type="button"
              className="menu-address-add-button"
              onClick={
                handleAddNewAddress
              }
            >

              <Plus />

              <span>
                Add New Address
              </span>

            </button>

          </div>

        </div>

      )}


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <main
        className="menu-page-content"
      >

        {categoriesLoading && (

          <p>
            Loading menu...
          </p>

        )}


        {categoriesError && (

          <p>
            {categoriesError}
          </p>

        )}


        <section
          className="menu-introduction"
        >

          <div
            className="menu-title-decoration"
          ></div>


          <h1>
            Our Menu
          </h1>


          <div
            className="menu-title-decoration"
          ></div>


          <p>
            A delicious journey around the world
          </p>

        </section>


        {/* =========================================
            CATEGORY LIST
        ========================================= */}

        <section
          className="menu-category-list"
        >

          {menuCategories.map(
            (category) => (

              <button
                type="button"
                className="menu-category-card"
                key={category.id}
                onClick={() =>
                  handleCategoryClick(
                    category
                  )
                }
              >

                <div
                  className="menu-category-image"
                >

                  <img
                    src={category.image}
                    alt={category.name}
                  />

                </div>


                <div
                  className="menu-category-information"
                >

                  <h2>
                    {category.name}
                  </h2>


                  <p>
                    {category.description}
                  </p>

                </div>


                <div
                  className="menu-category-arrow"
                >

                  <ChevronRight />

                </div>

              </button>

            )
          )}

        </section>

      </main>


      {/* =========================================
          MOBILE BOTTOM NAVIGATION
      ========================================= */}

      <nav
        className="menu-mobile-bottom-navigation"
      >


        {/* HOME */}

        <button
  type="button"
  className={
    location.pathname === "/"
      ? "menu-mobile-bottom-item active"
      : "menu-mobile-bottom-item"
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
            location.pathname === "/discover"
              ? "menu-mobile-bottom-item active"
              : "menu-mobile-bottom-item"
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
    location.pathname === "/orders"
      ? "menu-mobile-bottom-item active"
      : "menu-mobile-bottom-item"
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
    location.pathname === "/profile"
      ? "menu-mobile-bottom-item active"
      : "menu-mobile-bottom-item"
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


export default Menu;
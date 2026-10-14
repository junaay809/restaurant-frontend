import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useRestaurant } from "../context/RestaurantContext";

import {
  Menu as MenuIcon,
  ShoppingCart,
  ChevronRight,
  X,
  Home as HomeIcon,
  Search,
  ClipboardList,
  User,
  ArrowLeft,
} from "lucide-react";

import "./Menu.css";

/* =========================================
   API CONFIGURATION
========================================= */

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://restaurant-backend-production-b36b.up.railway.app";

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

  const { cartCount } = useRestaurant();

  /* =========================================
     MENU CATEGORIES
  ========================================= */

  const [menuCategories, setMenuCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState("");

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
          throw new Error("Failed to load menu categories.");
        }

        const data = await response.json();

        setMenuCategories(
          Array.isArray(data) ? data : data.results || []
        );
      } catch (error) {
        console.error("Menu category error:", error);

        setCategoriesError("Unable to load menu categories.");
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  /* =========================================
     SIDE MENU
  ========================================= */

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  /* =========================================
     CATEGORY CLICK
  ========================================= */

  const handleCategoryClick = (category) => {
    navigate(`/menu/${category.slug}`);
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
  ========================================= */

  const isHomeActive = location.pathname === "/";
  const isDiscoverActive = location.pathname === "/discover";
  const isOrdersActive = location.pathname === "/orders";
  const isProfileActive = location.pathname === "/profile";

  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className="menu-page">
      {/* DESKTOP SIDE MENU */}

      {menuOpen && (
        <>
          <div
            className="menu-page-side-menu-overlay"
            onClick={closeMenu}
          ></div>

          <aside className="menu-page-side-menu">
            <div className="menu-page-side-menu-header">
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

            <nav className="menu-page-side-menu-navigation">
              <button type="button" onClick={goToHome}>
                <HomeIcon />
                <span>Home</span>
              </button>

              <button
                type="button"
                className={
                  isDiscoverActive
                    ? "menu-mobile-bottom-item active"
                    : "menu-mobile-bottom-item"
                }
                onClick={goToDiscover}
              >
                <Search />
                <span>Discover</span>
              </button>

              <button type="button" onClick={goToOrders}>
                <ClipboardList />
                <span>My Orders</span>
              </button>

              <button type="button" onClick={goToProfile}>
                <User />
                <span>Profile</span>
              </button>
            </nav>
          </aside>
        </>
      )}

      {/* HEADER */}

      <header className="menu-page-header">
        <div className="menu-page-top-header">
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
            onClick={() => navigate("/")}
            aria-label="Go to home"
          >
            <img src={dammysLogo} alt="Dammy's Spice" />
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
              <span className="menu-page-cart-count">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}

      <main className="menu-page-content">
        {categoriesLoading && <p>Loading menu...</p>}

        {categoriesError && <p>{categoriesError}</p>}

        <section className="menu-introduction">
          <div className="menu-title-decoration"></div>

          <h1>Our Menu</h1>

          <div className="menu-title-decoration"></div>

          <p>A delicious journey around the world</p>
        </section>

        {/* CATEGORY LIST */}

        <section className="menu-category-list">
          {menuCategories.map((category) => (
            <button
              type="button"
              className="menu-category-card"
              key={category.id}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="menu-category-image">
                <img
                  src={category.image}
                  alt={category.name}
                />
              </div>

              <div className="menu-category-information">
                <h2>{category.name}</h2>
                <p>{category.description}</p>
              </div>

              <div className="menu-category-arrow">
                <ChevronRight />
              </div>
            </button>
          ))}
        </section>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}

      <nav className="menu-mobile-bottom-navigation">
        <button
          type="button"
          className={
            isHomeActive
              ? "menu-mobile-bottom-item active"
              : "menu-mobile-bottom-item"
          }
          onClick={goToHome}
        >
          <HomeIcon />
          <span>Home</span>
        </button>

        <button
          type="button"
          className={
            isDiscoverActive
              ? "menu-mobile-bottom-item active"
              : "menu-mobile-bottom-item"
          }
          onClick={goToDiscover}
        >
          <Search />
          <span>Discover</span>
        </button>

        <button
          type="button"
          className={
            isOrdersActive
              ? "menu-mobile-bottom-item active"
              : "menu-mobile-bottom-item"
          }
          onClick={goToOrders}
        >
          <ClipboardList />
          <span>My Orders</span>
        </button>

        <button
          type="button"
          className={
            isProfileActive
              ? "menu-mobile-bottom-item active"
              : "menu-mobile-bottom-item"
          }
          onClick={goToProfile}
        >
          <User />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
}

export default Menu;
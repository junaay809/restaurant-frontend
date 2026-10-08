import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRestaurant } from "../context/RestaurantContext";

import {
  Menu as MenuIcon,
  ShoppingCart,
  ArrowLeft,
  X,
  Home as HomeIcon,
  Search,
  ClipboardList,
  User,
  SlidersHorizontal,
  Heart,
  Plus,
  Star,
} from "lucide-react";

import "./Desserts.css";
import dammysLogo from "../assets/Dammy's Logo.png";

/* =====================================================
   API CONFIGURATION
===================================================== */

const API_URL = "https://https://restaurant-backend-production-b36b.up.railway.app/api/menu/?category=desserts";

export const desserts = [];

/* =====================================================
   COUNTRIES
===================================================== */

const countries = [
  "All",
  "French",
  "Nigerian",
  "Japanese",
  "Indian",
];

/* =====================================================
   DESSERTS COMPONENT
===================================================== */

function Desserts() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    cartCount,
    addToCart,
    toggleFavorite,
    isFavorite,
  } = useRestaurant();

  /* =====================================================
     STATE
  ===================================================== */

  const [desserts, setDesserts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("All");

  const [sortBy, setSortBy] = useState("recommended");

  const [filterOpen, setFilterOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  /* =====================================================
     FETCH DESSERTS FROM DJANGO API
  ===================================================== */

  useEffect(() => {
    const controller = new AbortController();

    const fetchDesserts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Failed to load desserts. Server returned ${response.status}.`
          );
        }

        const data = await response.json();

        // Supports both a regular array and paginated Django REST responses.
        const items = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
          ? data.results
          : Array.isArray(data.data)
          ? data.data
          : [];

        // Convert API data into a consistent format for the page.
        const formattedDesserts = items.map((item) => ({
          ...item,

          id: item.id,

          name: item.name || "Unnamed Dessert",

          country: item.country || "",

          description: item.description || "",

          price: Number(item.price) || 0,

          rating: Number(item.rating) || 0,

          recommended: Boolean(
            item.recommended ??
            item.is_featured ??
            item.is_popular ??
            false
          ),

          image: item.image || "",
        }));

        setDesserts(formattedDesserts);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching desserts:", err);

          setError(
            "Unable to load desserts. Please check your connection and try again."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchDesserts();

    return () => {
      controller.abort();
    };
  }, []);

  /* =====================================================
     FILTER BY COUNTRY
  ===================================================== */

  const filteredDesserts =
    selectedCountry === "All"
      ? [...desserts]
      : desserts.filter(
          (item) =>
            item.country?.toLowerCase() ===
            selectedCountry.toLowerCase()
        );

  /* =====================================================
     SORT DESSERTS
  ===================================================== */

  const sortedDesserts = [...filteredDesserts].sort((a, b) => {
    switch (sortBy) {
      case "highest-price":
        return b.price - a.price;

      case "lowest-price":
        return a.price - b.price;

      case "highest-rating":
        return b.rating - a.rating;

      case "lowest-rating":
        return a.rating - b.rating;

      case "recommended":
      default:
        if (a.recommended !== b.recommended) {
          return Number(b.recommended) - Number(a.recommended);
        }

        return b.rating - a.rating;
    }
  });

  /* =====================================================
     BACK
  ===================================================== */

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
  const target = sessionStorage.getItem("favoriteTarget");

  if (!target || !target.startsWith("Desserts-")) return;

  const timer = setTimeout(() => {
    const element = document.getElementById(
      `favorite-${target}`
    );

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      element.classList.add("favorite-highlight");

      setTimeout(() => {
        element.classList.remove("favorite-highlight");
      }, 2500);

      sessionStorage.removeItem("favoriteTarget");
    }
  }, 500);

  return () => clearTimeout(timer);
}, []);

  /* =====================================================
     SIDE MENU
  ===================================================== */

  const closeMenu = () => {
    setMenuOpen(false);
  };

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

  /* =====================================================
     ACTIVE NAVIGATION
  ===================================================== */

  const isHome = location.pathname === "/";

  const isDiscover = location.pathname.startsWith("/discover");

  const isOrders = location.pathname.startsWith("/orders");

  const isProfile = location.pathname.startsWith("/profile");

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="desserts-page">
      {/* =================================================
          DESKTOP SIDE MENU
      ================================================= */}

      {menuOpen && (
        <>
          <div
            className="desserts-side-menu-overlay"
            onClick={closeMenu}
          ></div>

          <aside className="desserts-side-menu">
            <div className="desserts-side-menu-header">
              <img
                src={dammysLogo}
                alt="Dammy's Spice"
                className="desserts-side-menu-logo"
              />

              <button
                type="button"
                className="desserts-close-button"
                onClick={closeMenu}
              >
                <X />
              </button>
            </div>

            <nav className="desserts-side-navigation">
              <button type="button" onClick={goToHome}>
                <HomeIcon />
                <span>Home</span>
              </button>

              <button type="button" onClick={goToDiscover}>
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

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="desserts-header">
        <div className="desserts-top-header">
          {/* DESKTOP MENU */}

          <button
            type="button"
            className="desserts-header-button desserts-menu-button"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>

          {/* MOBILE BACK */}

          <button
            type="button"
            className="desserts-header-button desserts-back-button"
            onClick={handleBack}
            aria-label="Go back"
          >
            <ArrowLeft />
          </button>

          {/* LOGO */}

          <button
            type="button"
            className="desserts-logo"
            onClick={() => navigate("/")}
          >
            <img src={dammysLogo} alt="Dammy's Spice" />
          </button>

          {/* CART */}

          <button
            type="button"
            className="desserts-header-button desserts-cart-button"
            onClick={() => navigate("/orders")}
          >
            <ShoppingCart />

            {cartCount > 0 && (
              <span className="desserts-cart-count">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="desserts-content">
        {/* TITLE */}

        <section className="desserts-introduction">
          <div></div>

          <h1>Desserts</h1>

          <div></div>
        </section>

        {/* =================================================
            COUNTRY FILTER
        ================================================= */}

        <section className="desserts-filter-row">
          <div className="desserts-country-scroll">
            {countries.map((country) => (
              <button
                type="button"
                key={country}
                className={
                  selectedCountry === country
                    ? "desserts-country-button active"
                    : "desserts-country-button"
                }
                onClick={() => setSelectedCountry(country)}
              >
                {country}
              </button>
            ))}
          </div>

          {/* SORT BUTTON */}

          <button
            type="button"
            className={
              filterOpen
                ? "desserts-sort-button active"
                : "desserts-sort-button"
            }
            onClick={() => setFilterOpen((previous) => !previous)}
            aria-label="Sort desserts"
          >
            <SlidersHorizontal />
          </button>
        </section>

        {/* =================================================
            SORT PANEL
        ================================================= */}

        {filterOpen && (
          <section className="desserts-sort-panel">
            <div className="desserts-sort-header">
              <h2>Sort By</h2>

              <button
                type="button"
                className="desserts-sort-close"
                onClick={() => setFilterOpen(false)}
                aria-label="Close sort menu"
              >
                <X />
              </button>
            </div>

            {[
              ["recommended", "Most Recommended"],
              ["highest-price", "Highest Price"],
              ["lowest-price", "Lowest Price"],
              ["highest-rating", "Highest Rating"],
              ["lowest-rating", "Lowest Rating"],
            ].map(([value, label]) => (
              <button
                type="button"
                key={value}
                className={
                  sortBy === value
                    ? "desserts-sort-option selected"
                    : "desserts-sort-option"
                }
                onClick={() => {
                  setSortBy(value);
                  setFilterOpen(false);
                }}
              >
                {label}
              </button>
            ))}
          </section>
        )}

        {/* =================================================
            LOADING STATE
        ================================================= */}

        {loading && (
          <div className="desserts-empty-state">
            <p>Loading desserts...</p>
          </div>
        )}

        {/* =================================================
            ERROR STATE
        ================================================= */}

        {!loading && error && (
          <div className="desserts-empty-state">
            <h2>Unable to load desserts</h2>

            <p>{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* =================================================
            DESSERT LIST
        ================================================= */}

        {!loading && !error && (
          <section className="desserts-list">
            {sortedDesserts.map((item) => (
              <article className="dessert-card" key={item.id} id={`favorite-Desserts-${item.id}`}>
                {/* FOOD IMAGE */}

                <div className="dessert-image-wrapper">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="dessert-image"
                    />
                  ) : (
                    <div className="dessert-image-placeholder">
                      Image unavailable
                    </div>
                  )}
                </div>

                {/* FOOD INFORMATION */}

                <div className="dessert-information">
                  {/* NAME + HEART */}

                  <div className="dessert-name-row">
                    <h2>{item.name}</h2>

                    <button
                      type="button"
                      className="favorite-button"
                      onClick={() =>
                        toggleFavorite({
                          ...item,
                          category: "Desserts",
                        })
                      }
                      aria-label={`Add ${item.name} to favorites`}
                    >
                      <Heart
                        fill={
                          isFavorite(item.id)
                            ? "#e87528"
                            : "none"
                        }
                      />
                    </button>
                  </div>

                  {/* COUNTRY */}

                  <span className="dessert-country">
                    {item.country}
                  </span>

                  {/* DESCRIPTION */}

                  <p className="dessert-description">
                    {item.description}
                  </p>

                  {/* PRICE / RATING / ADD */}

                  <div className="dessert-bottom-row">
                    <div className="dessert-price-rating">
  <strong>
    ₦{item.price.toLocaleString()}
  </strong>

  <button
    type="button"
    className="dessert-rating"
    onClick={() => navigate(`/reviews/${item.id}`)}
    title="View reviews"
  >
    <Star fill="currentColor" />
    {Number(item.rating).toFixed(1)}
  </button>
</div>

                    {/* ADD TO CART */}

                    <button
                      type="button"
                      className="dessert-add-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        addToCart(item);
                      }}
                      aria-label={`Add ${item.name} to cart`}
                    >
                      <Plus />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {!loading && !error && sortedDesserts.length === 0 && (
          <div className="desserts-empty-state">
            <h2>No desserts found</h2>

            <p>
              {selectedCountry === "All"
                ? "No desserts are currently available."
                : "Try selecting another country."}
            </p>
          </div>
        )}
      </main>

      {/* =================================================
          MOBILE BOTTOM NAVIGATION
      ================================================= */}

      <nav className="desserts-mobile-navigation">
        {/* HOME */}

        <button
          type="button"
          className={
            isHome
              ? "desserts-mobile-nav-item active"
              : "desserts-mobile-nav-item"
          }
          onClick={goToHome}
        >
          <HomeIcon />
          <span>Home</span>
        </button>

        {/* DISCOVER */}

        <button
          type="button"
          className={
            isDiscover
              ? "desserts-mobile-nav-item active"
              : "desserts-mobile-nav-item"
          }
          onClick={goToDiscover}
        >
          <Search />
          <span>Discover</span>
        </button>

        {/* MY ORDERS */}

        <button
          type="button"
          className={
            isOrders
              ? "desserts-mobile-nav-item active"
              : "desserts-mobile-nav-item"
          }
          onClick={goToOrders}
        >
          <ClipboardList />
          <span>My Orders</span>
        </button>

        {/* PROFILE */}

        <button
          type="button"
          className={
            isProfile
              ? "desserts-mobile-nav-item active"
              : "desserts-mobile-nav-item"
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

export default Desserts;
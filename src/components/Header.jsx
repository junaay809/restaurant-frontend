import {
  Menu,
  ShoppingCart,
  MapPin,
  ChevronDown,
  Home as HomeIcon,
  Search,
  ClipboardList,
  User,
  X,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useRestaurant
} from "../context/RestaurantContext";

import logo from "../assets/Dammy's Logo.png";

function Header() {

      const { cartCount, isAuthenticated } = useRestaurant();

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

const token = localStorage.getItem("access_token");
const username = localStorage.getItem("username");

const firstLetter = username
    ? username.charAt(0).toUpperCase()
    : "";

  return (
    <>

      {/* ========================================
          HEADER
      ======================================== */}

      <header className="site-header">

        <div className="top-header">

          {/* ========================================
              HAMBURGER
          ======================================== */}

          <button
            className="icon-button menu-button"
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} strokeWidth={2} />
          </button>


          {/* ========================================
              CENTER LOGO
          ======================================== */}

          <Link
            to="/"
            className="brand-logo"
            aria-label="Dammy & Spice Home"
          >

            <img
              src={logo}
              alt="Dammy & Spice"
            />

          </Link>


          {/* ========================================
              SHOPPING CART
          ======================================== */}

          <Link
            to="/orders"
            className="cart-button"
            aria-label="Shopping cart"
            onClick={() => navigate("/orders")}
          >

            <ShoppingCart
              size={28}
              strokeWidth={2}
            />

           {cartCount > 0 && (
    <span className="cart-count">
      {cartCount}
    </span>
  )}

          </Link>

        </div>


        {/* ========================================
            CUSTOMER DELIVERY ADDRESS
        ======================================== */}

        <button
          className="address-selector"
          type="button"
        >

          <MapPin
            size={19}
            strokeWidth={2}
          />

          <span className="address-text">
            Ol...de Coker Street, 8
          </span>

          <ChevronDown
            size={18}
            strokeWidth={2}
          />

        </button>

      </header>


      {/* ========================================
          MOBILE BOTTOM NAVIGATION
      ======================================== */}

      <nav className="mobile-bottom-navigation">

        <Link
          to="/"
          className="mobile-nav-link active"
        >
          <HomeIcon size={22} />

          <span>
            Home
          </span>
        </Link>


        <Link
          to="/discover"
          className="mobile-nav-link"
        >
          <Search size={22} />

          <span>
            Discover
          </span>
        </Link>


        <Link
          to="/orders"
          className="mobile-nav-link"
        >
          <ClipboardList size={22} />

          <span>
            My Orders
          </span>
        </Link>


      <Link
  to={isAuthenticated ? "/profile" : "/auth"}
  className="mobile-nav-link"
>
  <User size={22} />
  <span>Profile</span>
</Link>

      </nav>


      {/* ========================================
          SIDE MENU
      ======================================== */}

      {menuOpen && (

        <>

          <div
            className="mobile-menu-overlay"
            onClick={() => setMenuOpen(false)}
          />


          <aside className="mobile-side-menu">


            {/* ========================================
                MENU HEADER
            ======================================== */}

            <div className="mobile-menu-header">

              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="mobile-menu-logo"
              >

                <img
                  src={logo}
                  alt="Dammy & Spice"
                />

              </Link>


              <button
                type="button"
                className="mobile-menu-close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >

                <X size={25} />

              </button>

            </div>


<div className="mobile-menu-links">

  {/* ========================================
      HOME
      Visible on desktop AND mobile
  ======================================== */}

  <Link
    to="/"
    onClick={() => setMenuOpen(false)}
    className="mobile-menu-link"
  >
    Home
  </Link>


  {/* ========================================
      CATEGORIES
      Visible on desktop AND mobile
  ======================================== */}
    <Link
        to="/menu/entrees"
        onClick={() => setMenuOpen(false)}
        className="mobile-menu-link"
    >
        Entrées
    </Link>

  <Link
    to="/menu/appetizers"
    onClick={() => setMenuOpen(false)}
    className="mobile-menu-link"
  >
    Appetizers
  </Link>

  <Link
    to="/menu/main-courses"
    onClick={() => setMenuOpen(false)}
    className="mobile-menu-link"
  >
    Main Courses
  </Link>


  <Link
    to="/menu/drinks"
    onClick={() => setMenuOpen(false)}
    className="mobile-menu-link"
  >
    Drinks
  </Link>


  <Link
    to="/menu/desserts"
    onClick={() => setMenuOpen(false)}
    className="mobile-menu-link"
  >
    Desserts
  </Link>


  {/* ========================================
      DESKTOP ONLY
  ======================================== */}

  <Link
    to="/discover"
    onClick={() => setMenuOpen(false)}
    className="mobile-menu-link desktop-menu-only"
  >
    Discover
  </Link>


  <Link
    to="/orders"
    onClick={() => setMenuOpen(false)}
    className="mobile-menu-link desktop-menu-only"
  >
    My Orders
  </Link>


  <Link
  to={isAuthenticated ? "/profile" : "/auth"}
  onClick={() => setMenuOpen(false)}
  className="mobile-menu-link desktop-menu-only"
>
  Profile
</Link>

  {isAuthenticated ? (
    <button
        className="menu-profile"
        onClick={() => navigate("/profile")}
    >
        <div className="menu-avatar">
            {firstLetter}
        </div>

        <span className="menu-profile-name">
            {username}
        </span>
    </button>
) : (
    <button
        className="menu-login"
        onClick={() => navigate("/auth")}
    >
        Sign Up / Log In
    </button>
)}

</div>

          </aside>

        </>

      )}

    </>
  );
}

export default Header;
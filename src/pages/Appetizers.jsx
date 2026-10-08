import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useRestaurant
} from "../context/RestaurantContext";

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

import "./Appetizers.css";

/* =========================================
   LOGO
========================================= */

import dammysLogo from "../assets/Dammy's Logo.png";


/* =========================================
   THAI APPETIZERS
========================================= */

import thaiChickenSatay from "../assets/thai-chicken-satay.jpg";
import thaiFishCakes from "../assets/thai-fish-cakes.jpg";
import thaiShrimpCakes from "../assets/thai-shrimp-cakes.jpg";
import thaiSpringRolls from "../assets/thai-spring-rolls.jpg";
import miangKham from "../assets/miang-kham.jpg";
import gaiHorBaiToey from "../assets/gai-hor-bai-toey.jpg";
import todManKung from "../assets/tod-man-kung.jpg";
import thaiCrispyWontons from "../assets/thai-crispy-wontons.jpg";


/* =========================================
   FRENCH APPETIZERS
========================================= */

import gougeres from "../assets/gougeres.jpg";
import escargots from "../assets/escargots.jpg";
import pissaladiere from "../assets/pissaladiere.jpg";
import oeufsMimosa from "../assets/oeufs-mimosa.jpg";
import salmonRillettes from "../assets/salmon-rillettes.jpg";
import foieGrasToast from "../assets/foie-gras-toast.jpg";
import cheesePalmiers from "../assets/cheese-palmiers.jpg";
import frenchOnionTartlets from "../assets/french-onion-tartlets.jpg";


/* =========================================
   MEXICAN APPETIZERS
========================================= */

import guacamole from "../assets/guacamole.jpg";
import quesoFundido from "../assets/queso-fundido.jpg";
import esquites from "../assets/esquites.jpg";
import miniTostadas from "../assets/mini-tostadas.jpg";
import chickenTaquitos from "../assets/chicken-taquitos.jpg";
import jalapenoPoppers from "../assets/jalapeno-poppers.jpg";
import shrimpCeviche from "../assets/shrimp-ceviche.jpg";
import eloteBites from "../assets/elote-bites.jpg";


/* =========================================
   NIGERIAN APPETIZERS
========================================= */

import puffPuff from "../assets/puff-puff.jpg";
import suyaSkewers from "../assets/suya-skewers.jpg";
import moiMoi from "../assets/moi-moi.jpg";
import akara from "../assets/akara.jpg";
import meatPie from "../assets/meat-pie.jpg";
import chinChin from "../assets/chin-chin.jpg";
import pepperedGizzard from "../assets/peppered-gizzard.jpg";
import plantainChips from "../assets/plantain-chips.jpg";


/* =========================================
   APPETIZER DATA
========================================= */

export const appetizers = [

  /* =======================================
     THAI
  ======================================= */

  {
    id: "thai-chicken-satay",
    name: "Thai Chicken Satay",
    country: "Thai",
    description: "Grilled chicken skewers with rich peanut sauce.",
    price: 3000,
    rating: 4.8,
    recommended: true,
    image: thaiChickenSatay,
  },

  {
    id: "thai-fish-cakes",
    name: "Thai Fish Cakes",
    country: "Thai",
    description: "Crispy fish cakes seasoned with Thai herbs and spices.",
    price: 3200,
    rating: 4.7,
    recommended: true,
    image: thaiFishCakes,
  },

  {
    id: "thai-shrimp-cakes",
    name: "Thai Shrimp Cakes",
    country: "Thai",
    description: "Golden shrimp cakes served with sweet chili sauce.",
    price: 3800,
    rating: 4.9,
    recommended: true,
    image: thaiShrimpCakes,
  },

  {
    id: "thai-spring-rolls",
    name: "Thai Fresh Spring Rolls",
    country: "Thai",
    description: "Fresh vegetables and herbs wrapped in delicate rice paper.",
    price: 2800,
    rating: 4.6,
    recommended: false,
    image: thaiSpringRolls,
  },

  {
    id: "miang-kham",
    name: "Miang Kham",
    country: "Thai",
    description: "Betel leaves filled with herbs, peanuts, coconut and lime.",
    price: 3500,
    rating: 4.7,
    recommended: true,
    image: miangKham,
  },

  {
    id: "gai-hor-bai-toey",
    name: "Gai Hor Bai Toey",
    country: "Thai",
    description: "Marinated chicken wrapped in fragrant pandan leaves.",
    price: 3400,
    rating: 4.8,
    recommended: true,
    image: gaiHorBaiToey,
  },

  {
    id: "tod-man-kung",
    name: "Tod Man Kung",
    country: "Thai",
    description: "Crispy Thai-style shrimp patties with sweet chili dip.",
    price: 3600,
    rating: 4.6,
    recommended: false,
    image: todManKung,
  },

  {
    id: "thai-crispy-wontons",
    name: "Thai Crispy Wontons",
    country: "Thai",
    description: "Crispy wontons filled with seasoned chicken and herbs.",
    price: 2700,
    rating: 4.5,
    recommended: false,
    image: thaiCrispyWontons,
  },


  /* =======================================
     FRENCH
  ======================================= */

  {
    id: "gougeres",
    name: "Gougères",
    country: "French",
    description: "Light French cheese puffs baked until golden and airy.",
    price: 3200,
    rating: 4.8,
    recommended: true,
    image: gougeres,
  },

  {
    id: "escargots",
    name: "Escargots de Bourgogne",
    country: "French",
    description: "Tender snails baked with garlic, parsley and butter.",
    price: 5500,
    rating: 4.7,
    recommended: true,
    image: escargots,
  },

  {
    id: "pissaladiere",
    name: "Pissaladière Bites",
    country: "French",
    description: "Caramelized onion tartlets with olives and herbs.",
    price: 3600,
    rating: 4.6,
    recommended: false,
    image: pissaladiere,
  },

  {
    id: "oeufs-mimosa",
    name: "Œufs Mimosa",
    country: "French",
    description: "Classic French deviled eggs finished with delicate herbs.",
    price: 2900,
    rating: 4.5,
    recommended: false,
    image: oeufsMimosa,
  },

  {
    id: "salmon-rillettes",
    name: "Salmon Rillettes Toast",
    country: "French",
    description: "Creamy seasoned salmon served on crisp toasted bread.",
    price: 4200,
    rating: 4.8,
    recommended: true,
    image: salmonRillettes,
  },

  {
    id: "foie-gras-toast",
    name: "Foie Gras Toast",
    country: "French",
    description: "Silky foie gras served over warm toasted brioche.",
    price: 6500,
    rating: 4.9,
    recommended: true,
    image: foieGrasToast,
  },

  {
    id: "cheese-palmiers",
    name: "Cheese Palmiers",
    country: "French",
    description: "Crispy puff pastry twists with rich French cheese.",
    price: 2800,
    rating: 4.4,
    recommended: false,
    image: cheesePalmiers,
  },

  {
    id: "french-onion-tartlets",
    name: "French Onion Tartlets",
    country: "French",
    description: "Buttery pastry filled with slow-cooked caramelized onions.",
    price: 3100,
    rating: 4.6,
    recommended: false,
    image: frenchOnionTartlets,
  },


  /* =======================================
     MEXICAN
  ======================================= */

  {
    id: "guacamole",
    name: "Fresh Guacamole",
    country: "Mexican",
    description: "Creamy avocado mixed with lime, tomato, onion and herbs.",
    price: 2800,
    rating: 4.8,
    recommended: true,
    image: guacamole,
  },

  {
    id: "queso-fundido",
    name: "Queso Fundido",
    country: "Mexican",
    description: "Melted cheese served hot with peppers and warm tortillas.",
    price: 3500,
    rating: 4.7,
    recommended: true,
    image: quesoFundido,
  },

  {
    id: "esquites",
    name: "Esquites",
    country: "Mexican",
    description: "Mexican street corn with lime, cheese and chili.",
    price: 2500,
    rating: 4.6,
    recommended: false,
    image: esquites,
  },

  {
    id: "mini-tostadas",
    name: "Mini Tostadas",
    country: "Mexican",
    description: "Crunchy tortillas topped with beans, salsa and fresh toppings.",
    price: 3200,
    rating: 4.8,
    recommended: true,
    image: miniTostadas,
  },

  {
    id: "chicken-taquitos",
    name: "Chicken Taquitos",
    country: "Mexican",
    description: "Crispy rolled tortillas filled with seasoned chicken.",
    price: 3400,
    rating: 4.7,
    recommended: true,
    image: chickenTaquitos,
  },

  {
    id: "jalapeno-poppers",
    name: "Jalapeño Poppers",
    country: "Mexican",
    description: "Jalapeños filled with creamy cheese and crisped until golden.",
    price: 3000,
    rating: 4.5,
    recommended: false,
    image: jalapenoPoppers,
  },

  {
    id: "shrimp-ceviche",
    name: "Shrimp Ceviche",
    country: "Mexican",
    description: "Fresh shrimp tossed with lime, onion, tomato and cilantro.",
    price: 4500,
    rating: 4.9,
    recommended: true,
    image: shrimpCeviche,
  },

  {
    id: "elote-bites",
    name: "Elote Bites",
    country: "Mexican",
    description: "Sweet corn bites finished with chili, lime and creamy cheese.",
    price: 2700,
    rating: 4.6,
    recommended: false,
    image: eloteBites,
  },


  /* =======================================
     NIGERIAN
  ======================================= */

  {
    id: "puff-puff",
    name: "Puff Puff",
    country: "Nigerian",
    description: "Soft golden Nigerian dough balls with a lightly sweet finish.",
    price: 1800,
    rating: 4.8,
    recommended: true,
    image: puffPuff,
  },

  {
    id: "suya-skewers",
    name: "Suya Skewers",
    country: "Nigerian",
    description: "Spiced grilled beef skewers with onions and fresh peppers.",
    price: 3500,
    rating: 4.9,
    recommended: true,
    image: suyaSkewers,
  },

  {
    id: "moi-moi",
    name: "Moi Moi",
    country: "Nigerian",
    description: "Steamed bean pudding seasoned with peppers and aromatic spices.",
    price: 2200,
    rating: 4.7,
    recommended: true,
    image: moiMoi,
  },

  {
    id: "akara",
    name: "Akara",
    country: "Nigerian",
    description: "Crispy bean fritters with a soft and savory center.",
    price: 1800,
    rating: 4.6,
    recommended: false,
    image: akara,
  },

  {
    id: "meat-pie",
    name: "Nigerian Meat Pie",
    country: "Nigerian",
    description: "Flaky pastry filled with seasoned minced beef and vegetables.",
    price: 2500,
    rating: 4.8,
    recommended: true,
    image: meatPie,
  },

  {
    id: "chin-chin",
    name: "Chin Chin",
    country: "Nigerian",
    description: "Crunchy golden pastry bites with a lightly sweet flavor.",
    price: 1700,
    rating: 4.5,
    recommended: false,
    image: chinChin,
  },

  {
    id: "peppered-gizzard",
    name: "Peppered Gizzard",
    country: "Nigerian",
    description: "Tender gizzard tossed in a rich spicy pepper sauce.",
    price: 3300,
    rating: 4.8,
    recommended: true,
    image: pepperedGizzard,
  },

  {
    id: "plantain-chips",
    name: "Plantain Chips",
    country: "Nigerian",
    description: "Thin crispy slices of ripe plantain with a savory crunch.",
    price: 1600,
    rating: 4.4,
    recommended: false,
    image: plantainChips,
  },

];


/* =========================================
   COUNTRIES
========================================= */

const countries = [
  "All",
  "Thai",
  "French",
  "Mexican",
  "Nigerian",
];


/* =========================================
   APPETIZERS COMPONENT
========================================= */

function Appetizers() {

  const navigate = useNavigate();

  const location = useLocation();

  const [appetizers, setAppetizers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

  const {
  cartCount,
  addToCart,
  favorites,
  toggleFavorite,
  isFavorite,
} = useRestaurant();

  const [selectedCountry, setSelectedCountry] = useState("All");

  const [sortBy, setSortBy] = useState("recommended");

  const [filterOpen, setFilterOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
  const fetchAppetizers = async () => {
    try {
      const response = await fetch(
        "https://https://restaurant-backend-production-b36b.up.railway.app/api/menu/?category=appetizers"
      );

      if (!response.ok) {
        throw new Error("Failed to load appetizers");
      }

      const data = await response.json();

      setAppetizers(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error("Error loading appetizers:", err);
      setError("Unable to load appetizers.");
    } finally {
      setLoading(false);
    }
  };

  fetchAppetizers();
}, []);


  /* =========================================
     FILTER BY COUNTRY
  ========================================= */

  const filteredAppetizers =
    selectedCountry === "All"
      ? [...appetizers]
      : appetizers.filter(
          (item) =>
            item.country === selectedCountry
        );


  /* =========================================
     SORT
  ========================================= */

  const sortedAppetizers =
    [...filteredAppetizers].sort(
      (a, b) => {

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

            if (
              a.recommended !==
              b.recommended
            ) {
              return b.recommended - a.recommended;
            }

            return b.rating - a.rating;
        }

      }
    );


  /* =========================================
     BACK
  ========================================= */

  const handleBack = () => {

    if (window.history.length > 1) {

      navigate(-1);

    } else {

      navigate("/");

    }

  };

  useEffect(() => {
  const target = sessionStorage.getItem("favoriteTarget");

  if (!target || !target.startsWith("Appetizers-")) return;

  let attempts = 0;

  const timer = setInterval(() => {
    const itemId = target.replace("Appetizers-", "");
    const element = document.getElementById(
      `favorite-Appetizers-${itemId}`
    );

    attempts++;

    if (element) {
      clearInterval(timer);

      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      element.classList.add("favorite-highlight");
      sessionStorage.removeItem("favoriteTarget");

      setTimeout(() => {
        element.classList.remove("favorite-highlight");
      }, 2500);
    }

    if (attempts >= 30) clearInterval(timer);
  }, 100);

  return () => clearInterval(timer);
}, []);

  /* =========================================
     SIDE MENU
  ========================================= */

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


  /* =========================================
     ACTIVE NAV
  ========================================= */

  const isHome =
    location.pathname === "/";

  const isDiscover =
    location.pathname.startsWith(
      "/discover"
    );

  const isOrders =
    location.pathname.startsWith(
      "/orders"
    );

  const isProfile =
    location.pathname.startsWith(
      "/profile"
    );


  return (

    <div className="appetizers-page">


      {/* ======================================
          DESKTOP SIDE MENU
      ====================================== */}

      {menuOpen && (

        <>

          <div
            className="appetizers-side-menu-overlay"
            onClick={closeMenu}
          ></div>


          <aside className="appetizers-side-menu">

            <div className="appetizers-side-menu-header">

              <img
                src={dammysLogo}
                alt="Dammy's Spice"
                className="appetizers-side-menu-logo"
              />


              <button
                type="button"
                className="appetizers-close-button"
                onClick={closeMenu}
              >

                <X />

              </button>

            </div>


            <nav className="appetizers-side-navigation">

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


      {/* ======================================
          HEADER
      ====================================== */}

      <header className="appetizers-header">

        <div className="appetizers-top-header">


          {/* DESKTOP HAMBURGER */}

          <button
            type="button"
            className="appetizers-header-button appetizers-menu-button"
            onClick={() =>
              setMenuOpen(true)
            }
          >

            <MenuIcon />

          </button>


          {/* MOBILE BACK */}

          <button
            type="button"
            className="appetizers-header-button appetizers-back-button"
            onClick={handleBack}
            aria-label="Go back"
          >

            <ArrowLeft />

          </button>


          {/* LOGO */}

          <button
            type="button"
            className="appetizers-logo"
            onClick={() => navigate("/")}
          >

            <img
              src={dammysLogo}
              alt="Dammy's Spice"
            />

          </button>


          {/* CART */}

          <button
            type="button"
            className="appetizers-header-button appetizers-cart-button"
            onClick={() =>
              navigate("/orders")
            }
          >

            <ShoppingCart />

            {cartCount > 0 && (

              <span className="appetizers-cart-count">
                {cartCount}
              </span>

            )}

          </button>

        </div>

      </header>


      {/* ======================================
          MAIN
      ====================================== */}

      <main className="appetizers-content">


        {/* TITLE */}

        <section className="appetizers-introduction">

          <div></div>

          <h1>
            Appetizers
          </h1>

          <div></div>

        </section>


        {/* ======================================
            COUNTRY FILTERS
        ====================================== */}

        <section className="appetizers-filter-row">


          <div className="appetizers-country-scroll">

            {countries.map(
              (country) => (

                <button
                  type="button"
                  key={country}
                  className={
                    selectedCountry === country
                      ? "appetizers-country-button active"
                      : "appetizers-country-button"
                  }
                  onClick={() =>
                    setSelectedCountry(
                      country
                    )
                  }
                >

                  {country}

                </button>

              )
            )}

          </div>


          {/* SORT BUTTON */}

          <button
            type="button"
            className={
              filterOpen
                ? "appetizers-sort-button active"
                : "appetizers-sort-button"
            }
            onClick={() =>
              setFilterOpen(
                (previous) =>
                  !previous
              )
            }
            aria-label="Sort appetizers"
          >

            <SlidersHorizontal />

          </button>

        </section>

        {/* ======================================
            SORT PANEL
        ====================================== */}

        {filterOpen && (

          <section className="appetizers-sort-panel">

            <div className="appetizers-sort-header">

              <h2>
                Sort By
              </h2>

              <button
                type="button"
                onClick={() =>
                  setFilterOpen(false)
                }
              >

                <X />

              </button>

            </div>


            <button
              type="button"
              className={
                sortBy === "recommended"
                  ? "appetizers-sort-option selected"
                  : "appetizers-sort-option"
              }
              onClick={() => {

                setSortBy("recommended");

                setFilterOpen(false);

              }}
            >
              Most Recommended
            </button>


            <button
              type="button"
              className={
                sortBy === "highest-price"
                  ? "appetizers-sort-option selected"
                  : "appetizers-sort-option"
              }
              onClick={() => {

                setSortBy("highest-price");

                setFilterOpen(false);

              }}
            >
              Highest Price
            </button>


            <button
              type="button"
              className={
                sortBy === "lowest-price"
                  ? "appetizers-sort-option selected"
                  : "appetizers-sort-option"
              }
              onClick={() => {

                setSortBy("lowest-price");

                setFilterOpen(false);

              }}
            >
              Lowest Price
            </button>


            <button
              type="button"
              className={
                sortBy === "highest-rating"
                  ? "appetizers-sort-option selected"
                  : "appetizers-sort-option"
              }
              onClick={() => {

                setSortBy("highest-rating");

                setFilterOpen(false);

              }}
            >
              Highest Rating
            </button>


            <button
              type="button"
              className={
                sortBy === "lowest-rating"
                  ? "appetizers-sort-option selected"
                  : "appetizers-sort-option"
              }
              onClick={() => {

                setSortBy("lowest-rating");

                setFilterOpen(false);

              }}
            >
              Lowest Rating
            </button>

          </section>

        )}


        {/* ======================================
            FOOD LIST
        ====================================== */}

        <section className="appetizers-list">

          {sortedAppetizers.map(
            (item) => (

              <article
                className="appetizer-card"
                key={item.id}
                id={`favorite-Appetizers-${item.id}`}
              >

                {/* FOOD IMAGE */}

                <div className="appetizer-image-wrapper">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="appetizer-image"
                  />

                </div>


                {/* FOOD INFORMATION */}

                <div className="appetizer-information">


                  {/* NAME + HEART */}

                  <div className="appetizer-name-row">

                    <h2>
                      {item.name}
                    </h2>


                    <button
  type="button"
  className="favorite-button"
  onClick={() =>
    toggleFavorite({
      ...item,
      category: "Appetizers",
    })
  }
>
  <Heart
    fill={isFavorite(item.id) ? "#e87528" : "none"}
  />
</button>

                  </div>


                  {/* COUNTRY */}

                  <span className="appetizer-country">

                    {item.country}

                  </span>


                  {/* DESCRIPTION */}

                  <p className="appetizer-description">

                    {item.description}

                  </p>


                  {/* PRICE / RATING / ADD */}

                  <div className="appetizer-bottom-row">


                    <div className="appetizer-price-rating">

                      <strong>
                        ₦{item.price.toLocaleString()}
                      </strong>


                      <button
  type="button"
  className="appetizer-rating"
  onClick={() => navigate(`/reviews/${item.id}`)}
  title="View reviews"
>
  <Star fill="currentColor" /> {item.rating}
</button>

                    </div>


                    <button
                      type="button"
                      className="appetizer-add-button"
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

            )
          )}

        </section>


      </main>


      {/* ======================================
          MOBILE BOTTOM NAVIGATION
      ====================================== */}

      <nav className="appetizers-mobile-navigation">


        {/* HOME */}

        <button
          type="button"
          className={
            isHome
              ? "appetizers-mobile-nav-item active"
              : "appetizers-mobile-nav-item"
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
              ? "appetizers-mobile-nav-item active"
              : "appetizers-mobile-nav-item"
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
              ? "appetizers-mobile-nav-item active"
              : "appetizers-mobile-nav-item"
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
              ? "appetizers-mobile-nav-item active"
              : "appetizers-mobile-nav-item"
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


export default Appetizers;
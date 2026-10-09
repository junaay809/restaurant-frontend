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

import "./Drinks.css";


/* =========================================
   LOGO
========================================= */

import dammysLogo from "../assets/Dammy's Logo.png";


/* =========================================
   NIGERIAN DRINKS
========================================= */

import zobo from "../assets/zobo.jpg";
import tigerNutDrink from "../assets/tiger-nut-drink.jpg";
import kunu from "../assets/kunu.jpg";
import chapman from "../assets/chapman.jpg";
import palmWine from "../assets/palm-wine.jpg";
import kunuAya from "../assets/kunu-aya.jpg";
import gingerDrink from "../assets/ginger-drink.jpg";
import tamarindDrink from "../assets/tamarind-drink.jpg";


/* =========================================
   ITALIAN DRINKS
========================================= */

import espresso from "../assets/espresso.jpg";
import cappuccino from "../assets/cappuccino.jpg";
import caffeLatte from "../assets/caffe-latte.jpg";
import affogato from "../assets/affogato.jpg";
import italianSoda from "../assets/italian-soda.jpg";
import granita from "../assets/granita.jpg";
import marocchino from "../assets/marocchino.jpg";
import shakerato from "../assets/shakerato.jpg";


/* =========================================
   AMERICAN DRINKS
========================================= */

import lemonade from "../assets/lemonade.jpg";
import icedTea from "../assets/iced-tea.jpg";
import milkshake from "../assets/milkshake.jpg";
import rootBeerFloat from "../assets/root-beer-float.jpg";
import appleCider from "../assets/apple-cider.jpg";
import hotChocolate from "../assets/hot-chocolate.jpg";
import icedCoffee from "../assets/iced-coffee.jpg";
import strawberryLemonade from "../assets/strawberry-lemonade.jpg";


/* =========================================
   DRINK DATA
========================================= */

export const drinks = [

  /* =======================================
     NIGERIAN
  ======================================= */

  {
    id: "zobo",
    name: "Zobo",
    country: "Nigerian",
    description:
      "Refreshing hibiscus drink infused with ginger, pineapple and aromatic spices.",
    price: 1800,
    rating: 4.9,
    recommended: true,
    image: zobo,
  },

  {
    id: "tiger-nut-drink",
    name: "Tiger Nut Drink",
    country: "Nigerian",
    description:
      "Creamy and naturally sweet tiger nut drink served chilled and refreshing.",
    price: 2200,
    rating: 4.8,
    recommended: true,
    image: tigerNutDrink,
  },

  {
    id: "kunu",
    name: "Kunu",
    country: "Nigerian",
    description:
      "Traditional Nigerian millet drink lightly spiced with ginger and sweetened.",
    price: 1800,
    rating: 4.7,
    recommended: true,
    image: kunu,
  },

  {
    id: "chapman",
    name: "Chapman",
    country: "Nigerian",
    description:
      "Classic Nigerian fruit cocktail blended with citrus, grenadine and bitters.",
    price: 2800,
    rating: 4.9,
    recommended: true,
    image: chapman,
  },

  {
    id: "palm-wine",
    name: "Palm Wine",
    country: "Nigerian",
    description:
      "Traditional Nigerian palm sap drink served chilled and naturally refreshing.",
    price: 2500,
    rating: 4.6,
    recommended: false,
    image: palmWine,
  },

  {
    id: "kunu-aya",
    name: "Kunu Aya",
    country: "Nigerian",
    description:
      "Smooth tiger nut and spice drink with a rich creamy texture.",
    price: 2300,
    rating: 4.8,
    recommended: true,
    image: kunuAya,
  },

  {
    id: "ginger-drink",
    name: "Ginger Drink",
    country: "Nigerian",
    description:
      "Bold homemade ginger drink balanced with citrus and a touch of sweetness.",
    price: 1900,
    rating: 4.7,
    recommended: false,
    image: gingerDrink,
  },

  {
    id: "tamarind-drink",
    name: "Tamarind Drink",
    country: "Nigerian",
    description:
      "Sweet and tangy tamarind beverage served chilled with aromatic spices.",
    price: 2000,
    rating: 4.6,
    recommended: false,
    image: tamarindDrink,
  },


  /* =======================================
     ITALIAN
  ======================================= */

  {
    id: "espresso",
    name: "Espresso",
    country: "Italian",
    description:
      "Rich and intense Italian espresso with a smooth aromatic finish.",
    price: 1800,
    rating: 4.9,
    recommended: true,
    image: espresso,
  },

  {
    id: "cappuccino",
    name: "Cappuccino",
    country: "Italian",
    description:
      "Classic Italian coffee topped with silky steamed milk and creamy foam.",
    price: 2500,
    rating: 4.9,
    recommended: true,
    image: cappuccino,
  },

  {
    id: "caffe-latte",
    name: "Caffè Latte",
    country: "Italian",
    description:
      "Smooth espresso blended with steamed milk for a creamy balanced drink.",
    price: 2600,
    rating: 4.8,
    recommended: true,
    image: caffeLatte,
  },

  {
    id: "affogato",
    name: "Affogato",
    country: "Italian",
    description:
      "Creamy vanilla gelato served with a shot of rich hot espresso.",
    price: 3200,
    rating: 4.9,
    recommended: true,
    image: affogato,
  },

  {
    id: "italian-soda",
    name: "Italian Soda",
    country: "Italian",
    description:
      "Sparkling Italian-style soda blended with refreshing fruit syrup.",
    price: 2200,
    rating: 4.6,
    recommended: false,
    image: italianSoda,
  },

  {
    id: "granita",
    name: "Granita",
    country: "Italian",
    description:
      "Refreshing semi-frozen Italian dessert drink with a light fruity flavor.",
    price: 2400,
    rating: 4.7,
    recommended: true,
    image: granita,
  },

  {
    id: "marocchino",
    name: "Marocchino",
    country: "Italian",
    description:
      "Espresso layered with cocoa and silky milk foam for a rich finish.",
    price: 2700,
    rating: 4.8,
    recommended: true,
    image: marocchino,
  },

  {
    id: "shakerato",
    name: "Caffè Shakerato",
    country: "Italian",
    description:
      "Chilled espresso shaken until frothy and served refreshingly cold.",
    price: 2500,
    rating: 4.8,
    recommended: false,
    image: shakerato,
  },


  /* =======================================
     AMERICAN
  ======================================= */

  {
    id: "lemonade",
    name: "Classic Lemonade",
    country: "American",
    description:
      "Freshly squeezed lemonade balanced with natural sweetness and served chilled.",
    price: 1800,
    rating: 4.8,
    recommended: true,
    image: lemonade,
  },

  {
    id: "iced-tea",
    name: "Iced Tea",
    country: "American",
    description:
      "Refreshing brewed iced tea lightly sweetened and served over ice.",
    price: 1800,
    rating: 4.7,
    recommended: true,
    image: icedTea,
  },

  {
    id: "milkshake",
    name: "Classic Milkshake",
    country: "American",
    description:
      "Thick creamy milkshake blended with ice cream and finished with whipped cream.",
    price: 3200,
    rating: 4.9,
    recommended: true,
    image: milkshake,
  },

  {
    id: "root-beer-float",
    name: "Root Beer Float",
    country: "American",
    description:
      "Classic root beer topped with creamy vanilla ice cream.",
    price: 3000,
    rating: 4.8,
    recommended: true,
    image: rootBeerFloat,
  },

  {
    id: "apple-cider",
    name: "Apple Cider",
    country: "American",
    description:
      "Sweet apple cider infused with warm cinnamon and aromatic spices.",
    price: 2300,
    rating: 4.7,
    recommended: true,
    image: appleCider,
  },

  {
    id: "hot-chocolate",
    name: "Hot Chocolate",
    country: "American",
    description:
      "Rich creamy chocolate drink topped with soft whipped cream.",
    price: 2600,
    rating: 4.9,
    recommended: true,
    image: hotChocolate,
  },

  {
    id: "iced-coffee",
    name: "Iced Coffee",
    country: "American",
    description:
      "Smooth chilled coffee served over ice with creamy milk.",
    price: 2500,
    rating: 4.8,
    recommended: true,
    image: icedCoffee,
  },

  {
    id: "strawberry-lemonade",
    name: "Strawberry Lemonade",
    country: "American",
    description:
      "Fresh lemonade blended with sweet strawberries for a fruity finish.",
    price: 2400,
    rating: 4.9,
    recommended: true,
    image: strawberryLemonade,
  },

];


/* =========================================
   COUNTRIES
========================================= */

const countries = [
  "All",
  "Nigerian",
  "French",
  "American",
];

/* =========================================
   DRINKS COMPONENT
========================================= */

function Drinks() {

  const navigate = useNavigate();

  const location = useLocation();

  const [drinks, setDrinks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

  const {
  cartCount,
  addToCart,
  favorites,
  toggleFavorite,
  isFavorite,
} = useRestaurant();

  const [selectedCountry, setSelectedCountry] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("recommended");

  const [filterOpen, setFilterOpen] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

    useEffect(() => {
  const fetchDrinks = async () => {
    try {
      const response = await fetch(
        "https://restaurant-backend-production-b36b.up.railway.app/api/menu/?category=drinks"
      );

      if (!response.ok) {
        throw new Error("Failed to load drinks");
      }

      const data = await response.json();

      const formattedData = data.map((item) => ({
        ...item,
        price: Number(item.price),
        rating: Number(item.rating),
        recommended: item.is_featured,
      }));

      setDrinks(formattedData);
    } catch (err) {
      console.error("Error loading drinks:", err);
      setError("Unable to load drinks.");
    } finally {
      setLoading(false);
    }
  };

  fetchDrinks();
}, []);

  /* =========================================
     FILTER BY COUNTRY
  ========================================= */

  const filteredDrinks =
    selectedCountry === "All"
      ? [...drinks]
      : drinks.filter(
          (item) =>
            item.country === selectedCountry
        );


  /* =========================================
     SORT
  ========================================= */

  const sortedDrinks =
    [...filteredDrinks].sort(
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
              return (
                b.recommended -
                a.recommended
              );
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

  if (!target || !target.startsWith("Drinks-")) return;

  let attempts = 0;

  const timer = setInterval(() => {
    const itemId = target.replace("Drinks-", "");
    const element = document.getElementById(
      `favorite-Drinks-${itemId}`
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

    if (attempts >= 30) {
      clearInterval(timer);
    }
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

    <div className="drinks-page">


      {/* ======================================
          DESKTOP SIDE MENU
      ====================================== */}

      {menuOpen && (

        <>

          <div
            className="drinks-side-menu-overlay"
            onClick={closeMenu}
          ></div>


          <aside className="drinks-side-menu">

            <div className="drinks-side-menu-header">

              <img
                src={dammysLogo}
                alt="Dammy's Spice"
                className="drinks-side-menu-logo"
              />


              <button
                type="button"
                className="drinks-close-button"
                onClick={closeMenu}
              >

                <X />

              </button>

            </div>


            <nav className="drinks-side-navigation">

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

      <header className="drinks-header">

        <div className="drinks-top-header">


          {/* DESKTOP HAMBURGER */}

          <button
            type="button"
            className="drinks-header-button drinks-menu-button"
            onClick={() =>
              setMenuOpen(true)
            }
          >

            <MenuIcon />

          </button>


          {/* MOBILE BACK */}

          <button
            type="button"
            className="drinks-header-button drinks-back-button"
            onClick={handleBack}
            aria-label="Go back"
          >

            <ArrowLeft />

          </button>


          {/* LOGO */}

          <button
            type="button"
            className="drinks-logo"
            onClick={() =>
              navigate("/")
            }
          >

            <img
              src={dammysLogo}
              alt="Dammy's Spice"
            />

          </button>


          {/* CART */}

          <button
            type="button"
            className="drinks-header-button drinks-cart-button"
            onClick={() =>
              navigate("/orders")
            }
          >

            <ShoppingCart />

            {cartCount > 0 && (

              <span className="drinks-cart-count">
                {cartCount}
              </span>

            )}

          </button>

        </div>

      </header>


      {/* ======================================
          MAIN
      ====================================== */}

      <main className="drinks-content">


        {/* TITLE */}

        <section className="drinks-introduction">

          <div></div>

          <h1>
            Drinks
          </h1>

          <div></div>

        </section>


        {/* ======================================
            COUNTRY FILTERS
        ====================================== */}

        <section className="drinks-filter-row">

          <div className="drinks-country-scroll">

            {countries.map(
              (country) => (

                <button
                  type="button"
                  key={country}
                  className={
                    selectedCountry === country
                      ? "drinks-country-button active"
                      : "drinks-country-button"
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
                ? "drinks-sort-button active"
                : "drinks-sort-button"
            }
            onClick={() =>
              setFilterOpen(
                (previous) =>
                  !previous
              )
            }
            aria-label="Sort drinks"
          >

            <SlidersHorizontal />

          </button>

        </section>


        {/* ======================================
            SORT PANEL
        ====================================== */}

        {filterOpen && (

          <section className="drinks-sort-panel">

            <div className="drinks-sort-header">

              <h2>
                Sort By
              </h2>


              <button
                type="button"
                className="drinks-sort-close"
                onClick={() =>
                  setFilterOpen(false)
                }
                aria-label="Close sort"
              >

                <X />

              </button>

            </div>


            <button
              type="button"
              className={
                sortBy === "recommended"
                  ? "drinks-sort-option selected"
                  : "drinks-sort-option"
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
                  ? "drinks-sort-option selected"
                  : "drinks-sort-option"
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
                  ? "drinks-sort-option selected"
                  : "drinks-sort-option"
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
                  ? "drinks-sort-option selected"
                  : "drinks-sort-option"
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
                  ? "drinks-sort-option selected"
                  : "drinks-sort-option"
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
            DRINK LIST
        ====================================== */}

        <section className="drinks-list">

          {sortedDrinks.map(
            (item) => (

              <article
                className="drink-card"
                key={item.id}
                id={`favorite-Drinks-${item.id}`}
              >


                {/* DRINK IMAGE */}

                <div className="drink-image-wrapper">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="drink-image"
                  />

                </div>


                {/* DRINK INFORMATION */}

                <div className="drink-information">


                  {/* NAME + HEART */}

                  <div className="drink-name-row">

                    <h2>
                      {item.name}
                    </h2>


                    <button
  type="button"
  className="favorite-button"
  onClick={() =>
    toggleFavorite({
      ...item,
      category: "Drinks",
    })
  }
>
  <Heart
    fill={isFavorite(item.id) ? "#e87528" : "none"}
  />
</button>

                  </div>


                  {/* COUNTRY */}

                  <span className="drink-country">

                    {item.country}

                  </span>


                  {/* DESCRIPTION */}

                  <p className="drink-description">

                    {item.description}

                  </p>


                  {/* PRICE / RATING / ADD */}

                  <div className="drink-bottom-row">

                    <div className="drink-price-rating">
  <strong>
    ₦{item.price.toLocaleString()}
  </strong>

  <button
    type="button"
    className="drink-rating"
    onClick={() => navigate(`/reviews/${item.id}`)}
    title="View reviews"
  >
    <Star fill="currentColor" />
    {item.rating}
  </button>
</div>


                    <button
                      type="button"
                      className="drink-add-button"
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


        {/* ======================================
            EMPTY STATE
        ====================================== */}

        {sortedDrinks.length === 0 && (

          <div className="drinks-empty-state">

            <h2>
              No drinks found
            </h2>

            <p>
              Try selecting another country.
            </p>

          </div>

        )}

      </main>


      {/* ======================================
          MOBILE BOTTOM NAVIGATION
      ====================================== */}

      <nav className="drinks-mobile-navigation">


        {/* HOME */}

        <button
          type="button"
          className={
            isHome
              ? "drinks-mobile-nav-item active"
              : "drinks-mobile-nav-item"
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
              ? "drinks-mobile-nav-item active"
              : "drinks-mobile-nav-item"
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
              ? "drinks-mobile-nav-item active"
              : "drinks-mobile-nav-item"
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
              ? "drinks-mobile-nav-item active"
              : "drinks-mobile-nav-item"
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


export default Drinks;
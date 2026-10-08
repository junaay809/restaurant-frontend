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

import "./Entrees.css";

import dammysLogo from "../assets/Dammy's Logo.png";


/* =====================================================
   SPANISH ENTREES
===================================================== */

import croquetasJamon from "../assets/croquetas-jamon.jpg";
import patatasBravas from "../assets/patatas-bravas.jpg";
import gambasAjillo from "../assets/gambas-ajillo.jpg";
import pimientosPadron from "../assets/pimientos-padron.jpg";
import tortillaEspanola from "../assets/tortilla-espanola.jpg";
import boquerones from "../assets/boquerones-en-vinagre.jpg";
import calamaresFritos from "../assets/calamares-fritos.jpg";
import chorizoVino from "../assets/chorizo-al-vino.jpg";


/* =====================================================
   ITALIAN ENTREES
===================================================== */

import bruschetta from "../assets/bruschetta.jpg";
import arancini from "../assets/arancini.jpg";
import frittoMisto from "../assets/fritto-misto.jpg";
import capreseSkewers from "../assets/caprese-skewers.jpg";
import polpette from "../assets/polpette-al-sugo.jpg";
import mozzarellaCarrozza from "../assets/mozzarella-in-carrozza.jpg";
import stuffedMushrooms from "../assets/stuffed-mushrooms.jpg";
import friedCalamari from "../assets/italian-fried-calamari.jpg";


/* =====================================================
   JAPANESE ENTREES
===================================================== */

import gyoza from "../assets/gyoza.jpg";
import edamame from "../assets/edamame.jpg";
import agedashiTofu from "../assets/agedashi-tofu.jpg";
import takoyaki from "../assets/takoyaki.jpg";
import chickenKaraage from "../assets/chicken-karaage.jpg";
import ebiTempura from "../assets/ebi-tempura.jpg";
import yakitori from "../assets/yakitori.jpg";
import harumaki from "../assets/harumaki.jpg";


/* =====================================================
   NIGERIAN ENTREES
===================================================== */

import asun from "../assets/asun.jpg";
import pepperedSnail from "../assets/peppered-snail.jpg";
import pepperedGizzard from "../assets/peppered-gizzard.jpg";
import gizdodo from "../assets/gizdodo.jpg";
import beefSuya from "../assets/beef-suya.jpg";
import nkwobi from "../assets/nkwobi.jpg";
import isiEwu from "../assets/isi-ewu.jpg";
import pepperedChicken from "../assets/peppered-chicken.jpg";


/* =====================================================
   ENTREE DATA
===================================================== */

export const entrees = [

  /* ===================================================
     SPANISH
  =================================================== */

  {
    id: "croquetas-jamon",
    name: "Croquetas de Jamón",
    country: "Spanish",
    description: "Crispy Spanish ham croquettes with a creamy savory center.",
    price: 3200,
    rating: 4.8,
    recommended: true,
    image: croquetasJamon,
  },

  {
    id: "patatas-bravas",
    name: "Patatas Bravas",
    country: "Spanish",
    description: "Crispy potatoes served with bold Spanish bravas sauce.",
    price: 2800,
    rating: 4.7,
    recommended: true,
    image: patatasBravas,
  },

  {
    id: "gambas-al-ajillo",
    name: "Gambas al Ajillo",
    country: "Spanish",
    description: "Juicy prawns sautéed with garlic, olive oil and chili.",
    price: 4800,
    rating: 4.9,
    recommended: true,
    image: gambasAjillo,
  },

  {
    id: "pimientos-de-padron",
    name: "Pimientos de Padrón",
    country: "Spanish",
    description: "Blistered Spanish peppers finished with olive oil and sea salt.",
    price: 2600,
    rating: 4.6,
    recommended: false,
    image: pimientosPadron,
  },

  {
    id: "tortilla-espanola",
    name: "Tortilla Española Bites",
    country: "Spanish",
    description: "Classic Spanish potato and egg omelette served in bite-sized portions.",
    price: 3000,
    rating: 4.7,
    recommended: true,
    image: tortillaEspanola,
  },

  {
    id: "boquerones",
    name: "Boquerones en Vinagre",
    country: "Spanish",
    description: "Delicate marinated anchovies finished with garlic and fresh herbs.",
    price: 3500,
    rating: 4.5,
    recommended: false,
    image: boquerones,
  },

  {
    id: "calamares-fritos",
    name: "Calamares Fritos",
    country: "Spanish",
    description: "Lightly battered fried calamari served crisp and golden.",
    price: 4200,
    rating: 4.8,
    recommended: true,
    image: calamaresFritos,
  },

  {
    id: "chorizo-al-vino",
    name: "Chorizo al Vino",
    country: "Spanish",
    description: "Spanish chorizo slowly cooked with herbs and rich wine sauce.",
    price: 3900,
    rating: 4.7,
    recommended: false,
    image: chorizoVino,
  },


  /* ===================================================
     ITALIAN
  =================================================== */

  {
    id: "bruschetta",
    name: "Bruschetta al Pomodoro",
    country: "Italian",
    description: "Toasted bread topped with fresh tomatoes, basil and olive oil.",
    price: 2800,
    rating: 4.8,
    recommended: true,
    image: bruschetta,
  },

  {
    id: "arancini",
    name: "Arancini",
    country: "Italian",
    description: "Golden crispy risotto balls filled with cheese and savory herbs.",
    price: 3500,
    rating: 4.9,
    recommended: true,
    image: arancini,
  },

  {
    id: "fritto-misto",
    name: "Fritto Misto",
    country: "Italian",
    description: "Lightly fried seafood and vegetables served with lemon.",
    price: 4800,
    rating: 4.7,
    recommended: true,
    image: frittoMisto,
  },

  {
    id: "caprese-skewers",
    name: "Caprese Skewers",
    country: "Italian",
    description: "Fresh mozzarella, cherry tomatoes and basil finished with balsamic.",
    price: 3000,
    rating: 4.6,
    recommended: false,
    image: capreseSkewers,
  },

  {
    id: "polpette-al-sugo",
    name: "Polpette al Sugo",
    country: "Italian",
    description: "Tender Italian meatballs served in a rich tomato and herb sauce.",
    price: 3800,
    rating: 4.8,
    recommended: true,
    image: polpette,
  },

  {
    id: "mozzarella-in-carrozza",
    name: "Mozzarella in Carrozza",
    country: "Italian",
    description: "Crispy fried mozzarella sandwiches with a rich melted center.",
    price: 3300,
    rating: 4.7,
    recommended: true,
    image: mozzarellaCarrozza,
  },

  {
    id: "stuffed-mushrooms",
    name: "Italian Stuffed Mushrooms",
    country: "Italian",
    description: "Baked mushrooms filled with herbs, breadcrumbs and parmesan.",
    price: 3200,
    rating: 4.5,
    recommended: false,
    image: stuffedMushrooms,
  },

  {
    id: "italian-fried-calamari",
    name: "Italian Fried Calamari",
    country: "Italian",
    description: "Crispy golden calamari served with lemon and a light dipping sauce.",
    price: 4500,
    rating: 4.8,
    recommended: true,
    image: friedCalamari,
  },


  /* ===================================================
     JAPANESE
  =================================================== */

  {
    id: "gyoza",
    name: "Gyoza",
    country: "Japanese",
    description: "Pan-fried Japanese dumplings filled with seasoned meat and vegetables.",
    price: 3500,
    rating: 4.9,
    recommended: true,
    image: gyoza,
  },

  {
    id: "edamame",
    name: "Edamame",
    country: "Japanese",
    description: "Steamed young soybeans finished with sea salt.",
    price: 2200,
    rating: 4.5,
    recommended: false,
    image: edamame,
  },

  {
    id: "agedashi-tofu",
    name: "Agedashi Tofu",
    country: "Japanese",
    description: "Crispy tofu served with warm Japanese dashi broth and herbs.",
    price: 3000,
    rating: 4.6,
    recommended: false,
    image: agedashiTofu,
  },

  {
    id: "takoyaki",
    name: "Takoyaki",
    country: "Japanese",
    description: "Golden octopus-filled balls topped with Japanese sauce and bonito flakes.",
    price: 3200,
    rating: 4.8,
    recommended: true,
    image: takoyaki,
  },

  {
    id: "chicken-karaage",
    name: "Chicken Karaage",
    country: "Japanese",
    description: "Japanese-style crispy fried chicken marinated with ginger and soy.",
    price: 4200,
    rating: 4.9,
    recommended: true,
    image: chickenKaraage,
  },

  {
    id: "ebi-tempura",
    name: "Ebi Tempura",
    country: "Japanese",
    description: "Lightly battered prawns fried until crisp and delicate.",
    price: 4500,
    rating: 4.8,
    recommended: true,
    image: ebiTempura,
  },

  {
    id: "yakitori",
    name: "Yakitori",
    country: "Japanese",
    description: "Grilled chicken skewers glazed with savory Japanese tare sauce.",
    price: 3800,
    rating: 4.7,
    recommended: true,
    image: yakitori,
  },

  {
    id: "harumaki",
    name: "Harumaki",
    country: "Japanese",
    description: "Crispy Japanese spring rolls filled with vegetables and seasoned meat.",
    price: 3000,
    rating: 4.6,
    recommended: false,
    image: harumaki,
  },


  /* ===================================================
     NIGERIAN
  =================================================== */

  {
    id: "asun",
    name: "Asun",
    country: "Nigerian",
    description: "Smoky grilled goat meat tossed with hot peppers and onions.",
    price: 4500,
    rating: 4.9,
    recommended: true,
    image: asun,
  },

  {
    id: "peppered-snail",
    name: "Peppered Snail",
    country: "Nigerian",
    description: "Tender snails sautéed in a rich and spicy Nigerian pepper sauce.",
    price: 6500,
    rating: 4.8,
    recommended: true,
    image: pepperedSnail,
  },

  {
    id: "peppered-gizzard",
    name: "Peppered Gizzard",
    country: "Nigerian",
    description: "Tender gizzard tossed with peppers, onions and aromatic spices.",
    price: 4000,
    rating: 4.8,
    recommended: true,
    image: pepperedGizzard,
  },

  {
    id: "gizdodo",
    name: "Gizdodo",
    country: "Nigerian",
    description: "Peppered gizzard and fried plantain tossed in a rich spicy sauce.",
    price: 4500,
    rating: 4.9,
    recommended: true,
    image: gizdodo,
  },

  {
    id: "beef-suya",
    name: "Nigerian Beef Suya",
    country: "Nigerian",
    description: "Grilled beef skewers coated in traditional suya spice and served with onions.",
    price: 4200,
    rating: 4.9,
    recommended: true,
    image: beefSuya,
  },

  {
    id: "nkwobi",
    name: "Nkwobi",
    country: "Nigerian",
    description: "Tender cow foot prepared in a rich and spicy palm-oil sauce.",
    price: 5500,
    rating: 4.7,
    recommended: true,
    image: nkwobi,
  },

  {
    id: "isi-ewu",
    name: "Isi Ewu",
    country: "Nigerian",
    description: "Traditional spicy goat-head delicacy prepared with aromatic Nigerian spices.",
    price: 6000,
    rating: 4.7,
    recommended: false,
    image: isiEwu,
  },

  {
    id: "peppered-chicken",
    name: "Peppered Chicken",
    country: "Nigerian",
    description: "Juicy grilled chicken tossed in a bold Nigerian pepper sauce.",
    price: 4500,
    rating: 4.8,
    recommended: true,
    image: pepperedChicken,
  },

];

/* =====================================================
   COUNTRIES
===================================================== */

const countries = [
  "All",
  "Spanish",
  "Italian",
  "Japanese",
  "Nigerian",
];


/* =====================================================
   ENTREES COMPONENT
===================================================== */

function Entrees() {

  const navigate = useNavigate();

  const location = useLocation();

  const [entrees, setEntrees] = useState([]);
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
  const fetchEntrees = async () => {
    try {
      const response = await fetch(
        "https://https://restaurant-backend-production-b36b.up.railway.app/api/menu/?category=entrees"
      );

      if (!response.ok) {
        throw new Error("Failed to load entrees");
      }

      const data = await response.json();

      setEntrees(data);
    } catch (err) {
      console.error("Error loading entrees:", err);
      setError("Unable to load entrees.");
    } finally {
      setLoading(false);
    }
  };

  fetchEntrees();
}, []);

  /* ===================================================
     FILTER BY COUNTRY
  =================================================== */

  const filteredEntrees =
    selectedCountry === "All"
      ? [...entrees]
      : entrees.filter(
          (item) =>
            item.country === selectedCountry
        );


  /* ===================================================
     SORT
  =================================================== */

  const sortedEntrees =
    [...filteredEntrees].sort(
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


  /* ===================================================
     BACK
  =================================================== */

  const handleBack = () => {

    if (window.history.length > 1) {

      navigate(-1);

    } else {

      navigate("/menu");

    }

  };

  useEffect(() => {
  const target = sessionStorage.getItem("favoriteTarget");

  if (!target || !target.startsWith("Entrees-")) return;

  let attempts = 0;

  const timer = setInterval(() => {
    const itemId = target.replace("Entrees-", "");
    const element = document.getElementById(
      `favorite-Entrees-${itemId}`
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

  /* ===================================================
     SIDE MENU
  =================================================== */

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


  /* ===================================================
     ACTIVE NAV
  =================================================== */

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


      {/* =================================================
          DESKTOP SIDE MENU
      ================================================= */}

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


      {/* =================================================
          HEADER
      ================================================= */}

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


      {/* =================================================
          MAIN
      ================================================= */}

      <main className="appetizers-content">


        {/* TITLE */}

        <section className="appetizers-introduction">

          <div></div>

          <h1>
            Entrées
          </h1>

          <div></div>

        </section>


        {/* =================================================
            COUNTRY FILTERS
        ================================================= */}

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
            aria-label="Sort entrees"
          >

            <SlidersHorizontal />

          </button>

        </section>


{/* =================================================
    SORT PANEL
================================================= */}

{filterOpen && (

  <div className="appetizers-sort-panel">

    <div className="appetizers-sort-header">

      <h3>
        Sort By
      </h3>

      <button
        type="button"
        className="appetizers-sort-close"
        onClick={() => setFilterOpen(false)}
        aria-label="Close sort options"
      >
        ×
      </button>

    </div>


    <button
      type="button"
      className={
        sortBy === "recommended"
          ? "active"
          : ""
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
          ? "active"
          : ""
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
          ? "active"
          : ""
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
          ? "active"
          : ""
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
          ? "active"
          : ""
      }
      onClick={() => {
        setSortBy("lowest-rating");
        setFilterOpen(false);
      }}
    >
      Lowest Rating
    </button>

  </div>

)}


        {/* =================================================
            ENTREE LIST
        ================================================= */}

        <section className="appetizers-list">

          {sortedEntrees.map(
            (item) => (

              <article
                className="appetizer-item"
                key={item.id}
                id={`favorite-Entrees-${item.id}`}
              >

                <div className="appetizer-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                </div>


                <div className="appetizer-information">

                  <h2>
                    {item.name}
                  </h2>

                  <span className="appetizer-country">
                    {item.country}
                  </span>

                  <p>
                    {item.description}
                  </p>

                  <div className="appertizer-price">

  <strong>
    ₦{item.price.toLocaleString()}
  </strong>

  <button
    type="button"
    className="entree-rating"
    onClick={() => navigate(`/reviews/${item.id}`)}
    title="View reviews"
  >
    <Star fill="currentColor" />
    {item.rating}
  </button>

</div>

                </div>


                <div className="appetizer-actions">

                  <button
  type="button"
  className="favorite-button"
  onClick={() =>
    toggleFavorite({
      ...item,
      category: "Entrees",
    })
  }
>
  <Heart
    fill={isFavorite(item.id) ? "#e87528" : "none"}
  />
</button>


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

              </article>

            )
          )}

        </section>


        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {sortedEntrees.length === 0 && (

          <div className="appetizers-empty-state">

            <h2>
              No entrées found
            </h2>

            <p>
              Try selecting another country.
            </p>

          </div>

        )}

      </main>


      {/* =================================================
          MOBILE BOTTOM NAVIGATION
      ================================================= */}

      <nav className="appetizers-bottom-navigation">


        <button
          type="button"
          className={
            isHome
              ? "active"
              : ""
          }
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
            isDiscover
              ? "active"
              : ""
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
          className={
            isOrders
              ? "active"
              : ""
          }
          onClick={goToOrders}
        >

          <ClipboardList />

          <span>
            My Orders
          </span>

        </button>


        <button
          type="button"
          className={
            isProfile
              ? "active"
              : ""
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


export default Entrees;
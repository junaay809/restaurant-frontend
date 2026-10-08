import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useRestaurant
} from "../context/RestaurantContext";

import burgerImage from "../assets/burger.jpg";
import heroFood from "../assets/hero-food.jpg";
import heroWorldFood from "../assets/hero-world-food.jpg";
import heroDelivery from "../assets/hero-delivery.jpg";

import smokyJollof from "../assets/smoky-jollof.jpg";
import trufflePasta from "../assets/truffle-pasta.jpg";
import japaneseSushi from "../assets/japanese-sushi.jpg";
import chickenWings from "../assets/chicken-wings.jpg";
import mangoSmoothie from "../assets/mango-smoothie.jpg";
import vanillaCake from "../assets/vanilla-cake.jpg";
import chickenFries from "../assets/chicken-fries.jpg";
import beefSamosa from "../assets/beef-samosa.jpg";

import {
  Search,
  Utensils,
  Soup,
  Pizza,
  GlassWater,
  CakeSlice,
  SlidersHorizontal,
  Plus,
  Heart,
} from "lucide-react";

import "./Home.css";
import Header from "../components/Header";


function Home() {

  const navigate = useNavigate();
  const location = useLocation();

  const {
  cartCount,
  addToCart,
  favorites,
  toggleFavorite,
  isFavorite,
} = useRestaurant();

const [allMenuItems, setAllMenuItems] = useState([]);

useEffect(() => {
  const fetchMenuItems = async () => {
    try {
      const response = await fetch(
        "https://https://restaurant-backend-production-b36b.up.railway.app/api/menu/"
      );

      if (!response.ok) {
        throw new Error("Failed to load menu items.");
      }

      const data = await response.json();

      setAllMenuItems(
        Array.isArray(data) ? data : data.results || []
      );
    } catch (error) {
      console.error("Error loading menu:", error);
    }
  };

  fetchMenuItems();
}, []);

const recommendedDishes = [...allMenuItems]
  .sort((a, b) => Number(b.rating) - Number(a.rating))
  .slice(0, 8);


  /* ========================================
     SEARCH
  ======================================== */
  const [searchTerm, setSearchTerm] = useState("");

const searched = searchTerm.trim().length > 0;



  /* ========================================
     CATEGORY FILTER
  ======================================== */

  const [isFilterOpen, setIsFilterOpen] =
    useState(false);

  const categories = [
    "Entrées",
    "Appetizers",
    "Main Courses",
    "Drinks",
    "Desserts",
  ];


  /* ========================================
     CAROUSEL
  ======================================== */

  const [currentSlide, setCurrentSlide] =
    useState(0);

  /* ========================================
     SAVE ORDERS
  ======================================== */

//   useEffect(() => {

//     localStorage.setItem(
//       "dammySpiceOrders",
//       JSON.stringify(orders)
//     );


//     window.dispatchEvent(
//       new CustomEvent(
//         "dammy-spice-cart-updated",
//         {
//           detail: orders,
//         }
//       )
//     );

//   }, [orders]);


  /* ========================================
     SAVE FAVORITES
  ======================================== */

  useEffect(() => {

    localStorage.setItem(
      "dammySpiceFavorites",
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

  /* ========================================
     SEARCH
  ======================================== */

  const handleSearch = () => {

    const term =
      searchTerm.trim();


    if (!term) {

      setSearched(false);

      return;

    }


    setSearched(true);

  };


  /* ========================================
     CATEGORY NAVIGATION
  ======================================== */

  const handleCategorySelect =
    (category) => {

      setIsFilterOpen(false);


      const categoryPaths = {

        Entrées:
          "/menu/entrees",

        Appetizers:
          "/menu/appetizers",

        "Main Courses":
          "/menu/main-courses",

        Drinks:
          "/menu/drinks",

        Desserts:
          "/menu/desserts",

      };


      const path =
        categoryPaths[category];


      if (path) {

        navigate(path);

      }

    };

const filteredDishes = allMenuItems.filter((dish) => {
  const search = searchTerm.trim().toLowerCase();

  if (!search) return false;

  const dishName = String(dish.name ?? "").toLowerCase();

  return dishName.includes(search);
});

  /* ========================================
     AUTOMATIC CAROUSEL
  ======================================== */

  useEffect(() => {

    const timer =
      setInterval(() => {

        setCurrentSlide(
          (previousSlide) =>
            (previousSlide + 1) % 3
        );

      }, 2500);


    return () =>
      clearInterval(timer);

  }, []);


  /* ========================================
     DISH CARD
  ======================================== */

  const renderDish = (dish) => ( 

    <article
      className="recommended-item"
      key={dish.id}
    >

      {/* FOOD IMAGE */}

      <div className="small-image">

        <img
          src={dish.image}
          alt={dish.name}
        />

      </div>


      {/* FOOD INFORMATION */}

      <div className="item-info">

        <h3>
          {dish.name}
        </h3>

        <span>
          Dammy & Spice
        </span>

        <strong>
          ₦{dish.price.toLocaleString()}
        </strong>

      </div>


      {/* FAVORITE */}

      <button
        type="button"
        className={
          isFavorite(dish.id)
            ? "favorite-button active"
            : "favorite-button"
        }
        onClick={() => toggleFavorite({
  ...dish,
  category: dish.category
})}
        aria-label={
          isFavorite(dish.id)
            ? `Remove ${dish.name} from favorites`
            : `Add ${dish.name} to favorites`
        }
      >

        <Heart
          size={18}
          fill={
            isFavorite(dish.id)
              ? "currentColor"
              : "none"
          }
        />

      </button>


      {/* ADD TO ORDER */}

      <button
        type="button"
        className="add-button"
        onClick={() =>
          addToCart(dish)
        }
        aria-label={
          `Add ${dish.name} to order`
        }
      >

        <Plus size={18} />

      </button>

    </article>

  );


  return (

    <div className="home-page">

      <Header />


      <main>


        {/* ========================================
            HERO CAROUSEL
        ======================================== */}

        <section className="hero-section">

          <div className="hero-carousel">


            {/* SLIDE 1 */}

            <div
              className={`hero-slide hero-slide-one ${
                currentSlide === 0
                  ? "active"
                  : ""
              }`}
              style={{
                backgroundImage: `
                  linear-gradient(
                    90deg,
                    rgba(20, 18, 16, 0.96) 0%,
                    rgba(20, 18, 16, 0.82) 42%,
                    rgba(20, 18, 16, 0.15) 100%
                  ),
                  url(${heroFood})
                `,
              }}
            >

              <div className="hero-placeholder-image"></div>

              <div className="hero-content">

                <h2>
                  A World of
                  <br />
                  Flavours
                  <br />
                  <span>
                    On Your Plate
                  </span>
                </h2>

                <p>
                  Experience the best of global cuisines,
                  freshly prepared and delivered to you.
                </p>

                <button
                  onClick={() =>
                    navigate("/menu")
                  }
                  className="primary-button"
                  type="button"
                >
                  Order Now
                </button>

              </div>

            </div>


            {/* SLIDE 2 */}

            <div
              className={`hero-slide hero-slide-two ${
                currentSlide === 1
                  ? "active"
                  : ""
              }`}
              style={{
                backgroundImage: `
                  linear-gradient(
                    90deg,
                    rgba(20, 18, 16, 0.96) 0%,
                    rgba(20, 18, 16, 0.78) 45%,
                    rgba(20, 18, 16, 0.15) 100%
                  ),
                  url(${heroWorldFood})
                `,
              }}
            >

              <div className="hero-placeholder-image"></div>

              <div className="hero-content">

                <h2>
                  Taste the
                  <br />
                  <span>
                    World
                  </span>
                </h2>

                <p>
                  Discover delicious dishes from
                  different cultures, all in one place.
                </p>

                <button
                  onClick={() =>
                    navigate("/menu")
                  }
                  className="primary-button"
                  type="button"
                >
                  Explore Menu
                </button>

              </div>

            </div>


            {/* SLIDE 3 */}

            <div
              className={`hero-slide hero-slide-three ${
                currentSlide === 2
                  ? "active"
                  : ""
              }`}
              style={{
                backgroundImage: `
                  linear-gradient(
                    90deg,
                    rgba(20, 18, 16, 0.90) 0%,
                    rgba(20, 18, 16, 0.55) 45%,
                    rgba(20, 18, 16, 0.10) 100%
                  ),
                  url(${heroDelivery})
                `,
              }}
            >

              <div className="hero-placeholder-image"></div>

              <div className="hero-content">

                <h2>
                  Fresh.
                  <br />
                  Delicious.
                  <br />
                  <span>
                    Delivered.
                  </span>
                </h2>

                <p>
                  From our kitchen to your doorstep,
                  enjoy food made with passion.
                </p>

                <button
                  onClick={() =>
                    navigate("/menu")
                  }
                  className="primary-button"
                  type="button"
                >
                  Get Now
                </button>

              </div>

            </div>


            {/* CAROUSEL INDICATORS */}

            <div className="carousel-indicators">

              {[0, 1, 2].map(
                (slide) => (

                  <button
                    key={slide}
                    type="button"
                    className={
                      currentSlide === slide
                        ? "carousel-indicator active"
                        : "carousel-indicator"
                    }
                    onClick={() =>
                      setCurrentSlide(slide)
                    }
                    aria-label={
                      `Go to slide ${slide + 1}`
                    }
                  />

                )
              )}

            </div>

          </div>

        </section>

        {/* ========================================
            SEARCH
        ======================================== */}

        <section className="search-section">

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => {

              setSearchTerm(
                event.target.value
              );

              setSearched(false);

            }}
            onKeyDown={(event) => {

              if (
                event.key === "Enter"
              ) {

                handleSearch();

              }

            }}
            placeholder="Search for dishes, cuisines, drinks..."
          />


          {/* SEARCH BUTTON */}

          <button
            className="search-button"
            type="button"
            onClick={handleSearch}
            aria-label="Search"
          >

            <Search size={20} />

          </button>


          {/* FILTER BUTTON */}

          <button
            className="search-button"
            type="button"
            onClick={() =>
              setIsFilterOpen(
                !isFilterOpen
              )
            }
            aria-label="Open categories"
            aria-expanded={
              isFilterOpen
            }
          >

            <SlidersHorizontal
              size={20}
            />

          </button>

        </section>


        {/* ========================================
            CATEGORY FILTER
        ======================================== */}

        {isFilterOpen && (

          <section
            className="categories-section"
          >

            {categories.map(
              (category) => (

                <button
                  type="button"
                  className="category"
                  key={category}
                  onClick={() =>
                    handleCategorySelect(
                      category
                    )
                  }
                >

                  <div
                    className="category-icon"
                  >

                    {category ===
                      "Entrées" && (
                      <Pizza
                        size={24}
                      />
                    )}

                    {category ===
                      "Appetizers" && (
                      <Utensils
                        size={24}
                      />
                    )}

                    {category ===
                      "Main Courses" && (
                      <Soup
                        size={24}
                      />
                    )}

                    {category ===
                      "Drinks" && (
                      <GlassWater
                        size={24}
                      />
                    )}

                    {category ===
                      "Desserts" && (
                      <CakeSlice
                        size={24}
                      />
                    )}

                  </div>

                  <span>
                    {category}
                  </span>

                </button>

              )
            )}

          </section>

        )}


        {/* ========================================
            SEARCH RESULTS
        ======================================== */}

        {searched && (

          <section
            className="content-section"
          >

            <div
              className="section-heading"
            >

              <h2>
                Search Results
              </h2>


              <button
                type="button"
                onClick={() => {

                  setSearchTerm("");

                  setSearched(false);

                }}
              >
                Clear
              </button>

            </div>


            <div
              className="recommended-list"
            >

              {filteredDishes.length > 0 ? (

                filteredDishes.map(
                  renderDish
                )

              ) : (

                <article
                  className="recommended-item"
                >

                  <div
                    className="item-info"
                  >

                    <h3>
                      No dishes found
                    </h3>

                    <span>
                      Try searching for another dish.
                    </span>

                  </div>

                </article>

              )}

            </div>

          </section>

        )}


        {/* ========================================
            HOT DEALS
        ======================================== */}

        <section className="hot-deals">

          <div
            className="hot-deals-content"
          >

            <h2>

              <span>
                Hot Deals
              </span>

              <span
                className="hot-deals-fire"
              >
                🔥
              </span>

            </h2>


            <p>
              Enjoy exclusive deals
              <br />
              on your favourites!
            </p>


        <button
  type="button"
  onClick={() => navigate("/menu/main-courses")}
>
  See All
</button>

          </div>


          <div
            className="hot-deals-image"
          >

            <img
              src={burgerImage}
              alt="Hot deal burger"
            />

          </div>

        </section>


        {/* ========================================
            RECOMMENDED FOR YOU
        ======================================== */}

        {!searched && (

          <section
            className="content-section"
          >

            <div
              className="section-heading"
            >

              <h2>
                Recommended for you
              </h2>

            </div>


            <div
              className="recommended-list"
            >

              {recommendedDishes.map(
                renderDish
              )}

            </div>

          </section>

        )}

      </main>

    </div>

  );

}


export default Home;
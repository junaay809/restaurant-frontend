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

import "./MainCourses.css";

import dammysLogo from "../assets/Dammy's Logo.png";


/* =====================================================
   NIGERIAN MAIN COURSES
===================================================== */

import jollofRice from "../assets/jollof-rice.jpg";
import nigerianFriedRice from "../assets/nigerian-fried-rice.jpg";
import amalaEfoRiro from "../assets/amala-efo-riro.jpg";
import poundedYamEgusi from "../assets/pounded-yam-egusi.jpg";
import ofadaAyamase from "../assets/ofada-rice-ayamase.jpg";
import beansPlantain from "../assets/beans-plantain.jpg";
import ebaOkra from "../assets/eba-okra-soup.jpg";
import whiteRiceStew from "../assets/white-rice-nigerian-stew.jpg";


/* =====================================================
   AMERICAN MAIN COURSES
===================================================== */

import cheeseburger from "../assets/classic-cheeseburger.jpg";
import bbqRibs from "../assets/bbq-ribs.jpg";
import friedChicken from "../assets/fried-chicken.jpg";
import chickenWaffles from "../assets/chicken-waffles.jpg";
import macAndCheese from "../assets/mac-and-cheese.jpg";
import newYorkStrip from "../assets/new-york-strip.jpg";
import grilledChicken from "../assets/grilled-chicken.jpg";
import shrimpGrits from "../assets/shrimp-and-grits.jpg";


/* =====================================================
   INDIAN MAIN COURSES
===================================================== */

import chickenTikkaMasala from "../assets/chicken-tikka-masala.jpg";
import butterChicken from "../assets/butter-chicken.jpg";
import chickenBiryani from "../assets/chicken-biryani.jpg";
import lambRoganJosh from "../assets/lamb-rogan-josh.jpg";
import palakPaneer from "../assets/palak-paneer.jpg";
import chanaMasala from "../assets/chana-masala.jpg";
import lambBiryani from "../assets/lamb-biryani.jpg";
import goanFishCurry from "../assets/goan-fish-curry.jpg";

/* =====================================================
   CHINESE MAIN COURSES
===================================================== */

import kungPaoChicken from "../assets/kung-pao-chicken.jpg";
import sweetSourPork from "../assets/sweet-sour-pork.jpg";
import mapoTofu from "../assets/mapo-tofu.jpg";
import beefBroccoli from "../assets/beef-broccoli.jpg";
import pekingDuck from "../assets/peking-duck.jpg";
import yangzhouFriedRice from "../assets/yangzhou-fried-rice.jpg";
import mongolianBeef from "../assets/mongolian-beef.jpg";
import cantoneseRoastChicken from "../assets/cantonese-roast-chicken.jpg";

/* =====================================================
   SINGAPOREAN MAIN COURSES
===================================================== */

import hainaneseChickenRice from "../assets/hainanese-chicken-rice.jpg";
import singaporeLaksa from "../assets/singapore-laksa.jpg";
import chilliCrab from "../assets/singapore-chilli-crab.jpg";
import charKwayTeow from "../assets/char-kway-teow.jpg";
import hokkienMee from "../assets/hokkien-mee.jpg";
import nasiLemak from "../assets/singapore-nasi-lemak.jpg";
import singaporeNoodles from "../assets/singapore-noodles.jpg";
import bakKutTeh from "../assets/bak-kut-teh.jpg";

/* =====================================================
   JAMAICAN MAIN COURSES
===================================================== */

import jerkChicken from "../assets/jerk-chicken.jpg";
import jamaicanOxtailRice from "../assets/jamaican-oxtail-rice.jpg";
import curryGoat from "../assets/curry-goat.jpg";
import brownStewChicken from "../assets/brown-stew-chicken.jpg";
import escovitchFish from "../assets/escovitch-fish.jpg";
import ackeeSaltfish from "../assets/ackee-saltfish.jpg";
import jamaicanCurryChicken from "../assets/jamaican-curry-chicken.jpg";
import jamaicanPepperPot from "../assets/jamaican-pepper-pot.jpg";

/* =====================================================
   JAPANESE MAIN COURSES
===================================================== */

import chickenKatsuCurry from "../assets/chicken-katsu-curry.jpg";
import tonkatsu from "../assets/tonkatsu.jpg";
import beefTeriyaki from "../assets/beef-teriyaki.jpg";
import chickenTeriyaki from "../assets/chicken-teriyaki.jpg";
import katsudon from "../assets/katsudon.jpg";
import oyakodon from "../assets/oyakodon.jpg";
import japaneseCurryRice from "../assets/japanese-curry-rice.jpg";
import unagiDon from "../assets/unagi-don.jpg";

/* =====================================================
   ITALIAN MAIN COURSES
===================================================== */

import lasagna from "../assets/lasagna.jpg";
import spaghettiBolognese from "../assets/spaghetti-bolognese.jpg";
import chickenParmigiana from "../assets/chicken-parmigiana.jpg";
import risottoMilanese from "../assets/risotto-milanese.jpg";
import fettuccineAlfredo from "../assets/fettuccine-alfredo.jpg";
import eggplantParmigiana from "../assets/eggplant-parmigiana.jpg";
import ossoBuco from "../assets/osso-buco.jpg";
import chickenMarsala from "../assets/chicken-marsala.jpg";

/* =====================================================
   MAIN COURSE DATA
===================================================== */

export const mainCourses = [

  /* ===================================================
     NIGERIAN
  =================================================== */

  {
    id: "jollof-rice",
    name: "Nigerian Jollof Rice",
    country: "Nigerian",
    description: "Fragrant long-grain rice cooked in a rich tomato and pepper sauce.",
    price: 4500,
    rating: 4.9,
    recommended: true,
    image: jollofRice,
  },

  {
    id: "nigerian-fried-rice",
    name: "Nigerian Fried Rice",
    country: "Nigerian",
    description: "Seasoned fried rice prepared with vegetables and savory Nigerian spices.",
    price: 4800,
    rating: 4.8,
    recommended: true,
    image: nigerianFriedRice,
  },

  {
    id: "amala-efo-riro",
    name: "Amala & Efo Riro",
    country: "Nigerian",
    description: "Smooth amala served with rich Yoruba-style vegetable and pepper soup.",
    price: 5000,
    rating: 4.9,
    recommended: true,
    image: amalaEfoRiro,
  },

  {
    id: "pounded-yam-egusi",
    name: "Pounded Yam & Egusi",
    country: "Nigerian",
    description: "Soft pounded yam served with rich egusi soup and assorted protein.",
    price: 5500,
    rating: 4.9,
    recommended: true,
    image: poundedYamEgusi,
  },

  {
    id: "ofada-rice-ayamase",
    name: "Ofada Rice & Ayamase",
    country: "Nigerian",
    description: "Local Ofada rice served with smoky green pepper sauce and assorted meat.",
    price: 5200,
    rating: 4.8,
    recommended: true,
    image: ofadaAyamase,
  },

  {
    id: "beans-plantain",
    name: "Beans & Fried Plantain",
    country: "Nigerian",
    description: "Slow-cooked beans paired with sweet golden fried plantain.",
    price: 4000,
    rating: 4.7,
    recommended: false,
    image: beansPlantain,
  },

  {
    id: "eba-okra",
    name: "Eba & Okra Soup",
    country: "Nigerian",
    description: "Cassava-based eba served with hearty Nigerian okra soup.",
    price: 4800,
    rating: 4.8,
    recommended: true,
    image: ebaOkra,
  },

  {
    id: "white-rice-stew",
    name: "White Rice & Nigerian Stew",
    country: "Nigerian",
    description: "Steamed white rice served with rich Nigerian tomato pepper stew.",
    price: 4500,
    rating: 4.7,
    recommended: false,
    image: whiteRiceStew,
  },


  /* ===================================================
     AMERICAN
  =================================================== */

  {
    id: "classic-cheeseburger",
    name: "Classic Cheeseburger",
    country: "American",
    description: "Juicy beef burger with melted cheese, lettuce, tomato and house sauce.",
    price: 6500,
    rating: 4.9,
    recommended: true,
    image: cheeseburger,
  },

  {
    id: "bbq-ribs",
    name: "BBQ Ribs",
    country: "American",
    description: "Slow-cooked ribs glazed with smoky house barbecue sauce.",
    price: 8500,
    rating: 4.9,
    recommended: true,
    image: bbqRibs,
  },

  {
    id: "fried-chicken",
    name: "Southern Fried Chicken",
    country: "American",
    description: "Crispy golden chicken seasoned with classic Southern spices.",
    price: 6500,
    rating: 4.8,
    recommended: true,
    image: friedChicken,
  },

  {
    id: "chicken-waffles",
    name: "Chicken & Waffles",
    country: "American",
    description: "Crispy fried chicken served over fluffy Belgian-style waffles.",
    price: 7000,
    rating: 4.8,
    recommended: true,
    image: chickenWaffles,
  },

  {
    id: "mac-and-cheese",
    name: "Classic Mac & Cheese",
    country: "American",
    description: "Creamy baked macaroni with a rich blend of melted cheeses.",
    price: 5000,
    rating: 4.7,
    recommended: false,
    image: macAndCheese,
  },

  {
    id: "new-york-strip",
    name: "New York Strip Steak",
    country: "American",
    description: "Tender grilled strip steak finished with herbs and butter.",
    price: 12000,
    rating: 4.9,
    recommended: true,
    image: newYorkStrip,
  },

  {
    id: "grilled-chicken",
    name: "American Grilled Chicken",
    country: "American",
    description: "Juicy grilled chicken breast seasoned with herbs and spices.",
    price: 7000,
    rating: 4.7,
    recommended: false,
    image: grilledChicken,
  },

  {
    id: "shrimp-and-grits",
    name: "Shrimp & Grits",
    country: "American",
    description: "Creamy Southern-style grits topped with seasoned shrimp.",
    price: 7500,
    rating: 4.8,
    recommended: true,
    image: shrimpGrits,
  },


  /* ===================================================
     INDIAN
  =================================================== */

  {
    id: "chicken-tikka-masala",
    name: "Chicken Tikka Masala",
    country: "Indian",
    description: "Tender chicken simmered in a creamy tomato and aromatic spice sauce.",
    price: 6500,
    rating: 4.9,
    recommended: true,
    image: chickenTikkaMasala,
  },

  {
    id: "butter-chicken",
    name: "Butter Chicken",
    country: "Indian",
    description: "Tender chicken cooked in a silky tomato, butter and spice sauce.",
    price: 6800,
    rating: 4.9,
    recommended: true,
    image: butterChicken,
  },

  {
    id: "chicken-biryani",
    name: "Chicken Biryani",
    country: "Indian",
    description: "Fragrant basmati rice layered with spiced chicken and aromatic herbs.",
    price: 6500,
    rating: 4.9,
    recommended: true,
    image: chickenBiryani,
  },

  {
    id: "lamb-rogan-josh",
    name: "Lamb Rogan Josh",
    country: "Indian",
    description: "Slow-cooked lamb in a deeply aromatic Kashmiri-style curry.",
    price: 8000,
    rating: 4.8,
    recommended: true,
    image: lambRoganJosh,
  },

  {
    id: "palak-paneer",
    name: "Palak Paneer",
    country: "Indian",
    description: "Soft paneer cheese cooked in a creamy spinach and spice sauce.",
    price: 5800,
    rating: 4.7,
    recommended: false,
    image: palakPaneer,
  },

  {
    id: "chana-masala",
    name: "Chana Masala",
    country: "Indian",
    description: "Chickpeas simmered in a rich tomato, onion and aromatic spice gravy.",
    price: 5000,
    rating: 4.6,
    recommended: false,
    image: chanaMasala,
  },

  {
    id: "lamb-biryani",
    name: "Lamb Biryani",
    country: "Indian",
    description: "Aromatic basmati rice layered with tender spiced lamb.",
    price: 7500,
    rating: 4.9,
    recommended: true,
    image: lambBiryani,
  },

  {
    id: "goan-fish-curry",
    name: "Goan Fish Curry",
    country: "Indian",
    description: "Fresh fish simmered in a fragrant coconut and chili curry.",
    price: 7000,
    rating: 4.8,
    recommended: true,
    image: goanFishCurry,
  },

  /* ===================================================
     CHINESE
  =================================================== */

  {
    id: "kung-pao-chicken",
    name: "Kung Pao Chicken",
    country: "Chinese",
    description: "Tender chicken stir-fried with peanuts, vegetables and chili.",
    price: 6000,
    rating: 4.8,
    recommended: true,
    image: kungPaoChicken,
  },

  {
    id: "sweet-sour-pork",
    name: "Sweet & Sour Pork",
    country: "Chinese",
    description: "Crispy pork tossed in a vibrant sweet and tangy sauce.",
    price: 6500,
    rating: 4.7,
    recommended: true,
    image: sweetSourPork,
  },

  {
    id: "mapo-tofu",
    name: "Mapo Tofu",
    country: "Chinese",
    description: "Silken tofu cooked with spicy chili, minced meat and Sichuan pepper.",
    price: 5200,
    rating: 4.7,
    recommended: false,
    image: mapoTofu,
  },

  {
    id: "beef-broccoli",
    name: "Beef & Broccoli",
    country: "Chinese",
    description: "Tender beef and broccoli stir-fried in a savory Chinese sauce.",
    price: 6500,
    rating: 4.8,
    recommended: true,
    image: beefBroccoli,
  },

  {
    id: "peking-duck",
    name: "Peking Duck",
    country: "Chinese",
    description: "Crispy roasted duck served with traditional pancakes and sauce.",
    price: 11000,
    rating: 4.9,
    recommended: true,
    image: pekingDuck,
  },

  {
    id: "yangzhou-fried-rice",
    name: "Yangzhou Fried Rice",
    country: "Chinese",
    description: "Fragrant fried rice prepared with egg, vegetables and savory protein.",
    price: 5500,
    rating: 4.7,
    recommended: false,
    image: yangzhouFriedRice,
  },

  {
    id: "mongolian-beef",
    name: "Mongolian Beef",
    country: "Chinese",
    description: "Sliced beef cooked with scallions in a rich savory glaze.",
    price: 6800,
    rating: 4.8,
    recommended: true,
    image: mongolianBeef,
  },

  {
    id: "cantonese-roast-chicken",
    name: "Cantonese Roast Chicken",
    country: "Chinese",
    description: "Tender roast chicken with crisp skin and fragrant Cantonese seasoning.",
    price: 7000,
    rating: 4.8,
    recommended: true,
    image: cantoneseRoastChicken,
  },


  /* ===================================================
     SINGAPOREAN
  =================================================== */

  {
    id: "hainanese-chicken-rice",
    name: "Hainanese Chicken Rice",
    country: "Singaporean",
    description: "Poached chicken served with fragrant rice, chili and ginger sauce.",
    price: 6500,
    rating: 4.9,
    recommended: true,
    image: hainaneseChickenRice,
  },

  {
    id: "singapore-laksa",
    name: "Singapore Laksa",
    country: "Singaporean",
    description: "Rich coconut noodle soup with seafood, herbs and aromatic spices.",
    price: 7000,
    rating: 4.9,
    recommended: true,
    image: singaporeLaksa,
  },

  {
    id: "chilli-crab",
    name: "Singapore Chilli Crab",
    country: "Singaporean",
    description: "Fresh crab cooked in a rich, sweet and spicy chili sauce.",
    price: 12000,
    rating: 4.9,
    recommended: true,
    image: chilliCrab,
  },

  {
    id: "char-kway-teow",
    name: "Char Kway Teow",
    country: "Singaporean",
    description: "Wok-fried flat rice noodles with seafood, egg and savory sauce.",
    price: 6500,
    rating: 4.8,
    recommended: true,
    image: charKwayTeow,
  },

  {
    id: "hokkien-mee",
    name: "Hokkien Mee",
    country: "Singaporean",
    description: "Wok-fried noodles with prawns, squid and rich seafood broth.",
    price: 6800,
    rating: 4.7,
    recommended: false,
    image: hokkienMee,
  },

  {
    id: "nasi-lemak",
    name: "Singapore Nasi Lemak",
    country: "Singaporean",
    description: "Fragrant coconut rice served with sambal, egg, cucumber and protein.",
    price: 6000,
    rating: 4.8,
    recommended: true,
    image: nasiLemak,
  },

  {
    id: "singapore-noodles",
    name: "Singapore Noodles",
    country: "Singaporean",
    description: "Rice vermicelli stir-fried with vegetables, egg and savory spices.",
    price: 6000,
    rating: 4.7,
    recommended: false,
    image: singaporeNoodles,
  },

  {
    id: "bak-kut-teh",
    name: "Bak Kut Teh",
    country: "Singaporean",
    description: "Tender pork ribs simmered in a fragrant peppery herbal broth.",
    price: 7500,
    rating: 4.8,
    recommended: true,
    image: bakKutTeh,
  },


  /* ===================================================
     JAMAICAN
  =================================================== */

  {
    id: "jerk-chicken",
    name: "Jamaican Jerk Chicken",
    country: "Jamaican",
    description: "Grilled chicken marinated in bold Jamaican jerk spices.",
    price: 6500,
    rating: 4.9,
    recommended: true,
    image: jerkChicken,
  },

  {
    id: "oxtail-rice",
    name: "Jamaican Oxtail & Rice",
    country: "Jamaican",
    description: "Slow-braised oxtail served with seasoned rice and peas.",
    price: 8500,
    rating: 4.9,
    recommended: true,
    image: jamaicanOxtailRice,
  },

  {
    id: "curry-goat",
    name: "Jamaican Curry Goat",
    country: "Jamaican",
    description: "Tender goat slowly cooked in a rich Jamaican curry.",
    price: 8000,
    rating: 4.8,
    recommended: true,
    image: curryGoat,
  },

  {
    id: "brown-stew-chicken",
    name: "Brown Stew Chicken",
    country: "Jamaican",
    description: "Tender chicken braised in a rich Jamaican brown stew sauce.",
    price: 6500,
    rating: 4.8,
    recommended: true,
    image: brownStewChicken,
  },

  {
    id: "escovitch-fish",
    name: "Jamaican Escovitch Fish",
    country: "Jamaican",
    description: "Crispy fried fish topped with spicy pickled vegetables.",
    price: 7500,
    rating: 4.8,
    recommended: true,
    image: escovitchFish,
  },

  {
    id: "ackee-saltfish",
    name: "Ackee & Saltfish",
    country: "Jamaican",
    description: "Jamaica's classic ackee dish cooked with salted cod and vegetables.",
    price: 7000,
    rating: 4.7,
    recommended: false,
    image: ackeeSaltfish,
  },

  {
    id: "curry-chicken",
    name: "Jamaican Curry Chicken",
    country: "Jamaican",
    description: "Chicken simmered in a fragrant Jamaican curry sauce.",
    price: 6200,
    rating: 4.8,
    recommended: true,
    image: jamaicanCurryChicken,
  },

  {
    id: "jamaican-pepper-pot",
    name: "Jamaican Pepper Pot",
    country: "Jamaican",
    description: "Hearty Caribbean stew packed with greens, vegetables and rich spices.",
    price: 6500,
    rating: 4.6,
    recommended: false,
    image: jamaicanPepperPot,
  },


  /* ===================================================
     JAPANESE
  =================================================== */

  {
    id: "chicken-katsu-curry",
    name: "Chicken Katsu Curry",
    country: "Japanese",
    description: "Crispy chicken cutlet served with Japanese curry and steamed rice.",
    price: 7000,
    rating: 4.9,
    recommended: true,
    image: chickenKatsuCurry,
  },

  {
    id: "tonkatsu",
    name: "Tonkatsu",
    country: "Japanese",
    description: "Crispy breaded pork cutlet served with Japanese tonkatsu sauce.",
    price: 6800,
    rating: 4.8,
    recommended: true,
    image: tonkatsu,
  },

  {
    id: "beef-teriyaki",
    name: "Beef Teriyaki",
    country: "Japanese",
    description: "Tender beef glazed with a sweet and savory teriyaki sauce.",
    price: 7500,
    rating: 4.8,
    recommended: true,
    image: beefTeriyaki,
  },

  {
    id: "chicken-teriyaki",
    name: "Chicken Teriyaki",
    country: "Japanese",
    description: "Grilled chicken glazed with classic Japanese teriyaki sauce.",
    price: 6500,
    rating: 4.8,
    recommended: true,
    image: chickenTeriyaki,
  },

  {
    id: "katsudon",
    name: "Katsudon",
    country: "Japanese",
    description: "Crispy pork cutlet simmered with egg and savory sauce over rice.",
    price: 6800,
    rating: 4.8,
    recommended: true,
    image: katsudon,
  },

  {
    id: "oyakodon",
    name: "Oyakodon",
    country: "Japanese",
    description: "Tender chicken and egg simmered in savory dashi over steamed rice.",
    price: 6200,
    rating: 4.7,
    recommended: false,
    image: oyakodon,
  },

  {
    id: "japanese-curry-rice",
    name: "Japanese Curry Rice",
    country: "Japanese",
    description: "Rich Japanese curry served with steamed rice and tender vegetables.",
    price: 6000,
    rating: 4.8,
    recommended: true,
    image: japaneseCurryRice,
  },

  {
    id: "unagi-don",
    name: "Unagi Don",
    country: "Japanese",
    description: "Grilled eel glazed with sweet savory sauce over steamed rice.",
    price: 8500,
    rating: 4.9,
    recommended: true,
    image: unagiDon,
  },


  /* ===================================================
     ITALIAN
  =================================================== */

  {
    id: "lasagna",
    name: "Classic Lasagna",
    country: "Italian",
    description: "Layered pasta, rich beef ragù, béchamel and melted cheese.",
    price: 7000,
    rating: 4.9,
    recommended: true,
    image: lasagna,
  },

  {
    id: "spaghetti-bolognese",
    name: "Spaghetti Bolognese",
    country: "Italian",
    description: "Spaghetti served with slow-cooked beef and tomato ragù.",
    price: 6500,
    rating: 4.8,
    recommended: true,
    image: spaghettiBolognese,
  },

  {
    id: "chicken-parmigiana",
    name: "Chicken Parmigiana",
    country: "Italian",
    description: "Breaded chicken topped with tomato sauce and melted parmesan cheese.",
    price: 7500,
    rating: 4.8,
    recommended: true,
    image: chickenParmigiana,
  },

  {
    id: "risotto-milanese",
    name: "Risotto alla Milanese",
    country: "Italian",
    description: "Creamy Italian risotto delicately flavored with saffron.",
    price: 6800,
    rating: 4.7,
    recommended: true,
    image: risottoMilanese,
  },

  {
    id: "fettuccine-alfredo",
    name: "Fettuccine Alfredo",
    country: "Italian",
    description: "Silky fettuccine coated in a creamy parmesan sauce.",
    price: 6500,
    rating: 4.8,
    recommended: true,
    image: fettuccineAlfredo,
  },

  {
    id: "eggplant-parmigiana",
    name: "Eggplant Parmigiana",
    country: "Italian",
    description: "Baked eggplant layered with tomato sauce, mozzarella and parmesan.",
    price: 6000,
    rating: 4.7,
    recommended: false,
    image: eggplantParmigiana,
  },

  {
    id: "osso-buco",
    name: "Osso Buco",
    country: "Italian",
    description: "Slow-braised veal shank served with a rich aromatic sauce.",
    price: 9500,
    rating: 4.9,
    recommended: true,
    image: ossoBuco,
  },

  {
    id: "chicken-marsala",
    name: "Chicken Marsala",
    country: "Italian",
    description: "Tender chicken cooked with mushrooms in a rich Marsala wine sauce.",
    price: 7500,
    rating: 4.8,
    recommended: true,
    image: chickenMarsala,
  },

];


/* =====================================================
   COUNTRIES
===================================================== */

const countries = [
  "All",
  "Nigerian",
  "American",
  "Indian",
  "Chinese",
  "Singaporean",
  "Jamaican",
  "Japanese",
  "Italian",
];

/* =====================================================
   MAIN COURSES COMPONENT
===================================================== */

function MainCourses() {

  const navigate = useNavigate();

  const location = useLocation();

  const [mainCourses, setMainCourses] = useState([]);
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
  const fetchMainCourses = async () => {
    try {
      const response = await fetch(
        "https://restaurant-backend-production-b36b.up.railway.app/api/menu/?category=main-courses"
      );

      if (!response.ok) {
        throw new Error("Failed to load main courses");
      }

      const data = await response.json();

      const formattedData = data.map((item) => ({
        ...item,
        price: Number(item.price),
        rating: Number(item.rating),
        recommended: item.is_featured,
      }));

      setMainCourses(formattedData);

    } catch (err) {
      console.error("Error loading main courses:", err);
      setError("Unable to load main courses.");
    } finally {
      setLoading(false);
    }
  };

  fetchMainCourses();
}, []);


  /* =================================================
     COUNTRY FILTER
  ================================================= */

  const filteredMainCourses =
    selectedCountry === "All"
      ? [...mainCourses]
      : mainCourses.filter(
          (item) =>
            item.country === selectedCountry
        );


  /* =================================================
     SORT
  ================================================= */

  const sortedMainCourses =
    [...filteredMainCourses].sort(
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


  /* =================================================
     BACK
  ================================================= */

  const handleBack = () => {

    if (window.history.length > 1) {

      navigate(-1);

    } else {

      navigate("/menu");

    }

  };

  useEffect(() => {
  const target = sessionStorage.getItem("favoriteTarget");

  if (!target || !target.startsWith("Main Courses-")) return;

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


  /* =================================================
     SIDE MENU
  ================================================= */

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


  /* =================================================
     ACTIVE NAV
  ================================================= */

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

    <div className="main-courses-page">


      {/* =================================================
          DESKTOP SIDE MENU
      ================================================= */}

      {menuOpen && (

        <>

          <div
            className="main-courses-side-menu-overlay"
            onClick={closeMenu}
          ></div>


          <aside className="main-courses-side-menu">

            <div className="main-courses-side-menu-header">

              <img
                src={dammysLogo}
                alt="Dammy's Spice"
                className="main-courses-side-menu-logo"
              />


              <button
                type="button"
                className="main-courses-close-button"
                onClick={closeMenu}
              >

                <X />

              </button>

            </div>


            <nav className="main-courses-side-navigation">

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

      <header className="main-courses-header">

        <div className="main-courses-top-header">


          {/* DESKTOP HAMBURGER */}

          <button
            type="button"
            className="main-courses-header-button main-courses-menu-button"
            onClick={() =>
              setMenuOpen(true)
            }
          >

            <MenuIcon />

          </button>


          {/* MOBILE BACK */}

          <button
            type="button"
            className="main-courses-header-button main-courses-back-button"
            onClick={handleBack}
            aria-label="Go back"
          >

            <ArrowLeft />

          </button>


          {/* LOGO */}

          <button
            type="button"
            className="main-courses-logo"
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
            className="main-courses-header-button main-courses-cart-button"
            onClick={() =>
              navigate("/orders")
            }
          >

            <ShoppingCart />

            {cartCount > 0 && (

              <span className="main-courses-cart-count">
                {cartCount}
              </span>

            )}

          </button>

        </div>

      </header>


      {/* =================================================
          MAIN
      ================================================= */}

      <main className="main-courses-content">


        {/* TITLE */}

        <section className="main-courses-introduction">

          <div></div>

          <h1>
            Main Courses
          </h1>

          <div></div>

        </section>


        {/* =================================================
            COUNTRY FILTER
        ================================================= */}

        <section className="main-courses-filter-row">

          <div className="main-courses-country-scroll">

            {countries.map(
              (country) => (

                <button
                  type="button"
                  key={country}
                  className={
                    selectedCountry === country
                      ? "main-courses-country-button active"
                      : "main-courses-country-button"
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
                ? "main-courses-sort-button active"
                : "main-courses-sort-button"
            }
            onClick={() =>
              setFilterOpen(
                (previous) =>
                  !previous
              )
            }
            aria-label="Sort main courses"
          >

            <SlidersHorizontal />

          </button>

        </section>


{/* =================================================
    SORT PANEL
================================================= */}

{filterOpen && (

  <div className="main-courses-sort-panel">

    {/* SORT HEADER */}

    <div className="main-courses-sort-header">

      <h2>
        Sort By
      </h2>

      <button
        type="button"
        onClick={() => setFilterOpen(false)}
        aria-label="Close sort options"
      >
        <X />
      </button>

    </div>


    {/* MOST RECOMMENDED */}

    <button
      type="button"
      className={
        sortBy === "recommended"
          ? "active"
          : ""
      }
      onClick={() =>
        setSortBy("recommended")
      }
    >
      Most Recommended
    </button>


    {/* HIGHEST RATED */}

    <button
      type="button"
      className={
        sortBy === "highest-rating"
          ? "active"
          : ""
      }
      onClick={() =>
        setSortBy("highest-rating")
      }
    >
      Highest Rated
    </button>


    {/* LOWEST RATED */}

    <button
      type="button"
      className={
        sortBy === "lowest-rating"
          ? "active"
          : ""
      }
      onClick={() =>
        setSortBy("lowest-rating")
      }
    >
      Lowest Rated
    </button>


    {/* HIGHEST PRICE */}

    <button
      type="button"
      className={
        sortBy === "highest-price"
          ? "active"
          : ""
      }
      onClick={() =>
        setSortBy("highest-price")
      }
    >
      Highest Price
    </button>


    {/* LOWEST PRICE */}

    <button
      type="button"
      className={
        sortBy === "lowest-price"
          ? "active"
          : ""
      }
      onClick={() =>
        setSortBy("lowest-price")
      }
    >
      Lowest Price
    </button>

  </div>

)}


        {/* =================================================
            MAIN COURSE LIST
        ================================================= */}

        <section className="main-courses-list">

          {sortedMainCourses.map(
            (item) => (

              <article
                className="main-course-item"
                key={item.id}
                id={`favorite-Main Courses-${item.id}`}
              >

                {/* IMAGE */}

                <div className="main-course-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                </div>


                {/* INFORMATION */}

                <div className="main-course-information">

                  <h2>
                    {item.name}
                  </h2>

                  <span className="main-course-country">
                    {item.country}
                  </span>

                  <p>
                    {item.description}
                  </p>

                  <div className="main-course-price-rating">
  <strong className="main-course-price">
    ₦{item.price.toLocaleString()}
  </strong>

  <button
    type="button"
    className="main-course-rating"
    onClick={() => navigate(`/reviews/${item.id}`)}
    title="View reviews"
  >
    <Star fill="currentColor" />
    {item.rating}
  </button>
</div>

                </div>


                {/* ACTIONS */}

                <div className="main-course-actions">

                  <button
  type="button"
  className="favorite-button"
  onClick={() =>
    toggleFavorite({
      ...item,
      category: "Main Courses",
    })
  }
>
  <Heart
    fill={isFavorite(item.id) ? "#e87528" : "none"}
  />
</button>

                  <button
                    type="button"
                    className="main-course-add-button"
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

        {sortedMainCourses.length === 0 && (

          <div className="main-courses-empty-state">

            <h2>
              No main courses found
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

      <nav className="main-courses-bottom-navigation">


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


export default MainCourses;
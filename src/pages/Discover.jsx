import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRestaurant } from "../context/RestaurantContext";

import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Heart,
  Smile,
  Frown,
  Zap,
  Coffee,
  Utensils,
  Eye,
  Flame,
  Star,
  Leaf,
  CircleDot,
} from "lucide-react";

import "./Discover.css";

const API_BASE_URL = "https://restaurant-backend-production-b36b.up.railway.app";
const Discover = () => {
  const navigate = useNavigate();
  const { addToCart } = useRestaurant();

  const [started, setStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const [recommendations, setRecommendations] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [recommendationError, setRecommendationError] = useState("");

  const discoveryCategories = [
    {
      id: "mood",
      icon: Heart,
      eyebrow: "GO WITH YOUR FEELING",
      title: "Choose food based on my mood",
      description:
        "Tell us how you're feeling and we'll find something that matches the moment.",
    },
    {
      id: "craving",
      icon: Flame,
      eyebrow: "FOLLOW YOUR CRAVING",
      title: "Choose food based on what I'm craving",
      description:
        "Sweet, savoury, salty or spicy? Tell us what your taste buds are asking for.",
    },
    {
      id: "looks",
      icon: Eye,
      eyebrow: "EAT WITH YOUR EYES",
      title: "Choose food based on how it looks",
      description:
        "Sometimes you just know what you want when you see it.",
    },
    {
      id: "hunger",
      icon: Utensils,
      eyebrow: "HOW HUNGRY ARE YOU?",
      title: "Choose food based on my hunger",
      description:
        "Whether you want something light or you're ready for a serious meal, we've got you.",
    },
    {
      id: "experience",
      icon: Sparkles,
      eyebrow: "SET THE VIBE",
      title: "Choose food based on the experience I want",
      description:
        "Comfort, adventure, something familiar or a little treat — you decide the vibe.",
    },
  ];

  const questions = {
    mood: [
      {
        id: "mood",
        title: "How are you feeling right now?",
        subtitle:
          "Don't overthink it. Pick the feeling that sounds most like you.",
        options: [
          { value: "happy", label: "Happy", icon: Smile },
          { value: "sad", label: "A little down", icon: Frown },
          { value: "excited", label: "Excited", icon: Zap },
          { value: "tired", label: "Tired", icon: Coffee },
          { value: "relaxed", label: "Relaxed", icon: Leaf },
        ],
      },
    ],

    craving: [
      {
        id: "craving",
        title: "What are your taste buds asking for?",
        subtitle:
          "Pick the flavour you can't stop thinking about.",
        options: [
          { value: "sweet", label: "Sweet", icon: Star },
          { value: "salty", label: "Salty", icon: CircleDot },
          { value: "savoury", label: "Savoury", icon: Utensils },
          { value: "spicy", label: "Spicy", icon: Flame },
          { value: "fresh", label: "Fresh", icon: Leaf },
        ],
      },
    ],

    looks: [
      {
        id: "looks",
        title: "What kind of food are you picturing?",
        subtitle:
          "Forget the flavour for a second. What would make you stop scrolling?",
        options: [
          { value: "colourful", label: "Bright & colourful", icon: Sparkles },
          { value: "loaded", label: "Loaded & generous", icon: Utensils },
          { value: "crispy", label: "Crispy & golden", icon: Flame },
          { value: "fresh", label: "Fresh & clean", icon: Leaf },
          { value: "beautiful", label: "Beautifully presented", icon: Star },
        ],
      },
    ],

    hunger: [
      {
        id: "hunger",
        title: "How hungry are you?",
        subtitle:
          "Be honest. How much food are we talking about?",
        options: [
          { value: "light", label: "Just a little hungry", icon: Coffee },
          { value: "medium", label: "I'm pretty hungry", icon: Utensils },
          { value: "very_hungry", label: "I'm seriously hungry", icon: Flame },
          { value: "starving", label: "I could eat everything", icon: Zap },
        ],
      },
    ],

    experience: [
      {
        id: "experience",
        title: "What kind of food experience do you want?",
        subtitle:
          "Pick the feeling you want your meal to give you.",
        options: [
          { value: "comfort", label: "Comfort me", icon: Heart },
          { value: "adventure", label: "Surprise me", icon: Sparkles },
          { value: "classic", label: "Keep it familiar", icon: Utensils },
          { value: "treat", label: "Treat myself", icon: Star },
          { value: "quick", label: "Keep it simple", icon: Coffee },
        ],
      },
    ],
  };

  const currentQuestions =
    selectedCategory && questions[selectedCategory]
      ? questions[selectedCategory]
      : [];

  const currentQuestion = currentQuestions[step];

  const handleStart = () => {
    setStarted(true);
    setSelectedCategory(null);
    setStep(0);
    setAnswers({});
    setRecommendations([]);
    setRecommendationError("");
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setStep(0);
    setRecommendations([]);
    setRecommendationError("");
  };

  const handleAnswer = (value) => {
    if (!currentQuestion) return;

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: value,
    }));
  };

  // FETCH RECOMMENDATIONS FROM DJANGO

  const fetchRecommendations = async () => {
    if (!selectedCategory || !currentQuestion) return;

    const answer = answers[currentQuestion.id];

    if (!answer) return;

    setLoadingResults(true);
    setRecommendationError("");
    setRecommendations([]);

    try {
      const params = new URLSearchParams({
        category: selectedCategory,
        answer,
      });

      const response = await fetch(
        `${API_BASE_URL}/discover/?${params.toString()}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to find matching food."
        );
      }

      setRecommendations(data.items || []);
    } catch (error) {
      console.error("Discover API error:", error);

      setRecommendationError(
        error.message ||
          "Something went wrong while finding your food. Please try again."
      );
    } finally {
      setLoadingResults(false);
    }
  };

  const handleNext = async () => {
    if (!currentQuestion) return;

    if (!answers[currentQuestion.id]) return;

    if (step < currentQuestions.length - 1) {
      setStep((previous) => previous + 1);
      return;
    }

    setStep(currentQuestions.length);

    await fetchRecommendations();
  };

  const handleBack = () => {
    if (selectedCategory && step > 0) {
      setStep((previous) => previous - 1);
      return;
    }

    if (
      selectedCategory &&
      step === currentQuestions.length
    ) {
      setStep(currentQuestions.length - 1);
      return;
    }

    if (selectedCategory) {
      setSelectedCategory(null);
      setStep(0);
      return;
    }

    setStarted(false);
  };

  const handleRestart = () => {
    setAnswers({});
    setSelectedCategory(null);
    setStep(0);
    setRecommendations([]);
    setRecommendationError("");
    setStarted(true);
  };

  // RECOMMENDATION TEXT

  const getRecommendation = () => {
    const mood = answers.mood;
    const craving = answers.craving;
    const looks = answers.looks;
    const hunger = answers.hunger;
    const experience = answers.experience;

    if (selectedCategory === "mood") {
      const moodResults = {
        happy: {
          title: "You deserve something sweet.",
          description:
            "Your mood is giving happy energy. Let's find you something delicious and a little indulgent.",
        },
        sad: {
          title: "Let's get you some comfort.",
          description:
            "Sometimes food should feel like a warm hug. Let's find something comforting and satisfying.",
        },
        excited: {
          title: "Your mood wants something bold.",
          description:
            "You're feeling energetic, so let's find something exciting and full of flavour.",
        },
        tired: {
          title: "Let's find something comforting.",
          description:
            "You deserve something satisfying and easy to enjoy.",
        },
        relaxed: {
          title: "Something fresh feels right.",
          description:
            "You're in a relaxed mood. Let's find something fresh and satisfying.",
        },
      };

      return moodResults[mood];
    }

    if (selectedCategory === "craving") {
      const cravingTitles = {
        sweet: "Your sweet tooth has spoken.",
        salty: "Let's satisfy that salty craving.",
        savoury: "You're looking for serious flavour.",
        spicy: "You want some heat.",
        fresh: "Fresh is calling your name.",
      };

      return {
        title: cravingTitles[craving],
        description:
          "Let's find something on the menu that matches your craving.",
      };
    }

    if (selectedCategory === "looks") {
      const looksTitles = {
        colourful: "You eat with your eyes first.",
        loaded: "You want the kind of plate that means business.",
        crispy: "Golden, crispy and impossible to ignore.",
        fresh: "Clean, fresh and seriously inviting.",
        beautiful: "Presentation matters to you.",
      };

      return {
        title: looksTitles[looks],
        description:
          "Let's find something on the menu that looks as good as it sounds.",
      };
    }

    if (selectedCategory === "hunger") {
      const hungerResults = {
        light: {
          title: "Let's keep it light.",
          description:
            "We're looking for something satisfying without going overboard.",
        },
        medium: {
          title: "You need a proper meal.",
          description:
            "Let's find something filling, delicious and satisfying.",
        },
        very_hungry: {
          title: "You're seriously hungry.",
          description:
            "You need something substantial.",
        },
        starving: {
          title: "Bring out the big plate.",
          description:
            "Let's find something seriously filling.",
        },
      };

      return hungerResults[hunger];
    }

    if (selectedCategory === "experience") {
      const experienceResults = {
        comfort: {
          title: "You need comfort food.",
          description:
            "Let's find something delicious that makes the day feel a little better.",
        },
        adventure: {
          title: "Let's get adventurous.",
          description:
            "You're ready to try something interesting and new.",
        },
        classic: {
          title: "Don't mess with a classic.",
          description:
            "Let's find something familiar and delicious.",
        },
        treat: {
          title: "Today is a treat-yourself day.",
          description:
            "Let's find something worth enjoying.",
        },
        quick: {
          title: "Keep it simple.",
          description:
            "Something easy, delicious and straight to the point.",
        },
      };

      return experienceResults[experience];
    }

    return {
      title: "We found something for you.",
      description:
        "Here are the foods that match your selection.",
    };
  };


  // FOOD RESULTS

  const renderFoodResults = () => {
    if (loadingResults) {
      return (
        <div className="discover-result-message">
          <Sparkles size={28} />
          <h3>Finding your food...</h3>
          <p>We're matching your selection with our menu.</p>
        </div>
      );
    }

    if (recommendationError) {
      return (
        <div className="discover-result-message">
          <h3>Couldn't load recommendations</h3>
          <p>{recommendationError}</p>

          <button
            type="button"
            className="discover-primary-button"
            onClick={fetchRecommendations}
          >
            Try again
            <ArrowRight size={19} />
          </button>
        </div>
      );
    }

    if (recommendations.length === 0) {
      return (
        <div className="discover-result-message">
          <h3>No matching food found</h3>
          <p>
            We couldn't find food matching that selection.
            Try another answer to discover more options.
          </p>
        </div>
      );
    }

    return (
      <div className="discover-food-results">
        {recommendations.map((item) => (
          <article
            className="discover-food-card"
            key={item.id}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="discover-food-image"
              />
            )}

            <div className="discover-food-information">
              <h3>{item.name}</h3>

              {item.country && (
                <span className="discover-food-country">
                  {item.country}
                </span>
              )}

              {item.description && (
                <p>{item.description}</p>
              )}

             <div className="discover-food-bottom">
  <strong>
    ₦{Number(item.price || 0).toLocaleString()}
  </strong>

  {item.rating && (
    <span className="discover-food-rating">
      <Star size={16} fill="currentColor" />
      {Number(item.rating).toFixed(1)}
    </span>
  )}
</div>

<button
  type="button"
  className="discover-add-to-cart"
  onClick={() => addToCart(item)}
>
  Add to Cart
</button>
            </div>
          </article>
        ))}
      </div>
    );
  };

  // RESULTS PAGE

  if (
    started &&
    selectedCategory &&
    step === currentQuestions.length
  ) {
    const recommendation = getRecommendation();

    return (
      <div className="discover-page">
        <div className="discover-decoration discover-decoration-one"></div>
        <div className="discover-decoration discover-decoration-two"></div>

        <header className="discover-header">
          <button
            type="button"
            className="discover-back-button"
            onClick={handleBack}
            aria-label="Go back"
          >
            <ArrowLeft size={21} />
          </button>

          <h1>Discover</h1>

          <div className="discover-header-spacer"></div>
        </header>

        <main className="discover-result">
          <div className="discover-result-icon">
            <Sparkles size={31} />
          </div>

          <span className="discover-eyebrow">
            DAMMY & SPICE DISCOVER
          </span>

          <h2>{recommendation?.title}</h2>

          <p className="discover-result-description">
            {recommendation?.description}
          </p>

          <div className="discover-result-card">
            <div className="discover-result-card-icon">
              <Utensils size={22} />
            </div>

            <div>
              <strong>Your personalised picks</strong>
              <span>
                Here are the menu items matching your selection.
              </span>
            </div>
          </div>

          {renderFoodResults()}

          <button
            type="button"
            className="discover-primary-button"
            onClick={() => navigate("/menu")}
          >
            Explore the menu
            <ArrowRight size={19} />
          </button>

          <button
            type="button"
            className="discover-secondary-button"
            onClick={handleRestart}
          >
            Try another way
          </button>
        </main>
      </div>
    );
  }

  // QUESTION PAGE

  if (
    started &&
    selectedCategory &&
    currentQuestion &&
    step < currentQuestions.length
  ) {
    const CategoryIcon =
      discoveryCategories.find(
        (category) => category.id === selectedCategory
      )?.icon || Sparkles;

    return (
      <div className="discover-page">
        <div className="discover-decoration discover-decoration-one"></div>
        <div className="discover-decoration discover-decoration-two"></div>

        <header className="discover-header discover-question-header">
          <button
            type="button"
            className="discover-back-button"
            onClick={handleBack}
            aria-label="Go back"
          >
            <ArrowLeft size={21} />
          </button>

          <h1>Discover</h1>

          <span className="discover-progress">
            {step + 1}/{currentQuestions.length}
          </span>
        </header>

        <main className="discover-question-page">
          <div className="discover-progress-bar">
            <span
              style={{
                width: `${
                  ((step + 1) / currentQuestions.length) * 100
                }%`,
              }}
            ></span>
          </div>

          <div className="discover-question-category">
            <div className="discover-question-category-icon">
              <CategoryIcon size={19} />
            </div>

            <span>
              {
                discoveryCategories.find(
                  (category) => category.id === selectedCategory
                )?.eyebrow
              }
            </span>
          </div>

          <div className="discover-question-intro">
            <span className="discover-question-number">
              QUESTION {step + 1}
            </span>

            <h2>{currentQuestion.title}</h2>

            <p>{currentQuestion.subtitle}</p>
          </div>

          <div className="discover-options">
            {currentQuestion.options.map((option) => {
              const Icon = option.icon;

              const selected =
                answers[currentQuestion.id] === option.value;

              return (
                <button
                  type="button"
                  key={option.value}
                  className={`discover-option ${
                    selected ? "selected" : ""
                  }`}
                  onClick={() => handleAnswer(option.value)}
                >
                  <div className="discover-option-icon">
                    <Icon size={22} />
                  </div>

                  <span>{option.label}</span>

                  <div className="discover-option-radio">
                    <span></span>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="discover-primary-button discover-next-button"
            disabled={
              !answers[currentQuestion.id] || loadingResults
            }
            onClick={handleNext}
          >
            {step === currentQuestions.length - 1
              ? "Find my food"
              : "Next"}

            <ArrowRight size={19} />
          </button>
        </main>
      </div>
    );
  }

  // CATEGORY SELECTION PAGE

  if (started && !selectedCategory) {
    return (
      <div className="discover-page">
        <div className="discover-decoration discover-decoration-one"></div>
        <div className="discover-decoration discover-decoration-two"></div>

        <header className="discover-header">
          <button
            type="button"
            className="discover-back-button"
            onClick={() => setStarted(false)}
            aria-label="Go back"
          >
            <ArrowLeft size={21} />
          </button>

          <h1>Discover</h1>

          <div className="discover-header-spacer"></div>
        </header>

        <main className="discover-category-page">
          <div className="discover-category-heading">
            <div className="discover-category-icon">
              <Sparkles size={29} />
            </div>

            <span className="discover-eyebrow">
              LET'S FIND YOUR FOOD
            </span>

            <h2>
              How do you want
              <br />
              to discover it?
            </h2>

            <p>
              There is more than one way to find
              something you'll love. Pick a vibe and
              we'll take it from there.
            </p>
          </div>

          <div className="discover-category-grid">
            {discoveryCategories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  type="button"
                  key={category.id}
                  className="discover-category-card"
                  onClick={() =>
                    handleCategorySelect(category.id)
                  }
                >
                  <div className="discover-category-card-top">
                    <div className="discover-category-card-icon">
                      <Icon size={23} />
                    </div>

                    <ArrowRight
                      className="discover-category-card-arrow"
                      size={19}
                    />
                  </div>

                  <span className="discover-category-card-eyebrow">
                    {category.eyebrow}
                  </span>

                  <strong>{category.title}</strong>

                  <p>{category.description}</p>
                </button>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // INTRO PAGE

  return (
    <div className="discover-page">
      <div className="discover-decoration discover-decoration-one"></div>
      <div className="discover-decoration discover-decoration-two"></div>

      <header className="discover-header">
        <button
          type="button"
          className="discover-back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={21} />
        </button>

        <h1>Discover</h1>

        <div className="discover-header-spacer"></div>
      </header>

      <main className="discover-intro">
        <div className="discover-intro-orbit"></div>

        <div className="discover-icon-wrapper">
          <Sparkles size={36} />
        </div>

        <span className="discover-eyebrow">
          DAMMY & SPICE DISCOVER
        </span>

        <h2>
          Don't know what
          <br />
          to eat?
        </h2>

        <p>
          We've got you. Tell us what you're
          feeling, craving or looking for and
          we'll help you discover something
          delicious.
        </p>

        <button
          type="button"
          className="discover-primary-button"
          onClick={handleStart}
        >
          Help me choose
          <ArrowRight size={19} />
        </button>

        <span className="discover-time">
          Takes less than a minute.
        </span>
      </main>
    </div>
  );
};

export default Discover;
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Send,
  MessageSquare,
  LoaderCircle,
  LogIn,
} from "lucide-react";
import "./Reviews.css";

const API_BASE_URL = "https://restaurant-backend-production-b36b.up.railway.app";
function Reviews() {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  // =========================================================
  // AUTHENTICATION
  // =========================================================

  const token = localStorage.getItem("access_token");

  const storedUser = localStorage.getItem("user");

  let currentUser = null;

  try {
    currentUser = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    currentUser = null;
  }

  const isAuthenticated = Boolean(token);

  const username =
    currentUser?.username ||
    localStorage.getItem("username") ||
    "Customer";

  // =========================================================
  // FETCH FOOD AND REVIEWS
  // =========================================================

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [menuResponse, reviewsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/`),

        fetch(
          `${API_BASE_URL}/items/${itemId}/reviews/`
        ),
      ]);

      if (!menuResponse.ok) {
        throw new Error("Unable to load the food item.");
      }

      if (!reviewsResponse.ok) {
        throw new Error("Unable to load customer reviews.");
      }

      const menuData = await menuResponse.json();
      const reviewsData = await reviewsResponse.json();

      const menuItems = Array.isArray(menuData)
        ? menuData
        : menuData.results || [];

      const reviewItems = Array.isArray(reviewsData)
        ? reviewsData
        : reviewsData.results || [];

      const selectedFood = menuItems.find(
        (item) => String(item.id) === String(itemId)
      );

      if (!selectedFood) {
        setFood(null);
        setError("This food item could not be found.");
        return;
      }

      setFood(selectedFood);
      setReviews(reviewItems);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong while loading reviews."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [itemId]);

  // =========================================================
  // AVERAGE RATING
  // =========================================================

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (total, review) =>
              total + Number(review.rating),
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  // =========================================================
  // LOGIN REDIRECT
  // =========================================================

  const handleLoginRedirect = () => {
    navigate("/auth", {
      state: {
        mode: "login",
        from: `/reviews/${itemId}`,
      },
    });
  };

  // =========================================================
  // SUBMIT REVIEW
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      setError("Please log in to submit a review.");
      return;
    }

    if (!rating) {
      setError("Please select a star rating.");
      return;
    }

    if (!comment.trim()) {
      setError("Please write your review.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        `${API_BASE_URL}/items/${itemId}/reviews/`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },

          body: JSON.stringify({
            rating: Number(rating),
            comment: comment.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");

          setError("Your session has expired. Please log in again.");
          return;
        }

        const message =
          typeof data === "object"
            ? Object.values(data)
                .flat()
                .join(" ")
            : "Unable to submit your review.";

        throw new Error(
          message || "Unable to submit your review."
        );
      }

      setSuccess("Your review has been submitted successfully!");

      setRating(0);
      setHoverRating(0);
      setComment("");

      await fetchData();
    } catch (err) {
      setError(
        err.message ||
          "Unable to submit your review. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================================
  // LOADING STATE
  // =========================================================

  if (loading) {
    return (
      <div className="reviews-page">
        <div className="reviews-loading">
          <LoaderCircle
            className="reviews-spinner"
            size={32}
          />

          <p>Loading reviews...</p>
        </div>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="reviews-page">
      <div className="reviews-container">

        {/* HEADER */}

        <header className="reviews-header">
          <button
            type="button"
            className="reviews-back-button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft size={22} />
          </button>

          <h1>Customer Reviews</h1>
        </header>

        {/* ERROR MESSAGE */}

        {error && (
          <p className="reviews-message reviews-error">
            {error}
          </p>
        )}

        {/* FOOD INFORMATION */}

        {food && (
          <section className="reviews-food-card">
            {food.image && (
              <img
                src={
                  food.image.startsWith("http")
                    ? food.image
                    : `https://restaurant-backend-production-b36b.up.railway.app${food.image}`
                }
                alt={food.name}
                className="reviews-food-image"
              />
            )}

            <div className="reviews-food-details">
              <h2>{food.name}</h2>

              <div className="reviews-food-rating">
                <Star
                  size={19}
                  fill="currentColor"
                />

                <strong>{averageRating}</strong>

                <span>
                  {reviews.length}{" "}
                  {reviews.length === 1
                    ? "review"
                    : "reviews"}
                </span>
              </div>

              <p>
                {reviews.length > 0
                  ? "See what customers think about this dish."
                  : "Be the first to review this dish."}
              </p>
            </div>
          </section>
        )}

        {/* REVIEW FORM */}

        <section className="reviews-form-section">
          <h2>Write a Review</h2>

          <p className="reviews-form-description">
            Share your experience with this dish.
          </p>

          {/* LOGGED-IN USER */}

          {isAuthenticated ? (
            <div className="reviews-account-info">
              <p>
                Reviewing as <strong>{username}</strong>
              </p>
            </div>
          ) : (
            <div className="reviews-login-prompt">
              <p>
                You must have an account and log in before
                submitting a review.
              </p>

              <button
                type="button"
                className="reviews-submit-button"
                onClick={handleLoginRedirect}
              >
                <LogIn size={18} />
                Log In to Review
              </button>
            </div>
          )}

          {/* REVIEW FORM */}

          {isAuthenticated && (
            <form
              onSubmit={handleSubmit}
              className="reviews-form"
            >
              <label className="reviews-rating-label">
                Your Rating
              </label>

              <div className="reviews-star-selector">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`reviews-star-button ${
                      star <= (hoverRating || rating)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() =>
                      setHoverRating(star)
                    }
                    onMouseLeave={() =>
                      setHoverRating(0)
                    }
                    aria-label={`Rate ${star} out of 5 stars`}
                    aria-pressed={rating === star}
                  >
                    <Star
                      size={30}
                      fill={
                        star <= (hoverRating || rating)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                ))}
              </div>

              <label htmlFor="review-comment">
                Your Review
              </label>

              <textarea
                id="review-comment"
                placeholder="Tell us what you think about this dish..."
                value={comment}
                onChange={(event) =>
                  setComment(event.target.value)
                }
                rows={5}
                required
              />

              {error && (
                <p className="reviews-message reviews-error">
                  {error}
                </p>
              )}

              {success && (
                <p className="reviews-message reviews-success">
                  {success}
                </p>
              )}

              <button
                type="submit"
                className="reviews-submit-button"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <LoaderCircle
                      className="reviews-spinner"
                      size={18}
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Review
                  </>
                )}
              </button>
            </form>
          )}
        </section>

        {/* CUSTOMER REVIEWS */}

        <section className="reviews-list-section">
          <div className="reviews-list-heading">
            <h2>Customer Reviews</h2>

            <span>{reviews.length}</span>
          </div>

          {reviews.length === 0 ? (
            <div className="reviews-empty-state">
              <MessageSquare size={38} />

              <h3>No reviews yet</h3>

              <p>
                Be the first to share your experience with
                this dish.
              </p>
            </div>
          ) : (
            <div className="reviews-list">
              {reviews.map((review) => (
                <article
                  key={review.id}
                  className="reviews-review-card"
                >
                  <div className="reviews-review-top">
                    <div className="reviews-review-avatar">
                      {(review.username || "C")
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="reviews-review-author">
                      <h3>
                        {review.username || "Customer"}
                      </h3>

                      <span>
                        {review.created_at
                          ? new Date(
                              review.created_at
                            ).toLocaleDateString()
                          : ""}
                      </span>
                    </div>

                    <div className="reviews-review-rating">
                      <Star
                        size={16}
                        fill="currentColor"
                      />

                      <span>{review.rating}.0</span>
                    </div>
                  </div>

                  <p className="reviews-review-comment">
                    {review.comment}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default Reviews;
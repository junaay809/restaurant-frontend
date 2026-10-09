import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  ArrowLeft,
  Home,
  Search,
  ClipboardList,
  User,
  PackageOpen,
  ChevronRight,
  Clock3,
  CheckCircle2,
  Truck,
  Utensils,
  RotateCcw,
  X,
  Trash2,
} from "lucide-react";

import "./MyOrders.css";

const API_BASE_URL = "https://restaurant-backend-production-b36b.up.railway.app";
const authenticatedFetch = async (
  url,
  options = {}
) => {

  let accessToken =
    localStorage.getItem("access_token");

  if (!accessToken) {
    throw new Error(
      "Please log in again."
    );
  }

  const makeRequest = (token) => {

    return fetch(url, {
      ...options,

      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });

  };


  let response =
    await makeRequest(accessToken);


  if (response.status !== 401) {
    return response;
  }


  const refreshToken =
    localStorage.getItem("refresh_token");

  if (!refreshToken) {
    throw new Error(
      "Please log in again."
    );
  }


  const refreshResponse =
    await fetch(
      `${API_BASE_URL}/api/auth/token/refresh/`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }
    );


  if (!refreshResponse.ok) {
    throw new Error(
      "Your session has expired. Please log in again."
    );
  }


  const refreshData =
    await refreshResponse.json();


  const newAccessToken =
    refreshData.access;


  if (!newAccessToken) {
    throw new Error(
      "Unable to refresh your session. Please log in again."
    );
  }


  localStorage.setItem(
    "access_token",
    newAccessToken
  );


  response =
    await makeRequest(
      newAccessToken
    );


  return response;
};

const MyOrders = () => {
  const navigate = useNavigate();

const [orders, setOrders] = useState([]);
const [cart, setCart] = useState(null);

const location = useLocation();

useEffect(() => {
  if (location.state?.activeTab) {
    setActiveTab(location.state.activeTab);
  }
}, [location.state]);

const [activeTab, setActiveTab] = useState(
  location.state?.activeTab || "cart"
);
const [selectedOrder, setSelectedOrder] = useState(null);

const [loading, setLoading] = useState(true);
const [cartLoading, setCartLoading] = useState(true);

const [error, setError] = useState("");
const [cartError, setCartError] = useState("");

/* =====================================================
   FETCH CART + ORDERS
===================================================== */

useEffect(() => {
  const fetchCartAndOrders = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setLoading(false);
      setCartLoading(false);
      return;
    }

    try {
      setLoading(true);
      setCartLoading(true);

      setError("");
      setCartError("");

      /* =========================
         FETCH CART
      ========================= */

      const cartResponse =
  await authenticatedFetch(
    `${API_BASE_URL}/api/cart/`,
    {
      method: "GET",
    }
  );

      if (!cartResponse.ok) {
        throw new Error("Unable to load your cart.");
      }

      const cartData = await cartResponse.json();

      setCart(cartData);


      /* =========================
         FETCH ORDERS
      ========================= */

      const ordersResponse =
  await authenticatedFetch(
    `${API_BASE_URL}/api/orders/`,
    {
      method: "GET",
    }
  );

      if (!ordersResponse.ok) {
        throw new Error("Unable to load your orders.");
      }

      const ordersData = await ordersResponse.json();

      setOrders(
        Array.isArray(ordersData)
          ? ordersData
          : ordersData.results || []
      );

    } catch (err) {

      console.error(
        "Error loading cart/orders:",
        err
      );

      setError(
        "We couldn't load your orders."
      );

      setCartError(
        "We couldn't load your cart."
      );

    } finally {

      setLoading(false);
      setCartLoading(false);

    }
  };

  fetchCartAndOrders();

}, []);

  /* =====================================================
     ONGOING ORDERS
  ===================================================== */

  const ongoingOrders = useMemo(() => {
    return orders.filter((order) =>
      [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "out_for_delivery",
      ].includes(order.status)
    );
  }, [orders]);

  /* =====================================================
     COMPLETED ORDERS
  ===================================================== */

  const completedOrders = useMemo(() => {
    return orders.filter((order) =>
      ["delivered", "cancelled"].includes(order.status)
    );
  }, [orders]);

  /* =====================================================
     DISPLAYED ORDERS
  ===================================================== */

  const displayedOrders =
    activeTab === "ongoing"
      ? ongoingOrders
      : activeTab === "completed"
      ? completedOrders
      : [];

  /* =====================================================
     HELPERS
  ===================================================== */

  const formatPrice = (price) => {
    return `₦${Number(price || 0).toLocaleString("en-NG")}`;
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString(
      "en-NG",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getImageUrl = (image) => {
  if (!image) return "";

  if (image.startsWith("http")) {
    return image;
  }

  return `${API_BASE_URL}${image}`;
};

  const getStatusLabel = (status) => {
    const labels = {
      pending: "Order received",
      confirmed: "Order confirmed",
      preparing: "Preparing your food",
      ready: "Ready for pickup",
      out_for_delivery: "Out for delivery",
      delivered: "Delivered",
      cancelled: "Cancelled",
    };

    return labels[status] || status;
  };

  const getStatusIcon = (status) => {
    if (status === "delivered") {
      return <CheckCircle2 size={19} />;
    }

    if (status === "out_for_delivery") {
      return <Truck size={19} />;
    }

    if (
      status === "preparing" ||
      status === "ready"
    ) {
      return <Utensils size={19} />;
    }

    return <Clock3 size={19} />;
  };

  /* =====================================================
     ORDER AGAIN
  ===================================================== */

  const handleOrderAgain = (order) => {
    /*
      We will connect this to your real cart
      in the next stage.

      For now, the button is ready.
    */

    console.log("Order again:", order);
  };

  /* =====================================================
   CART
===================================================== */

const renderCart = () => {

  if (cartLoading) {
    return (
      <div className="orders-loading">

        <div className="orders-spinner"></div>

        <p>
          Loading your cart...
        </p>

      </div>
    );
  }


  if (cartError) {
    return (
      <div className="orders-error">

        <PackageOpen size={50} />

        <h2>
          Something went wrong
        </h2>

        <p>
          {cartError}
        </p>

        <button
          type="button"
          className="orders-primary-button"
          onClick={() =>
            window.location.reload()
          }
        >
          Try again
        </button>

      </div>
    );
  }


  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="orders-empty">

        <div className="orders-empty-icon">
          <PackageOpen
            size={78}
            strokeWidth={1.3}
          />
        </div>

        <h2>
          Your cart is empty
        </h2>

        <p>
          Add something delicious from the menu to get started.
        </p>

        <button
          type="button"
          className="orders-primary-button"
          onClick={() => navigate("/menu")}
        >
          Browse Menu
        </button>

      </div>
    );
  }


  return (
    <div className="cart-content">

      <div className="cart-items">

        {cart.items.map((item) => (

          <article
  key={item.id}
  className="cart-item"
>

  {item.menu_item_image && (
    <img
      src={getImageUrl(
        item.menu_item_image
      )}
      alt={item.menu_item_name}
      className="cart-item-image"
    />
  )}

  <div className="cart-item-information">

    <div className="cart-item-top">

      <div>
        <h3>
          {item.menu_item_name}
        </h3>

        <span className="cart-item-price">
          {formatPrice(item.unit_price)}
        </span>
      </div>

      {/* DELETE ITEM */}

      <button
        type="button"
        className="cart-delete-button"
        onClick={async () => {

          try {

            const response =
              await authenticatedFetch(
                `${API_BASE_URL}/api/cart/item/${item.id}/remove/`,
                {
                  method: "DELETE",
                }
              );

            if (!response.ok) {
              throw new Error(
                "Unable to remove item."
              );
            }

            // Refresh cart displayed on this page
            const cartResponse =
              await authenticatedFetch(
                `${API_BASE_URL}/api/cart/`
              );

            if (cartResponse.ok) {
              const updatedCart =
                await cartResponse.json();

              setCart(updatedCart);
            }

            // Tell RestaurantContext to refresh too
            window.dispatchEvent(
              new CustomEvent(
                "dammy-spice-cart-updated"
              )
            );

          } catch (error) {

            console.error(
              "Remove cart item error:",
              error
            );

            alert(
              error.message ||
              "Unable to remove item."
            );
          }

        }}
        aria-label={`Remove ${item.menu_item_name}`}
      >
        <Trash2 size={19} />
      </button>

    </div>


    <div className="cart-item-bottom">

      {/* QUANTITY */}

      <div className="cart-quantity">

        <button
          type="button"
          onClick={async () => {

            if (item.quantity <= 1) {

              try {

                const response =
                  await authenticatedFetch(
                    `${API_BASE_URL}/api/cart/item/${item.id}/remove/`,
                    {
                      method: "DELETE",
                    }
                  );

                if (!response.ok) {
                  throw new Error(
                    "Unable to remove item."
                  );
                }

              } catch (error) {

                console.error(error);

                alert(
                  error.message ||
                  "Unable to remove item."
                );

                return;
              }

            } else {

              try {

                const response =
                  await authenticatedFetch(
                    `${API_BASE_URL}/api/cart/item/${item.id}/`,
                    {
                      method: "PATCH",
                      headers: {
                        "Content-Type":
                          "application/json",
                      },
                      body: JSON.stringify({
                        quantity:
                          item.quantity - 1,
                      }),
                    }
                  );

                if (!response.ok) {
                  throw new Error(
                    "Unable to decrease quantity."
                  );
                }

              } catch (error) {

                console.error(error);

                alert(
                  error.message ||
                  "Unable to decrease quantity."
                );

                return;
              }
            }

            // Reload cart on this page
            const cartResponse =
              await authenticatedFetch(
                `${API_BASE_URL}/api/cart/`
              );

            if (cartResponse.ok) {

              const updatedCart =
                await cartResponse.json();

              setCart(updatedCart);
            }

            window.dispatchEvent(
              new CustomEvent(
                "dammy-spice-cart-updated"
              )
            );

          }}
        >
          −
        </button>


        <span>
          {item.quantity}
        </span>


        <button
          type="button"
          onClick={async () => {

            try {

              const response =
                await authenticatedFetch(
                  `${API_BASE_URL}/api/cart/item/${item.id}/`,
                  {
                    method: "PATCH",
                    headers: {
                      "Content-Type":
                        "application/json",
                    },
                    body: JSON.stringify({
                      quantity:
                        item.quantity + 1,
                    }),
                  }
                );

              if (!response.ok) {
                throw new Error(
                  "Unable to increase quantity."
                );
              }

              // Reload cart on this page
              const cartResponse =
                await authenticatedFetch(
                  `${API_BASE_URL}/api/cart/`
                );

              if (cartResponse.ok) {

                const updatedCart =
                  await cartResponse.json();

                setCart(updatedCart);
              }

              window.dispatchEvent(
                new CustomEvent(
                  "dammy-spice-cart-updated"
                )
              );

            } catch (error) {

              console.error(error);

              alert(
                error.message ||
                "Unable to increase quantity."
              );
            }

          }}
        >
          +
        </button>

      </div>


      <strong>
        {formatPrice(
          item.total_price
        )}
      </strong>

    </div>

  </div>

</article>

        ))}

      </div>


      <div className="cart-summary">

        <div className="cart-summary-row">

          <span>
            Items
          </span>

          <strong>
            {cart.total_items}
          </strong>

        </div>


        <div className="cart-summary-row cart-summary-total">

          <span>
            Subtotal
          </span>

          <strong>
            {formatPrice(cart.subtotal)}
          </strong>

        </div>


        <button
  type="button"
  className="orders-primary-button"
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</button>

      </div>

    </div>
  );
};

  /* =====================================================
     EMPTY STATE
  ===================================================== */

  const renderEmptyState = () => {
    let title = "Your cart is empty";
    let description =
      "You haven't placed any orders yet.";

    if (activeTab === "ongoing") {
      title = "No ongoing orders";
      description =
        "Your active orders will appear here.";
    }

    if (activeTab === "completed") {
      title = "No completed orders";
      description =
        "Your completed orders will appear here.";
    }

    return (
      <div className="orders-empty">

        <div className="orders-empty-icon">
          <PackageOpen
            size={78}
            strokeWidth={1.3}
          />
        </div>

        <h2>{title}</h2>

        <p>{description}</p>

        <button
          type="button"
          className="orders-primary-button"
          onClick={() => navigate("/menu")}
        >
          Browse menu
        </button>

      </div>
    );
  };

  /* =====================================================
     ORDER CARD
  ===================================================== */

  const renderOrderCard = (order) => {
    const itemCount =
      order.items?.reduce(
        (total, item) =>
          total + Number(item.quantity || 0),
        0
      ) || 0;

    return (
      <button
        type="button"
        key={order.id}
        className="order-card"
        onClick={() => setSelectedOrder(order)}
      >

        <div className="order-card-top">

          <div>
            <span className="order-number-label">
              Order
            </span>

            <h3>
              #{order.order_number}
            </h3>
          </div>

          <ChevronRight size={22} />

        </div>

        <div className="order-card-status">

          <span className="order-status-icon">
            {getStatusIcon(order.status)}
          </span>

          <div>
            <strong>
              {getStatusLabel(order.status)}
            </strong>

            <span>
              {formatDate(order.created_at)}
            </span>
          </div>

        </div>

        <div className="order-card-bottom">

          <span>
            {itemCount}{" "}
            {itemCount === 1
              ? "item"
              : "items"}
          </span>

          <strong>
            {formatPrice(order.total_amount)}
          </strong>

        </div>

      </button>
    );
  };

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="my-orders-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="orders-header">

        <button
          type="button"
          className="orders-back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={27} />
        </button>

        <h1>Orders</h1>

      </header>


      {/* =================================================
          TOP TABS
      ================================================= */}

      <div className="orders-tabs">

        <button
          type="button"
          className={`orders-tab ${
            activeTab === "cart"
              ? "active"
              : ""
          }`}
          onClick={() => setActiveTab("cart")}
        >
          My Cart
        </button>


        <button
          type="button"
          className={`orders-tab ${
            activeTab === "ongoing"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("ongoing")
          }
        >
          Ongoing
        </button>


        <button
          type="button"
          className={`orders-tab ${
            activeTab === "completed"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("completed")
          }
        >
          Completed
        </button>

      </div>


      {/* =================================================
          PAGE CONTENT
      ================================================= */}

      <main className="orders-content">

        {loading ? (

          <div className="orders-loading">

            <div className="orders-spinner"></div>

            <p>
              Loading your orders...
            </p>

          </div>

        ) : error ? (

          <div className="orders-error">

            <PackageOpen size={50} />

            <h2>
              Something went wrong
            </h2>

            <p>
              {error}
            </p>

            <button
              type="button"
              className="orders-primary-button"
              onClick={() =>
                window.location.reload()
              }
            >
              Try again
            </button>

          </div>

        ) : activeTab === "cart" ? (

          renderCart()

        ) : displayedOrders.length === 0 ? (

          renderEmptyState()

        ) : (

          <div className="orders-list">
            {displayedOrders.map(
              renderOrderCard
            )}
          </div>

        )}

      </main>


      {/* =================================================
          ORDER DETAILS
      ================================================= */}

      {selectedOrder && (

        <div
          className="order-details-overlay"
          onClick={() =>
            setSelectedOrder(null)
          }
        >

          <div
            className="order-details-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="order-details-header">

              <div>

                <span>
                  Order
                </span>

                <h2>
                  #{selectedOrder.order_number}
                </h2>

              </div>

              <button
                type="button"
                className="order-details-close"
                onClick={() =>
                  setSelectedOrder(null)
                }
                aria-label="Close"
              >
                <X size={23} />
              </button>

            </div>


            {/* STATUS */}

            <div className="order-details-status">

              <div className="order-details-status-icon">
                {getStatusIcon(
                  selectedOrder.status
                )}
              </div>

              <div>

                <strong>
                  {getStatusLabel(
                    selectedOrder.status
                  )}
                </strong>

                <span>
                  {formatDate(
                    selectedOrder.created_at
                  )}
                </span>

              </div>

            </div>


            {/* ITEMS */}

            <section className="order-details-section">

              <h3>
                Your order
              </h3>

              <div className="order-items">

                {selectedOrder.items?.map(
                  (item) => (

                    <div
                      className="order-item"
                      key={item.id}
                    >

                      <div className="order-item-quantity">
                        {item.quantity}x
                      </div>

                      <div className="order-item-info">

                        <strong>
                          {item.item_name}
                        </strong>

                        <span>
                          {formatPrice(
                            item.item_price
                          )}
                        </span>

                      </div>

                      <strong>
                        {formatPrice(
                          item.total_price
                        )}
                      </strong>

                    </div>

                  )
                )}

              </div>

            </section>


            {/* DELIVERY DETAILS */}

            <section className="order-details-section">

              <h3>
                Delivery details
              </h3>

              <div className="order-detail-row">

                <span>
                  Order type
                </span>

                <strong>
                  {selectedOrder.order_type ===
                  "pickup"
                    ? "Pickup"
                    : "Delivery"}
                </strong>

              </div>


              {selectedOrder.delivery_address && (
                <div className="order-detail-row">

                  <span>
                    Address
                  </span>

                  <strong>
                    {
                      selectedOrder.delivery_address
                    }
                  </strong>

                </div>
              )}


              {selectedOrder.phone && (
                <div className="order-detail-row">

                  <span>
                    Phone
                  </span>

                  <strong>
                    {selectedOrder.phone}
                  </strong>

                </div>
              )}

            </section>


            {/* PAYMENT */}

            <section className="order-details-section">

              <h3>
                Payment
              </h3>

              <div className="order-detail-row">

                <span>
                  Payment status
                </span>

                <strong className="payment-status">
                  {
                    selectedOrder.payment_status
                  }
                </strong>

              </div>

            </section>


            {/* TOTAL */}

            <section className="order-summary">

              <div>
                <span>
                  Subtotal
                </span>

                <strong>
                  {formatPrice(
                    selectedOrder.subtotal
                  )}
                </strong>
              </div>


              <div>
                <span>
                  Delivery fee
                </span>

                <strong>
                  {formatPrice(
                    selectedOrder.delivery_fee
                  )}
                </strong>
              </div>


              <div className="order-total">

                <span>
                  Total
                </span>

                <strong>
                  {formatPrice(
                    selectedOrder.total_amount
                  )}
                </strong>

              </div>

            </section>


            {/* ORDER AGAIN */}

            {selectedOrder.status ===
              "delivered" && (

              <button
                type="button"
                className="order-again-button"
                onClick={() =>
                  handleOrderAgain(
                    selectedOrder
                  )
                }
              >

                <RotateCcw size={19} />

                Order Again

              </button>

            )}

          </div>

        </div>

      )}


      {/* =================================================
          MOBILE BOTTOM NAVIGATION
      ================================================= */}

      <nav className="orders-bottom-navigation">

        {/* HOME */}

        <button
          type="button"
          onClick={() => navigate("/")}
        >

          <Home size={23} />

          <span>
            Home
          </span>

        </button>


        {/* DISCOVER */}

        <button
          type="button"
          onClick={() =>
            navigate("/discover")
          }
        >

          <Search size={23} />

          <span>
            Discover
          </span>

        </button>


        {/* MY ORDERS */}

        <button
          type="button"
          className="active"
          onClick={() =>
            navigate("/orders")
          }
        >

          <ClipboardList size={23} />

          <span>
            My Orders
          </span>

        </button>


        {/* PROFILE */}

        <button
          type="button"
          onClick={() =>
            navigate("/profile")
          }
        >

          <User size={23} />

          <span>
            Profile
          </span>

        </button>

      </nav>

    </div>
  );
};

export default MyOrders;
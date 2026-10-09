import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  FileText,
  ShoppingBag,
  CreditCard,
  Wallet,
  X,
} from "lucide-react";
import "./Checkout.css";

const API_BASE_URL = "https://restaurant-backend-production-b36b.up.railway.app";
/* =========================================
   AUTHENTICATED API REQUEST
========================================= */

const authenticatedFetch = async (url, options = {}) => {
  let accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    throw new Error("Please log in again.");
  }

  const makeRequest = (token) =>
    fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

  let response = await makeRequest(accessToken);

  if (response.status !== 401) {
    return response;
  }

  const refreshToken =
    localStorage.getItem("refresh_token");

  if (!refreshToken) {
    throw new Error("Please log in again.");
  }

  const refreshResponse = await fetch(
    `${API_BASE_URL}/api/auth/token/refresh/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

  if (!refreshData.access) {
    throw new Error(
      "Unable to refresh your session."
    );
  }

  localStorage.setItem(
    "access_token",
    refreshData.access
  );

  response = await makeRequest(
    refreshData.access
  );

  return response;
};

/* =========================================
   FORMAT PRICE
========================================= */

const formatPrice = (price) => {
  return `₦${Number(price || 0).toLocaleString(
    "en-NG"
  )}`;
};

/* =========================================
   CHECKOUT
========================================= */

const Checkout = () => {
  const navigate = useNavigate();

  /* =========================================
     CHECKOUT DATA
  ========================================= */

  const [cart, setCart] = useState(null);

  const [addresses, setAddresses] =
    useState([]);

  const [selectedAddress, setSelectedAddress] =
    useState(null);

  const [phone, setPhone] =
    useState("");

  const [notes, setNotes] =
    useState("");

  /* =========================================
     LOADING / ERROR
  ========================================= */

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =========================================
     PAYMENT
  ========================================= */

  const [showPaymentModal, setShowPaymentModal] =
    useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState("");

  /* =========================================
     WALLET
  ========================================= */

  const [walletBalance, setWalletBalance] =
    useState(null);

  const [walletLoading, setWalletLoading] =
    useState(false);

  const [walletCanPay, setWalletCanPay] =
    useState(false);

  const [walletError, setWalletError] =
    useState("");

  /* =========================================
     IMAGE URL
  ========================================= */

  const getImageUrl = (image) => {
    if (!image) {
      return "";
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `${API_BASE_URL}${image}`;
  };

  /* =========================================
     LOAD CHECKOUT DATA
  ========================================= */

  useEffect(() => {
    loadCheckoutData();
  }, []);

  const loadCheckoutData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        cartResponse,
        addressResponse,
      ] = await Promise.all([
        authenticatedFetch(
          `${API_BASE_URL}/api/cart/`
        ),

        authenticatedFetch(
          `${API_BASE_URL}/api/auth/addresses/`
        ),
      ]);

      if (!cartResponse.ok) {
        throw new Error(
          "Unable to load your cart."
        );
      }

      if (!addressResponse.ok) {
        throw new Error(
          "Unable to load your addresses."
        );
      }

      const cartData =
        await cartResponse.json();

      const addressData =
        await addressResponse.json();

      setCart(cartData);
      setAddresses(addressData);

      const defaultAddress =
        addressData.find(
          (address) =>
            address.is_default
        );

      if (defaultAddress) {
        setSelectedAddress(
          defaultAddress.id
        );
      }
    } catch (err) {
      console.error(
        "Checkout loading error:",
        err
      );

      setError(
        err.message ||
        "Unable to load checkout."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     PLACE ORDER BUTTON
  ========================================= */

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      setError(
        "Please select a delivery address."
      );
      return;
    }

    const address =
      addresses.find(
        (item) =>
          item.id === selectedAddress
      );

    if (!address) {
      setError(
        "Selected address could not be found."
      );
      return;
    }

    setError("");

    setPaymentMethod("");

    setWalletBalance(null);

    setWalletLoading(false);

    setWalletCanPay(false);

    setWalletError("");

    setShowPaymentModal(true);
  };

  /* =========================================
     CLOSE PAYMENT MODAL
     
     X returns user to HOME.
  ========================================= */

  const handleClosePaymentModal = () => {
    if (submitting) {
      return;
    }

    setShowPaymentModal(false);
    setPaymentMethod("");
    setWalletBalance(null);
    setWalletLoading(false);
    setWalletCanPay(false);
    setWalletError("");

    navigate("/checkout");
  };

  /* =========================================
     WALLET SELECTION
     
     Checks the CURRENT wallet balance.
  ========================================= */

  const handleWalletSelect = async () => {
    if (walletLoading || submitting) {
      return;
    }

    setPaymentMethod("wallet");

    setWalletLoading(true);

    setWalletError("");

    setWalletBalance(null);

    setWalletCanPay(false);

    try {
      const response =
        await authenticatedFetch(
          `${API_BASE_URL}/api/wallet/`
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          data.detail ||
          "Unable to check your wallet balance."
        );
      }

      const balance =
        Number(data.balance || 0);

      const orderTotal =
        Number(cart?.subtotal || 0);

      setWalletBalance(balance);

      setWalletCanPay(
        balance >= orderTotal
      );
    } catch (err) {
      console.error(
        "Wallet balance error:",
        err
      );

      setWalletError(
        err.message ||
        "Unable to check your wallet balance."
      );

      setWalletCanPay(false);
    } finally {
      setWalletLoading(false);
    }
  };

  /* =========================================
     SELECT PAYSTACK
  ========================================= */

  const handlePaystackSelect = () => {
    if (submitting) {
      return;
    }

    setPaymentMethod("paystack");

    setWalletError("");

    setWalletBalance(null);

    setWalletCanPay(false);

    setWalletLoading(false);
  };

  /* =========================================
     PAYMENT CONTINUE
  ========================================= */

  const handlePaymentContinue = async () => {
    if (!paymentMethod) {
      return;
    }

    if (
      paymentMethod === "wallet" &&
      !walletCanPay
    ) {
      return;
    }

    try {
      setSubmitting(true);

      setError("");

      const address =
        addresses.find(
          (item) =>
            item.id === selectedAddress
        );

      if (!address) {
        throw new Error(
          "Selected address could not be found."
        );
      }

      const response =
        await authenticatedFetch(
          `${API_BASE_URL}/api/orders/create/`,
          {
            method: "POST",

            body: JSON.stringify({
              delivery_address:
                address.address,

              phone: phone,

              notes: notes,

              delivery_fee: 0,

              payment_method:
                paymentMethod,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          data.detail ||
          "Unable to process your payment."
        );
      }

      /* =====================================
         WALLET PAYMENT
      ===================================== */

      if (
        paymentMethod === "wallet"
      ) {
        setShowPaymentModal(false);

        navigate("/orders");

        return;
      }

      /* =====================================
         PAYSTACK PAYMENT
      ===================================== */

      if (
        paymentMethod === "paystack"
      ) {
        if (
          data.authorization_url
        ) {
          window.location.href =
            data.authorization_url;

          return;
        }

        throw new Error(
          "Paystack payment link was not returned."
        );
      }
    } catch (err) {
      console.error(
        "Payment error:",
        err
      );

      setError(
        err.message ||
        "Unable to process your payment."
      );

      setShowPaymentModal(false);
    } finally {
      setSubmitting(false);
    }
  };

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <div className="checkout-page">

        <div className="checkout-loading">

          <div className="checkout-spinner"></div>

          <p>
            Loading checkout...
          </p>

        </div>

      </div>
    );
  }

  /* =========================================
     CHECKOUT ERROR
  ========================================= */

  if (error && !cart) {
    return (
      <div className="checkout-page">

        <div className="checkout-error">

          <h2>
            Something went wrong
          </h2>

          <p>
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/orders")
            }
          >
            Back to Cart
          </button>

        </div>

      </div>
    );
  }

  /* =========================================
     EMPTY CART
  ========================================= */

  if (
    !cart ||
    !cart.items ||
    cart.items.length === 0
  ) {
    return (
      <div className="checkout-page">

        <div className="checkout-empty">

          <ShoppingBag size={60} />

          <h2>
            Your cart is empty
          </h2>

          <p>
            Add something delicious before
            checking out.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/menu")
            }
          >
            Browse Menu
          </button>

        </div>

      </div>
    );
  }

  /* =========================================
     MAIN CHECKOUT
  ========================================= */

  return (
    <div className="checkout-page">

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="checkout-header">

        <button
          type="button"
          className="checkout-back-button"
          onClick={() =>
            navigate("/orders")
          }
          aria-label="Back to cart"
        >
          <ArrowLeft size={22} />
        </button>

        <h1>
          Checkout
        </h1>

        <div className="checkout-header-spacer"></div>

      </header>

      {/* =====================================
          CONTENT
      ===================================== */}

      <main className="checkout-content">

        {/* =====================================
            DELIVERY ADDRESS
        ===================================== */}

        <section className="checkout-section">

          <div className="checkout-section-title">

            <MapPin size={20} />

            <div>

              <h2>
                Delivery Address
              </h2>

              <p>
                Select where you want your
                order delivered.
              </p>

            </div>

          </div>

          {addresses.length === 0 ? (

            <div className="checkout-no-address">

              <p>
                You don't have a saved
                address yet.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/profile")
                }
              >
                Add Address
              </button>

            </div>

          ) : (

            <div className="checkout-addresses">

              {addresses.map(
                (address) => (

                  <button
                    key={address.id}
                    type="button"
                    className={`checkout-address-card ${
                      selectedAddress ===
                      address.id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedAddress(
                        address.id
                      )
                    }
                  >

                    <div className="checkout-address-radio">

                      <span></span>

                    </div>

                    <div className="checkout-address-details">

                      <strong>
                        {address.title}
                      </strong>

                      <p>
                        {address.address}
                      </p>

                      {address.is_default && (
                        <small>
                          Default address
                        </small>
                      )}

                    </div>

                  </button>

                )
              )}

            </div>

          )}

        </section>

        {/* =====================================
            PHONE
        ===================================== */}

        <section className="checkout-section">

          <div className="checkout-section-title">

            <Phone size={20} />

            <div>

              <h2>
                Phone Number
              </h2>

              <p>
                We'll use this to contact you
                about your delivery.
              </p>

            </div>

          </div>

          <input
            type="tel"
            value={phone}
            onChange={(event) =>
              setPhone(
                event.target.value
              )
            }
            placeholder="Enter your phone number"
            className="checkout-input"
          />

        </section>

        {/* =====================================
            NOTES
        ===================================== */}

        <section className="checkout-section">

          <div className="checkout-section-title">

            <FileText size={20} />

            <div>

              <h2>
                Order Notes
              </h2>

              <p>
                Anything you'd like us
                to know?
              </p>

            </div>

          </div>

          <textarea
            value={notes}
            onChange={(event) =>
              setNotes(
                event.target.value
              )
            }
            placeholder="e.g. Please call when you arrive..."
            className="checkout-textarea"
            rows="4"
          />

        </section>

        {/* =====================================
            ORDER SUMMARY
        ===================================== */}

        <section className="checkout-section checkout-summary">

          <div className="checkout-section-title">

            <ShoppingBag size={20} />

            <div>

              <h2>
                Order Summary
              </h2>

              <p>
                {cart.total_items} item
                {cart.total_items !== 1
                  ? "s"
                  : ""}
              </p>

            </div>

          </div>

          <div className="checkout-items">

            {cart.items.map(
              (item) => (

                <div
                  className="checkout-item"
                  key={item.id}
                >

                  <div className="checkout-item-image">

                    <img
                      src={getImageUrl(
                        item.menu_item_image
                      )}
                      alt={
                        item.menu_item_name
                      }
                    />

                  </div>

                  <div className="checkout-item-info">

                    <strong>
                      {item.menu_item_name}
                    </strong>

                    <span>
                      {item.quantity} ×{" "}
                      {formatPrice(
                        item.unit_price
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

          {/* SUBTOTAL */}

          <div className="checkout-total-row">

            <span>
              Subtotal
            </span>

            <strong>
              {formatPrice(
                cart.subtotal
              )}
            </strong>

          </div>

          {/* DELIVERY */}

          <div className="checkout-total-row">

            <span>
              Delivery
            </span>

            <strong>
              ₦0
            </strong>

          </div>

          {/* TOTAL */}

          <div className="checkout-grand-total">

            <span>
              Total
            </span>

            <strong>
              {formatPrice(
                cart.subtotal
              )}
            </strong>

          </div>

        </section>

        {/* =====================================
            ERROR
        ===================================== */}

        {error && (

          <div className="checkout-form-error">

            {error}

          </div>

        )}

        {/* =====================================
            PAYMENT METHOD MODAL
        ===================================== */}

        {showPaymentModal && (

          <div
            className="checkout-payment-overlay"
            onClick={
              handleClosePaymentModal
            }
          >

            <div
              className="checkout-payment-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* =================================
                  PAYMENT HEADER
              ================================= */}

              <div className="checkout-payment-header">

                <div>

                  <h2>
                    Choose Payment Method
                  </h2>

                  <p>
                    Select how you want
                    to pay for your order.
                  </p>

                </div>

                <button
                  type="button"
                  className="checkout-payment-close"
                  onClick={
                    handleClosePaymentModal
                  }
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

              </div>

              {/* =================================
                  PAYMENT OPTIONS
              ================================= */}

              <div className="checkout-payment-options">

                {/* =================================
                    PAYSTACK
                ================================= */}

                <button
                  type="button"
                  className={`checkout-payment-option ${
                    paymentMethod ===
                    "paystack"
                      ? "selected"
                      : ""
                  }`}
                  onClick={
                    handlePaystackSelect
                  }
                >

                  <div className="checkout-payment-icon">

                    <CreditCard
                      size={22}
                    />

                  </div>

                  <div className="checkout-payment-info">

                    <strong>
                      Pay with Paystack
                    </strong>

                    <span>
                      Pay securely with your
                      bank card, bank transfer
                      or other available
                      Paystack payment methods.
                    </span>

                  </div>

                  <div className="checkout-payment-radio">

                    <span></span>

                  </div>

                </button>

                {/* =================================
                    WALLET
                ================================= */}

                {!(
                  paymentMethod === "wallet" &&
                  !walletLoading &&
                  walletBalance !== null &&
                  !walletCanPay
                ) && (

                  <button
                    type="button"
                    className={`checkout-payment-option checkout-wallet-option ${
                      paymentMethod === "wallet"
                        ? "selected"
                        : ""
                    }`}
                    onClick={
                      handleWalletSelect
                    }
                    disabled={
                      walletLoading ||
                      submitting
                    }
                  >

                    <div className="checkout-payment-icon">

                      <Wallet
                        size={22}
                      />

                    </div>

                    <div className="checkout-payment-info">

                      <strong>
                        Pay with Wallet
                      </strong>

                      <span>
                        Use your Dammy & Spice
                        wallet balance to pay
                        for this order.
                      </span>

                    </div>

                    <div className="checkout-payment-radio">

                      <span></span>

                    </div>

                  </button>

                )}

              </div>

              {/* =================================
                  WALLET LOADING
              ================================= */}

              {paymentMethod === "wallet" &&
                walletLoading && (

                  <div className="checkout-wallet-loading">

                    <div className="checkout-spinner"></div>

                    <div>

                      <strong>
                        Checking wallet balance...
                      </strong>

                      <span>
                        Please wait a moment.
                      </span>

                    </div>

                  </div>

              )}

              {/* =================================
                  WALLET ERROR
              ================================= */}

              {paymentMethod === "wallet" &&
                !walletLoading &&
                walletError && (

                  <div className="checkout-wallet-error">

                    <Wallet size={20} />

                    <div>

                      <strong>
                        Wallet unavailable
                      </strong>

                      <p>
                        {walletError}
                      </p>

                    </div>

                  </div>

              )}

              {/* =================================
                  INSUFFICIENT WALLET BALANCE

                  IMPORTANT:
                  This is OUTSIDE the wallet
                  button, so there is no nested
                  button error.
              ================================= */}

              {paymentMethod === "wallet" &&
                !walletLoading &&
                walletBalance !== null &&
                !walletCanPay &&
                !walletError && (

                  <div className="checkout-wallet-insufficient">

                    <div className="checkout-wallet-insufficient-icon">

                      <Wallet size={26} />

                    </div>

                    <div className="checkout-wallet-insufficient-content">

                      <strong>
                        Insufficient wallet balance
                      </strong>

                      <p>
                        Your wallet balance is{" "}
                        <strong>
                          {formatPrice(
                            walletBalance
                          )}
                        </strong>
                        .
                      </p>

                      <p>
                        You need{" "}
                        <strong>
                          {formatPrice(
                            Math.max(
                              Number(
                                cart.subtotal
                              ) -
                                walletBalance,
                              0
                            )
                          )}
                        </strong>{" "}
                        more to complete this order.
                      </p>

                      <button
                        type="button"
                        className="checkout-wallet-add-money"
                        onClick={() =>
                          navigate("/profile")
                        }
                      >

                        <Wallet size={17} />

                        Add Money to Wallet

                      </button>

                    </div>

                  </div>

              )}

              {/* =================================
                  WALLET SUFFICIENT BALANCE
              ================================= */}

              {paymentMethod === "wallet" &&
                !walletLoading &&
                walletBalance !== null &&
                walletCanPay && (

                  <div className="checkout-wallet-success">

                    <div className="checkout-wallet-success-icon">

                      <Wallet size={22} />

                    </div>

                    <div>

                      <strong>
                        Wallet ready
                      </strong>

                      <p>
                        Your balance is{" "}
                        <strong>
                          {formatPrice(
                            walletBalance
                          )}
                        </strong>
                        .
                      </p>

                      <p>
                        You can pay for this order
                        using your wallet.
                      </p>

                    </div>

                  </div>

              )}

              {/* =================================
                  PAYMENT TOTAL
              ================================= */}

              <div className="checkout-payment-total">

                <span>
                  Total
                </span>

                <strong>
                  {formatPrice(
                    cart.subtotal
                  )}
                </strong>

              </div>

              {/* =================================
                  CONTINUE
              ================================= */}

              <button
                type="button"
                className="checkout-payment-continue"
                disabled={
                  !paymentMethod ||
                  submitting ||
                  walletLoading ||
                  (
                    paymentMethod === "wallet" &&
                    !walletCanPay
                  )
                }
                onClick={
                  handlePaymentContinue
                }
              >

                {submitting
                  ? "Processing..."
                  : "Continue"}

              </button>

            </div>

          </div>

        )}

        {/* =====================================
            PLACE ORDER
        ===================================== */}

        <button
          type="button"
          className="checkout-place-order"
          onClick={
            handlePlaceOrder
          }
          disabled={
            submitting ||
            addresses.length === 0 ||
            !selectedAddress
          }
        >

          {submitting
            ? "Please wait..."
            : "Place Order"}

        </button>

      </main>

    </div>
  );
};

export default Checkout;
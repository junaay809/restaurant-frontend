import React from "react";
import { WifiOff } from "lucide-react";
import "./PageLoader.css";

const PageLoader = ({ loading = false, error = false, onRetry }) => {
  if (loading) {
    return (
      <div className="page-loader">
        <div className="page-loader-content">
          <div className="page-loader-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-loader">
        <div className="page-loader-content page-loader-error">
          <div className="page-loader-error-icon">
            <WifiOff size={30} strokeWidth={2} />
          </div>

          <h2>Couldn't load this page</h2>

          <p>
            Check your internet connection and try again.
          </p>

          {onRetry && (
            <button
              type="button"
              className="page-loader-retry"
              onClick={onRetry}
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default PageLoader;
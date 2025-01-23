// src/components/SuccessPage.tsx

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const SuccessPage: React.FC = () => {
  return (
    <div className="success-page d-flex flex-column justify-content-center align-items-center vh-100">
      <FontAwesomeIcon icon={faCheckCircle} size="4x" color="green" />
      <h1 className="mt-3">Your payment was successful</h1>
      <p className="text-center mt-2">
        Thank you for your payment. We will be in contact with more details
        shortly.
      </p>
      <div className="success-line mt-4"></div>
    </div>
  );
};

export default SuccessPage;

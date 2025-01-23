// src/components/CreditCardForm.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faUser,
  faCalendarAlt,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import {
  validateCardNumberFormat,
  validateNameFormat,
  validateExpiryFormat,
  validateCvvFormat,
} from "../customRules.ts";
import data from "../data.json";
import "./CreditCard.css";

const identifyCardType = (number: string) => {
  const firstDigit = number.charAt(0);
  const firstTwoDigits = number.slice(0, 2);

  if (firstDigit === "4") return "VISA";
  if (firstTwoDigits >= "51" && firstTwoDigits <= "55") return "MASTERCARD";
  if (firstTwoDigits === "34" || firstTwoDigits === "37") return "AMEX";
  if (firstDigit === "6") return "DISCOVER";
  return "CARD"; // Default
};

const CreditCardForm: React.FC = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  const updateErrors = (error: string, condition: boolean) => {
    setErrors((prev) => {
      if (condition) {
        return prev.includes(error) ? prev : [...prev, error];
      } else {
        return prev.filter((e) => e !== error);
      }
    });
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    const numericValue = inputVal.replace(/[^\d]/g, ""); // Remove all non-numeric characters

    if (numericValue.length <= 16) {
      // Limit to 16 digits
      setCardNumber(numericValue);
      updateErrors(
        "Invalid card number",
        !validateCardNumberFormat(numericValue)
      );
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    updateErrors("Invalid name", !validateNameFormat(value));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setExpiry(value);
    updateErrors("Invalid expiry date", !validateExpiryFormat(value));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCvv(value);
    updateErrors("Invalid CVV", !validateCvvFormat(value));
  };

  const handleCvvFocus = () => setIsFlipped(true);
  const handleCvvBlur = () => setIsFlipped(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Check if card details match with data.json and no validation errors
    const isValidCard = data.validCards.some(
      (card) =>
        card.number === cardNumber &&
        card.name === name &&
        card.expiry === expiry &&
        card.cvv === cvv
    );

    if (errors.length === 0 && isValidCard) {
      navigate("/success");
    } else {
      updateErrors("Invalid card details", !isValidCard);
    }
  };

  const formatCardNumber = (number: string) => {
    // Always mask first 12 digits
    const maskedPart = "•••• •••• ••••";

    // For numbers less than 12 digits
    if (number.length < 12) {
      return maskedPart + " ••••";
    }

    // For numbers >= 12 digits, show the last 4 digits
    const lastFourDigits = number.slice(12).padEnd(4, "•");
    return `${maskedPart} ${lastFourDigits}`;
  };

  const formatCvv = (cvv: string) => {
    return "***"; // Always show asterisks regardless of input
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
        <form onSubmit={handleSubmit} className="credit-card-form">
          <div className={`credit-card-preview ${isFlipped ? "flipped" : ""}`}>
            <div className="card-front">
              <div className="card-type">
                {cardNumber ? identifyCardType(cardNumber) : "CARD"}
              </div>
              <div className="card-number">{formatCardNumber(cardNumber)}</div>
              <div className="card-info">
                <div className="card-holder">
                  <div className="label">Card Holder</div>
                  <div className="value">{name || "FULL NAME"}</div>
                </div>
                <div className="card-expires">
                  <div className="label">Expires</div>
                  <div className="value">{expiry || "MM/YY"}</div>
                </div>
              </div>
            </div>
            <div className="card-back">
              <div className="card-stripe"></div>
              <div className="card-cvv">
                <div className="cvv-label">CVV</div>
                <div className="cvv-value">{formatCvv(cvv)}</div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faCreditCard} /> Card Number
            </label>
            <input
              type="text"
              className="form-control"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
          </div>
          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faUser} /> Name
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>
                <FontAwesomeIcon icon={faCalendarAlt} /> Valid Thru
              </label>
              <input
                type="text"
                className="form-control"
                value={expiry}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
              />
            </div>
            <div className="form-group col-md-6">
              <label>
                <FontAwesomeIcon icon={faLock} /> CVC
              </label>
              <input
                type="text"
                className="form-control"
                value={cvv}
                onChange={handleCvvChange}
                onFocus={handleCvvFocus}
                onBlur={handleCvvBlur}
              />
            </div>
          </div>
          {errors.length > 0 && (
            <div className="alert alert-danger">
              {errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreditCardForm;

// src/customRules.ts

export const validateCardNumberFormat = (number: string): boolean => {
    return /^\d{16}$/.test(number); // 16-digit number
  };
  
  export const validateNameFormat = (name: string): boolean => {
    return /^[a-zA-Z\s]+$/.test(name); // Only letters and spaces
  };
  
  export const validateExpiryFormat = (expiry: string): boolean => {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry); // MM/YY format
  };
  
  export const validateCvvFormat = (cvv: string): boolean => {
    return /^\d{3,4}$/.test(cvv); // 3 or 4 digits
  };
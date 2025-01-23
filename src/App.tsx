// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreditCardForm from "./components/CreditCardForm.tsx";
import SuccessPage from "./components/SuccessPage.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreditCardForm />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-4xl font-bold text-red-600">LandingPage</h1>
      <button
        onClick={() => navigate("/loginpage")}
        className="bg-blue-500 px-4 py-2 text-white"
      >
        Go to Login Page
      </button>
    </div>
  );
}

export default LandingPage;

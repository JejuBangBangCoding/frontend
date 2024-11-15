import React from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-4xl font-bold text-orange-600">LoginPage</h1>
      <button
        onClick={() => navigate("/mainpage")}
        className="bg-blue-500 px-4 py-2 text-white"
      >
        Go to main Page
      </button>
    </div>
  );
}

export default LoginPage;

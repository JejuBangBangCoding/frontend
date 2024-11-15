import React from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-4xl font-bold text-green-600">Main</h1>
      <button
        onClick={() => navigate("/aipage")}
        className="bg-blue-500 px-4 py-2 text-white"
      >
        Go to AiPage
      </button>
    </div>
  );
}

export default MainPage;

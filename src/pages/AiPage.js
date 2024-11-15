import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AiPage() {
  const [contentChanged, setContentChanged] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!contentChanged) {
      setContentChanged(true);
    } else {
      navigate("/farmlistpage");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-blue-600">
        {contentChanged ? "AiPage-컴포넌트 내용 바뀌기" : "AiPage"}
      </h1>
      <button
        onClick={handleClick}
        className="mt-4 bg-blue-500 px-4 py-2 text-white"
      >
        {contentChanged ? "Go to Farm List Page" : "추천받기"}
      </button>
    </div>
  );
}

export default AiPage;

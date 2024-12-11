import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card";

function FarmListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { recommendations } = location.state || { recommendations: [] };
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFarmClick = (farm) => {
    navigate("/farmdetailedpage", { state: { board_id: farm.id } });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === recommendations.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? recommendations.length - 1 : prevIndex - 1,
    );
  };

  return (
    <>
      <Header showProfile={true} showBackButton={true} />

      {/* 카드 슬라이드 */}
      <div className="mt-5 flex justify-center">
        <div className="relative w-80 overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${currentIndex * 320}px)`, // Use fixed width (320px)
              width: `${recommendations.length * 320}px`, // Total width based on card width
            }}
          >
            {recommendations.map((farm) => (
              <div
                key={farm.id}
                className="flex-shrink-0"
                style={{ width: "320px" }} // Fixed card width
              >
                <Card farm={farm} onClick={() => handleFarmClick(farm)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 이전 다음 버튼 */}
      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={handlePrev}
          className="rounded-full bg-gray-700 px-4 py-2 text-white"
        >
          &lt; Prev
        </button>
        <button
          onClick={handleNext}
          className="rounded-full bg-gray-700 px-4 py-2 text-white"
        >
          Next &gt;
        </button>
      </div>
    </>
  );
}

export default FarmListPage;

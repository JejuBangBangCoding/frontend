import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card";
import bot from "../assets/images/bot.svg";
import star from "../assets/images/star.svg";
import prev from "../assets/images/prev.svg";
import next from "../assets/images/next.svg";
import location from "../assets/images/location.svg";

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

      <div className="container mx-auto">
        <div className="mt-5 text-center">
          <p className="text-gray-500">이미지 - 채팅 공간</p>
        </div>

        {/* 카드 슬라이드 */}
        <div className="mt-5 flex justify-center">
          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-300"
              style={{
                transform: `translateX(-${currentIndex * 500}px)`,
                width: `${recommendations.length * 500}px`,
              }}
            >
              {recommendations.map((farm) => (
                <div
                  key={farm.id}
                  className="flex-shrink-0"
                  style={{ width: "500px" }}
                >
                  <Card farm={farm} onClick={() => handleFarmClick(farm)} />
                </div>
              ))}
            </div>
          </div>

          {/* 이전 및 다음 버튼 */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 transform shadow"
          >
            <img src={prev} alt="Previous" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 transform"
          >
            <img src={next} alt="Next" />
          </button>
        </div>

        {/* 페이지 번호 */}
        <div className="mt-1 text-center">
          <p className="text-gray-500">
            {currentIndex + 1} / {recommendations.length}
          </p>
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
      </div>
    </>
  );
}

export default FarmListPage;

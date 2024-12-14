import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card";
import bot from "../assets/images/bot.svg";

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
      {/* 챗봇 */}
      <div className="flex mt-16 gap-2 px-3">
        <img src={bot} alt="Chat Bot" className="self-start" />
        <p className="bg-white px-3 py-2 rounded-b-3xl rounded-tr-3xl">애월에서 바다를 바라보며 일할 수 있는 로맨틱한 일자리 몇 가지를 준비했어요. 숙박도 제공되니 더 편하게 머무르실 수 있습니다!</p>
      </div>

      {/* 카드 슬라이드 */}
      <div className="mt-5 flex justify-center">
        <div className="relative w-80 overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${currentIndex * 320}px)`,
              width: `${recommendations.length * 320}px`,
            }}
          >
            {recommendations.map((farm) => (
              <div
                key={farm.id}
                className="flex-shrink-0"
                style={{ width: "320px" }}
              >
                <Card farm={farm} onClick={() => handleFarmClick(farm)} />
              </div>
            ))}
          </div>
        </div>
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
    </>
  );
}

export default FarmListPage;

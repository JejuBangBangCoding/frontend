import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card";
import AI from "../assets/images/ai.png";

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
    <div>
      <Header showProfile={true} showBackButton={true} />

      <div className="mt-10 mx-2 flex justify-center gap-2">
        <div className="flex h-full items-start">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffd68b]">
            <img src={AI} alt="AI" className="h-7 w-7" />
          </div>
        </div>
        <div className="w-[380px] rounded-b-xl rounded-e-xl bg-white border p-2 text-sm">
          <p className="text-sm">
            애월에서 바다를 바라보며 일할 수 있는 로맨틱한 일자리 몇 가지를 준비
            했어요. 숙박도 제공되니 더 편안하게 머무를 수 있습니다!
          </p>
        </div>
      </div>

      {/* 카드 슬라이드 */}
      <div className="flex justify-center">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${currentIndex * 360}px)`,
              width: `${recommendations.length * 500}px`,
            }}
          >
            {recommendations.map((farm) => (
              <div
                key={farm.id}
                className="flex-shrink-0"
                style={{ width: "360px" }}
              >
                <Card farm={farm} onClick={() => handleFarmClick(farm)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 이전 및 다음 버튼 / 페이지 번호 */}
      <div className="flex justify-center gap-3 items-center">
        <button
          onClick={handlePrev}
          className="rounded-full text-sm bg-gray-700 px-3 py-1 text-white hover:bg-[#FFA500]"
        >
          &lt;
        </button>
        <p className="text-gray-500 text-sm">
          {currentIndex + 1} / {recommendations.length}
        </p>
        <button
          onClick={handleNext}
          className="rounded-full text-sm bg-gray-700 px-3 py-1 text-white hover:bg-[#FFA500]"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default FarmListPage;

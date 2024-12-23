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

      <div className="mt-10 flex justify-center gap-3">
        <div className="flex h-full items-start">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ffd68b]">
            <img src={AI} alt="AI" className="h-8 w-8" />
          </div>
        </div>
        <div className="w-[380px] rounded-b-xl rounded-e-xl bg-[#FFDB99] p-2 text-sm">
          <p className="">
            애월에서 바다를 바라보며 일할 수 있는 로맨틱한 일자리 몇 가지를 준비
            했어요. 숙박도 제공되니 더 편안하게 머무를 수 있습니다!
          </p>
        </div>
      </div>

      {/* 카드 슬라이드 */}
      <div className="flex justify-center">
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
      </div>

      {/* 페이지 번호 */}
      <div className="text-center">
        <p className="text-gray-500">
          {currentIndex + 1} / {recommendations.length}
        </p>
      </div>

      {/* 이전 다음 버튼 */}
      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={handlePrev}
          className="rounded-full bg-gray-700 px-4 py-2 text-white hover:bg-[#FFA500]"
        >
          &lt; 이전
        </button>
        <button
          onClick={handleNext}
          className="rounded-full bg-gray-700 px-4 py-2 text-white hover:bg-[#FFA500]"
        >
          다음 &gt;
        </button>
      </div>
    </div>
  );
}

export default FarmListPage;

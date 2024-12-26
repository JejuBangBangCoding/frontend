import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Map from "../components/Map";
import RecruitmentList from "../components/RecruitmentList";
import questionMark from "../assets/images/questionMark.svg";
import bulb from "../assets/images/bulb.svg";
import hang from "../assets/images/hang.svg";

function MainPage() {
  const [user, setUser] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // 특정 지역 클릭 시 API 호출 핸들러
  const handleMapClick = async (regionName) => {
    setSelectedRegion(regionName);
  };

  const handleAiRecommendationClick = () => {
    navigate("/aipage");
  };

  const handleReservationClick = () => {
    navigate("/myreservationpage");
  };

  return (
    <>
      <div className="flex h-screen flex-col">
        <Header showProfile={true} showBackButton={false} />

        {/* 안내 문구 */}
        <div className="mt-4 flex flex-col items-center">
          <p className="text-[13px] font-[400]">어디를 여행하고 싶으신가요?</p>
          <div className="flex gap-1">
            <img
              src={questionMark}
              alt="Question Mark"
              className="w-[0.8rem]"
            />
            <p className="text-[9px] font-[300] text-[#9D9D9D]">
              지도를 선택하면 해당 지역의 모집 리스트를 볼 수 있어요!
            </p>
          </div>
        </div>

        {/* 지도 및 모집 리스트를 포함하는 메인 콘텐츠 영역 */}
        <div className="flex flex-1 flex-col">
          {/* 지도 */}
          <div className="flex-none">
            <Map onRegionClick={handleMapClick} />
          </div>

          {/* 모집 리스트 */}
          <div className="flex-1 overflow-hidden">
            <RecruitmentList selectedRegion={selectedRegion} />
          </div>

          {/* 버튼들 */}
          <div className="flex flex-none justify-center gap-3 border-x bg-white py-4 px-4">
            <button
              onClick={handleAiRecommendationClick}
              className="w-[5rem] flex-col justify-items-center rounded-lg bg-[#FFE9C1] py-1"
            >
              <img src={bulb} alt="Bulb" className="w-5" />
              <p className="text-xs font-medium text-[#FF800B]">AI 추천</p>
            </button>
            <button
              onClick={handleReservationClick}
              className="flex w-[24rem] items-center justify-center gap-2 rounded-lg bg-[#FFA500]"
            >
              <img src={hang} alt="Hang" className="w-5" />
              <p className="text-white text-lg">예약 정보 확인</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;

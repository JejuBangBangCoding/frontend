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
      {/* 헤더 */}
      <Header showProfile={true} showBackButton={false} />
      <div className="flex flex-col">
        {/* 안내 문구 */}
        <div className="mt-7 flex flex-col items-center">
          <p className="text-[17px] font-[400]">어디를 여행하고 싶으신가요?</p>
          <div className="flex gap-1">
            <img
              src={questionMark}
              alt="Question Mark"
              className="w-[0.8rem]"
            />
            <p className="text-[13px] font-[300] text-[#9D9D9D]">
              지도를 선택하면 해당 지역의 모집 리스트를 볼 수 있어요!
            </p>
          </div>
        </div>
        {/* 지도 */}
        <Map onRegionClick={handleMapClick} />
        {/* 모집 리스트 */}
        <RecruitmentList selectedRegion={selectedRegion} />
        {/* 버튼 */}
        <div className="flex justify-center items-center gap-4 bg-white p-5 border shadow bottom-0 fixed">
          {/* AI 추천 */}
          <div
            onClick={handleAiRecommendationClick}
            className="rounded-xl bg-[#FFE9C1] w-[5.5rem] flex-col justify-items-center py-1.5"
          >
            <img src={bulb} alt="Bulb" className="w-7" />
            <p className="text-sm font-bold text-[#FFA500]">AI 추천</p>
          </div>
          {/* 예약 정보 확인 */}
          <div
            onClick={handleReservationClick}
            className="rounded-xl bg-[#FFA500] w-[22rem] flex justify-center items-center gap-2 p-3"
          >
            <img src={hang} alt="Hang" className="w-6" />
            <p className="text-2xl font-medium text-white">예약 정보 확인</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;

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
        <div className="flex justify-center gap-5 my-7">
          {/* AI 추천 받기 */}
          <div
            onClick={handleAiRecommendationClick}
            className="box-border h-[7.5rem] w-[13.3rem] rounded-[1.5rem] bg-[#FFA500] p-3"
          >
            <div className="flex items-center justify-center gap-3 mt-2">
              <img src={bulb} alt="Bulb" className="w-[3rem]" />
              <p className="text-[1rem] font-normal text-white">
                선택하기
                <br />
                어렵다면?
              </p>
            </div>
            <p className="mt-1 flex justify-center text-[1.5rem] font-bold text-white">
              AI 추천 받기
            </p>
          </div>
          {/* 예약 정보 확인 */}
          <div
            onClick={handleReservationClick}
            className="box-border h-[7.5rem] w-[13.3rem] rounded-[1.5rem] bg-[#FFA500] p-3"
          >
            <div className="flex items-center justify-center gap-3 mt-2">
              <img src={hang} alt="Hang" className="w-[3rem]" />
              <p className="text-[1rem] font-normal text-white">
                어느 곳에
                <br />
                가시나요?
              </p>
            </div>
            <p className="mt-1 flex justify-center text-[1.5rem] font-bold text-white">
              예약 정보 확인
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Map from "../components/Map";
import axios from "axios";
import questionMark from "../assets/images/questionMark.svg";

import list from "../assets/images/list.svg";
import rightArrow1 from "../assets/images/rightArrow1.svg";
import list1 from "../assets/images/list1.svg";
import star from "../assets/images/star.svg"; // 이거 혹시 코드에서 사라졌나요..?
import list2 from "../assets/images/list2.svg";
import list3 from "../assets/images/list3.svg";
import bulb from "../assets/images/bulb.svg";
import hang from "../assets/images/hang.svg";

function MainPage() {
  const [user, setUser] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/board/location/`,
        {
          params: { location: regionName },
        },
      );
      setFarms(response.data);
    } catch (err) {
      console.error("지역 농장 정보를 불러오는 중 오류가 발생했습니다:", err);
      setError("지역 농장 정보를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
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
      <Header showProfile={true} />

      {/* 안내 문구 (시작)*/}
      <div className="mt-5 flex flex-col items-center">
        <p className="text-[17px] font-[400]">어디를 여행하고 싶으신가요?</p>
        <div className="flex gap-1">
          <img src={questionMark} alt="Question Mark" className="w-[0.8rem]" />
          <p className="text-[13px] font-[300] text-[#9D9D9D]">
            지도를 선택하면 해당 지역의 모집 리스트를 볼 수 있어요!
          </p>
        </div>
      </div>
      {/* 안내 문구 (끝)*/}

      {/* 지도 */}
      <Map onRegionClick={handleMapClick} />

      {/* 모집 리스트 */}
      <div className="m-7 mt-auto box-border h-[20rem] w-auto rounded-3xl bg-white p-4">
        {/* 모집 리스트 - 헤더 (시작) */}
        <div className="flex border-b-[0.1rem] pb-3">
          <img src={list} alt="List" className="mr-3 w-[1rem]" />
          <p className="font-medium">모집 리스트</p>
          <img
            src={rightArrow1}
            alt="Right Arrow1"
            className="mx-2 w-[0.8rem]"
          />
          <p className="font-semibold">전체</p>
        </div>
        {/* 모집 리스트 - 헤더 (끝) */}

        {/* 모집 리스트 - 내용 (시작) */}
        <div className="h-[16rem] overflow-y-auto">
          {loading && <p className="text-center text-gray-500">로딩 중...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && farms.length === 0 && (
            <p className="text-center text-gray-500">지역을 선택해주세요.</p>
          )}
          {farms.map((farm, index) => (
            <div key={farm.id} className="my-4 flex cursor-pointer bg-red-200">
              <img
                src={farm.image_url || list1}
                alt={`List ${index + 1}`}
                className="mr-4 w-[3.5rem]"
              />
              <div className="">
                <div className="flex items-center gap-2">
                  <p className="text-[0.9rem] font-bold">{farm.title}</p>
                </div>
                <p className="mb-[0.2rem] text-[0.8rem] font-thin">
                  {farm.location}
                </p>
              </div>
              <div className="flex flex-col items-end justify-end text-[0.7rem]">
                <p className="font-medium">농장 이름: {farm.farm_name}</p>
              </div>
            </div>
          ))}
        </div>
        {/* 모집 리스트 - 내용 (끝) */}
      </div>
      {/* 모집 리스트 (끝) */}

      {/* 버튼 (시작)*/}
      {/* 버튼 (시작)*/}
      <div className="mb-5 flex justify-center gap-5">
        {/* 버튼 - 왼쪽 (AI 추천 받기) */}
        <div
          onClick={handleAiRecommendationClick}
          className="box-border h-auto w-[10rem] cursor-pointer rounded-[1.875rem] bg-[#FFA500] p-5"
        >
          <div className="flex items-center justify-center gap-3">
            <img src={bulb} alt="Bulb" className="w-[2.5rem]" />
            <p className="text-[0.7rem] font-normal text-white">
              선택하기
              <br />
              어렵다면?
            </p>
          </div>
          <p className="mt-2 flex justify-center text-[1.2rem] font-bold text-white">
            AI 추천 받기
          </p>
        </div>
        {/* 버튼 - 왼쪽 (끝) */}

        {/* 버튼 - 오른쪽 (시작) */}
        <div
          onClick={handleReservationClick}
          className="box-border h-auto w-[10rem] cursor-pointer rounded-[1.875rem] bg-[#FFA500] p-5"
        >
          <div className="flex items-center justify-center gap-3">
            <img src={hang} alt="Hang" className="w-[2.5rem]" />
            <p className="text-[0.7rem] font-normal text-white">
              어느 곳에
              <br />
              가시나요?
            </p>
          </div>
          <p className="mt-2 flex justify-center text-[1.2rem] font-bold text-white">
            예약 정보 확인
          </p>
        </div>
        {/* 버튼 - 오른쪽 (끝) */}
      </div>
      {/* 버튼 (끝) */}
    </>
  );
}

export default MainPage;

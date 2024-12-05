import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import norangMohagen from "../assets/images/norangMohagen.svg";
import userProfile from "../assets/images/userProfile.svg";
import questionMark from "../assets/images/questionMark.svg";
import userProfilePlaceholder from "../assets/images/userProfile.svg";
import map1 from "../assets/images/map1.svg";
import map2 from "../assets/images/map2.svg";
import map3 from "../assets/images/map3.svg";
import map4 from "../assets/images/map4.svg";
import map5 from "../assets/images/map5.svg";
import map6 from "../assets/images/map6.svg";
import map7 from "../assets/images/map7.svg";
import map8 from "../assets/images/map8.svg";
import map9 from "../assets/images/map9.svg";
import map10 from "../assets/images/map10.svg";
import map11 from "../assets/images/map11.svg";
import map12 from "../assets/images/map12.svg";
import map13 from "../assets/images/map13.svg";
import list from "../assets/images/list.svg";
import rightArrow1 from "../assets/images/rightArrow1.svg";
import list1 from "../assets/images/list1.svg";
import star from "../assets/images/star.svg";
import list2 from "../assets/images/list2.svg";
import list3 from "../assets/images/list3.svg";
import bulb from "../assets/images/bulb.svg";
import hang from "../assets/images/hang.svg";

function MainPage() {
  const [user, setUser] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null); // 선택된 지역 이름 상태 추가
  const [farms, setFarms] = useState([]); // API에서 가져온 농장 리스트 상태 추가
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보를 가져옴
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // 로그인 정보가 없으면 로그인 페이지로 이동
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
        "http://52.78.130.126:8000/api/board/location/",
        {
          params: { location: regionName },
        },
      );
      setFarms(response.data); // 응답 데이터를 farms 상태로 설정
    } catch (err) {
      console.error("지역 농장 정보를 불러오는 중 오류가 발생했습니다:", err);
      setError("지역 농장 정보를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleAiRecommendationClick = () => {
    navigate("/aipage"); // AI 추천 페이지로 이동
  };

  const handleReservationClick = () => {
    navigate("/myreservationpage");
  };

  return (
    <>
      {/* 헤더 (시작) */}
      <div className="mb-5 mt-6 flex justify-between">
        <img
          src={norangMohagen}
          alt="norangMohagen"
          className="ml-7 w-[6rem]"
        />
        <img
          src={user?.profileImage || userProfilePlaceholder}
          alt="User Profile"
          className="mr-7 w-[2.5rem] rounded-full"
        />
      </div>
      {/* 헤더 (끝)*/}

      {/* 안내 문구 (시작)*/}
      <p className="self-center text-[0.7rem]">어디를 여행하고 싶으신가요?</p>
      <div className="flex justify-center gap-1">
        <img src={questionMark} alt="Question Mark" className="w-[0.8rem]" />
        <p className="text-[0.6rem] text-[#9D9D9D]">
          지도를 선택하면 해당 지역의 모집 리스트를 볼 수 있어요!
        </p>
      </div>
      {/* 안내 문구 (끝)*/}

      {/* 지도 (시작) */}
      <div className="relative my-2 flex">
        <img
          src={map1}
          alt="한경면"
          className="absolute left-[2.5rem] top-24 w-[3rem]"
        />
        <p className="absolute left-[2.9rem] top-[7.1rem] cursor-pointer text-[0.675rem] font-thin">
          한경면
        </p>
        <img
          src={map2}
          alt="한림읍"
          className="absolute left-[4rem] top-[4.3rem] w-[4rem]"
        />
        <p className="absolute left-[4.8rem] top-[5.7rem] cursor-pointer text-[0.675rem] font-thin">
          한림읍
        </p>
        <img
          src={map3}
          alt="애월읍"
          onClick={() => handleMapClick("애월읍")}
          className="absolute left-[5.8rem] top-[2.5rem] w-[6rem] bg-slate-300"
        />
        <p className="absolute left-[7.5rem] top-[4.4rem] cursor-pointer text-[0.675rem] font-thin">
          애월읍
        </p>
        <img
          src={map4}
          alt="제주시"
          className="absolute left-[9.2rem] top-5 w-[5rem] bg-red-200"
        />
        <p className="absolute left-[11rem] top-[3rem] cursor-pointer text-[0.675rem] font-thin">
          제주시
        </p>
        <img
          src={map5}
          alt="조천읍"
          className="absolute left-[13.4rem] top-[0.5rem] w-[3.5rem]"
        />
        <p className="absolute left-[14.6rem] top-[2.5rem] cursor-pointer text-[0.675rem] font-thin">
          조천읍
        </p>
        <img
          src={map6}
          alt="구좌읍"
          className="absolute left-[16.5rem] top-1 w-[5.5rem]"
        />
        <p className="absolute left-[18rem] top-[1.8rem] cursor-pointer text-[0.675rem] font-thin">
          구좌읍
        </p>
        <img
          src={map7}
          alt="대정읍"
          className="absolute left-[2.1rem] top-[8.6rem] w-[3.1rem]"
        />
        <p className="absolute left-[3rem] top-[9.3rem] cursor-pointer text-[0.675rem] font-thin">
          대정읍
        </p>
        <img
          src={map8}
          alt="안덕면"
          className="absolute left-[5.5rem] top-[7.4rem] w-[3.1rem]"
        />
        <p className="absolute left-[5.6rem] top-[8.4rem] cursor-pointer text-[0.675rem] font-thin">
          안덕면
        </p>
        <img
          src={map9}
          alt="중문"
          className="absolute left-32 top-[7rem] w-[4rem]"
        />
        <p className="absolute left-[9.9rem] top-[8.4rem] cursor-pointer text-[0.675rem] font-thin">
          중문
        </p>
        <img
          src={map10}
          alt="서귀포시"
          className="absolute left-[12.2rem] top-[6.5rem] w-[2.3rem]"
        />
        <p className="absolute left-[12.4rem] top-[8.2rem] cursor-pointer text-[0.55rem] font-thin">
          서귀포시
        </p>
        <img
          src={map11}
          alt="남원읍"
          className="absolute left-[13.5rem] top-[5.8rem] w-[4rem]"
        />
        <p className="absolute left-[15rem] top-[7.1rem] cursor-pointer text-[0.675rem] font-extralight">
          남원읍
        </p>
        <img
          src={map12}
          alt="표선면"
          className="absolute left-[15.8rem] top-[4.5rem] w-[4rem]"
        />
        <p className="absolute left-[17.2rem] top-[6rem] cursor-pointer text-[0.5rem] font-extralight">
          표선면
        </p>
        <img
          src={map13}
          alt="성산읍"
          className="absolute left-[19rem] top-[3.1rem] w-[4rem]"
        />
        <p className="absolute left-[19.7rem] top-[4.6rem] cursor-pointer text-[0.675rem] font-extralight">
          성산읍
        </p>
      </div>
      {/* 지도 (끝) */}

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
            <div key={farm.id} className="my-4 flex cursor-pointer">
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
                {/* 매칭 점수나 별점을 추가할 수 있는 부분 */}
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

import React from "react";
import { useNavigate } from "react-router-dom";
import norangMohagen from "../assets/images/norangMohagen.svg";
import userProfile from "../assets/images/userProfile.svg";
import questionMark from "../assets/images/questionMark.svg";
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
  const navigate = useNavigate();

  const regions = [
    { id: 1, name: "한경면", farms: "한경면 농장 정보" },
    { id: 2, name: "한림읍", farms: "한림읍 농장 정보" },
    { id: 3, name: "애월읍", farms: "애월읍 농장 정보" },
    { id: 4, name: "제주시", farms: "애월 농장 정보" },
    { id: 5, name: "조천읍", farms: "애월읍 농장 정보" },
    { id: 6, name: "구좌읍", farms: "한경면 농장 정보" },
    { id: 7, name: "대정읍", farms: "한림읍 농장 정보" },
    { id: 8, name: "안덕면", farms: "애월 농장 정보" },
    { id: 9, name: "중문", farms: "애월읍 농장 정보" },
    { id: 10, name: "서귀포시", farms: "한경면 농장 정보" },
    { id: 11, name: "남원읍", farms: "한림읍 농장 정보" },
    { id: 12, name: "표선면", farms: "애월 농장 정보" },
    { id: 13, name: "성산읍", farms: "성산읍 농장 정보" },
  ];

  const handleRegionClick = (region) => {
    navigate("/aipage", { state: { region } });
  };

  return (
    <>
      {/* <h1 className="text-4xl font-bold text-green-600">Main</h1>
      <div className="mt-6 space-y-4">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => handleRegionClick(region)}
            className="w-full rounded bg-blue-500 px-4 py-2 text-white"
          >
            {region.name}
          </button>
        ))}
      </div> */}
      {/* 헤더 (시작)*/}
      <div className="flex justify-between mt-6 mb-5">
      <img src={norangMohagen} alt="norangMohagen" className="w-[6rem] ml-7" />
      <img src={userProfile} alt="User Profile" className="w-[2.5rem] mr-7" />
      </div>
      {/* 헤더 (끝)*/}
      
      {/* 안내 문구 (시작)*/}
        <p className="self-center text-[0.7rem]">어디를 여행하고 싶으신가요?</p>
          <div className="flex justify-center gap-1">
            <img src={questionMark} alt="Question Mark" className="w-[0.8rem]" />
            <p className="text-[#9D9D9D] text-[0.6rem]">지도를 선택하면 해당 지역의 모집 리스트를 볼 수 있어요!</p>
          </div>
      {/* 안내 문구 (끝)*/}

      {/* 지도 (시작) */}
      <div className="flex relative my-2">
          <img src={map1} alt="한경면" className="w-[3rem] absolute left-[2.5rem] top-24" />
          <p className="font-thin text-[0.675rem] absolute left-[2.9rem] top-[7.1rem]">한경면</p>
          <img src={map2} alt="한림읍" className="w-[4rem] absolute left-[4rem] top-[4.3rem]" /><p className="font-thin text-[0.675rem] absolute left-[4.8rem] top-[5.7rem]">한림읍</p>
          <img src={map3} alt="애월읍" className="w-[6rem] absolute left-[5.8rem] top-[2.5rem]" /><p className="font-thin text-[0.675rem] absolute left-[7.5rem] top-[4.4rem]">애월읍</p>
          <img src={map4} alt="제주시" className="w-[5rem] absolute left-[9.2rem] top-5" />
          <p className="font-thin text-[0.675rem] absolute left-[11rem] top-[3rem]">제주시</p>
          <img src={map5} alt="조천읍" className="w-[3.5rem] absolute left-[13.4rem] top-[0.5rem]" />
          <p className="font-thin text-[0.675rem] absolute left-[14.6rem] top-[2.5rem]">조천읍</p>
          <img src={map6} alt="구좌읍" className="w-[5.5rem] absolute left-[16.5rem] top-1" />
          <p className="font-thin text-[0.675rem] absolute left-[18rem] top-[1.8rem]">구좌읍</p>
          <img src={map7} alt="대정읍" className="w-[3.1rem] absolute left-[2.1rem] top-[8.6rem]" />
          <p className="font-thin text-[0.675rem] absolute left-[3rem] top-[9.3rem]">대정읍</p>
          <img src={map8} alt="안덕면" className="w-[3.1rem] absolute left-[5.5rem] top-[7.4rem]" />
          <p className="font-thin text-[0.675rem] absolute left-[5.6rem] top-[8.4rem]">안덕면</p>
          <img src={map9} alt="중문" className="w-[4rem] absolute left-32 top-[7rem]" />
          <p className="font-thin text-[0.675rem] absolute left-[9.9rem] top-[8.4rem]">중문</p>
          <img src={map10} alt="서귀포시" className="w-[2.3rem] absolute left-[12.2rem] top-[6.5rem]" />
          <p className="font-thin text-[0.55rem] absolute left-[12.4rem] top-[8.2rem]">서귀포시</p>
          <img src={map11} alt="남원읍" className="w-[4rem] absolute left-[13.5rem] top-[5.8rem]" />
          <p className="font-extralight text-[0.675rem] absolute left-[15rem] top-[7.1rem]">남원읍</p>
          <img src={map12} alt="표선면" className="w-[4rem] absolute left-[15.8rem] top-[4.5rem]" />
          <p className="font-extralight text-[0.5rem] absolute left-[17.2rem] top-[6rem]">표선면</p>
          <img src={map13} alt="성산읍" className="w-[4rem] absolute left-[19rem] top-[3.1rem]" />
          <p className="font-extralight text-[0.675rem] absolute left-[19.7rem] top-[4.6rem]">성산읍</p>
      </div>
      {/* 지도 (끝) */}

      {/* 모집 리스트 */}
        <div className="mt-auto box-border h-auto w-auto p-4 m-7 bg-white rounded-3xl">

        {/* 모집 리스트 - 헤더 (시작) */}
        <div className="flex border-b-[0.1rem] pb-3">
          <img src={list} alt="List" className="w-[1rem] mr-3" />
          <p className="font-medium">모집 리스트</p>
          <img src={rightArrow1} alt="Right Arrow1" className="w-[0.8rem] mx-2" />
          <p className="font-semibold">전체</p>
        </div>
        {/* 모집 리스트 - 헤더 (끝) */}

        {/* 모집 리스트 - 내용 (시작)) */}
          {/* 모집 리스트 - 농장 1 (시작) */}
          <div className="flex my-4">
            <img src={list1} alt="List 1" className="mr-3 w-[3.5rem]" />
            {/* 모집 리스트 - 농장 1 - 가운데 (시작) */}
            <div className="">
              <div className="flex gap-2 items-center">
                <p className="font-bold text-[0.9rem]">귤 따기 알바 구해유</p>
                <p className="border-[0.09rem] text-[0.7rem] p-1 border-[#FFA500] rounded-lg">숙식제공</p>
              </div>
              <p className="font-thin text-[0.8rem]">애월읍 귤동 123</p>
              <div className="flex gap-[0.15rem]">
                <img src={star} alt="Star" className="w-[0.8rem]" />
                <p className="font-thin text-[0.7rem]">4.9</p>
            </div>
            {/* 모집 리스트 - 농장 1 - 가운데 (끝) */}

            {/* 모집 리스트 - 농장 1 - 오른쪽 (시작) */}
            </div>
            <div className="flex flex-col justify-end items-end text-[0.7rem]">
              <p className="font-medium">시급 99억</p>
              <p className="font-light">11/18 - 11/20</p>
            </div>
            {/* 모집 리스트 - 농장 1 - 오른쪽 (끝) */}
          </div>
          {/* 모집 리스트 - 농장 1 (끝) */}

          {/* 모집 리스트 - 농장 2 (시작) */}
          <div className="flex my-4">
            <img src={list2} alt="List 2" className="mr-3 w-[3.5rem]" />
            {/* 모집 리스트 - 농장 2 - 가운데 (시작) */}
            <div className="">
              <div className="flex gap-2 items-center">
                <p className="font-bold text-[0.9rem]">당근 밭에서 일할 청년</p>
                <p className="border-[0.09rem] text-[0.7rem] p-1 border-[#FFA500] rounded-lg">숙소제공</p>
              </div>
              <p className="font-thin text-[0.8rem]">애월읍 당근로 123</p>
              <div className="flex gap-[0.15rem]">
                <img src={star} alt="Star" className="w-[0.8rem]" />
                <p className="font-thin text-[0.7rem]">4.7</p>
            </div>
            {/* 모집 리스트 - 농장 2 - 가운데 (끝) */}

            {/* 모집 리스트 - 농장 2 - 오른쪽 (시작) */}
            </div>
            <div className="flex flex-col justify-end items-end text-[0.7rem]">
              <p className="font-medium">시급 1억</p>
              <p className="font-light">날짜 협의</p>
            </div>
            {/* 모집 리스트 - 농장 2 - 오른쪽 (끝) */}
          </div>
          {/* 모집 리스트 - 농장 2 (끝) */}

          {/* 모집 리스트 - 농장 3 (시작) */}
          <div className="flex my-4">
            <img src={list3} alt="List 3" className="mr-3 w-[3.5rem]" />
            {/* 모집 리스트 - 농장 3 - 가운데 (시작) */}
            <div className="">
              <div className="flex gap-2 items-center">
                <p className="font-bold text-[0.9rem]">밭 관리 하실 분</p>
                <p className="border-[0.09rem] text-[0.7rem] p-1 border-[#FFA500] rounded-lg">식사제공</p>
              </div>
              <p className="font-thin text-[0.8rem]">제주시 애월읍 밭길 123</p>
              <div className="flex gap-[0.15rem]">
                <img src={star} alt="Star" className="w-[0.8rem]" />
                <p className="font-thin text-[0.7rem]">4.5</p>
            </div>
            {/* 모집 리스트 - 농장 3 - 가운데 (끝) */}

            {/* 모집 리스트 - 농장 3 - 오른쪽 (시작) */}
            </div>
            <div className="flex flex-col justify-end items-end text-[0.7rem] ">
              <p className="font-medium">시급 협의</p>
              <p className="font-light">11/18 - 11/20</p>
            </div>
            {/* 모집 리스트 - 농장 3 - 오른쪽 (끝) */}
          </div>
          {/* 모집 리스트 - 농장 3 (끝) */}
        {/* 모집 리스트 - 내용 (끝)) */}
      </div>
      {/* 모집 리스트 (끝)) */}

      {/* 버튼 (시작)*/}
      <div className="flex mb-5 justify-center gap-5">

        {/* 버튼 - 왼쪽 (시작)) */}
        <div className="box-border h-auto w-[10rem] p-5 bg-[#FFA500] rounded-[1.875rem]">
          <div className="flex justify-center items-center gap-3">
            <img src={bulb} alt="Bulb" className="w-[2.5rem]" />
            <p className="text-white text-[0.7rem] font-normal">선택하기<br />어렵다면?</p>
          </div>
            <p className="flex justify-center text-white font-bold text-[1.2rem] mt-2">AI 추천 받기</p>
        </div>
        {/* 버튼 - 왼쪽 (끝)) */}

        {/* 버튼 - 오른쪽 (시작) */}
        <div className="box-border h-auto w-[10rem] p-5 bg-[#FFA500] rounded-[1.875rem]">
          <div className="flex justify-center items-center gap-4">
            <img src={hang} alt="Hang" className="w-[2.5rem]" />
            <p className="text-white text-[0.7rem] font-normal">어느 곳에<br />가시나요?</p>
          </div>
            <p className="flex justify-center text-white font-bold text-[1.2rem] mt-2">예약 정보 확인</p>
        </div>
        {/* 버튼 - 오른쪽 (끝) */}

      </div>
      {/* 버튼 (끝) */}
    </>
  );
}

export default MainPage;

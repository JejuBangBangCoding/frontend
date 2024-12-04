import React from "react";
import { useNavigate } from "react-router-dom";
import leftArrow1 from "../assets/images/leftArrow1.svg";
import textLogo from "../assets/images/textLogo.svg";
import backImg from "../assets/images/backImg.svg";
import userProfile from "../assets/images/userProfile.svg";
import list from "../assets/images/list.svg";

function MyReservationPage() {
  const navigate = useNavigate();

  const reservation = [
    { id: 1, title: "귤 따기 알바 구해유", name: "재형이네 귤하우스", location: "애월읍 귤동 123", date: "11/18 ~ 11/20" },
    { id: 2, title: "당근 밭에서 일할 청년", name: "지혁이네 당근밭", location: "애월읍 당근로 123", date: "11/20 ~ 11/22" },
    { id: 3, title: "밭 관리 하실 분", name: "재준이네 밭꾸미기", location: "애월읍 밭길 123", date: "11/25 ~ 11/30" },
    { id: 4, title: "귤 따끼 알바 구해유", name: "민수네 귤하우스", location: "애월읍 귤동 123", date: "11/18 ~ 11/20" }
  ];

  const handleReservationClick = (reservationItem) => {
    navigate("/detailedreservationpage", {
      state: { reservation: reservationItem },
    });
  };

  return (
    <>
    {/* 헤더 (시작) */}
    <div className="flex justify-center my-6 items-center relative">
      <img src={leftArrow1} alt="Left Arrow" className="w-[1.2rem] cursor-pointer absolute left-4" />
      <img src={textLogo} alt="Text logo" className="w-[6rem]" />
    </div>
    {/* 헤더 (끝) */}

    {/* 사용자 프로필 (시작) */}
    <div className="flex flex-col items-center">
      <img src={backImg} alt="" className="relative" />
        <img src={userProfile} alt="" className="w-[8rem] absolute top-32" />
        <p className="absolute font-semibold text-xl top-64">김재형</p>
    </div>
    {/* 사용자 프로필 (끝) */}

    <p className="self-center mt-auto mb-2 font-normal text-xs text-[#C4C4C4]">각 항목을 누르시면 상세 조회를 하실 수 있습니다.</p>

    {/* 예약 현황 (시작) */}
    <div className="mx-5 h-[32.5rem] bg-white rounded-t-3xl p-5">

      {/* 예약 현황 - 헤더 (시작) */}
      <div className="flex items-center mb-4">
        <img src={list} alt="List" className="w-[1rem] mr-3" />
        <p className="font-normal text-sm">예약 현황</p>
        <p className="ml-auto text-sm">전체 <strong>2</strong> 개</p>
      </div>
      {/* 예약 현황 - 헤더 (끝) */}

      {/* 예약 현황 - 리스트 (시작) */}
      {reservation.map((item) => (
        <div
        key={item.id}
        className="mb-4 cursor-pointer rounded-3xl bg-[#FFDB99] p-4 shadow flex"
        onClick={() => handleReservationClick(item)}
        >
          <p className="text-sm font-bold text-[#FFF]">{item.id}</p>
          <div className="">
            <p className="text-lg font-bold">{item.title}</p>
            <p className="text-base font-light">{item.name}</p>
            <p className="">{item.location}</p>
          </div>
          <p className="font-normal text-[0.6rem]">{item.date}</p>
        </div>
      ))}
      {/* 예약 현황 - 리스트 (끝) */}
    </div>
    {/* 예약 현황 (끝) */}
    </>
  );
}

export default MyReservationPage;

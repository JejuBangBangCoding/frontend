import React from "react";
import { useNavigate } from "react-router-dom";
import leftArrow1 from "../assets/images/leftArrow1.svg";
import textLogo from "../assets/images/textLogo.svg";
import backImg from "../assets/images/backImg.svg";
import userProfile from "../assets/images/userProfile.svg";
import list from "../assets/images/list.svg";
import location from "../assets/images/location.svg";
import list1 from "../assets/images/list1.svg";
import list2 from "../assets/images/list2.svg";
import list3 from "../assets/images/list3.svg";

function MyReservationPage() {
  const navigate = useNavigate();

  const reservation = [
    { id: 1, image_url: "", title: "귤 따기 알바 구해유", farm_name: "재형이네 귤하우스", location: "애월읍 귤동 123", date: "11/10", period_start: "11/18", period_end: "11/20"},
    { id: 2, image_url: "", title: "귤 따기 알바 구해유", farm_name: "재형이네 귤하우스", location: "애월읍 귤동 123", date: "11/10", period_start: "11/18", period_end: "11/20"},
    { id: 3, image_url: "", title: "귤 따기 알바 구해유", farm_name: "재형이네 귤하우스", location: "애월읍 귤동 123", date: "11/10", period_start: "11/18", period_end: "11/20"},
    { id: 4, image_url: "", title: "귤 따기 알바 구해유", farm_name: "재형이네 귤하우스", location: "애월읍 귤동 123", date: "11/10", period_start: "11/18", period_end: "11/20"},
    { id: 5, image_url: "", title: "귤 따기 알바 구해유", farm_name: "재형이네 귤하우스", location: "애월읍 귤동 123", date: "11/10", period_start: "11/18", period_end: "11/20"},
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
      <img
        src={leftArrow1}
        alt="Left Arrow"
        className="w-[1.2rem] cursor-pointer absolute left-4"
        onClick={() => navigate("/mainpage")}
        />
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
        <p className="ml-auto text-sm">전체 <strong>{reservation.length}</strong> 개</p>
      </div>
      {/* 예약 현황 - 헤더 (끝) */}

      {/* 예약 현황 - 리스트 (시작) */}
      <div className="h-[29rem] overflow-y-auto">
        {reservation.map((item) => (
          <div
          key={item.id}
          className="mb-4 cursor-pointer rounded-3xl bg-[#FFDB99] p-4 shadow flex"
          onClick={() => handleReservationClick(item)}
          >
            {/* 왼쪽 (시작) */}
            <div className="flex relative ml-3 mr-3">
              <p className="self-center px-[0.7rem] py-[0.2rem] text-base font-normal border-2 rounded-full border-[#FFA500] bg-white absolute left-[-1rem]">{item.id}</p>
              <img src={list1} alt="" className="" />
            </div>
            {/* 왼쪽 (끝) */}

            {/* 중간 (시작) */}
            <div className="flex flex-col basis-1/2 justify-center gap-1">
              <p className="text-sm font-bold">{item.title}</p>
              <p className="text-xs font-light">{item.farm_name}</p>
              <div className="flex">
                <img src={location} alt="Location" className="mr-1" />
                <p className="text-xs">{item.location}</p>
              </div>
            </div>
            {/* 중간 (끝) */}

            {/* 오른쪽 (시작) */}
            <div className="flex flex-col justify-between items-end basis-1/3">
              <p className="font-bold text-[0.8rem]">{item.date}</p>
              <p className="font-normal text-[0.6rem]">{item.period_start} ~ {item.period_end}</p>
            </div>
            {/* 오른쪽 (끝) */}
          </div>
        ))}
      </div>
      {/* 예약 현황 - 리스트 (끝) */}
    </div>
    {/* 예약 현황 (끝) */}
    </>
  );
}

export default MyReservationPage;

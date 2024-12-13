import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import check from "../assets/images/check.svg";
import character from "../assets/images/character.svg";
import money from "../assets/images/money.svg";
import calendar from "../assets/images/calendar.svg";
import clock from "../assets/images/clock.svg";
import hourGlass from "../assets/images/hourGlass.svg";

function FixReservationPage() {
  const location = useLocation();
  const { farm } = location.state || {};
  const navigate = useNavigate();

  const handleMainHomeClick = () => {
    navigate("/mainpage");
  };

  const handleCheckReservationClick = () => {
    navigate("/myreservationpage");
  };

  return (
    <div className="p-5 pb-24"> 
      {/* 헤더 */}
      <Header showProfile={true} showBackButton={false} />
      {/* 예약 확정 메시지 */}
      <div className="flex-col justify-items-center mt-14">
        <img src={check} alt="Check" className="w-10" />
        <h2 className="text-3xl font-semibold mt-3">예약이 확정되었습니다!</h2>
        <h3 className="text-xl mt-3">예약 번호 : 12340</h3>
        <img src={character} alt="" className="mt-5" />
      </div>

      {/* 예약한 곳 핵심 정보 */}
      <div className="flex-col justify-items-center my-40">
        <div className="flex items-center">
          <img src={money} alt="Money" className="mr-2" />
          <p className="">시급 99억</p>
        </div>
        <div className="flex items-center">
          <img src={calendar} alt="Calendar" className="my-3 mr-2" />
          <p className="">월,화,수,목,금,토,일</p>
        </div>
        <div className="flex">
          <img src={clock} alt="Clock" className="mb-3 mr-2" />
          <p className="">00:00 ~ 24:00</p>
        </div>
        <div className="flex items-center">
          <img src={hourGlass} alt="Hour Glass" className="mr-2" />
          <p className="">상시모집</p>
        </div>
      </div>

      {/* 버튼 */}
      <div className="fixed bottom-5 left-0 right-0">
        <div className="max-w-screen-sm mx-auto px-24">
          <div className="flex justify-between gap-4">
            <button
              onClick={handleMainHomeClick}
              className="w-full rounded-lg bg-[#D9D9D9] px-6 py-3"
            >
              메인으로
            </button>
            <button
              onClick={handleCheckReservationClick}
              className="w-full rounded-lg bg-[#FFA500] px-6 py-3 text-white"
            >
              예약 정보 확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FixReservationPage;

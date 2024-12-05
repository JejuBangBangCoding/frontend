import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
    <div className="p-5">
      <h1 className="text-4xl font-bold text-blue-600">FixReservationPage</h1>
      {farm && (
        <div className="mt-5 rounded bg-white p-5 shadow">
          <h2 className="mb-3 text-3xl font-semibold">{farm.farm_name}</h2>
          <p className="text-lg">예약이 확정되었습니다!</p>
        </div>
      )}
      <div className="mt-6 flex justify-between gap-4">
        <button
          onClick={handleMainHomeClick}
          className="w-full rounded bg-gray-500 px-6 py-3 text-white"
        >
          메인 홈
        </button>
        <button
          onClick={handleCheckReservationClick}
          className="w-full rounded bg-blue-500 px-6 py-3 text-white"
        >
          예약 정보 확인
        </button>
      </div>
    </div>
  );
}

export default FixReservationPage;

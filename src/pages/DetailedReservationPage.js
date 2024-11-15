import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function DetailedReservationPage() {
  const location = useLocation();
  const { reservation } = location.state || {};
  const navigate = useNavigate();

  const handleMainPageClick = () => {
    navigate("/mainpage");
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-pink-600">
        DetailedReservationPage
      </h1>
      {reservation && (
        <div className="mt-5 rounded bg-white p-5 shadow">
          <h2 className="mb-3 text-3xl font-semibold">{reservation.name}</h2>
          <p className="text-lg">예약 날짜: {reservation.date}</p>
        </div>
      )}
      <button
        onClick={handleMainPageClick}
        className="mt-6 rounded bg-blue-500 px-6 py-3 text-white"
      >
        메인 페이지로 이동
      </button>
    </div>
  );
}

export default DetailedReservationPage;

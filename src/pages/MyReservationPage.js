import React from "react";
import { useNavigate } from "react-router-dom";

function MyReservationPage() {
  const navigate = useNavigate();

  const reservation = [
    { id: 1, name: "길동이네 귤 밭", date: "12월 25일 금" },
    { id: 2, name: "철수네 당근 밭", date: "10월 10일 목" },
  ];

  const handleReservationClick = (reservationItem) => {
    navigate("/detailedreservationpage", {
      state: { reservation: reservationItem },
    });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-blue-600">MyReservationPage</h1>
      <div className="bg-yellow-200 p-5">
        {reservation.map((item) => (
          <div
            key={item.id}
            className="mb-4 cursor-pointer rounded bg-white p-4 shadow"
            onClick={() => handleReservationClick(item)}
          >
            <h2 className="text-2xl font-semibold">{item.name}</h2>
            <p className="text-lg">예약 날짜: {item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyReservationPage;

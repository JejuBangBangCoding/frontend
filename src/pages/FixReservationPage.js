import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function FixReservationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userID, BoardID } = location.state || {};

  const [reservationStatus, setReservationStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userID || !BoardID) {
      setError("예약 정보를 찾을 수 없습니다.");
      return;
    }

    const createReservation = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/reservation/`,
          { userID, BoardID },
          {
            headers: { "Content-Type": "application/json" },
          },
        );
        setReservationStatus("예약이 성공적으로 완료되었습니다.");
        console.log("예약 생성 응답:", response.data);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("예약 생성 중 오류가 발생했습니다.");
        }
        console.error("예약 생성 중 오류가 발생했습니다:", err);
      }
    };

    createReservation();
  }, [userID, BoardID]);

  return (
    <div className="p-5">
      {error && <p className="mb-4 text-center text-red-600">{error}</p>}

      <h1 className="text-4xl font-bold text-blue-600">FixReservationPage</h1>

      {reservationStatus ? (
        <p className="mt-5 text-center text-green-600">{reservationStatus}</p>
      ) : !error ? (
        <p className="text-center text-gray-600">예약 생성 중...</p>
      ) : null}

      <button
        onClick={() => navigate("/mainpage")}
        className="mt-5 w-full rounded bg-gray-500 px-6 py-3 text-white"
      >
        메인 홈으로 이동
      </button>
    </div>
  );
}

export default FixReservationPage;

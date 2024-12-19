import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

function FixReservationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { reservation, userID, board_id } = location.state || {};

  const [reservationDetails, setReservationDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userID || !board_id) {
      // 대소문자 수정
      setError("예약 정보를 찾을 수 없습니다.");
      return;
    }

    const fetchReservationDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/reservation/`,
          {
            params: { userID },
          },
        );

        // 특정 board_id와 일치하는 예약 찾기
        const reservation = response.data.reservations.find(
          (res) => res.board_id === board_id, // 대소문자 수정
        );

        if (reservation) {
          setReservationDetails(reservation);
        } else {
          setError("해당 예약을 찾을 수 없습니다.");
        }
      } catch (err) {
        setError("예약 정보를 불러오는 중 오류가 발생했습니다.");
        console.error("예약 조회 오류:", err);
      }
    };

    fetchReservationDetails();
  }, [userID, board_id]); // 대소문자 수정

  return (
    <div>
      <Header showProfile={true} showBackButton={true} />
      {error && <p className="mb-4 text-center text-red-600">{error}</p>}

      {reservationDetails && !error && (
        <div className="mt-10 flex flex-col items-center">
          {/* 예약 성공 아이콘 (예: 체크 아이콘) */}
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-green-600">예약 완료</h2>
          <p className="text-gray-700">예약이 성공적으로 확정되었습니다.</p>

          {/* 예약 상세 정보 카드 */}
          <div className="mt-6 w-full max-w-md rounded-lg border border-gray-300 bg-white p-6 text-left shadow-md">
            <p className="mb-2">
              <span className="font-semibold">예약 번호:</span>{" "}
              {reservationDetails.reservation_number}
            </p>
            <p className="mb-2">
              <span className="font-semibold">농장 이름:</span>{" "}
              {reservationDetails.farm_name}
            </p>
            <p className="mb-2">
              <span className="font-semibold">예약 날짜:</span>{" "}
              {reservationDetails.date}
            </p>
            {/* 필요한 예약 상세 정보를 추가로 표시할 수 있음 */}
          </div>
        </div>
      )}

      <button
        onClick={() => navigate("/mainpage")}
        className="mt-5 w-full rounded bg-[#FFA500] px-6 py-3 text-white"
      >
        메인 홈으로 이동
      </button>
    </div>
  );
}

export default FixReservationPage;

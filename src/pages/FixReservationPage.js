import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import check from "../assets/images/resevationClear.svg";

function FixReservationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { reservation, userID, board_id } = location.state || {};

  const [reservationDetails, setReservationDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userID || !board_id) {
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

        const matchedReservation = response.data.reservations.find(
          (res) => res.board_id === board_id,
        );

        if (matchedReservation) {
          setReservationDetails(matchedReservation);
        } else {
          setError("해당 예약을 찾을 수 없습니다.");
        }
      } catch (err) {
        setError("예약 정보를 불러오는 중 오류가 발생했습니다.");
        console.error("예약 조회 오류:", err);
      }
    };

    fetchReservationDetails();
  }, [userID, board_id]);

  return (
    <div>
      <Header showProfile={true} showBackButton={false} />

      {reservationDetails && !error && (
        <div className="relative mt-10 flex flex-col items-center px-5">
          <div className="flex flex-col items-center">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}${reservationDetails.image}`}
              alt="Farm"
              className="mb-4 h-full w-full rounded-lg object-cover"
            />

            {/* 예약 상세 정보 카드 */}
            <div className="absolute top-72 mt-6 w-96 rounded-lg border border-orange-300 bg-white py-6 text-left shadow-md">
              <div className="mt-3 flex flex-col items-center">
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
              </div>
              <div className="flex items-end justify-center gap-1">
                <h2 className="mb-2 flex items-end text-2xl font-bold text-blue-600">
                  예약이 확정되었습니다!
                </h2>
                <img src={check} alt="Check" className="w-10" />
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-10 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-10 w-10 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-red-600">예약 실패</h2>
          <p className="text-gray-700">{error}</p>

          <div className="mt-6 w-full max-w-md rounded-lg border border-gray-300 bg-white p-6 text-left shadow-md">
            <p>예약 과정에서 문제가 발생했습니다. 아래 내용을 확인해주세요.</p>
            <ul className="mt-3 list-disc pl-5 text-sm text-gray-600">
              <li>유효한 userID와 board_id가 전달되었는지 확인</li>
              <li>서버 응답 상태 및 네트워크 연결 상태 확인</li>
            </ul>
          </div>
        </div>
      )}

      <div className="mt-16 px-14">
        <button
          onClick={() => navigate("/mainpage")}
          className="mt-5 w-full rounded-md bg-[#FFA500] px-6 py-3 text-xl font-semibold text-white hover:bg-[#FF710A]"
        >
          메인 홈으로 이동
        </button>
      </div>
    </div>
  );
}

export default FixReservationPage;

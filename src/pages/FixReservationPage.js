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
          {/* 예약 성공 텍스트 */}
          <div className="flex-col justify-items-center">
          <img src={check} alt="Check" className="w-20" />
            <h2 className="mt-3 mb-5 flex items-end text-2xl font-bold">
              예약이 확정되었습니다!
            </h2>
          </div>
          {/* 예약된 농장 이미지 */}
          <div className="flex flex-col items-center">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}${reservationDetails.image}`}
              alt="Farm"
              className="w-80 rounded-t-xl"
            />
            {/* 예약 상세 정보 카드 */}
            <div className="w-80 rounded-b-xl border bg-white py-6 text-left shadow">
              <div className="flex-col justify-items-center">
                <p className="">
                  <span className=""></span>{" "}
                  {reservationDetails.board_title}
                </p>
                <p className="mb-5">
                  <span className=""></span>{" "}
                  {reservationDetails.farm_name}
                </p>
              </div>
              <div className="flex-col justify-items-start ml-5">
                <p className="">
                  <span className="text-[#C0C0C0]">예약번호</span>{" "}
                  {reservationDetails.reservation_number}
                </p>
                <p className="my-2">
                  <span className="text-[#C0C0C0]">예약날짜</span>{" "}
                  {reservationDetails.date}
                </p>
                <p className="">
                  <span className="text-[#C0C0C0]">예약날짜</span>{" "}
                  {reservationDetails.board_period_start} ~ {reservationDetails.board_period_end}
                </p>
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
          className="w-full rounded-lg bg-[#FFA500] px-6 py-3 text-xl font-semibold text-white hover:bg-[#FF710A]"
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default FixReservationPage;

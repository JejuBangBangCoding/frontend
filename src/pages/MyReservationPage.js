import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import backImg from "../assets/images/backImg.svg";
import userProfilePlaceholder from "../assets/images/userProfile.svg";
import list from "../assets/images/list.svg";
import locationIcon from "../assets/images/location.svg";

function MyReservationPage() {
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user) {
        setError("사용자 정보가 없습니다.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/reservation/?userID=${Number(
            user.userId,
          )}`,
        );
        setReservations(response.data.reservations || []);
      } catch (err) {
        setError("예약 정보를 불러오는 중 오류가 발생했습니다.");
        console.error("API 호출 오류:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchReservations();
    }
  }, [user]);

  const handleReservationClick = (reservationItem) => {
    navigate("/detailedreservationpage", {
      state: { reservation: reservationItem },
    });
  };

  const handleDeleteReservation = async (reservationId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/reservation/`,
        {
          params: {
            ReservationID: reservationId,
            userID: Number(user.userId),
          },
        },
      );

      // 상태에서 삭제된 예약만 제거
      setReservations((prevReservations) =>
        prevReservations.filter(
          (reservation) => reservation.reservation_id !== reservationId,
        ),
      );
    } catch (err) {
      setError("예약 삭제 중 오류가 발생했습니다.");
      console.error("예약 삭제 오류:", err);
    }
  };

  return (
    <>
      <Header showProfile={true} showBackButton={true} />

      {/* 배경 및 사용자 프로필 이미지 */}
      <div className="relative mt-5 flex flex-col items-center">
        {/* 배경 이미지 */}
        <img
          src={backImg}
          alt="Background"
          className="h-40 w-full rounded-t-3xl object-cover"
        />

        {/* 프로필 이미지 및 사용자 이름 */}
        <div className="relative mt-[-4rem] flex flex-col items-center">
          <img
            src={user?.profileImage || userProfilePlaceholder}
            alt="User Profile"
            className="h-32 w-32 rounded-full border-4 border-white object-cover"
          />
          <p className="absolute top-3/4 rounded-full bg-[#FFA500] px-3 py-1 text-xl font-semibold text-white">
            {user?.username || "사용자"}
          </p>
        </div>
      </div>

      {/* 예약 현황 안내 문구 */}
      <p className="mb-2 mt-8 text-center text-xs font-normal text-[#C4C4C4]">
        각 항목을 누르시면 상세 조회를 하실 수 있습니다.
      </p>

      {/* 예약 현황 섹션 */}
      <div className="mx-5 rounded-t-3xl bg-white p-5">
        <div className="mb-4 flex items-center">
          <img src={list} alt="List" className="mr-3 w-[1rem]" />
          <p className="text-sm font-normal">예약 현황</p>
          <p className="ml-auto text-sm">
            전체 <strong>{reservations.length}</strong> 개
          </p>
        </div>

        {loading && <p className="text-center text-gray-600">로딩 중...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        <div className="h-[15rem] overflow-y-auto">
          {reservations.length > 0
            ? reservations.map((item) => (
                <div
                  key={item.reservation_id}
                  className="mb-4 flex cursor-pointer rounded-3xl bg-[#FFDB99] p-4 shadow"
                  onClick={() => handleReservationClick(item)}
                >
                  <div className="flex basis-1/2 flex-col justify-center gap-1">
                    <p className="text-xs font-light">{item.farm_name}</p>
                    <div className="flex">
                      <img src={locationIcon} alt="Location" className="mr-1" />
                      <p className="text-xs">예약 날짜: {item.date}</p>
                    </div>
                    <p className="text-[0.8rem] font-bold">근로 기간</p>
                    <p className="text-[0.6rem] font-normal">
                      {item.board_period_start} ~ {item.board_period_end}
                    </p>
                  </div>

                  <button
                    className="ml-auto rounded bg-red-500 px-4 py-2 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteReservation(item.reservation_id);
                    }}
                  >
                    예약 삭제
                  </button>
                </div>
              ))
            : !loading && (
                <p className="text-center text-gray-600">
                  예약된 농장이 없습니다.
                </p>
              )}
        </div>
      </div>
    </>
  );
}

export default MyReservationPage;

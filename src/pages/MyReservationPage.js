import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import leftArrow1 from "../assets/images/leftArrow1.svg";
import textLogo from "../assets/images/textLogo.svg";
import backImg from "../assets/images/backImg.svg";
import userProfilePlaceholder from "../assets/images/userProfile.svg";
import list from "../assets/images/list.svg";
import locationIcon from "../assets/images/location.svg";
import list1 from "../assets/images/list1.svg";

function MyReservationPage() {
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // 예약 정보를 서버에서 가져오는 함수
  useEffect(() => {
    const fetchReservations = async () => {
      if (!user) {
        setError("사용자 정보가 없습니다.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://52.78.130.126:8000/api/board/reservation/?userID=${user.userId}`,
        );
        setReservations(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          // 404 응답이 왔을 때: 예약된 농장이 없음
          setError("예약된 농장이 없습니다.");
        } else {
          setError("예약 정보를 불러오는 중 오류가 발생했습니다.");
        }
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

  return (
    <>
      {/* 헤더 (시작) */}
      <div className="relative my-6 flex items-center justify-center">
        <img
          src={leftArrow1}
          alt="Left Arrow"
          className="absolute left-4 w-[1.2rem] cursor-pointer"
          onClick={() => navigate("/mainpage")}
        />
        <img src={textLogo} alt="Text logo" className="w-[6rem]" />
      </div>

      {/* 사용자 프로필 */}
      <div className="flex flex-col items-center">
        <img src={backImg} alt="" className="relative" />
        <img
          src={user?.profileImage || userProfilePlaceholder}
          alt="User Profile"
          className="absolute top-32 w-[8rem] rounded-full"
        />
        <p className="absolute top-64 text-xl font-semibold">
          {user?.username || "사용자"}
        </p>
      </div>

      <p className="mb-2 mt-auto self-center text-xs font-normal text-[#C4C4C4]">
        각 항목을 누르시면 상세 조회를 하실 수 있습니다.
      </p>

      {/* 예약 현황 */}
      <div className="mx-5 h-[32.5rem] rounded-t-3xl bg-white p-5">
        {/* 예약 현황 - 헤더 */}
        <div className="mb-4 flex items-center">
          <img src={list} alt="List" className="mr-3 w-[1rem]" />
          <p className="text-sm font-normal">예약 현황</p>
          <p className="ml-auto text-sm">
            전체 <strong>{reservations.length}</strong> 개
          </p>
        </div>

        {/* 로딩 중인 경우 */}
        {loading && <p className="text-center text-gray-600">로딩 중...</p>}

        {/* 에러 발생 시 */}
        {error && <p className="text-center text-red-600">{error}</p>}

        {/* 예약 현황 - 리스트 */}
        <div className="h-[29rem] overflow-y-auto">
          {reservations.length > 0
            ? reservations.map((item) => (
                <div
                  key={item.id}
                  className="mb-4 flex cursor-pointer rounded-3xl bg-[#FFDB99] p-4 shadow"
                  onClick={() => handleReservationClick(item)}
                >
                  {/* 왼쪽 */}
                  <div className="relative ml-3 mr-3 flex">
                    <p className="absolute left-[-1rem] self-center rounded-full border-2 border-[#FFA500] bg-white px-[0.7rem] py-[0.2rem] text-base font-normal">
                      {item.id}
                    </p>
                    <img src={list1} alt="ReservationImage" />
                  </div>

                  {/* 중간 */}
                  <div className="flex basis-1/2 flex-col justify-center gap-1">
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="text-xs font-light">{item.farm_name}</p>
                    <div className="flex">
                      <img src={locationIcon} alt="Location" className="mr-1" />
                      <p className="text-xs">{item.location}</p>
                    </div>
                  </div>

                  {/* 오른쪽 */}
                  <div className="flex basis-1/3 flex-col items-end justify-between">
                    <p className="text-[0.8rem] font-bold">{item.date}</p>
                    <p className="text-[0.6rem] font-normal">
                      {item.period_start} ~ {item.period_end}
                    </p>
                  </div>
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

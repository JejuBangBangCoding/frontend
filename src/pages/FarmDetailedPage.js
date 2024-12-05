import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function FarmDetailedPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { board_id } = location.state || {};

  const [farmDetails, setFarmDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
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

  useEffect(() => {
    console.log("Received board_id:", board_id);
    if (!board_id) {
      setError("Farm board ID가 없습니다.");
      return;
    }

    const fetchFarmDetails = async () => {
      try {
        const response = await axios.get(
          `http://52.78.130.126:8000/api/board/detail/?board_id=${board_id}`,
        );
        console.log("API response data:", response.data);

        if (response.data.length > 0) {
          setFarmDetails(response.data[0]);
        } else {
          setError("해당 농장 정보를 찾을 수 없습니다.");
        }
      } catch (err) {
        setError("농장 정보를 불러오는 중 오류가 발생했습니다.");
        console.error("API 호출 오류:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmDetails();
  }, [board_id]);

  const handleMatchClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsChecked(false);
  };

  const handleConfirmClick = async () => {
    if (isChecked && user && board_id) {
      const reservationData = {
        userID: user.userId,
        BoardID: board_id,
      };

      try {
        console.log("예약 생성 요청 데이터:", reservationData);
        const response = await axios.post(
          "http://52.78.130.126:8000/api/board/reservation/",
          reservationData,
        );
        console.log("예약 생성 응답:", response.data);
        navigate("/fixreservationpage", { state: { board_id } });
      } catch (err) {
        console.error("예약 생성 중 오류가 발생했습니다:", err);
        if (err.response) {
          console.error("서버 응답:", err.response.data);
        }
        setError("예약 생성 중 오류가 발생했습니다.");
      }
    } else {
      setError("예약 정보를 확인해주세요.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">로딩 중...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold text-pink-600">FarmDetailedPage</h1>
      {farmDetails && (
        <div className="mt-5 rounded bg-white p-5 shadow">
          <h2 className="mb-3 text-3xl font-semibold">
            {farmDetails.farm_name}
          </h2>
          <p className="mb-2 text-lg">구인 제목: {farmDetails.title}</p>
          <p className="mb-2 text-lg">위치: {farmDetails.location}</p>
          <p className="mb-2 text-lg">
            기간: {farmDetails.period_start} ~ {farmDetails.period_end}
          </p>
          <p className="mb-2 text-lg">기간 (일수): {farmDetails.duration}</p>
          <p className="mb-2 text-lg">업종: {farmDetails.industry}</p>
          <p className="mb-2 text-lg">시급: {farmDetails.hourly}원</p>
          <p className="mb-2 text-lg">
            근무일:{" "}
            {farmDetails.workdays?.length > 0
              ? farmDetails.workdays.join(", ")
              : "정보 없음"}
          </p>
          <p className="mb-2 text-lg">
            복지 혜택:{" "}
            {farmDetails.welfare?.length > 0
              ? farmDetails.welfare.join(", ")
              : "정보 없음"}
          </p>
          <p className="mb-2 text-lg">설명: {farmDetails.description}</p>
          <p className="mb-2 text-lg">
            태그:{" "}
            {farmDetails.tag?.length > 0
              ? farmDetails.tag.join(", ")
              : "정보 없음"}
          </p>
          {farmDetails.image && (
            <img
              src={farmDetails.image}
              alt={farmDetails.farm_name}
              className="mt-4 h-60 w-full rounded object-cover"
            />
          )}
        </div>
      )}
      <button
        onClick={handleMatchClick}
        className="mt-5 rounded bg-blue-500 px-6 py-2 text-white"
      >
        예약하기
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded bg-white p-8 text-center shadow-md">
            <h2 className="mb-4 text-2xl font-bold">유의사항</h2>
            <p className="mb-4">매칭하기 전에 모든 정보를 확인하세요.</p>
            <div className="mb-6">
              <input
                type="checkbox"
                id="agreement"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="mr-2"
              />
              <label htmlFor="agreement">네, 모두 이해했고 동의합니다.</label>
            </div>
            <div className="flex justify-between gap-4">
              <button
                onClick={closeModal}
                className="w-full rounded bg-gray-500 px-4 py-2 text-white"
              >
                취소
              </button>
              <button
                onClick={handleConfirmClick}
                className={`${
                  isChecked ? "bg-blue-500" : "cursor-not-allowed bg-gray-300"
                } w-full rounded px-4 py-2 text-white`}
                disabled={!isChecked}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FarmDetailedPage;

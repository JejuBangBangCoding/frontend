import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import check from "../assets/images/check.svg";
import money from "../assets/images/money.svg";
import calendar from "../assets/images/calendar.svg";
import clock from "../assets/images/clock.svg";
import hourGlass from "../assets/images/hourGlass.svg";
import map from "../assets/images/map.svg";
import list2 from "../assets/images/list2.svg";
import list3 from "../assets/images/list3.svg";
import star from "../assets/images/star.svg";

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
          `${process.env.REACT_APP_BACKEND_URL}/api/board/detail/?board_id=${board_id}`,
        );
        console.log("API response data:", response.data);

        if (response.data.length > 0) {
          setFarmDetails(response.data[0]);
          console.log("Farm details:", response.data[0]);
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
          `${process.env.REACT_APP_BACKEND_URL}/api/board/reservation/`,
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
    <>
      <Header showProfile={true} showBackButton={true} />

      {farmDetails && (
        // 이미지
        <div className="rounded mt-5">
          {farmDetails.image && (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}${farmDetails.image}`}
              alt={farmDetails.farm_name}
              className="h-60 w-full object-cover"
            />
          )}
          {/* 상세 정보 */}
          <div className="mt-3 mx-5 px-5 pt-2 bg-white rounded-t-3xl text-center">
            {/* 태그 */}
            <div className="flex justify-center flex-wrap gap-2 mb-5">
              {farmDetails.tag?.length > 0 ? (
                farmDetails.tag.map((tag, index) => (
                  <span 
                    key={index} 
                    className="text-xs rounded-xl border-[0.1rem] border-[#FFA500] bg-[#FFDB99] px-2 py-1"
                  >
                    #{tag}
                  </span>
                ))
              ) : (
                <p className="text-sm">정보 없음</p>
              )}
            </div>
            {/* 농장 이름 */}
            <div className="flex justify-between items-center mb-5">
              <div className="flex">
                <img src={check} alt="Check" className="w-3" />
                <div className="text-xs">인증업체</div>
              </div>
              <h2 className="text-3xl font-normal">
                {farmDetails.farm_name}
              </h2>
              <p className="text-xs">지원자 (3/5)</p>
            </div>
            {/* 간단 설명 */}
            <div className="flex justify-center items-center mb-3">
              {/* 시급 */}
              <div className="flex flex-col items-center">
                <img src={money} alt="Money" className="mb-1" />
                <p className="text-xs text-center">시급 {farmDetails.hourly}원</p>
              </div>
              {/* 근무일 */}
              <div className="flex flex-col items-center mx-4">
                <img src={calendar} alt="Calendar" className="mb-1" />
                <p className="text-xs text-center">
                  {farmDetails.workdays?.length > 0
                    ? farmDetails.workdays.join(", ")
                    : "정보 없음"}
                </p>
              </div>
              {/* 기간(일수) */}
              <div className="flex flex-col items-center mx-4">
                <img src={clock} alt="Clock" className="mb-1" />
                <p className="text-xs text-center">{farmDetails.duration}</p>
              </div>
              {/* 기간 */}
              <div className="flex flex-col items-center">
                <img src={hourGlass} alt="Hour Glass" className="mb-1" />
                <p className="text-xs text-center">
                  {farmDetails.period_start} ~ {farmDetails.period_end}
                </p>
              </div>
            </div>
            <div className="border-[0.1rem]"></div>
            {/* 구인글 제목 */}
            <p className="font-bold text-xl my-2">{farmDetails.title}</p>
            {/* <p className="mb-2 text-lg">업종: {farmDetails.industry}</p> */}
            {/* <p className="mb-2 text-lg">
              복지 혜택:{" "}
              {farmDetails.welfare?.length > 0
                ? farmDetails.welfare.join(", ")
                : "정보 없음"}
            </p> */}
            {/* 설명 */}
            <p className="text-lg mb-5"> {farmDetails.description}</p>
            <p className="">contact : 010-xxxx-xxxx</p>
            {/* 농장 위치 */}
            <img src={map} alt="Map" className="" />
            <p className="text-xs mb-3">{farmDetails.location}</p>
            <div className="border-[0.1rem]"></div>
            {/* 명소 */}
            <p className="text-xl font-bold my-3">근처에 있는 명소</p>
            <ol className="flex justify-center gap-3 mb-3">
              {/* 명소 1 */}
              <li className="">
                <img src={list2} alt="" className="w-[7rem]" />
                <p className="font-bold text-xl">한담해변</p>
                <div className="flex justify-center">
                  <img src={star} alt="" className="w-3" />
                  <p className="text-xs">4.7</p>
                </div>
                <p className="text-[0.6rem] font-semibold">차로 5분거리 (14km)</p>
              </li>
              {/* 명소 2 */}
              <li className="">
                <img src={list3} alt="" className="w-[7rem]" />
                <p className="font-bold text-xl">한담해변</p>
                <div className="flex justify-center">
                  <img src={star} alt="" className="w-3" />
                  <p className="text-xs">4.7</p>
                </div>
                <p className="text-[0.6rem] font-semibold">차로 5분거리 (14km)</p>
              </li>
              {/* 명소 3 */}
              <li className="">
                <img src={list2} alt="" className="w-[7rem]" />
                <p className="font-bold text-xl">한담해변</p>
                <div className="flex justify-center">
                  <img src={star} alt="" className="w-3" />
                  <p className="text-xs">4.7</p>
                </div>
                <p className="text-[0.6rem] font-semibold">차로 5분거리 (14km)</p>
              </li>
            </ol>
            {/* 예약 버튼 */}
            <button
              onClick={handleMatchClick}
              className="my-3 rounded-xl bg-[#FFA500] text-white px-32 py-3"
            >
              예약하기
            </button>
          </div>
          </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-[2rem] bg-white p-8 text-center shadow-md h-[36rem] overflow-y-auto mx-5">
            <h2 className="mb-4 text-2xl font-bold">유의사항</h2>
            <p className="mb-4 font-light text-sm">모두를 위한 유의사항 안내이니 꼭 읽어봐 주세요!</p>
            <div className="text-left leading-8">
              <p className="mb-4">
                · 예약 시간 10분 전까지 도착해 주세요.
              </p>
              <p className="">
                1. 취소 및 변경<br />
                · 예약 취소 또는 변경은 최소 24시간 전에 해 주세요.<br />
                · 늦게 도착할 경우 예약 시간이 단축될 수 있습니다.<br />
                · 예약 가능 여부는 상황에 따라 달라질 수 있습니다.
              </p>
              <p className="">
                2. 신분증<br />
                · 신분증을 지참해 주세요.
              </p>
              <p className="">
                3. 준수 사항<br />
                · 위 지침을 준수하지 않을 경우 예약이 취소될 수 있습니다.
              </p>
              <p className="">
                4. 개인정보 보호<br />
                · 예약 시 제공된 개인 정보는 예약 관리 목적으로만 사용되며, 제3자에게 제공되지 않습니다.
              </p>
              <p className="">
                5. 향후 예약 제한<br />
                · 예약 취소 및 변경 정책을 준수하지 않을 경우, 향후 예약에 제한이 있을 수 있습니다.
              </p>
              <p className="">
                6. 법적 준수<br />
                · 법적 분쟁 발생 시, 당사의 관할 법원에서 해결합니다.
              </p> 
              <p className="">
                7. 패널티<br />
                · 예약 취소 시, 다음과 같은 패널티가 부과될 수 있습니다:<br />
                · 예약 취소가 체크인 24시간 이내에 이루어진 경우, 첫날 숙박 요금이 부과됩니다.<br />
                · 노쇼(No-show) 시, 전체 숙박 요금이 부과됩니다.
              </p>
            </div>
            <div className="my-6">
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
                className="w-full rounded bg-[#D9D9D9] px-4 py-2 text-white"
              >
                취소
              </button>
              <button
                onClick={handleConfirmClick}
                className={`${
                  isChecked ? "bg-[#FFA500]" : "cursor-not-allowed bg-[#D9D9D9]"
                } w-full rounded px-4 py-2 text-white`}
                disabled={!isChecked}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FarmDetailedPage;

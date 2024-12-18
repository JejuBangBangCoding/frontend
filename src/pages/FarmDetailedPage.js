import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Modal from "../components/Modal";
import check from "../assets/images/check.svg";
import money from "../assets/images/money.svg";
import calendar from "../assets/images/calendar.svg";
import clock from "../assets/images/clock.svg";
import hourGlass from "../assets/images/hourGlass.svg";
import address from "../assets/images/address.svg";
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
      setLoading(false);
      return;
    }

    const fetchFarmDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/board/detail/`,
          {
            params: { board_id },
          },
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
    <div className="flex h-screen flex-col">
      <Header showProfile={true} showBackButton={true} />

      {farmDetails && (
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* 이미지 */}
          <div className="mt-5 rounded">
            {farmDetails.image && (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}${farmDetails.image}`}
                alt={farmDetails.farm_name}
                className="h-60 w-full object-cover"
              />
            )}
          </div>

          {/* 상세 정보 */}
          <div className="custom-scrollbar scrollbar-thumb-orange-500 scrollbar-track-gray-100 mx-2 mt-3 flex-1 overflow-y-auto rounded-t-3xl bg-white px-5 pb-10 pt-2 text-center">
            {/* pb-24: 고정된 예약 버튼을 피하기 위한 하단 패딩 */}
            {/* 태그 */}
            <div className="mb-5 flex flex-wrap justify-center gap-2">
              {farmDetails.tag?.length > 0 ? (
                farmDetails.tag.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-xl border-[0.1rem] border-[#FFA500] bg-[#FFDB99] px-2 py-1 text-xs"
                  >
                    #{tag}
                  </span>
                ))
              ) : (
                <p className="text-sm">정보 없음</p>
              )}
            </div>

            {/* 농장 이름 */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex">
                <img src={check} alt="Check" className="w-3" />
                <div className="text-xs">인증업체</div>
              </div>
              <h2 className="text-3xl font-normal">{farmDetails.farm_name}</h2>
              <p className="text-xs">지원자 (3/5)</p>
            </div>

            {/* 간단 설명 */}
            <div className="mb-3 flex items-center justify-center">
              {/* 시급 */}
              <div className="flex flex-col items-center">
                <img src={money} alt="Money" className="mb-1" />
                <p className="text-center text-xs">
                  시급 {farmDetails.hourly}원
                </p>
              </div>

              {/* 근무일 */}
              <div className="mx-4 flex flex-col items-center">
                <img src={calendar} alt="Calendar" className="mb-1" />
                <p className="text-center text-xs">
                  {farmDetails.workdays?.length > 0
                    ? farmDetails.workdays.join(", ")
                    : "정보 없음"}
                </p>
              </div>

              {/* 기간(일수) */}
              <div className="mx-4 flex flex-col items-center">
                <img src={clock} alt="Clock" className="mb-1" />
                <p className="text-center text-xs">{farmDetails.duration}</p>
              </div>

              {/* 기간 */}
              <div className="flex flex-col items-center">
                <img src={hourGlass} alt="Hour Glass" className="mb-1" />
                <p className="text-center text-xs">
                  {farmDetails.period_start} ~ {farmDetails.period_end}
                </p>
              </div>
            </div>

            <div className="my-5 border-[1px]"></div>

            {/* 구인글 제목 */}
            <p className="my-2 text-xl font-bold">{farmDetails.title}</p>

            {/* 설명 */}
            <p className="mb-5 text-lg"> {farmDetails.description}</p>
            <p className="">contact : 010-xxxx-xxxx</p>

            {/* 농장 위치 */}
            <img src={address} alt="Address" className="my-1" />
            <p className="text-xs">{farmDetails.location}</p>

            <div className="my-5 border-[1px]"></div>

            {/* 명소 */}
            <p className="mb-5 text-xl font-bold">근처에 있는 명소</p>
            <ol className="mb-16 flex justify-center gap-3">
              {/* 명소 1 */}
              <li className="">
                <img src={list2} alt="" className="w-[7rem]" />
                <p className="text-xl font-bold">한담해변</p>
                <div className="flex justify-center">
                  <img src={star} alt="Star" className="w-3" />
                  <p className="text-xs">4.7</p>
                </div>
                <p className="text-[0.6rem] font-semibold">
                  차로 5분거리 (14km)
                </p>
              </li>
              {/* 명소 2 */}
              <li className="">
                <img src={list3} alt="" className="w-[7rem]" />
                <p className="text-xl font-bold">한담해변</p>
                <div className="flex justify-center">
                  <img src={star} alt="Star" className="w-3" />
                  <p className="text-xs">4.7</p>
                </div>
                <p className="text-[0.6rem] font-semibold">
                  차로 5분거리 (14km)
                </p>
              </li>
              {/* 명소 3 */}
              <li className="">
                <img src={list2} alt="" className="w-[7rem]" />
                <p className="text-xl font-bold">한담해변</p>
                <div className="flex justify-center">
                  <img src={star} alt="Star" className="w-3" />
                  <p className="text-xs">4.7</p>
                </div>
                <p className="text-[0.6rem] font-semibold">
                  차로 5분거리 (14km)
                </p>
              </li>
            </ol>

            {/* 예약 버튼 */}
            <div className="rounded-xl bg-[#FFA500]">
              <button onClick={handleMatchClick} className="h-14 text-white">
                예약하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmClick}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        title="유의사항"
      >
        <p className="mb-4 text-sm font-light">
          모두를 위한 유의사항 안내이니 꼭 읽어봐 주세요!
        </p>
        <div className="text-left leading-8">
          <p className="mb-4">· 예약 시간 10분 전까지 도착해 주세요.</p>
          <p className="">
            1. 취소 및 변경
            <br />
            · 예약 취소 또는 변경은 최소 24시간 전에 해 주세요.
            <br />
            · 늦게 도착할 경우 예약 시간이 단축될 수 있습니다.
            <br />· 예약 가능 여부는 상황에 따라 달라질 수 있습니다.
          </p>
          <p className="">
            2. 신분증
            <br />· 신분증을 지참해 주세요.
          </p>
          <p className="">
            3. 준수 사항
            <br />· 위 지침을 준수하지 않을 경우 예약이 취소될 수 있습니다.
          </p>
          <p className="">
            4. 개인정보 보호
            <br />· 예약 시 제공된 개인 정보는 예약 관리 목적으로만 사용되며,
            제3자에게 제공되지 않습니다.
          </p>
          <p className="">
            5. 향후 예약 제한
            <br />· 예약 취소 및 변경 정책을 준수하지 않을 경우, 향후 예약에
            제한이 있을 수 있습니다.
          </p>
          <p className="">
            6. 법적 준수
            <br />· 법적 분쟁 발생 시, 당사의 관할 법원에서 해결합니다.
          </p>
          <p className="">
            7. 패널티
            <br />
            · 예약 취소 시, 다음과 같은 패널티가 부과될 수 있습니다:
            <br />
            · 예약 취소가 체크인 24시간 이내에 이루어진 경우, 첫날 숙박 요금이
            부과됩니다.
            <br />· 노쇼(No-show) 시, 전체 숙박 요금이 부과됩니다.
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default FarmDetailedPage;

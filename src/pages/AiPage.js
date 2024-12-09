import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import leftArrow1 from "../assets/images/leftArrow1.svg";
import textLogo from "../assets/images/textLogo.svg";
import refresh from "../assets/images/refresh.svg";

function AiPage() {
  const [contentChanged, setContentChanged] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState([]);
  const [provideMeal, setProvideMeal] = useState(false);
  const [provideLodging, setProvideLodging] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { region } = location.state || {};

  // 날짜 선택 핸들러
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  // 업종 선택 핸들러
  const handleIndustryClick = (industry) => {
    if (industry === "상관없음") {
      setSelectedIndustries([]);
    } else {
      setSelectedIndustries((prev) => {
        if (prev.includes(industry)) {
          return prev.filter((item) => item !== industry);
        } else {
          return [...prev.filter((item) => item !== "상관없음"), industry];
        }
      });
    }
  };

  // 상관없음 상태 설정
  const isNoIndustrySelected = selectedIndustries.length === 0;

  // 숙식 제공 여부 선택 핸들러
  const handleAccommodationClick = (option) => {
    if (option === "상관없음") {
      setProvideMeal(false);
      setProvideLodging(false);
    } else {
      if (option === "식사") {
        setProvideMeal((prev) => !prev);
      } else if (option === "숙소") {
        setProvideLodging((prev) => !prev);
      }
    }
  };

  // 상관없음 버튼 상태 설정
  const isNoPreferenceSelected = !provideMeal && !provideLodging;

  // 근무형태 선택 핸들러
  const handleWorkTypeClick = (workType) => {
    if (workType === "상관없음") {
      setSelectedWorkTypes([]);
    } else {
      setSelectedWorkTypes((prev) => {
        if (prev.includes(workType)) {
          return prev.filter((item) => item !== workType);
        } else {
          return [...prev.filter((item) => item !== "상관없음"), workType];
        }
      });
    }
  };

  // 상관없음 상태 설정
  const isNoWorkTypeSelected = selectedWorkTypes.length === 0;

  // AI 추천 API 요청 핸들러
  const handleGetRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      const formattedStartDate = startDate
        ? startDate.toISOString().split("T")[0]
        : null;
      const formattedEndDate = endDate
        ? endDate.toISOString().split("T")[0]
        : null;

      const requestData = {
        text: userInput,
        industry:
          selectedIndustries.length > 0 ? selectedIndustries : ["상관없음"],
        work_type:
          selectedWorkTypes.length > 0 ? selectedWorkTypes : ["상관없음"],
        provide_meal: provideMeal,
        provide_lodging: provideLodging,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      };

      const response = await axios.post(
        "http://52.78.130.126:8000/api/board/match/",
        requestData,
      );

      navigate("/farmlistpage", {
        state: { recommendations: response.data.recommendations },
      });
    } catch (error) {
      console.error("추천 데이터를 가져오는 중 오류가 발생했습니다:", error);
      setError(
        "추천 데이터를 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.",
      );
    } finally {
      setLoading(false);
    }
  };

  // 버튼 클릭 핸들러
  const handleClick = () => {
    if (!contentChanged) {
      setContentChanged(true);
    } else {
      handleGetRecommendations();
    }
  };

  // 유효한 기간인지 확인
  const isPeriodValid = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 7; // 최소 7일(7박 8일)
    }
    return false;
  };

  // 숙박 기간 계산
  const calculateStayPeriod = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays}박 ${diffDays + 1}일`;
    }
    return "기간을 선택하세요";
  };

  // 초기화 함수
  const handleReset = () => {
    setContentChanged(false);
    setUserInput("");
    setStartDate(null);
    setEndDate(null);
    setSelectedIndustries([]);
    setSelectedWorkTypes([]);
    setProvideMeal(false);
    setProvideLodging(false);
    setError(null);
  };

  return (
    <>
      {/* 헤더 (시작) */}
      <div className="relative mt-6 flex items-center justify-center">
        <img
          src={leftArrow1}
          alt="Left Arrow"
          className="absolute left-4 w-[1.2rem] cursor-pointer"
          onClick={() => navigate("/mainpage")}
        />
        <img src={textLogo} alt="Text logo" className="w-[6rem]" />
      </div>
      {/* 헤더 (끝) */}

      {/* 선택 (시작) */}
      {!contentChanged && (
        <div className="mt-5 flex flex-col items-center p-5">
          {/* 캘린더 (시작) */}
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            key={`${startDate}-${endDate}`}
            className=""
            minDate={new Date()}
          />
          {/* 캘린더 (끝) */}

          <div className="mt-8">
            {/* 날짜 선택 (시작) */}
            <div>
              <h1 className="text-xl font-semibold">날짜</h1>
              <div className="flex h-8 items-center space-x-2">
                {startDate && endDate ? (
                  <>
                    <p>
                      {startDate.toLocaleDateString()} ~{" "}
                      {endDate.toLocaleDateString()}
                    </p>
                    <p className="inline-block rounded border border-[#FFA500] bg-[#FFDB99] px-1 text-center">
                      {calculateStayPeriod()}
                    </p>
                  </>
                ) : (
                  <div className="flex items-center text-gray-400">
                    <p>7일 이상 선택해주세요!</p>
                  </div>
                )}
              </div>
            </div>
            {/* 날짜 선택 (끝) */}

            {/* 업종 선택 (시작)*/}
            <div className="mt-8">
              <h2 className="text-xl font-semibold">업종</h2>
              <div className="mt-2 space-x-2 text-[15px]">
                {["귤", "당근", "감자", "마늘", "양파", "상관없음"].map(
                  (type) => (
                    <button
                      key={type}
                      onClick={() => handleIndustryClick(type)}
                      className={`inline-block rounded border border-[#FFA500] bg-[#FFDB99] px-2 py-1 text-center ${
                        selectedIndustries.includes(type) ||
                        (type === "상관없음" && isNoIndustrySelected)
                          ? "bg-[#FFDB99] text-black"
                          : "bg-white text-black"
                      }`}
                    >
                      {type}
                    </button>
                  ),
                )}
              </div>
            </div>
            {/* 업종 선택 (끝)*/}

            {/* 숙식 제공 여부 선택 (시작) */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold">숙식 제공 여부</h2>
              <div className="mt-2 space-x-2 text-[15px]">
                <button
                  onClick={() => handleAccommodationClick("식사")}
                  className={`inline-block rounded border border-[#FFA500] px-2 py-1 text-center ${
                    provideMeal
                      ? "bg-[#FFDB99] text-black"
                      : "bg-white text-black"
                  }`}
                >
                  식사
                </button>
                <button
                  onClick={() => handleAccommodationClick("숙소")}
                  className={`inline-block rounded border border-[#FFA500] px-2 py-1 text-center ${
                    provideLodging
                      ? "bg-[#FFDB99] text-black"
                      : "bg-white text-black"
                  }`}
                >
                  숙소
                </button>
                <button
                  onClick={() => handleAccommodationClick("상관없음")}
                  className={`inline-block rounded border border-[#FFA500] px-2 py-1 text-center ${
                    isNoPreferenceSelected
                      ? "bg-[#FFDB99] text-black"
                      : "bg-white text-black"
                  }`}
                >
                  상관없음
                </button>
              </div>
            </div>
            {/* 숙식 제공 여부 선택 (끝) */}

            {/* 근무형태 선택 (시작) */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold">근무형태</h2>
              <div className="mt-2 space-x-2 text-[15px]">
                {["주5일", "격일근무", "격주근무", "상관없음"].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleWorkTypeClick(type)}
                    className={`inline-block rounded border border-[#FFA500] px-2 py-1 text-center ${
                      selectedWorkTypes.includes(type) ||
                      (type === "상관없음" && isNoWorkTypeSelected)
                        ? "bg-[#FFDB99] text-black"
                        : "bg-white text-black"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            {/* 근무형태 선택 (끝) */}
          </div>
        </div>
      )}
      {/* 선택 (끝) */}

      {/* AI 추천 (시작) */}
      {contentChanged && (
        <div className="mt-4">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="AI에게 보낼 메시지를 입력하세요..."
            className="h-20 w-full rounded border p-2"
          />
        </div>
      )}
      {/* AI 추천 (끝) */}

      {/* 버튼 (시작) */}
      <div className="mt-8 flex justify-center space-x-3">
        {/* 버튼 - 왼쪽 (시작) */}
        <button
          onClick={handleReset}
          className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl bg-[#E8E8E8] px-6 py-[1.1rem]"
        >
          <img src={refresh} alt="Refresh" className="w-[1.2rem]" />
          <p className="text-lg font-normal">초기화</p>
        </button>
        {/* 버튼 - 왼쪽 (끝) */}

        {/* 버튼 - 오른쪽 (시작) */}
        <button
          onClick={handleClick}
          className={`cursor-pointer px-20 text-xl text-white ${
            isPeriodValid() || contentChanged
              ? "cursor-allowed rounded-2xl bg-[#FFA500]"
              : "cursor-not-allowed rounded-2xl bg-gray-400"
          }`}
          disabled={!isPeriodValid() && !contentChanged}
        >
          {contentChanged ? "추천받기" : "다음"}
        </button>
        {/* 버튼 - 오른쪽 (끝) */}
      </div>
      {/* 버튼 (끝) */}

      {loading && (
        <p className="mt-4 text-blue-500">추천 정보를 불러오는 중입니다...</p>
      )}

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </>
  );
}

export default AiPage;

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
  const [industry, setIndustry] = useState("상관없음");
  const [accommodation, setAccommodation] = useState("상관없음");
  const navigate = useNavigate();
  const location = useLocation();
  const { region } = location.state || {};

  // 날짜 선택 핸들러
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  // AI 추천 API 요청 핸들러
  const handleGetRecommendations = async () => {
    setLoading(true);
    setError(null);

    try {
      // 시작 날짜와 종료 날짜를 문자열로 변환 (백엔드에 전달하기 위해)
      const formattedStartDate = startDate
        ? startDate.toISOString().split("T")[0]
        : null;
      const formattedEndDate = endDate
        ? endDate.toISOString().split("T")[0]
        : null;

      // 백엔드로 보낼 데이터 구성
      const requestData = {
        text: userInput,
        industry: industry,
        accommodation: accommodation,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
      };

      // POST 요청 보내기
      const response = await axios.post(
        "http://52.78.130.126:8000/api/board/match/",
        requestData,
      );

      // 추천받은 농장 리스트를 가지고 FarmListPage로 이동
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
      return diffDays >= 30;
    }
    return false;
  };

  return (
    <>
      {/* 헤더 (시작)) */}
        <div className="flex mt-6">
          <img src={leftArrow1} alt="Left Arrow" className="w-[1.3rem] cursor-pointer" />
          <img src={textLogo} alt="Text Logo" className="w-[6rem]" />
        </div>
      {/* 헤더 (끝)) */}

      {/* 지역 정보 (시작) */}
      {/* {region && (
        <div className="mt-4 rounded bg-gray-100 p-4">
          <h2 className="text-2xl font-semibold">지역 정보: {region.name}</h2>
        </div>
      )} */}
      {/* 지역 정보 (끝) */}

      {/* 선택 (시작) */}
      {!contentChanged && (
        <div className="mt-10">
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

          {/* 날짜 선택 (시작) */}
          {startDate && endDate && (
          <div className="mt-4">
            <h1 className="text-xl font-semibold">선택한 기간</h1>
            <p>
              {startDate.toLocaleDateString()}
              ~ {endDate.toLocaleDateString()}
            </p>
          </div>
          )}
          {/* 날짜 선택 (끝) */}

          {/* 업종 선택 (시작)*/}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">업종</h2>
            <div className="mt-2 flex space-x-2">
              {["귤", "당근", "감자", "마늘", "양파", "상관없음"].map((type) => (
                <button
                  key={type}
                  onClick={() => setIndustry(type)}
                  className={`rounded border px-4 py-2 ${
                    industry === type
                      ? "bg-[#FFDB99]"
                      : "bg-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          {/* 업종 선택 (끝)*/}

          {/* 숙식 제공 여부 선택 (시작) */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold">숙식 제공 여부</h2>
            <div className="mt-2 flex space-x-2">
              {["식사", "숙소", "상관없음"].map((option) => (
                <button
                  key={option}
                  onClick={() => setAccommodation(option)}
                  className={`rounded border px-4 py-2 ${
                    accommodation === option
                      ? "bg-[#FFDB99]"
                      : "bg-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          {/* 숙식 제공 여부 선택 (시작) */}
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
        <div className="flex justify-around mt-auto mb-[1.875rem]">
          {/* 버튼 - 왼쪽 (시작) */}
          <button className="flex justify-center items-center gap-3 bg-[#E8E8E8] cursor-pointer px-[2.7rem] py-[1.625rem] rounded-3xl">
            <img src={refresh} alt="Refresh" className="w-[1.2rem]" />
            <p className="font-normal text-xl">초기화</p>
          </button>
          {/* 버튼 - 왼쪽 (끝) */}

          {/* 버튼 - 오른쪽 (시작) */}
          <button
            onClick={handleClick}
            className={`mt-4 p-1 cursor-pointer text-white ${
              isPeriodValid() || contentChanged
                ? "bg-blue-500"
                : "cursor-not-allowed bg-gray-300"
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

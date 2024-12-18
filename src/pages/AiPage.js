import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header";
import "react-datepicker/dist/react-datepicker.css";
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
        `${process.env.REACT_APP_BACKEND_URL}/api/match/`,
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
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {/* 헤더 */}
          <Header showProfile={true} />

          {/* Main container */}
          <div className="container mx-auto p-5">
            {/* 선택 섹션 */}
            {!contentChanged && (
              <div className="mt-5 flex w-full flex-col items-center bg-red-100 p-5">
                {/* 캘린더 */}
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  key={`${startDate}-${endDate}`}
                  className="w-full"
                  minDate={new Date()}
                />

                {/* 날짜 선택 */}
                <div className="mt-8 w-full">
                  <h1 className="text-xl font-semibold">날짜</h1>
                  <div className="flex h-8 items-center space-x-2">
                    {startDate && endDate ? (
                      <>
                        <p>
                          {startDate.toLocaleDateString()} ~{" "}
                          {endDate.toLocaleDateString()}
                        </p>
                        <p className="inline-block rounded-lg border border-[#FFA500] bg-[#FFDB99] px-2 text-center">
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

                {/* 업종 선택 */}
                <div className="mt-8 w-full">
                  <h2 className="text-xl font-semibold">업종</h2>
                  <div className="mt-2 flex flex-wrap gap-2 text-[15px]">
                    {["귤", "당근", "감자", "마늘", "양파", "상관없음"].map(
                      (type) => (
                        <button
                          key={type}
                          onClick={() => handleIndustryClick(type)}
                          className={`inline-block rounded-xl border border-[#FFA500] px-2 py-1 text-center ${
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

                {/* 숙식 제공 여부 선택 */}
                <div className="mt-8 w-full">
                  <h2 className="text-xl font-semibold">숙식 제공 여부</h2>
                  <div className="mt-2 flex flex-wrap gap-2 text-[15px]">
                    <button
                      onClick={() => handleAccommodationClick("식사")}
                      className={`inline-block rounded-xl border border-[#FFA500] px-2 py-1 text-center ${
                        provideMeal
                          ? "bg-[#FFDB99] text-black"
                          : "bg-white text-black"
                      }`}
                    >
                      식사
                    </button>
                    <button
                      onClick={() => handleAccommodationClick("숙소")}
                      className={`inline-block rounded-xl border border-[#FFA500] px-2 py-1 text-center ${
                        provideLodging
                          ? "bg-[#FFDB99] text-black"
                          : "bg-white text-black"
                      }`}
                    >
                      숙소
                    </button>
                    <button
                      onClick={() => handleAccommodationClick("상관없음")}
                      className={`inline-block rounded-xl border border-[#FFA500] px-2 py-1 text-center ${
                        isNoPreferenceSelected
                          ? "bg-[#FFDB99] text-black"
                          : "bg-white text-black"
                      }`}
                    >
                      상관없음
                    </button>
                  </div>
                </div>

                {/* 근무형태 선택 */}
                <div className="mt-8 w-full">
                  <h2 className="text-xl font-semibold">근무형태</h2>
                  <div className="mt-2 flex flex-wrap gap-2 text-[15px]">
                    {["주5일", "격일근무", "격주근무", "상관없음"].map(
                      (type) => (
                        <button
                          key={type}
                          onClick={() => handleWorkTypeClick(type)}
                          className={`inline-block rounded-xl border border-[#FFA500] px-2 py-1 text-center ${
                            selectedWorkTypes.includes(type) ||
                            (type === "상관없음" && isNoWorkTypeSelected)
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
              </div>
            )}

            {/* AI 추천 섹션 */}
            {contentChanged && (
              <>
                <div className="mt-8 flex w-full flex-col items-center justify-center p-5 font-Pretendard">
                  <h className="text-[20px] font-[600]">
                    제주에서 어떤 여행을 꿈꾸고 계시나요?
                  </h>
                  <h className="mt-2 text-[13px] font-[300]">
                    어떠한 내용이라도 좋아요. 자유롭게 작성해주세요.
                  </h>

                  <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="ex) 안녕하세요! 저는 제주도에서 한 달 동안 지내면서 귤밭에서 일하고 싶습니다. 주변에 멋진 카페와 바다가 있으면 좋겠고, 쉬는 날에는 한라산 등반을 하고 싶습니다. 이러한 라이프스타일을 실현할 수 있는 일자리와 업체를 추천해주시면 감사하겠습니다. 제주도에서의 한 달이 특별한 경험이 되기를 기대합니다..."
                    className="mt-10 h-[392px] w-full rounded-2xl border px-4 py-3 placeholder:text-[15px] placeholder:leading-7"
                  />
                </div>

                <div className="flex w-full flex-col px-7">
                  <h className="text-[18px] font-[500]">추천 키워드</h>
                  <h className="text-[13px] font-[300]">
                    이런 내용이 들어가면 좋아요!
                  </h>
                  <div className="mt-2 flex flex-wrap gap-2 text-[15px]">
                    {[
                      "#귤",
                      "#핫플",
                      "#노을",
                      "#맛집",
                      "#낭만",
                      "#시골",
                      "#야경",
                      "#공항근처",
                    ].map((type) => (
                      <div
                        key={type}
                        className="inline-block rounded-xl border border-[#FFA500] bg-[#FFDB99] px-2 py-1 text-center"
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                  {error && <p className="mt-4 text-red-500">{error}</p>}
                </div>
              </>
            )}

            {/* 버튼 */}
            <div className="mt-16 flex justify-center space-x-3">
              {/* 초기화 버튼 */}
              <button
                onClick={handleReset}
                className="flex h-12 w-40 cursor-pointer items-center justify-center gap-3 rounded-2xl bg-[#E8E8E8] px-6 py-[1.1rem]"
              >
                <img src={refresh} alt="Refresh" className="w-[1.2rem]" />
                <p className="text-lg font-normal">초기화</p>
              </button>

              {/* 다음/추천 버튼 */}
              <button
                onClick={handleClick}
                className={`flex h-12 w-40 cursor-pointer items-center justify-center rounded-2xl text-xl text-white ${
                  isPeriodValid() || contentChanged
                    ? "bg-[#FFA500]"
                    : "cursor-not-allowed bg-gray-400"
                }`}
                disabled={!isPeriodValid() && !contentChanged}
              >
                {contentChanged ? "추천받기" : "다음"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AiPage;

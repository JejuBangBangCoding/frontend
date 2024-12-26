import React, { useEffect, useState } from "react";
import axios from "axios";
import test from "../assets/images/test.svg";
import { useNavigate } from "react-router-dom";
import star from "../assets/images/star.svg";

const RecruitmentList = ({ selectedRegion }) => {
  const [items, setItems] = useState([]); // 농장 또는 명소 리스트
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("일하젠"); // 현재 활성화된 탭
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRegion) {
      setItems([]); // 지역 변경 시 리스트 초기화
      setError(null); // 에러 초기화
      fetchItems();
    }
  }, [selectedRegion, activeTab]);

  const fetchItems = async () => {
    setLoading(true);
    setError(null); // 에러 초기화
    try {
      let response;
      if (activeTab === "일하젠") {
        response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/board/location/`,
          {
            params: { location: selectedRegion, category: activeTab },
          }
        );
      } else if (activeTab === "놀젠") {
        response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/attraction/location/`,
          {
            params: { location: selectedRegion },
          }
        );
      }
    
      // 응답 데이터 확인 및 설정
      if (response.data && Array.isArray(response.data)) {
        setItems(response.data);
      } else {
        setItems([]); // 예상치 못한 응답 형식일 경우 초기화
      }
    } catch (err) {
      console.error("Error fetching items:", err);
      setError(
        activeTab === "일하젠"
          ? "해당 지역의 농장 정보가 없습니다."
          : "해당 지역의 명소 정보가 없습니다."
      ); // 에러 메시지 설정
    } finally {
      setLoading(false);
    }
    
  };

  const handleItemClick = (item) => {
    if (activeTab === "일하젠") {
      navigate("/farmdetailedpage", { state: { board_id: item.id } });
    } else if (activeTab === "놀젠") {
      navigate("/attractiondetailedpage", {
        state: { attraction_id: item.id },
      });
    }
  };

  return (
    <div className="border-bg-[#FFA500] flex h-full flex-col rounded-t-2xl border-[1px] bg-white shadow">
      {/* 모집 리스트 - 헤더 */}
      <div className="flex justify-center">
        <div
          className={`flex-1 border-b py-3 text-sm text-center ${
            activeTab === "일하젠" ? "border-[#FF710A] text-[#FF710A]" : ""
          }`}
        >
          <button onClick={() => setActiveTab("일하젠")}>일하젠</button>
        </div>
        <div
          className={`flex-1 border-b py-3 text-sm text-center ${
            activeTab === "놀젠" ? "border-[#FF710A] text-[#FF710A]" : ""
          }`}
        >
          <button onClick={() => setActiveTab("놀젠")}>놀젠</button>
        </div>
      </div>

      {/* 모집 리스트 - 내용 */}
      <div className="custom-scrollbar scrollbar scrollbar-thumb-orange-500 scrollbar-track-gray-100 flex-1 overflow-y-auto p-4">
        <div className="h-[1rem]">
          {/* h-[1rem]은 필수 - 이슈1 확인 (삭제 금지) */}
          {loading && <p className="mt-32 text-center text-gray-500">로딩 중...</p>}
          {error && <p className="mt-32 text-center text-red-500">{error}</p>}
          {!loading && !error && items.length === 0 && (
            <div className="mt-32 flex justify-center">
              <p className="text-center text-gray-500">
                {activeTab === "일하젠"
                  ? "해당 지역의 농장 정보가 없습니다."
                  : "해당 지역의 명소 정보가 없습니다."}
              </p>
            </div>
          )}

          {activeTab === "일하젠" && (
            <div>
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="mb-3 flex cursor-pointer rounded-lg"
                >
                  <div className="relative mr-3">
                    <img
                      src={
                        `${process.env.REACT_APP_BACKEND_URL}${item.image}` || test
                      }
                      alt={`Farm ${item.farm_name} 사진`}
                      className="h-24 w-32 rounded-lg object-cover"
                    />
                    {item.is_advertised && (
                      <div className="absolute top-1 right-1 bg-white rounded-lg px-1.5 py-1 shadow border-[1px] border-[#FFA500]">
                        <p className="text-[0.6rem] font-semibold text-gray-700">
                          광고
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex w-full">
                    <div className="flex-col flex-1">
                      <p className="truncate text-[15px] font-bold">{item.title}</p>
                      <div className="text-[13px] my-1">
                        <span>{item.farm_name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[12px] font-light">
                          {item.period_start} ~ {item.period_end}
                        </p>
                        {item.workdays && (
                          <span className="text-[12px]">{item.workdays.join(", ")}</span>
                        )}
                      </div>
                      <div className="flex justify-between mt-1">
                        <p className="font-bold text-[13px] text-[rgb(255,165,0)]">
                          시급 {item.hourly}원
                        </p>
                        <p className="border-[#cecdcd] rounded-lg border px-[0.3rem] py-[0.15rem] text-[11px] text-[#868686] font-normal">
                          #{item.welfare}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === "놀젠" && (
            <div>
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className="mb-3 flex cursor-pointer rounded-lg"
                >
                  <div className="flex w-full">
                    <div className="flex flex-col flex-1 justify-around">
                      <p className="truncate text-[15px]">{item.name}</p>
                      <div className="text-[15px] font-bold">
                        <span>{item.address}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="flex text-[12px] font-light">
                          <img src={star} alt="Star" className="w-3 mr-1" />
                          {item.rating}
                        </p>
                        <p className="border-[#cecdcd] rounded-lg border px-[0.3rem] py-[0.15rem] text-[11px] text-[#868686] font-normal mr-3">
                          #{item.tags}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    {/* 명소 이미지 */}
                    <img
                      src={
                        `${process.env.REACT_APP_BACKEND_URL}${item.image}` || test
                      }
                      alt={`Attraction ${item.name} 사진`}
                      className="h-24 w-32 rounded-lg object-cover"
                    />
                    {/* 광고 문구 */}
                    {item.is_advertised && (
                      <div className="absolute top-1 right-1 bg-white rounded-lg px-1.5 py-1 shadow border-[1px] border-[#FFA500]">
                        <p className="text-[0.6rem] font-semibold text-gray-700">
                          광고
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="h-1">
            {/* 마지막 리스트 아이템을 보이게 하기 위한 div(삭제 금지) */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentList;

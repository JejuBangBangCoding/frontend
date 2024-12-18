import React, { useEffect, useState } from "react";
import axios from "axios";
import test from "../assets/images/test.svg";
import { useNavigate } from "react-router-dom";

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
    try {
      let response;
      if (activeTab === "일하젠") {
        // "일하젠" 탭일 경우 농장 리스트 fetch
        response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/board/location/`,
          {
            params: { location: selectedRegion, category: activeTab },
          },
        );
      } else if (activeTab === "놀젠") {
        // "놀젠" 탭일 경우 명소 리스트 fetch
        response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/attraction/location/`,
          {
            params: { location: selectedRegion },
          },
        );
      }
      setItems(response.data);
    } catch (err) {
      console.error("Error fetching items:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("데이터를 불러오지 못했습니다.");
      }
      setItems([]); // 에러 발생 시 리스트 초기화
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
    <div className="border-bg-[#FFA500] mt-5 flex h-full flex-col rounded-t-3xl border-[1px] bg-white shadow">
      {/* 모집 리스트 - 헤더 */}
      <div className="flex justify-center">
        <div
          className={`flex-1 border-b py-4 text-center text-xl ${
            activeTab === "일하젠" ? "border-[#FF710A] text-[#FF710A]" : ""
          }`}
        >
          <button onClick={() => setActiveTab("일하젠")}>일하젠</button>
        </div>
        <div
          className={`flex-1 border-b py-4 text-center text-xl ${
            activeTab === "놀젠" ? "border-[#FF710A] text-[#FF710A]" : ""
          }`}
        >
          <button onClick={() => setActiveTab("놀젠")}>놀젠</button>
        </div>
      </div>

      {/* 모집 리스트 - 내용 */}
      <div className="custom-scrollbar scrollbar scrollbar-thumb-orange-500 scrollbar-track-gray-100 flex-1 overflow-y-auto p-6">
        <div className="h-[1rem]">
          {/* h-[1rem]은 필수 - 이슈1 확인 (삭제 금지)  */}
          {loading && <p className="text-center text-gray-500">로딩 중...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && items.length === 0 && (
            <div className="mt-32 flex justify-center">
              <p className="text-center text-gray-500">
                {activeTab === "일하젠"
                  ? "해당 지역의 농장 정보가 없습니다."
                  : "해당 지역의 명소 정보가 없습니다."}
              </p>
            </div>
          )}
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="mb-4 flex cursor-pointer rounded-lg"
            >
              <img
                src={
                  `${process.env.REACT_APP_BACKEND_URL}${item.image}` || test
                }
                alt={`${activeTab === "일하젠" ? "Farm" : "Attraction"} ${
                  activeTab === "일하젠" ? item.farm_name : item.name
                } 사진`}
                className="mr-4 h-24 w-24 rounded-xl object-cover"
              />

              <div className="flex w-full justify-between">
                <div className="flex flex-col">
                  <p className="mb-4 truncate text-xl font-bold">
                    {activeTab === "일하젠" ? item.title : item.name}
                  </p>

                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="text-lg">
                      {activeTab === "일하젠" ? (
                        <span>{item.farm_name}</span>
                      ) : (
                        <span className="text-base">{item.address}</span>
                      )}
                    </div>
                    {activeTab === "일하젠" && item.workdays && (
                      <span>{item.workdays.join(", ")}</span>
                    )}
                  </div>

                  <div className="flex">
                    {activeTab === "일하젠" ? (
                      <div className="flex w-full items-center justify-between">
                        {/* 시급 / 복지 */}
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[#FFA500]">
                            시급 {item.hourly}원
                          </p>
                          <p className="border-gray rounded-xl border px-2 py-1 text-[12px] font-normal">
                            #{item.welfare}
                          </p>
                        </div>

                        {/* 근무 기간 */}
                        <div className="flex justify-end rounded p-1">
                          <p className="text-[12px] font-light">
                            {item.period_start} ~ {item.period_end}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[#FFA500]">
                            평점 {item.rating}
                          </p>
                          <p className="border-gray rounded-xl border px-2 py-1 text-[12px] font-normal">
                            {item.tags && item.tags.length > 0
                              ? `#${item.tags.join(" #")}`
                              : ""}
                          </p>
                        </div>
                        <div className="flex justify-end rounded p-1">
                          <p className="">{item.is_advertised ? "광고" : ""}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruitmentList;

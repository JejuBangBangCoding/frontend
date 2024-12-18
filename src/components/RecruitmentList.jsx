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
    <div className="border-bg-[#FFA500] mt-5 rounded-t-3xl border-[1px] bg-white shadow">
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
      <div className="custom-scrollbar h-[22rem] overflow-y-auto p-6">
        {loading && <p className="text-center text-gray-500">로딩 중...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && items.length === 0 && (
          <div className="mt-5 flex h-full items-center justify-center">
            <p className="text-center text-gray-500">
              {activeTab === "일하젠"
                ? "지역을 선택해주세요."
                : "지역을 선택해주세요."}
            </p>
          </div>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="mb-3 flex cursor-pointer"
          >
            <img
              src={item.image_url || test}
              alt={`${activeTab === "일하젠" ? "Farm" : "Attraction"} ${item.id}`}
              className="mr-4 h-24 w-24 rounded-xl object-cover"
            />
            <div className="flex w-full justify-between bg-red-100">
              <div className="flex flex-col justify-around">
                <p className="truncate text-xl font-bold">
                  {activeTab === "일하젠" ? item.title : item.name}
                </p>
                <p className="text-sm">
                  {activeTab === "일하젠" ? item.farm_name : item.address}
                </p>

                {activeTab === "일하젠" ? (
                  <>
                    <p className="border-gray w-fit rounded-xl border px-2 py-1 font-light">
                      #{item.welfare}
                    </p>
                    <p className="font-bold text-[#FFA500]">
                      시급 {item.hourly}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="border-gray w-fit rounded-xl border px-2 py-1 font-light">
                      {item.tags && item.tags.length > 0
                        ? `#${item.tags.join(" #")}`
                        : ""}
                    </p>
                    <p className="font-bold text-[#FFA500]">
                      평점 {item.rating}
                    </p>
                  </>
                )}
              </div>
              <div className="flex flex-col justify-end">
                {activeTab === "일하젠" ? (
                  <>
                    <p className="truncate text-[0.6rem] font-thin">
                      {item.period_start} ~ {item.period_end}
                    </p>
                    <p className="">{item.workdays}+</p>
                  </>
                ) : (
                  <>
                    <p className="">{item.is_advertised ? "광고" : ""}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitmentList;

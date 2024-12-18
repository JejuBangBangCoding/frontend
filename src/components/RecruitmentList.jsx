import React, { useEffect, useState } from "react";
import axios from "axios";
import test from "../assets/images/test.svg";
import { useNavigate } from "react-router-dom";

const RecruitmentList = ({ selectedRegion }) => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("일하젠");
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRegion) {
      setFarms([]);
      setError(null);
      fetchFarms();
    }
  }, [selectedRegion, activeTab]);

  const fetchFarms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/board/location/`,
        {
          params: { location: selectedRegion, category: activeTab },
        },
      );
      setFarms(response.data);
    } catch (err) {
      console.error("Error fetching farms:", err);
      if (err.response) {
        console.error("Server response:", err.response.data);
      }
      setError("데이터를 불러오지 못했습니다.");
      setFarms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFarmClick = (farm) => {
    navigate("/farmdetailedpage", { state: { board_id: farm.id } });
  };

  return (
    <div className="border-bg-[#FFA500] mt-5 rounded-t-3xl border-[1px] bg-white shadow">
      {/* 모집 리스트 - 헤더 */}
      <div className="flex justify-center">
        <div
          className={`flex-1 border-b py-4 text-center text-xl ${activeTab === "일하젠" ? "border-[#FF710A] text-[#FF710A]" : ""}`}
        >
          <button onClick={() => setActiveTab("일하젠")}>일하젠</button>
        </div>
        <div
          className={`flex-1 border-b py-4 text-center text-xl ${activeTab === "놀젠" ? "border-[#FF710A] text-[#FF710A]" : ""}`}
        >
          <button>놀젠</button>
        </div>
      </div>

      {/* 모집 리스트 - 내용 */}
      <div className="custom-scrollbar h-[22rem] overflow-y-auto p-6">
        {loading && <p className="text-center text-gray-500">로딩 중...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && farms.length === 0 && (
          <div className="mt-5 flex h-[16rem] items-center justify-center">
            <p className="text-center text-gray-500">지역을 선택해주세요.</p>
          </div>
        )}

        {farms.map((farm) => (
          <div
            key={farm.id}
            onClick={() => handleFarmClick(farm)}
            className="mb-3 flex cursor-pointer"
          >
            <img
              src={farm.image_url || test}
              alt={`Farm ${farm.id}`}
              className="mr-4 rounded-xl"
            />
            <div className="flex w-full justify-between">
              <div className="flex flex-col justify-around">
                <p className="text-sm">{farm.farm_name}</p>
                <p className="truncate text-xl font-bold">{farm.title}</p>
                <p className="border-gray w-fit rounded-xl border px-2 py-1 font-light">
                  #{farm.welfare}
                </p>
                <p className="font-bold text-[#FFA500]">시급 {farm.hourly}</p>
              </div>
              <div className="flex-col justify-items-end">
                <p className="truncate text-[0.6rem] font-thin">
                  {farm.period_start} ~ {farm.period_end}
                </p>
                <p className="">{farm.workdays}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitmentList;

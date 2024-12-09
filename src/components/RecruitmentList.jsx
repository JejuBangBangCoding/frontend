import React, { useEffect, useState } from "react";
import axios from "axios";
import list1 from "../assets/images/list1.svg";
import { useNavigate } from "react-router-dom";

const RecruitmentList = ({ selectedRegion }) => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedRegion) {
      fetchFarms();
    }
  }, [selectedRegion]);

  const fetchFarms = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/board/location/`,
        {
          params: { location: selectedRegion },
        },
      );
      setFarms(response.data);
    } catch (err) {
      console.error("Error fetching farms:", err);
      if (err.response) {
        console.error("Server response:", err.response.data);
      }
      setError("데이터를 불러오지 못했습니다. RecruitmentList.jsx");
    } finally {
      setLoading(false);
    }
  };

  const handleFarmClick = (farm) => {
    navigate(`/farm/${farm.id}`, { state: { board_id: farm.id } });
  };

  return (
    <div className="mx-7 mt-7 h-[22rem] rounded-3xl bg-white p-4">
      {/* 모집 리스트 - 헤더 */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold">
          {selectedRegion ? `${selectedRegion} 모집 리스트` : "모집 리스트"}
        </h2>
      </div>
      <div className="flex justify-around">
        <button className="font-[400]">일하젠</button>
        <button className="font-[400]">놀젠</button>
      </div>
      {/* 세로선 */}
      <div className="mb-2 mt-3 h-[1px] w-full bg-gray-300"></div>

      {/* 모집 리스트 - 내용 */}
      <div className="custom-scrollbar h-[17rem] overflow-y-auto">
        {loading && <p className="text-center text-gray-500">로딩 중...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && farms.length === 0 && (
          <div className="mt-5 flex h-[14rem] items-center justify-center">
            <p className="text-center text-gray-500">지역을 선택해주세요.</p>
          </div>
        )}

        {farms.map((farm) => (
          <div
            key={farm.id}
            onClick={() => handleFarmClick(farm)}
            className="mt-1 flex cursor-pointer p-1"
          >
            <img
              src={farm.image_url || list1}
              alt={`Farm ${farm.id}`}
              className="mr-4 w-[3.5rem]"
            />
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[0.9rem] font-bold">{farm.title}</p>
              </div>
              <p className="mb-[0.2rem] text-[0.8rem] font-thin">
                {farm.location}
              </p>
            </div>
            <div className="flex flex-col items-end justify-end text-[0.7rem]">
              <p className="font-medium">농장 이름: {farm.farm_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitmentList;

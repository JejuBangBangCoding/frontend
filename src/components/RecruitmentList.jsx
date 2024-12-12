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
    navigate("/farmdetailedpage", { state: { board_id: farm.id } });
  };

  return (
    <div className="mx-7 mt-5 h-[28rem] rounded-3xl bg-white p-4">
      {/* 모집 리스트 - 헤더 */}
      <div className="flex items-center justify-between"></div>
      <div className="flex justify-around">
        <button className="text-xl font-semibold">일하젠</button>
        <button className="text-xl font-semibold">놀젠</button>
      </div>

      {/* 가로선 */}
      <div className="my-3 h-[1px] w-full bg-gray-300"></div>

      {/* 모집 리스트 - 내용 */}
      <div className="custom-scrollbar h-[23rem] overflow-y-auto">
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
              className="mr-4 w-24"
            />
            <div className="">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-lg font-bold">{farm.title}</p>
                <p className="text-sm font-light">{farm.workdays}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-light">{farm.farm_name}</p>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-xs rounded-xl border-[1px] border-[#FFA500] bg-white py-1 px-2">{farm.welfare} </p>
                <div className="">
                  <p className="text-sm text-right">시급 {farm.hourly}원</p>
                  <p className="font-thin text-xs">{farm.period_start} ~ {farm.period_end}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitmentList;

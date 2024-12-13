import React, { useEffect, useState } from "react";
import axios from "axios";
import test from "../assets/images/test.svg";
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
    <div className="rounded-t-3xl shadow bg-white border-bg-[#FFA500] border-[1px]">
      {/* 모집 리스트 - 헤더 */}
      <div className="flex justify-center">
        <div className="flex-1 text-center text-xl text-[#FF710A] border-b border-[#FF710A] py-4">
          <button>일하젠</button>
        </div>
        <div className="flex-1 text-center text-xl border-b py-4">
          <button>놀젠</button>
        </div>
      </div>

      {/* 모집 리스트 - 내용 */}
      <div className="p-6 custom-scrollbar h-[calc(100vh-20rem)] overflow-y-auto">
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
            className="flex mb-3 cursor-pointer"
          >
            <img
              src={farm.image_url || test}
              alt={`Farm ${farm.id}`}
              className="mr-4 rounded-xl"
            />
            <div className="flex justify-between w-full">
              <div className="flex flex-col justify-around">
                <p className="text-sm">{farm.farm_name}</p>
                <p className="font-bold text-xl truncate">{farm.title}</p>
                <p className="font-light border border-gray py-1 px-2 rounded-xl w-fit">#{farm.welfare}</p>
                <p className="font-bold text-[#FFA500]">시급 {farm.hourly}</p>
              </div>
              <div className="flex-col justify-items-end">
                <p className="text-[0.6rem] font-thin truncate">{farm.period_start} ~ {farm.period_end}</p>
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

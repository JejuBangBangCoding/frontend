import React, { useState } from "react";
import axios from "axios";

function MainPage() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 제주도의 지역 목록
  const regions = [
    { id: 1, name: "애월" },
    { id: 2, name: "구좌" },
    { id: 3, name: "제주시" },
    { id: 4, name: "서귀포" },
  ];

  // 지역 클릭 핸들러 함수
  const handleRegionClick = async (region) => {
    setSelectedRegion(region);
    setLoading(true);
    setError(null);

    try {
      // 백엔드에 GET 요청 보내기
      const response = await axios.get(
        "http://52.78.130.126:8000/api/board/location/",
        {
          params: { location: region.name },
        },
      );

      // 받은 데이터를 farms에 저장
      setFarms(response.data);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      setError(
        "데이터를 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-green-600">Main</h1>
      <div className="mt-6 space-y-4">
        {regions.map((region) => (
          <button
            key={region.id}
            onClick={() => handleRegionClick(region)}
            className="w-full rounded bg-blue-500 px-4 py-2 text-white"
          >
            {region.name}
          </button>
        ))}
      </div>

      {loading && (
        <p className="mt-4 text-blue-500">농장 정보를 불러오는 중입니다...</p>
      )}

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {selectedRegion && farms.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">
            {selectedRegion.name} 지역의 농장 리스트
          </h2>
          <ul className="mt-2 space-y-2">
            {farms.map((farm) => (
              <li key={farm.id} className="rounded border bg-white p-4 shadow">
                <h3 className="text-lg font-bold">{farm.title}</h3>
                <p>농장 이름: {farm.farm_name}</p>
                <p>위치: {farm.location}</p>
                {farm.image_url && (
                  <img
                    src={farm.image_url}
                    alt={farm.title}
                    className="mt-2 h-40 w-full rounded object-cover"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedRegion && farms.length === 0 && !loading && !error && (
        <p className="mt-4 text-gray-600">
          해당 지역에 대한 농장 정보가 없습니다.
        </p>
      )}
    </div>
  );
}

export default MainPage;

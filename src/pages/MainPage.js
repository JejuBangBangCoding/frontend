import React from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  const regions = [
    { id: 1, name: "제주시", farms: "제주시 농장 정보" },
    { id: 2, name: "서귀포", farms: "서귀포 농장 정보" },
    { id: 3, name: "중문", farms: "중문 농장 정보" },
    { id: 4, name: "애월", farms: "애월 농장 정보" },
  ];

  const handleRegionClick = (region) => {
    navigate("/aipage", { state: { region } });
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
    </div>
  );
}

export default MainPage;

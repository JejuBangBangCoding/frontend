import React from "react";
import { useNavigate } from "react-router-dom";

function FarmListPage() {
  const navigate = useNavigate();

  const farms = [
    { id: 1, name: "농장 1", description: "제주도 농장 1 설명" },
    { id: 2, name: "농장 2", description: "제주도 농장 2 설명" },
    { id: 3, name: "농장 3", description: "제주도 농장 3 설명" },
    { id: 4, name: "농장 4", description: "제주도 농장 4 설명" },
    { id: 5, name: "농장 5", description: "제주도 농장 5 설명" },
  ];

  const handleFarmClick = (farm) => {
    navigate("/farmdetailedpage", { state: { farm } });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-purple-600">FarmListPage</h1>
      <div className="bg-yellow-200 p-5">
        {farms.map((farm) => (
          <div
            key={farm.id}
            className="mb-4 cursor-pointer rounded bg-white p-4 shadow"
            onClick={() => handleFarmClick(farm)}
          >
            <h2 className="text-2xl font-semibold">{farm.name}</h2>
            <p>{farm.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FarmListPage;

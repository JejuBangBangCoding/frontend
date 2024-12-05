import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function FarmListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { recommendations } = location.state || {};

  const handleFarmClick = (farm) => {
    console.log(farm.id);
    navigate("/farmdetailedpage", { state: { board_id: farm.id } });
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-purple-600">FarmListPage</h1>
      {recommendations && recommendations.length > 0 ? (
        <ul className="mt-6 space-y-4">
          {recommendations.map((farm) => (
            <li
              key={farm.id}
              onClick={() => handleFarmClick(farm)}
              className="cursor-pointer rounded border bg-white p-4 shadow hover:bg-gray-100"
            >
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
              <p>매칭 점수: {farm.match_score}</p>
              <p>추천 이유: {farm.reason}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-gray-600">추천된 농장 정보가 없습니다.</p>
      )}
    </div>
  );
}

export default FarmListPage;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Card from "../components/Card"; // 방금 작성한 카드 컴포넌트를 가져옵니다.

function FarmListPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { recommendations } = location.state || [];

  const handleFarmClick = (farm) => {
    navigate("/farmdetailedpage", { state: { board_id: farm.id } });
  };

  return (
    <>
      <Header showProfile={true} showBackButton={true} />
      <div className="mt-6 flex flex-wrap justify-center gap-6">
        {recommendations && recommendations.length > 0 ? (
          recommendations.map((farm) => (
            <Card
              key={farm.id}
              farm={farm}
              onClick={() => handleFarmClick(farm)}
            />
          ))
        ) : (
          <p className="text-gray-600">추천된 농장 정보가 없습니다.</p>
        )}
      </div>
    </>
  );
}

export default FarmListPage;

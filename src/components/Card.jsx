import React from "react";

const Card = ({ farm, onClick }) => {
  const imageUrl = farm.image_url
    ? `${process.env.REACT_APP_BACKEND_URL}${farm.image_url}`
    : "https://via.placeholder.com/150";

  return (
    <div className="w-80 overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
      {/* 이미지 */}
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={farm.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* 카드 본문 */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{farm.title}</h3>
        <p className="text-sm text-gray-600">농장 이름: {farm.farm_name}</p>
        <p className="text-sm text-gray-600">위치: {farm.location}</p>
        <p className="text-sm text-gray-600">매칭 점수: {farm.match_score}</p>
        <p className="mt-2 text-sm text-gray-500">{farm.reason}</p>
      </div>

      {/* 카드 하단 */}
      <div className="border-t p-4">
        <button
          onClick={onClick}
          className="w-full rounded-lg bg-blue-500 py-2 text-center text-white hover:bg-blue-600"
        >
          상세 보기
        </button>
      </div>
    </div>
  );
};

export default Card;

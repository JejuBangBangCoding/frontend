import React, { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ farm, onClick }) => {
  const [tags, setTags] = useState([]);
  const imageUrl = farm.image_url
    ? `${process.env.REACT_APP_BACKEND_URL}${farm.image_url}`
    : "https://via.placeholder.com/150";

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/board/detail/?board_id=${farm.id}`,
        );
        console.log("API response data:", response.data); // 응답 데이터 확인
        setTags(response.data[0]?.tag || []); // 응답 구조에 맞게 수정
      } catch (error) {
        console.error("Error fetching tags:", error);
        setTags([]); // 오류 발생 시 빈 배열로 설정
      }
    };

    if (farm.id) {
      fetchTags();
    }
  }, [farm.id]);

  useEffect(() => {
    console.log("Updated tags:", tags); // tags가 업데이트된 후 확인
  }, [tags]);

  return (
    <div className="">
      <div className="mb-3 text-center">
        <h1 className="text-2xl font-[700]">{farm.farm_name}</h1>
        <p className="text-sm text-gray-600">⭐{farm.match_score}</p>
      </div>

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
          <p className="text-sm text-gray-600">{farm.location}</p>
          <p className="text-sm text-gray-500">{farm.reason}</p>
          <div className="mt-10 flex flex-wrap gap-2">
            {tags.length > 0 ? (
              tags.map((tag, index) => (
                <div
                  key={index}
                  className="inline-block rounded-xl border border-[#FFA500] bg-[#FFDB99] px-2 py-1 text-sm text-gray-800"
                >
                  #{tag}
                </div>
              ))
            ) : (
              <p className="text-sm">정보 없음</p>
            )}
          </div>
        </div>

        {/* 카드 하단 */}
        <div className="border-t p-4">
          <button
            onClick={onClick}
            className="w-full rounded-lg bg-[#FFA500] py-2 text-center text-white hover:bg-[#FF8C00]"
          >
            상세 보기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

import React, { useEffect, useState } from "react";
import axios from "axios";
import star from "../assets/images/star.svg";
import location from "../assets/images/location.svg";
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
    <>
      {/* 농장명과 별점 */}
      <div className="text-center">
        <p className="text-sm">{farm.reason}</p>
        <h1 className="text-2xl font-[700] my-1">{farm.farm_name}</h1>
        <p className="flex text-sm justify-center items-center">
          <img src={star} alt="" className="" />
          {farm.match_score}
        </p>
      </div>

      {/* 카드 */}
      <div className="shadow my-5">
        {/* 이미지  */}
        <div className="">
          <img
            src={imageUrl}
            alt={farm.title}
            className="rounded-3xl"
          />
        </div>
      </div>

      {/* 상세 설명 */}
      <div className="justify-items-center">
        <h3 className="text-lg font-bold text-gray-800">{farm.title}</h3>
        <p className="flex text-sm gap-1 mt-1 mb-4">
          <img src={location} alt="location" className="" />
          {farm.location}
        </p>
        <div className="flex flex-wrap gap-2">
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

      {/* 상세 보기 버튼 */}
      <div className="">
        <button
          onClick={onClick}
          className="w-full rounded-xl bg-[#FFA500] py-2 text-center text-white hover:bg-[#FF8C00] my-5"
        >
          상세 보기
        </button>
      </div>
      
    </>
  );
};

export default Card;

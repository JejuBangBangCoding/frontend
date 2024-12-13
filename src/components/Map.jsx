import React, { useState } from "react";
import map from "../assets/images/map.svg";

const Map = ({ onRegionClick }) => {
  const [selectedRegion, setSelectedRegion] = useState(null); // 선택된 지역 상태

  const handleRegionClick = (regionName) => {
    setSelectedRegion(regionName); // 선택된 지역 업데이트
    onRegionClick(regionName); // 부모 컴포넌트 콜백 호출
  };

  const regions = [
    { name: "한경면", left: "13%", top: "67%" },
    { name: "한림읍", left: "22%", top: "53%" },
    { name: "애월읍", left: "33%", top: "42%" },
    { name: "제주시", left: "46%", top: "32%" },
    { name: "조천읍", left: "63%", top: "25%" },
    { name: "구좌읍", left: "78%", top: "18%" },
    { name: "대정읍", left: "18%", top: "78%" },
    { name: "안덕면", left: "29%", top: "71%" },
    { name: "중문", left: "41%", top: "68%" },
    { name: "서귀포시", left: "53%", top: "63%" },
    { name: "남원읍", left: "66%", top: "58%" },
    { name: "표선면", left: "78%", top: "47%" },
    { name: "성산읍", left: "84%", top: "33%" },
  ];

  return (
    <div className="relative w-full">
      <img src={map} alt="Map" className="w-full h-full object-cover" />

      {regions.map((region) => (
        <p
          key={region.name}
          onClick={() => handleRegionClick(region.name)}
          className={`absolute cursor-pointer text-xl font-black transition-all duration-300 ${
            selectedRegion === region.name
              ? "text-[1.9rem] text-[#FFA500] stroke-black stroke-2"
              : "opacity-50"
          }`}
          style={{
            left: region.left,
            top: region.top,
            transform: "translate(-50%, -50%)",
          }}
        >
          {region.name}
        </p>
      ))}
    </div>
  );
};

export default Map;

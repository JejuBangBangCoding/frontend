import React from "react";
import map1 from "../assets/images/map1.svg";
import map2 from "../assets/images/map2.svg";
import map3 from "../assets/images/map3.svg";
import map4 from "../assets/images/map4.svg";
import map5 from "../assets/images/map5.svg";
import map6 from "../assets/images/map6.svg";
import map7 from "../assets/images/map7.svg";
import map8 from "../assets/images/map8.svg";
import map9 from "../assets/images/map9.svg";
import map10 from "../assets/images/map10.svg";
import map11 from "../assets/images/map11.svg";
import map12 from "../assets/images/map12.svg";
import map13 from "../assets/images/map13.svg";

const Map = ({ onRegionClick }) => {
  return (
    <div className="relative h-[250px] my-5">
      <img
        src={map1}
        alt="한경면"
        className="absolute left-[2rem] top-[8.2rem]"
      />
      <p
        onClick={() => onRegionClick("한경면")}
        className="absolute left-[2.5rem] top-[9.9rem] cursor-pointer text-[1rem] font-thin">
        한경면
      </p>
      <img
        src={map2}
        alt="한림읍"
        className="absolute left-[4rem] top-[5.5rem]"
      />
      <p
        onClick={() => onRegionClick("한림읍")}
        className="absolute left-[5rem] top-[7.5rem] cursor-pointer text-[1rem] font-thin">
        한림읍
      </p>
      <img
        src={map3}
        alt="애월읍"
        className="absolute left-[6.5rem] top-[3rem]"
      />
      <p
        onClick={() => onRegionClick("애월읍")}
        className="absolute left-[8.8rem] top-[5.7rem] cursor-pointer text-[1rem] font-thin"
      >
        애월읍
      </p>
      <img
        src={map4}
        alt="제주시"
        className="absolute left-[11.3rem] top-6"
      />
      <p
        onClick={() => onRegionClick("제주시")}
        className="absolute left-[13.7rem] top-[3.8rem] cursor-pointer text-[1rem] font-thin">
        제주시
      </p>
      <img
        src={map5}
        alt="조천읍"
        className="absolute left-[16.9rem] top-[0.5rem]"
      />
      <p
        onClick={() => onRegionClick("조천읍")}
        className="absolute left-[18.4rem] top-[3.3rem] cursor-pointer text-[1rem] font-thin">
        조천읍
      </p>
      <img
        src={map6}
        alt="구좌읍"
        className="absolute left-[21rem]"
      />
      <p
        onClick={() => onRegionClick("구좌읍")}
        className="absolute left-[22.9rem] top-[2rem] cursor-pointer text-[1rem] font-thin">
        구좌읍
      </p>
      <img
        src={map7}
        alt="대정읍"
        className="absolute left-[1.8rem] top-[12rem]"
      />
      <p
        onClick={() => onRegionClick("대정읍")}
        className="absolute left-[3.2rem] top-[13rem] cursor-pointer text-[1rem] font-thin">
        대정읍
      </p>
      <img
        src={map8}
        alt="안덕면"
        className="absolute left-[6.3rem] top-[10rem]"
      />
      <p
        onClick={() => onRegionClick("안덕면")}
        className="absolute left-[6.5rem] top-[11.3rem] cursor-pointer text-[1rem] font-thin">
        안덕면
      </p>
      <img
        src={map9}
        alt="중문"
        className="absolute left-[9.2rem] top-[9.5rem]"
      />
      <p
        onClick={() => onRegionClick("중문")}
        className="absolute left-[12.2rem] top-[11.8rem] cursor-pointer text-[1rem] font-thin">
        중문
      </p>
      <img
        src={map10}
        alt="서귀포시"
        className="absolute left-[15.5rem] top-[8.8rem]"
      />
      <p
        onClick={() => onRegionClick("서귀포시")}
        className="absolute left-[15.9rem] top-[11.1rem] cursor-pointer text-[0.8rem] font-thin">
        서귀포시
      </p>
      <img
        src={map11}
        alt="남원읍"
        className="absolute left-[17rem] top-[7.6rem]"
      />
      <p
        onClick={() => onRegionClick("남원읍")}
        className="absolute left-[19.2rem] top-[9.5rem] cursor-pointer text-[1rem] font-extralight">
        남원읍
      </p>
      <img
        src={map12}
        alt="표선면"
        className="absolute left-[19.8rem] top-[5.7rem]"
      />
      <p
        onClick={() => onRegionClick("표선면")}
        className="absolute left-[22.3rem] top-[8.4rem] cursor-pointer text-[0.7rem] font-extralight">
        표선면
      </p>
      <img
        src={map13}
        alt="성산읍"
        className="absolute left-[24.5rem] top-[4rem]"
      />
      <p
        onClick={() => onRegionClick("성산읍")}
        className="absolute left-[25.5rem] top-[6rem] cursor-pointer text-[1rem] font-extralight">
        성산읍
      </p>
    </div>
  );
};

export default Map;

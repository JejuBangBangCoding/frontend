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
    <div className="relative h-[200px]">
      <img
        src={map1}
        alt="한경면"
        className="absolute left-[2.5rem] top-24 w-[3rem]"
      />
      <p className="absolute left-[2.9rem] top-[7.1rem] cursor-pointer text-[0.675rem] font-thin">
        한경면
      </p>
      <img
        src={map2}
        alt="한림읍"
        className="absolute left-[4rem] top-[4.3rem] w-[4rem]"
      />
      <p className="absolute left-[4.8rem] top-[5.7rem] cursor-pointer text-[0.675rem] font-thin">
        한림읍
      </p>
      <img
        src={map3}
        alt="애월읍"
        className="absolute left-[5.8rem] top-[2.5rem] w-[6rem]"
      />
      <p
        onClick={() => onRegionClick("애월읍")}
        className="absolute left-[7.5rem] top-[4.4rem] cursor-pointer bg-slate-300 text-[0.675rem] font-thin"
      >
        애월읍
      </p>
      <img
        src={map4}
        alt="제주시"
        className="absolute left-[9.2rem] top-5 w-[5rem]"
      />
      <p className="absolute left-[11rem] top-[3rem] cursor-pointer text-[0.675rem] font-thin">
        제주시
      </p>
      <img
        src={map5}
        alt="조천읍"
        className="absolute left-[13.4rem] top-[0.5rem] w-[3.5rem]"
      />
      <p className="absolute left-[14.6rem] top-[2.5rem] cursor-pointer text-[0.675rem] font-thin">
        조천읍
      </p>
      <img
        src={map6}
        alt="구좌읍"
        className="absolute left-[16.5rem] top-1 w-[5.5rem]"
      />
      <p className="absolute left-[18rem] top-[1.8rem] cursor-pointer text-[0.675rem] font-thin">
        구좌읍
      </p>
      <img
        src={map7}
        alt="대정읍"
        className="absolute left-[2.1rem] top-[8.6rem] w-[3.1rem]"
      />
      <p className="absolute left-[3rem] top-[9.3rem] cursor-pointer text-[0.675rem] font-thin">
        대정읍
      </p>
      <img
        src={map8}
        alt="안덕면"
        className="absolute left-[5.5rem] top-[7.4rem] w-[3.1rem]"
      />
      <p className="absolute left-[5.6rem] top-[8.4rem] cursor-pointer text-[0.675rem] font-thin">
        안덕면
      </p>
      <img
        src={map9}
        alt="중문"
        className="absolute left-32 top-[7rem] w-[4rem]"
      />
      <p className="absolute left-[9.9rem] top-[8.4rem] cursor-pointer text-[0.675rem] font-thin">
        중문
      </p>
      <img
        src={map10}
        alt="서귀포시"
        className="absolute left-[12.2rem] top-[6.5rem] w-[2.3rem]"
      />
      <p className="absolute left-[12.4rem] top-[8.2rem] cursor-pointer text-[0.55rem] font-thin">
        서귀포시
      </p>
      <img
        src={map11}
        alt="남원읍"
        className="absolute left-[13.5rem] top-[5.8rem] w-[4rem]"
      />
      <p className="absolute left-[15rem] top-[7.1rem] cursor-pointer text-[0.675rem] font-extralight">
        남원읍
      </p>
      <img
        src={map12}
        alt="표선면"
        className="absolute left-[15.8rem] top-[4.5rem] w-[4rem]"
      />
      <p className="absolute left-[17.2rem] top-[6rem] cursor-pointer text-[0.5rem] font-extralight">
        표선면
      </p>
      <img
        src={map13}
        alt="성산읍"
        className="absolute left-[19rem] top-[3.1rem] w-[4rem]"
      />
      <p className="absolute left-[19.7rem] top-[4.6rem] cursor-pointer text-[0.675rem] font-extralight">
        성산읍
      </p>
    </div>
  );
};

export default Map;

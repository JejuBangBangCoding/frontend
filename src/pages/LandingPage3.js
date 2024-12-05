import React from "react";
import whiteDot from "../assets/images/whiteDot.svg";
import grayDot from "../assets/images/grayDot.svg";
import smallLogo from "../assets/images/smallLogo.svg";
import leftArrow2 from "../assets/images/leftArrow2.svg";
import { Link } from "react-router-dom";

const LandingPage3 = () => {
  return (
    <>
      <div className="mb-[5.4rem] flex gap-2 self-center pt-12">
        <img src={whiteDot} alt="White Dot" className="w-2" />
        <img src={whiteDot} alt="White Dot" className="w-2" />
        <img src={grayDot} alt="Gray Dot" className="w-2" />
      </div>
      <img
        src={smallLogo}
        alt="Small Logo"
        className="mb-7 w-[5.5rem] self-center"
      />
      <div className="text-center text-[1rem] font-semibold leading-[2.5em]">
        <p className="">'놀앙뭐하젠'은</p>
        <p className="">
          <strong>여행객에게</strong> 제주 여행과 용돈벌이를
        </p>
        <p className="">동시에 할 수 있도록 돕는</p>
      </div>
      <div className="relative mb-[3.1rem] mt-auto">
        <Link to="/LandingPage2" className="">
          <img
            src={leftArrow2}
            alt="Left Arrow2"
            className="absolute left-[0.7rem] w-[1.2rem]"
          />
        </Link>
        <p className="absolute left-[7.4rem] text-[1rem] font-semibold">
          일석이조 서비스인 동시에,
        </p>
      </div>
      <div className="mb-[6.8rem] text-center text-[1rem] font-semibold leading-[2.5em]">
        <p className="">
          <strong>1차 산업 종사자</strong>에게는
        </p>
        <p className="">노동력을 제공받을 수 있도록 돕는 플랫폼입니다.</p>
      </div>
      <Link to="/LoginPage" className="self-center">
        <button className="mb-36 h-10 w-[10rem] rounded-[10px] border-2 border-[#FFA500] text-[0.8rem] font-semibold text-[#FFA500] hover:bg-[#FFA500] hover:text-white hover:shadow-xl">
          시작하기
        </button>
      </Link>
    </>
  );
};

export default LandingPage3;

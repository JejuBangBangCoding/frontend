import React from "react";
import whiteDot from "../assets/images/whiteDot.svg";
import grayDot from "../assets/images/grayDot.svg";
import smallLogo from "../assets/images/smallLogo.svg";
import leftArrow2 from "../assets/images/leftArrow2.svg";
import { Link } from "react-router-dom";

const LandingPage3 = () => {
  return (
    <>
      <div className="mb-20 flex gap-2 self-center pt-12">
        <img src={whiteDot} alt="White Dot" className="w-2" />
        <img src={whiteDot} alt="White Dot" className="w-2" />
        <img src={grayDot} alt="Gray Dot" className="w-2" />
      </div>
      <img
        src={smallLogo}
        alt="Small Logo"
        className="mb-7 self-center w-20"
      />
      <div className="text-center text-[1rem] font-semibold leading-[2.3rem] mb-28">
        <p className="">'놀앙뭐하젠'은</p>
        <p className="">
          <strong>여행객에게</strong> 제주 여행과 용돈벌이를
        </p>
        <p className="">동시에 할 수 있도록 돕는</p>
      <p className="mb-7">일석이조 서비스인 동시에,</p>
      <p className="">
        <strong>1차 산업 종사자</strong>에게는
      </p>
      <p className="">노동력을 제공받을 수 있도록 돕는 플랫폼입니다.</p>
      </div>
      <Link to="/LandingPage2" className="absolute left-3 m-[calc(100vh/2)_0]">
        <img
          src={leftArrow2}
          alt="Left Arrow2"
          className="w-5"
        />
      </Link>
      <Link to="/LoginPage" className="self-center">
        <button className="mt-auto h-11 w-48 rounded-[10px] border-2 border-[#FFA500] text-[0.95rem] font-semibold text-[#FFA500] hover:bg-[#FFA500] hover:text-white hover:shadow-xl">
          시작하기
        </button>
      </Link>
    </>
  );
};

export default LandingPage3;

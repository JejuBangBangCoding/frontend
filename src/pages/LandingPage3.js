import React from "react";
import { useNavigate } from "react-router-dom";
import whiteDot from "../assets/images/whiteDot.svg";
import grayDot from "../assets/images/grayDot.svg";
import smallLogo from "../assets/images/smallLogo.svg";
import leftArrow2 from "../assets/images/leftArrow2.svg";
import { Link } from 'react-router-dom'

const LandingPage3 = () => {
  // const navigate = useNavigate();
  
  return (
    <>
    <div className="flex pt-12 gap-3 self-center">
        <img src={whiteDot} alt="White Dot" className="" />
        <img src={whiteDot} alt="White Dot" className="" />
        <img src={grayDot} alt="Gray Dot" className="" />
    </div>
    <img src={smallLogo} alt="Small Logo" className="self-center pt-28" />
    <div className="relative text-xl text-center pt-8 leading-[2.5em]">
      <p className="">'놀앙뭐하젠'은</p>
      <p className=""><strong>여행객에게</strong> 제주 여행과 용돈벌이를</p>
      <p className="">동시에 할 수 있도록 돕는</p>
      <p className="">일석이조 서비스인 동시에,</p>
      <Link to="/LandingPage2" className="absolute bottom-36 left-[1.4rem] cursor-pointer">
        <img src={leftArrow2} alt="Left Arrow2" className="" />
      </Link>
      <p className="pt-14"><strong>1차 산업 종사자</strong>에게는</p>
      <p className="">노동력을 제공받을 수 있도록 돕는 플랫폼입니다.</p>
    </div>
    <Link to="/LoginPage" className="self-center mt-auto mb-44">
      <button className="w-44 h-12 rounded-[10px] border-2 border-[#FFA500] text-[#FFA500] hover:bg-[#FFA500] hover:text-white hover:shadow-xl">시작하기</button>
    </Link>
  </>
  );
}

export default LandingPage3;

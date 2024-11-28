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
    <div className="flex pt-12 gap-2 self-center mb-[5.4rem]">
        <img src={whiteDot} alt="White Dot" className="w-2" />
        <img src={whiteDot} alt="White Dot" className="w-2" />
        <img src={grayDot} alt="Gray Dot" className="w-2" />
    </div>
    <img src={smallLogo} alt="Small Logo" className="self-center w-[5.5rem] mb-7" />
    <div className="text-[1rem] font-semibold text-center leading-[2.5em]">
      <p className="">'놀앙뭐하젠'은</p>
      <p className=""><strong>여행객에게</strong> 제주 여행과 용돈벌이를</p>
      <p className="">동시에 할 수 있도록 돕는</p>
    </div>
    <div className="relative mt-auto mb-[3.1rem]">
        <Link to="/LandingPage2" className="">
          <img src={leftArrow2} alt="Left Arrow2" className="w-[1.2rem] absolute left-[0.7rem]" />
        </Link>
      <p className="text-[1rem] font-semibold absolute left-[7.4rem]">일석이조 서비스인 동시에,</p>
    </div>
    <div className="text-[1rem] font-semibold text-center leading-[2.5em] mb-[6.8rem]">
      <p className=""><strong>1차 산업 종사자</strong>에게는</p>
      <p className="">노동력을 제공받을 수 있도록 돕는 플랫폼입니다.</p>
    </div>
    <Link to="/LoginPage" className="self-center">
      <button className="w-[10rem] h-10 rounded-[10px] border-2 border-[#FFA500] text-[#FFA500] hover:bg-[#FFA500] text-[0.8rem] font-semibold hover:text-white hover:shadow-xl mb-36">시작하기</button>
    </Link>
  </>
  );
}

export default LandingPage3;

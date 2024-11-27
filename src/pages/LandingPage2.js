import React from "react";
import { useNavigate } from "react-router-dom";
import whiteDot from "../assets/images/whiteDot.svg";
import grayDot from "../assets/images/grayDot.svg";
import smallLogo from "../assets/images/smallLogo.svg";
import leftArrow1 from "../assets/images/leftArrow1.svg";
import rightArrow1 from "../assets/images/rightArrow1.svg";
import scene from "../assets/images/scene.png";
import { Link } from 'react-router-dom'

const LandingPage2 = () => {

  return (
    <>
      <div className="flex pt-12 gap-3 self-center">
        <img src={whiteDot} alt="White Dot" className="" />
        <img src={grayDot} alt="Gray Dot" className="" />
        <img src={whiteDot} alt="White Dot" className="" />
      </div>
      <img src={smallLogo} alt="Small Logo" className="self-center pt-28" />
      <div className="text-center pt-9 pb-12">
        <p className="text-5xl font-bold pb-8">놀앙뭐하젠:</p>
        <p className="self-center text-xl">표준어로 <u><strong>‘놀아서 뭐 할래?’</strong></u>라는<br />
        의미가 담긴 <strong>제주어</strong></p>
      </div>
      <div class="flex justify-between mx-4 mb-12">
        <Link to="/LandingPage" className="">
            <img src={leftArrow1} alt="Left Arrow1" className="" />
        </Link>
        <Link to="/LandingPage3" className="">
            <img src={rightArrow1} alt="Right Arrow1" className="" />
        </Link>
      </div>
      <img src={scene} alt="Scene" className="w-full mt-auto" />
    </>
  );
}

export default LandingPage2;

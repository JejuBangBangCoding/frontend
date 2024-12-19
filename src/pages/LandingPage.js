import React from "react";
import { Link } from "react-router-dom";
import grayDot from "../assets/images/grayDot.svg";
import whiteDot from "../assets/images/whiteDot.svg";
import textLogo from "../assets/images/textLogo.svg";
import mainLogo from "../assets/images/mainLogo.png";
import rightArrow2 from "../assets/images/rightArrow2.svg";

function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* 상단 도트 이미지 */}
      <div className="flex gap-2 self-center pt-12">
        <img src={grayDot} alt="Gray Dot" />
        <img src={whiteDot} alt="White Dot" />
        <img src={whiteDot} alt="White Dot" />
      </div>

      {/* 텍스트 로고 */}
      <img src={textLogo} alt="Text Logo" className="mt-4 self-center" />

      {/* 메인 그림 */}
      <div className="flex flex-grow items-end justify-center">
        <img
          src={mainLogo}
          alt="Main Logo"
          className="w-full max-w-md object-contain"
        />
      </div>
      <Link to="/LandingPage2" className="absolute bottom-2/4 right-3">
        <img src={rightArrow2} alt="Right Arrow2" className="" />
      </Link>
    </div>
  );
}

export default LandingPage;

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
        <img src={grayDot} alt="Gray Dot" className="w-2" />
        <img src={whiteDot} alt="White Dot" className="w-2" />
        <img src={whiteDot} alt="White Dot" className="w-2" />
      </div>

      {/* 텍스트 로고 */}
      <img src={textLogo} alt="Text Logo" className="mt-20 w-64 self-center" />

      {/* 메인 그림 */}
      <div className="flex flex-grow items-end justify-center" 
      style={{
    backgroundImage: `url(${require('../assets/images/mainLogo.png')})`,
    backgroundSize: 'contain',
    backgroundPosition: 'bottom',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    bottom: '0',
    height: '100%',
    width: 'calc(500 /1024* 100dvh)',
  }}
  >
        {/* <img
          src={mainLogo}
          alt="Main Logo"
          className="w-full h-full object-cover"
        /> */}
        {/* <img
    src={require('../assets/images/mainLogo.png')}
    alt="Main Logo"
    className=" h-full object-cover"
  /> */}
      </div>
      <Link to="/LandingPage2" className="absolute m-[calc(100vh/2)_0] right-3">
        <img src={rightArrow2} alt="Right Arrow2" className="w-5" />
      </Link>
    </div>
  );
}

export default LandingPage;

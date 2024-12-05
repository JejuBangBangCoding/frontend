import React from "react";
import grayDot from "../assets/images/grayDot.svg";
import whiteDot from "../assets/images/whiteDot.svg";
import textLogo from "../assets/images/textLogo.svg";
import mainLogo from "../assets/images/mainLogo.png";
import rightArrow2 from "../assets/images/rightArrow2.svg";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <div className="mb-[5.4rem] flex gap-2 self-center pt-12">
        <img src={grayDot} alt="Gray Dot" className="w-2" />
        <img src={whiteDot} alt="White Dot" className="w-2" />
        <img src={whiteDot} alt="White Dot" className="w-2" />
      </div>
      <img src={textLogo} alt="Text Logo" className="w-[18.7rem] self-center" />
      <div className="relative mt-auto">
        <img src={mainLogo} alt="Main Logo" className="w-full" />
        <Link
          to="/LandingPage2"
          className="absolute bottom-[25.2rem] right-[0.7rem] w-[1.2rem]"
        >
          <img src={rightArrow2} alt="Right Arrow2" className="" />
        </Link>
      </div>
    </>
  );
}

export default LandingPage;

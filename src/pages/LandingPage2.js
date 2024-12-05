import React from "react";
import whiteDot from "../assets/images/whiteDot.svg";
import grayDot from "../assets/images/grayDot.svg";
import smallLogo from "../assets/images/smallLogo.svg";
import leftArrow1 from "../assets/images/leftArrow1.svg";
import rightArrow1 from "../assets/images/rightArrow1.svg";
import scene from "../assets/images/scene.png";
import { Link } from "react-router-dom";

const LandingPage2 = () => {
  return (
    <>
      <div className="mb-[5.4rem] flex gap-2 self-center pt-12">
        <img src={whiteDot} alt="White Dot" className="w-2" />
        <img src={grayDot} alt="Gray Dot" className="w-2" />
        <img src={whiteDot} alt="White Dot" className="w-2" />
      </div>
      <img
        src={smallLogo}
        alt="Small Logo"
        className="mb-7 w-[5.5rem] self-center"
      />
      <div className="text-center">
        <p className="mb-3 text-[2.5rem] font-black">놀앙뭐하젠:</p>
        <p className="mb-[-0.3rem] self-center text-[1rem]">
          표준어로{" "}
          <u>
            <strong>‘놀아서 뭐 할래?’</strong>
          </u>
          라는
        </p>
        <p className="">
          의미가 담긴 <strong>제주어</strong>
        </p>
      </div>
      <div class="mx-[0.65rem] mb-12 mt-auto flex justify-between">
        <Link to="/LandingPage" className="">
          <img
            src={leftArrow1}
            alt="Left Arrow1"
            className="bottom-[25.2rem] left-[0.7rem] w-[1.2rem]"
          />
        </Link>
        <Link to="/LandingPage3" className="">
          <img
            src={rightArrow1}
            alt="Right Arrow1"
            className="bottom-[25.2rem] right-[0.7rem] w-[1.2rem]"
          />
        </Link>
      </div>
      <img src={scene} alt="Scene" className="w-full" />
    </>
  );
};

export default LandingPage2;

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
      <div className="mb-20 flex gap-2 self-center pt-12">
        <img src={whiteDot} alt="White Dot" className="w-2" />
        <img src={grayDot} alt="Gray Dot" className="w-2" />
        <img src={whiteDot} alt="White Dot" className="w-2" />
      </div>
      <img
        src={smallLogo}
        alt="Small Logo"
        className="mb-7 self-center w-20"
      />
      <div className="text-center">
        <p className="mb-3 text-[2.5rem] font-black">놀앙뭐하젠:</p>
        <p className="mb-[-0.4rem] self-center text-[1rem]">
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
      <Link to="/LandingPage" className="absolute m-[calc(100vh/2)_0] left-2">
        <img
          src={leftArrow1}
          alt="Left Arrow1"
          className="w-5"
        />
      </Link>
      <Link to="/LandingPage3" className="absolute m-[calc(100vh/2)_0] right-2">
        <img
          src={rightArrow1}
          alt="Right Arrow1"
          className="w-5"
        />
      </Link>
      <img src={scene} alt="Scene" className="mt-auto" />
    </>
  );
};

export default LandingPage2;

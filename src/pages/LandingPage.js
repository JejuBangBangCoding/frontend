import React from "react";
import { useNavigate } from "react-router-dom";
import grayDot from "../assets/images/grayDot.svg";
import whiteDot from "../assets/images/whiteDot.svg";
import textLogo from "../assets/images/textLogo.svg";
import mainLogo from "../assets/images/mainLogo.png";
import rightArrow2 from "../assets/images/rightArrow2.svg";
import { Link } from 'react-router-dom'

function LandingPage() {
  // const navigate = useNavigate();

  return (
    // <div>
    //   <h1 className="text-4xl font-bold text-red-600">LandingPage</h1>
    //   <button
    //     onClick={() => navigate("/loginpage")}
    //     className="bg-blue-500 px-4 py-2 text-white"
    //   >
    //     Go to Login Page
    //   </button>
    // </div>
    <>
      <div className="flex pt-12 gap-2 self-center mb-[5.4rem]">
        <img src={grayDot} alt="Gray Dot" className="w-2" />
        <img src={whiteDot} alt="White Dot" className="w-2" />
        <img src={whiteDot} alt="White Dot" className="w-2" />
      </div>
      <img src={textLogo} alt="Text Logo" className="self-center w-[18.7rem]" />
      <div className="relative mt-auto">
        <img src={mainLogo} alt="Main Logo" className="w-full" />
        <Link to="/LandingPage2" className="absolute bottom-[25.2rem] right-[0.7rem] w-[1.2rem]">
          <img src={rightArrow2} alt="Right Arrow2" className="" />
        </Link>
      </div>
    </>
  );
}

export default LandingPage;

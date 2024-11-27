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
      <div className="flex pt-12 gap-3 self-center">
        <img src={grayDot} alt="Gray Dot" className="" />
        <img src={whiteDot} alt="White Dot" className="" />
        <img src={whiteDot} alt="White Dot" className="" />
      </div>
      <img src={textLogo} alt="Text Logo" className="self-center mt-32" />
      <div className="relative mt-auto">
        <img src={mainLogo} alt="Main Logo" className="w-full" />
        <Link to="/LandingPage2" className="absolute bottom-2/3 right-5 cursor-pointer">
          <img src={rightArrow2} alt="Right Arrow2" className="" />
        </Link>
      </div>
    </>
  );
}

export default LandingPage;

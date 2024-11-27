import React from "react";
import { useNavigate } from "react-router-dom";
import KakaoLoginButton from "../components/KakaoLoginButton";
import { Link } from 'react-router-dom'
import upArrow1 from "../assets/images/upArrow1.svg";
import textLogo from "../assets/images/textLogo.svg";
import smallLogo from "../assets/images/smallLogo.svg";
// import balloon from "../assets/images/balloon.svg";

function LoginPage() {
  const navigate = useNavigate();

  return (
    // <div className="flex justify-center">
    //   {/* 메인 페이지 이동 */}

    //   {/* 로고 이미지 */}
    //   <div>
    //     <img
    //       src={Logo_text}
    //       alt="로고"
    //       className="mx-auto h-[69.12px] w-[297.2px]"
    //     />
    //     <img src={Logo} alt="로고" className="mx-auto h-[234px] w-[194px]" />
    //   </div>

    //   {/* 카카오 로그인 버튼 */}
    //   <div className="absolute bottom-[80px]">
    //     <KakaoLoginButton />
    //   </div>
    // </div>
    <>
      <Link to="/LandingPage" className="self-center mt-6 cursor-pointer">
        <img src={upArrow1} alt="Up Arrow1" className="" />
      </Link>
      <img src={textLogo} alt="Text Logo" className="self-center mt-44 w-72" />
      <img src={smallLogo} alt="Small Logo" className="self-center pt-10 w-48" />
      {/* <button className="flex items-center self-center mb-56 mt-auto w-4/5 h-14 rounded-[10px] bg-[#FEE500] cursor-pointer">
        <img src={balloon} alt="Speech Balloon" className="pl-8" />
        <p className="text-2xl pl-20">카카오 로그인</p> */}
        <KakaoLoginButton />
      {/* </button> */}
      <div className="self-center mb-12 cursor-pointer">
        <a href="https://github.com/JejuBangBangCoding" target="_blank" rel="noopener noreferrer">
          <p className="text-[#C4C4C4] text-xs">Developed by <u>제주빵빵코딩단</u></p>
        </a>
      </div>
    </>
  );
}

export default LoginPage;

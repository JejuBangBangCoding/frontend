import React from "react";
import { useNavigate } from "react-router-dom";
import KakaoLoginButton from "../components/KakaoLoginButton";
import back from "../assets/imgs/back.svg";
import Logo from "../assets/imgs/Logo.svg";
import Logo_text from "../assets/imgs/Logo_text.svg";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      {/* 메인 페이지 이동 */}

      {/* 로고 이미지 */}
      <div>
        <img
          src={Logo_text}
          alt="로고"
          className="mx-auto h-[69.12px] w-[297.2px]"
        />
        <img src={Logo} alt="로고" className="mx-auto h-[234px] w-[194px]" />
      </div>

      {/* 카카오 로그인 버튼 */}
      <div className="absolute bottom-[80px]">
        <KakaoLoginButton />
      </div>
    </div>
  );
}

export default LoginPage;

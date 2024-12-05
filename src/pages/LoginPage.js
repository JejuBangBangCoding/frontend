import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import KakaoLoginButton from "../components/KakaoLoginButton";
import { Link } from "react-router-dom";
import upArrow1 from "../assets/images/upArrow1.svg";
import textLogo from "../assets/images/textLogo.svg";
import smallLogo from "../assets/images/smallLogo.svg";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 콜백 URL에서 쿼리 파라미터를 파싱
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get("username");
    const profileImage = searchParams.get("profile_image");
    const userId = searchParams.get("id");

    // 만약 사용자 정보가 있다면, 메인 페이지로 리디렉션
    if (username && userId) {
      // 사용자 정보를 로컬 스토리지에 저장 (선택사항)
      localStorage.setItem(
        "user",
        JSON.stringify({ username, profileImage, userId }),
      );

      // 메인 페이지로 이동
      navigate("/mainpage");
    }
  }, [location, navigate]);

  return (
    <>
      <Link to="/LandingPage" className="self-center pt-4">
        <img src={upArrow1} alt="Up Arrow1" className="mb-[9rem] w-[1.2rem]" />
      </Link>
      <img
        src={textLogo}
        alt="Text Logo"
        className="mb-8 w-[14.5rem] self-center"
      />
      <img src={smallLogo} alt="Small Logo" className="w-40 self-center" />
      <KakaoLoginButton />
      <div className="mb-10 self-center">
        <a
          href="https://github.com/JejuBangBangCoding"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-[0.6rem] text-[#C4C4C4]">
            Developed by <u>제주빵빵코딩단</u>
          </p>
        </a>
      </div>
    </>
  );
}

export default LoginPage;

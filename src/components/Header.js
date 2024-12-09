import React from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import leftArrow1 from "../assets/images/leftArrow1.svg";
import textLogo from "../assets/images/textLogo.svg";

const Header = ({ showProfile = false, user }) => {
  const navigate = useNavigate();

  return (
    <div className="relative mt-6 flex items-center justify-center">
      {/* 뒤로가기 버튼 */}
      <img
        src={leftArrow1}
        alt="Left Arrow"
        className="absolute left-6 w-[1.1rem] cursor-pointer"
        onClick={() => navigate(-1)}
      />

      {/* 로고 */}
      <img src={textLogo} alt="Text logo" className="w-[6rem]" />

      {/* 사용자 프로필 */}
      {showProfile && <UserProfile />}
    </div>
  );
};

export default Header;

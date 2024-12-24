import React from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import leftArrow1 from "../assets/images/leftArrow1.svg";
import textLogo from "../assets/images/textLogo.svg";

// eslint-disable-next-line no-lone-blocks
{
  /*
  페이지 상단에 위치하는 헤더를 표시

  기본값(뒤로가기 버튼 표시)을 사용할 때: <Header showProfile={true} />

  뒤로가기 버튼을 표시하고 싶을 때: <Header showProfile={true} showBackButton={true} />

  뒤로가기 버튼을 숨기고 싶을 때: <Header showProfile={true} showBackButton={false} />
 */
}

const Header = ({ showProfile = false, user, showBackButton = true }) => {
  const navigate = useNavigate();

  return (
    <div className="relative mt-5 flex items-center justify-center">
      {/* 뒤로가기 버튼 */}
      {showBackButton && (
        <img
          src={leftArrow1}
          alt="Left Arrow"
          className="absolute left-6 cursor-pointer w-5"
          onClick={() => navigate(-1)}
        />
      )}

      {/* 로고 */}
      <img src={textLogo} alt="Text logo" className="w-[6rem]" />

      {/* 사용자 프로필 */}
      {showProfile && <UserProfile />}
    </div>
  );
};

export default Header;

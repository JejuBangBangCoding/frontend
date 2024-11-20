// LoginSuccess.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const LoginSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("username");
  const profileImage = queryParams.get("profile_image");
  const userId = queryParams.get("id");

  if (!username || !profileImage || !userId) {
    return <h2>로그인 정보를 불러오는 중...</h2>;
  }

  return (
    <div>
      <h1>로그인 성공!</h1>
      <p>
        안녕하세요, {username}님! (ID: {userId})
      </p>
      <img
        src={profileImage}
        alt="프로필"
        style={{ width: "150px", borderRadius: "50%" }}
      />
    </div>
  );
};

export default LoginSuccess;

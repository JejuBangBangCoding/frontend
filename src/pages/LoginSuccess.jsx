import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("username");
  const profileImage = queryParams.get("profile_image");
  const userId = queryParams.get("id");

  useEffect(() => {
    if (username && profileImage && userId) {
      localStorage.setItem(
        "user",
        JSON.stringify({ username, profileImage, userId })
      );
      navigate("/mainpage");
    } else {
      console.error("사용자 정보가 누락되었습니다.");
    }
  }, [username, profileImage, userId, navigate]);

  if (!username || !profileImage || !userId) {
    return <h2>로그인 정보를 불러오는 중...</h2>;
  }

  return null;
};

export default LoginSuccess;

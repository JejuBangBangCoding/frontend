// src/components/LogoutButton.jsx

import React from "react";
import axios from "../utils/axios";

const LogoutButton = () => {
  const handleLogout = () => {
    axios
      .post("/authentication/logout/")
      .then(() => {
        console.log("로그아웃 성공");
        alert("로그아웃 되었습니다.");
        window.location.href = "/"; // 홈 페이지로 리디렉션
      })
      .catch((error) => {
        console.error("로그아웃 실패:", error);
        alert("로그아웃에 실패했습니다.");
      });
  };

  return <button onClick={handleLogout}>로그아웃</button>;
};

export default LogoutButton;

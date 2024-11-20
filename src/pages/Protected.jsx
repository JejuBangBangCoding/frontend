// src/pages/Protected.jsx

import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const Protected = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/protected-endpoint/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("인증 오류:", error);
        if (!data) {
          // navigate가 여러 번 호출되지 않도록 조건 추가
          navigate("/");
        }
      });
  }, [navigate, data]);

  const handleLogout = () => {
    axios
      .post("/authentication/logout/")
      .then(() => {
        alert("로그아웃 성공");
        navigate("/");
      })
      .catch((error) => {
        console.error("로그아웃 오류:", error);
        alert("로그아웃에 실패했습니다.");
      });
  };

  return (
    <div>
      <h1>보호된 페이지</h1>
      {data ? (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default Protected;

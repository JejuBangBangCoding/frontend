// KakaoLoginButton.jsx
import React from "react";
import axios from "../utils/axios";
import balloon from "../assets/images/balloon.svg";

const KakaoLoginButton = () => {
  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      console.error("카카오 SDK가 로드되지 않았습니다.");
      return;
    }

    console.log("카카오 로그인 시작");

    window.Kakao.Auth.login({
      success: function (authObj) {
        console.log("카카오 로그인 성공:", authObj);

        // 백엔드로 카카오 액세스 토큰 전송
        axios
          .post("/api/authentication/kakao/login/", {
            access_token: authObj.access_token,
          })
          .then((response) => {
            console.log("백엔드 로그인 성공:", response.data);

            // 추가 로그
            console.log("사용자 정보:", response.data.user);

            // 사용자 정보를 성공 페이지로 전달
            const { user } = response.data;
            window.location.href = `/auth/kakao/callback?username=${
              user.username
            }&profile_image=${encodeURIComponent(user.profile_image)}&id=${
              user.id
            }`;
          })
          .catch((error) => {
            console.error("백엔드 로그인 실패:", error);
            alert("로그인에 실패했습니다. 다시 시도해주세요.");
          });
      },
      fail: function (err) {
        console.error("카카오 로그인 실패:", err);
        alert("카카오 로그인을 취소했습니다.");
      },
    });
  };

  return (
    // <button
    //   className="h-[60px] w-[400px] rounded-md bg-[#FEE500] font-Pretendard text-[20px] font-[700] text-black"
    //   onClick={handleKakaoLogin}
    // >
    <button className="flex items-center self-center mt-auto w-4/5 h-[3rem] rounded-[10px] bg-[#FEE500] mb-44" onClick={handleKakaoLogin}>
      <img src={balloon} alt="Speech Balloon" className="w-[1.825rem] ml-[1.6rem]" />
      <p className="text-[1.45rem] pl-12">카카오 로그인</p>
    </button>
  );
};

export default KakaoLoginButton;

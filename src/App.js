import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import AiPage from "./pages/AiPage";
import FarmListPage from "./pages/FarmListPage";
import FarmDetailedPage from "./pages/FarmDetailedPage";
import FixReservationPage from "./pages/FixReservationPage";
import MyReservationPage from "./pages/MyReservationPage";
import DetailedReservationPage from "./pages/DetailedReservationPage";
import NotFound from "./pages/NotFound";
import LoginSuccess from "./pages/LoginSuccess";

const App = () => {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
      console.log("카카오 SDK 초기화 성공");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/auth/kakao/callback" element={<LoginSuccess />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/aipage" element={<AiPage />} />
        <Route path="/farmlistpage" element={<FarmListPage />} />
        <Route path="/farmdetailedpage" element={<FarmDetailedPage />} />
        <Route path="/fixreservationpage" element={<FixReservationPage />} />
        <Route path="/myreservationpage" element={<MyReservationPage />} />
        <Route
          path="/detailedreservationpage"
          element={<DetailedReservationPage />}
        />
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
};
export default App;

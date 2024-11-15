import React from "react";
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

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
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

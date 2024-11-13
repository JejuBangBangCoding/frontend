import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Main from "./pages/Main";
import PageA from "./pages/PageA";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/pageA" element={<PageA />} />
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
};
export default App;

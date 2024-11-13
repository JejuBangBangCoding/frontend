import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {/* 헤더 부분 */}
      <header style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
        <nav>
          <ul style={{ listStyle: "none", display: "flex", gap: "15px" }}>
            <li>
              <Link to="/">Main</Link>
            </li>
            <li>
              <Link to="/pageA">Page A</Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* 페이지 콘텐츠를 보여주는 영역 */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

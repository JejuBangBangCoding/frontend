import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    // <div>
    //   <div>
    //     {/* 헤더 부분 - 마무리할 때 삭제할 것!*/}
    //     <header style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
    //       <nav>
    //         <ul style={{ listStyle: "none", display: "flex", gap: "15px" }}>
    //           <li>
    //             <Link to="/">LandingPage</Link>
    //           </li>
    //           <li>
    //             <Link to="/loginpage">LoginPage</Link>
    //           </li>
    //           <li>
    //             <Link to="/mainpage">MainPage</Link>
    //           </li>
    //           <li>
    //             <Link to="/aipage">AiPage</Link>
    //           </li>
    //           <li>
    //             <Link to="/farmlistpage">FarmListPage</Link>
    //           </li>
    //           <li>
    //             <Link to="/farmdetailedpage">FarmDetailedPage</Link>
    //           </li>
    //           <li>
    //             <Link to="/fixreservationpage">FixReservationPage</Link>
    //           </li>
    //           <li>
    //             <Link to="/myreservationpage">MyReservationPage</Link>
    //           </li>
    //           <li>
    //             <Link to="/detailedreservationpage">
    //               DetailedReservationPage
    //             </Link>
    //           </li>
    //         </ul>
    //       </nav>
    //     </header>
    //   </div>
    //   <div className="flex min-h-screen justify-center bg-blue-100">
    //     <div className="w-full max-w-lg overflow-hidden bg-white p-4 shadow-lg">
    //       {/* 페이지 콘텐츠를 보여주는 영역 */}
    //       <main>
    //         <Outlet />
    //       </main>
    //     </div>
    //   </div>
    // </div>
    <>
      {/* 전체 영역 wrap */}
      <div className="flex min-h-screen items-center justify-center bg-blue-100"> 
        {/* 전체 영역 내부 콘텐츠 중심 container */}
        <div className="flex flex-col min-h-screen container bg-[#F4F4F4]">
          {/* 페이지 콘텐츠를 보여주는 영역 */}
          {/* <main> */}
            <Outlet />
          {/* </main> */}
        </div>
      </div>
    </>
  );
};

export default Layout;

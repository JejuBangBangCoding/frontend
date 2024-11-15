import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function FarmDetailedPage() {
  const location = useLocation();
  const { farm } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleMatchClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsChecked(false); // 취소하기 버튼을 누르면 체크가 풀리도록 설정
  };

  const handleConfirmClick = () => {
    if (isChecked) {
      navigate("/fixreservationpage", { state: { farm } });
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold text-pink-600">FarmDetailedPage</h1>
      {farm && (
        <div className="mt-5 rounded bg-white p-5 shadow">
          <h2 className="mb-3 text-3xl font-semibold">{farm.name}</h2>
          <p className="text-lg">{farm.description}</p>
        </div>
      )}
      <button
        onClick={handleMatchClick}
        className="mt-5 rounded bg-blue-500 px-6 py-2 text-white"
      >
        매칭하기
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded bg-white p-8 text-center shadow-md">
            <h2 className="mb-4 text-2xl font-bold">주의사항</h2>
            <p className="mb-4">매칭하기 전에 모든 정보를 확인하세요.</p>
            <div className="mb-6">
              <input
                type="checkbox"
                id="agreement"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="mr-2"
              />
              <label htmlFor="agreement">네, 모두 이해했고 동의합니다.</label>
            </div>
            <div className="flex justify-between gap-4">
              <button
                onClick={closeModal}
                className="w-full rounded bg-gray-500 px-4 py-2 text-white"
              >
                취소하기
              </button>
              <button
                onClick={handleConfirmClick}
                className={`${
                  isChecked ? "bg-blue-500" : "cursor-not-allowed bg-gray-300"
                } w-full rounded px-4 py-2 text-white`}
                disabled={!isChecked}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FarmDetailedPage;

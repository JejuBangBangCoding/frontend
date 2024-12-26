import React from "react";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  isChecked,
  setIsChecked,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div className="relative mx-5 max-w-sm rounded-[1.5rem] bg-white py-6 pl-5 pr-2 text-center shadow-md">
    <h2 className="mb-1 text-xl font-bold">{title}</h2>
    <p className="mb-4 text-xs font-light">
          모두를 위한 유의사항 안내이니 꼭 읽어봐 주세요!
        </p>
    <div
      className="custom-scrollbar max-h-[50vh] overflow-y-auto pr-5 text-middle leading-8"
      style={{
        scrollbarWidth: "thin", // Firefox
        scrollbarColor: "#FFE9C1 transparent", // Firefox
      }}
    >
      {children}
    </div>
    <div className="my-3">
      <input
        type="checkbox"
        id="agreement"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        className="mr-2"
      />
      <label htmlFor="agreement" className="text-sm">네, 모두 이해했고 동의합니다.</label>
    </div>
    <div className="flex justify-between gap-4 mr-4">
      <button
        onClick={onClose}
        className="w-full rounded bg-[#D9D9D9] px-4 py-2 text-white hover:bg-red-500"
      >
        취소
      </button>
      <button
        onClick={onConfirm}
        className={`${
          isChecked ? "bg-[#FFA500]" : "cursor-not-allowed bg-[#D9D9D9]"
        } w-full rounded px-4 py-2 text-white`}
        disabled={!isChecked}
      >
        확인
      </button>
    </div>
  </div>
</div>




  );
};

export default Modal;

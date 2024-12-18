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
      <div className="custom-scrollbar mx-5 max-h-[80vh] overflow-y-auto rounded-[2rem] bg-white p-8 text-center shadow-md">
        <h2 className="mb-4 text-2xl font-bold">{title}</h2>
        <div className="text-left leading-8">{children}</div>
        <div className="my-6">
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

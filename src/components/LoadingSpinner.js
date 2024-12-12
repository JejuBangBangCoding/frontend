import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-[#FFA500] border-t-transparent"></div>
    </div>
  );
};

export default LoadingSpinner;

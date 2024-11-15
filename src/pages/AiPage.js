import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AiPage() {
  const [contentChanged, setContentChanged] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { region } = location.state || {};

  const handleClick = () => {
    if (!contentChanged) {
      setContentChanged(true);
    } else {
      navigate("/farmlistpage", { state: { region, userInput } });
    }
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const isPeriodValid = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 30;
    }
    return false;
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-blue-600">AiPage</h1>
      {region && (
        <div className="mt-4 rounded bg-gray-100 p-4">
          <h2 className="text-2xl font-semibold">지역 정보: {region.name}</h2>
          <p>{region.farms}</p>
        </div>
      )}
      {!contentChanged && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">기간 선택:</h2>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            className="mt-2"
          />
        </div>
      )}
      {contentChanged && (
        <div className="mt-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="농장 추천을 위한 입력..."
            className="h-20 w-full rounded border p-2"
          />
        </div>
      )}
      <button
        onClick={handleClick}
        className={`mt-4 px-4 py-2 text-white ${isPeriodValid() || contentChanged ? "bg-blue-500" : "cursor-not-allowed bg-gray-300"}`}
        disabled={!isPeriodValid() && !contentChanged}
      >
        {contentChanged ? "추천받기" : "다음"}
      </button>
    </div>
  );
}

export default AiPage;

import React, { useState } from "react";

const generateCalendar = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weeks = [];
  let week = [];
  let day = 1;

  for (let i = 0; i < firstDay; i++) {
    week.push(null);
  }

  while (day <= daysInMonth) {
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
    week.push(day);
    day++;
  }

  while (week.length < 7) {
    week.push(null);
  }
  weeks.push(week);

  return weeks;
};

const CustomCalendar = ({
  selectedStartDate,
  selectedEndDate,
  onDateSelect,
}) => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const weeks = generateCalendar(currentYear, currentMonth);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day) => {
    if (!day) return;
    const selectedDate = new Date(currentYear, currentMonth, day);
    onDateSelect(selectedDate);
  };

  const isInRange = (date) => {
    if (selectedStartDate && selectedEndDate) {
      return date >= selectedStartDate && date <= selectedEndDate;
    }
    return false;
  };

  const isSelected = (date) => {
    if (
      selectedStartDate &&
      date.toDateString() === selectedStartDate.toDateString()
    ) {
      return "bg-[#FFA500] text-white";
    }
    if (
      selectedEndDate &&
      date.toDateString() === selectedEndDate.toDateString()
    ) {
      return "bg-[#FFA500] text-white";
    }
    return "";
  };

  return (
    <div className="w-[420px] rounded-lg bg-white p-4 shadow-md">
      {/* 월 */}
      <div className="mb-6 flex items-center justify-center gap-5 font-Pretendard">
        <button onClick={handlePrevMonth} className="text-xl font-bold">
          &lt;
        </button>
        <h2 className="text-xl font-semibold">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}{" "}
          {currentYear}
        </h2>
        <button onClick={handleNextMonth} className="text-xl font-bold">
          &gt;
        </button>
      </div>

      {/* 요일 */}
      <div className="grid grid-cols-7 gap-1 text-center font-bold">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
          <div
            key={day}
            className={
              index === 0
                ? "text-red-500" // 일요일: 빨간색
                : index === 6
                  ? "text-blue-500" // 토요일: 파란색
                  : "text-gray-700" // 평일: 회색
            }
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 */}
      <div className="mt-2 grid grid-cols-7 gap-1">
        {weeks.map((week, i) => (
          <React.Fragment key={i}>
            {week.map((day, idx) => {
              if (day === null) {
                return <div key={idx}></div>;
              }
              const date = new Date(currentYear, currentMonth, day);
              const isToday = date.toDateString() === today.toDateString();
              const selectedClass = isSelected(date);
              const inRangeClass = isInRange(date)
                ? "bg-[#FFDB99] text-black"
                : "";

              return (
                <button
                  key={idx}
                  onClick={() => handleDateClick(day)}
                  className={`h-[3rem] w-[3rem] rounded-full py-2 transition-colors hover:bg-[#FFA500] hover:text-white ${
                    selectedClass || inRangeClass
                  } ${isToday ? "border border-[#FFA500]" : ""}`}
                >
                  {day}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CustomCalendar;

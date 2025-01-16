import React from "react";
import Calendar from "react-calendar";

const Calander = ({ date, onDateChange, tileContent }) => {
  return (
    <div className="custom-calendar-container">
      <Calendar
        onChange={onDateChange}
        value={date}
        className="custom-calendar"
        tileContent={tileContent}
      />
    </div>
  );
};

export default Calander;

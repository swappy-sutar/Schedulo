import React from "react";
import InterviewSlotCard from "../components/InterviewSlotCard";

function Dashboard() {
  return (
    <>
      <div className="relative mx-auto flex flex-col max-w-maxContent w-11/12 items-center text-white justify-between">
        <div className="mt-5 text-center text-richblack-300 text-4xl font-semibold">
          Booked Interview Slots
          <div className=" mx-auto flex flex-col gap-4 mt-4 w-[90%]">
            <InterviewSlotCard />
          </div>
        </div>
        <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300 "></div>
      </div>
    </>
  );
}

export default Dashboard;

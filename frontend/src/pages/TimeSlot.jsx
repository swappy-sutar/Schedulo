import React from "react";
import CreateSlot from "../components/CreateSlot";

function TimeSlot() {
  return (
    <div className="mx-auto w-11/12 max-w-maxContent text-center text-richblack-300 text-4xl font-semibold ">
      <p className="mt-5 text-center text-richblack-300 text-4xl font-semibold">
        Create Interview Slot
      </p>
      <div className="gap-4 mt-4">
        <CreateSlot />
      </div>
    </div>
  );
}

export default TimeSlot;

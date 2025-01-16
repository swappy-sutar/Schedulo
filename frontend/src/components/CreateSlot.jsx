import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import Calander from "./Calander";

const CreateSlot = () => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [candidateDetails, setCandidateDetails] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    experience: "",
  });
  const [events, setEvents] = useState([]);

  const onDateChange = (newDate) => setDate(newDate);

  const createTimeslot = async (timeslotData) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        "http://localhost:3000/api/v1/schedule/create-slot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(timeslotData),
        }
      );

      if (response.ok) {
        toast.success("Timeslot created successfully!");
        setEvents([...events, timeslotData]);
      } else {
        const data = await response.json();
        toast.error(`This slot is already booked.!!`);
      }
    } catch (error) {
      toast.error("An error occurred while creating the timeslot.");
    }
  };

  const scheduleEvent = () => {
    if (!startTime || !endTime) {
      toast.error("Please select both start time and end time!");
      return;
    }

    if (
      new Date(`1970-01-01 ${endTime}`) <= new Date(`1970-01-01 ${startTime}`)
    ) {
      toast.error("End time must be after the start time!");
      return;
    }

    const timeslotData = {
      startTime: new Date(`${date.toDateString()} ${startTime}`).toISOString(),
      endTime: new Date(`${date.toDateString()} ${endTime}`).toISOString(),
      title: title,
      description: description,
      candidateDetails: candidateDetails,
    };

    createTimeslot(timeslotData);
  };

  const tileContent = ({ date: tileDate }) => {
    const eventOnDate = events.find(
      (event) =>
        new Date(event.startTime).toDateString() === tileDate.toDateString()
    );
    return eventOnDate ? (
      <div className="text-center text-sm font-bold text-yellow-500">
        {eventOnDate.title}
      </div>
    ) : null;
  };

  return (
    <div className="mx-auto flex flex-row lg:flex-row lg:gap-3 mt-8">
      <div className="w-full max-w-3xl lg:max-w-xl">
        <Calander
          date={date}
          onDateChange={onDateChange}
          tileContent={tileContent}
        />
      </div>

      <div className="mt-6 lg:mt-0 lg:w-[40%] p-10 m-5 border border-yellow-25 bg-richblack-800 shadow-xl rounded-lg">
        <h2 className="text-3xl font-semibold text-white mb-6">
          Create Interview Slot
        </h2>
        <div className="text-left">
          <label className="text-base font-medium text-gray-200 block">
            Title :
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-sm rounded-[0.5rem] bg-richblack-600 p-[10px] text-richblack-5"
            placeholder="Interview title"
          />
        </div>
        <div>
          <label className="mt-2 text-base font-medium text-gray-200 block">
            Description :
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-[70px] text-sm rounded-[0.5rem] bg-richblack-600 p-[10px] text-richblack-5"
            placeholder="Interview description"
          />
        </div>
        <div>
          <label className="mt-2 text-base font-semibold text-gray-200 block">
            Start Time :
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full text-sm rounded-[0.5rem] bg-richblack-600 p-[10px] text-richblack-5"
          />
        </div>
        <div>
          <label className="mt-2 text-base font-medium text-gray-200 block">
            End Time :
          </label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full text-sm rounded-[0.5rem] bg-richblack-600 p-[10px] text-richblack-5"
          />
        </div>

        <div>
          <label className="mt-2 text-base font-medium text-gray-200 block">
            Candidate Name :
          </label>
          <input
            type="text"
            value={candidateDetails.name}
            onChange={(e) =>
              setCandidateDetails({
                ...candidateDetails,
                name: e.target.value,
              })
            }
            className="w-full text-sm rounded-[0.5rem] bg-richblack-600 p-[10px] text-richblack-5"
            placeholder="Candidate's name"
          />
        </div>
        <div>
          <label className="mt-2 text-base font-medium text-gray-200 block">
            Candidate Email :
          </label>
          <input
            type="email"
            value={candidateDetails.email}
            onChange={(e) =>
              setCandidateDetails({
                ...candidateDetails,
                email: e.target.value,
              })
            }
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full text-sm rounded-[0.5rem] bg-richblack-600 p-[10px] text-richblack-5"
            placeholder="Candidate's email"
          />
        </div>

        <div>
          <label className="mt-2 text-base font-medium text-gray-200 block">
            Candidate Phone :
          </label>
          <input
            type="text"
            value={candidateDetails.phone}
            onChange={(e) =>
              setCandidateDetails({
                ...candidateDetails,
                phone: e.target.value,
              })
            }
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full text-sm rounded-[0.5rem] bg-richblack-600 p-[10px] text-richblack-5"
            placeholder="Candidate's phone number"
          />
        </div>

        <div>
          <label className="mt-2 text-base font-medium text-gray-200 block">
            Candidate Qualification :
          </label>
          <input
            type="text"
            value={candidateDetails.qualification}
            onChange={(e) =>
              setCandidateDetails({
                ...candidateDetails,
                qualification: e.target.value,
              })
            }
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full text-sm rounded-[0.5rem] bg-richblack-600 p-[10px] text-richblack-5"
            placeholder="Candidate's qualification"
          />
        </div>

        <div>
          <label className="mt-2 text-base font-medium text-gray-200 block">
            Candidate Experience :
          </label>
          <input
            type="text"
            value={candidateDetails.experience}
            onChange={(e) =>
              setCandidateDetails({
                ...candidateDetails,
                experience: e.target.value,
              })
            }
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full text-sm rounded-[0.5rem] bg-richblack-600 p-[10px] text-richblack-5"
            placeholder="Candidate's experience"
          />
        </div>
        <button
          onClick={scheduleEvent}
          disabled={loading}
          className="mt-4 w-full py-2 text-base font-semibold bg-yellow-25 text-richblack-900 rounded-lg"
        >
          {loading ? "Loading..." : "Create Slot"}
        </button>
      </div>
    </div>
  );
};

export default CreateSlot;

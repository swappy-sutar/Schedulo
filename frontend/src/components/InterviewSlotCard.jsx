import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const InterviewSlotCard = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSlot, setEditingSlot] = useState(null);
  const [slotDetails, setSlotDetails] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
  });
  const [deletingSlot, setDeletingSlot] = useState(null);

  useEffect(() => {
    const fetchSlots = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setError("Token is missing.");
        toast.error("Token is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/schedule/get-slots",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (result.success) {
          setSlots(result.data);
          toast.success("Slots fetched successfully!");
        } else {
          throw new Error(result.message || "Failed to fetch slots");
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Failed to fetch slots");
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  const formatDate = (isoDate) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(isoDate).toLocaleString(undefined, options);
  };

  const handleEdit = (slotId) => {
    const slot = slots.find((s) => s._id === slotId);
    if (slot) {
      setSlotDetails({
        title: slot.title,
        description: slot.description,
        startTime: slot.startTime,
        endTime: slot.endTime,
      });
      setEditingSlot(slotId);
    }
  };

  const handleUpdate = async () => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Token is missing.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/schedule/update-slot/${editingSlot}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(slotDetails),
        }
      );

      const result = await response.json();

      if (result.success) {
        setSlots((prevSlots) =>
          prevSlots.map((slot) =>
            slot._id === editingSlot ? { ...slot, ...slotDetails } : slot
          )
        );
        toast.success("Slot updated successfully!");
        setEditingSlot(null);
      } else {
        throw new Error(result.message || "Failed to update slot");
      }
    } catch (err) {
      toast.error(err.message || "Failed to update slot");
    }
  };

  const handleDelete = (slotId) => {
    setDeletingSlot(slotId);
  };

  const confirmDelete = async () => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Token is missing.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/schedule/delete-slot/${deletingSlot}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        setSlots((prevSlots) =>
          prevSlots.filter((slot) => slot._id !== deletingSlot)
        );
        toast.success("Slot deleted successfully!");
        setDeletingSlot(null);
      } else {
        throw new Error(result.message || "Failed to delete slot");
      }
    } catch (err) {
      toast.error(err.message || "Failed to delete slot");
    }
  };

  const cancelDelete = () => {
    setDeletingSlot(null);
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>;
  }

 return (
  <div className="max-w-7xl mx-auto p-6">
    {loading ? (
      <p className="text-center text-gray-600">Loading...</p>
    ) : error ? (
      <p className="text-center text-red-600">Error: {error}</p>
    ) : slots.length === 0 ? (
      <p className="text-center text-gray-600 text-lg font-semibold">
        No slots booked yet!
      </p>
    ) : (
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {slots.map((slot) => (
          <div
            key={slot._id}
            className="bg-richblack-800 text-white rounded-lg shadow-xl p-6 border-yellow-25 relative transition-all duration-300 ease-in-out transform hover:scale-105 border-2"
          >
            {/* Icons */}
            <div className="absolute top-2 right-2 flex space-x-3">
              <AiOutlineEdit
                title="Edit"
                className="text-yellow-25 hover:text-yellow-500 cursor-pointer"
                size={20}
                onClick={() => handleEdit(slot._id)}
              />
              <AiOutlineDelete
                title="Delete"
                className="text-red-400 hover:text-red-500 cursor-pointer"
                size={20}
                onClick={() => handleDelete(slot._id)}
              />
            </div>

            <h2 className="text-2xl font-semibold mb-3">{slot.title}</h2>
            <p className="text-sm mb-5">{slot.description}</p>

            <div className="mb-4">
              <p className="text-lg font-medium">
                <span className="font-semibold">Start Time: </span>
                {formatDate(slot.startTime)}
              </p>
              <p className="text-lg font-medium">
                <span className="font-semibold">End Time: </span>
                {formatDate(slot.endTime)}
              </p>
            </div>

            <h3 className="text-lg font-semibold mb-2">Candidate Details</h3>
            <ul className="text-sm bg-richblack-600 space-y-2 border-2 border-richblack-300 rounded-md p-2">
              <li>
                <span className="font-semibold">Name: </span>
                {slot.candidateDetails.name}
              </li>
              <li>
                <span className="font-semibold">Email: </span>
                <a
                  href={`mailto:${slot.candidateDetails.email}`}
                  className="text-blue-200 hover:underline"
                >
                  {slot.candidateDetails.email}
                </a>
              </li>
              <li>
                <span className="font-semibold">Phone: </span>
                <a
                  href={`tel:${slot.candidateDetails.phone}`}
                  className="text-blue-200 hover:underline"
                >
                  {slot.candidateDetails.phone}
                </a>
              </li>
              <li>
                <span className="font-semibold">Qualification: </span>
                {slot.candidateDetails.qualification}
              </li>
              <li>
                <span className="font-semibold">Experience: </span>
                {slot.candidateDetails.experience}
              </li>
            </ul>
          </div>
        ))}
      </div>
    )}

    {deletingSlot && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-richblack-800 p-6 rounded-lg w-96 space-y-2 relative border-2">
          <button
            className="absolute top-3 right-5 text-white text-2xl hover:text-yellow-25"
            onClick={cancelDelete}
          >
            &times;
          </button>
          <h2 className="text-xl font-semibold mb-4">Delete Slot</h2>
          <p className="text-lg font-medium mb-4">
            Are you sure you want to delete this slot?
          </p>
          <div className="flex space-x-4">
            <button
              className="w-full px-6 py-3 mt-6 text-base font-bold rounded-lg shadow-md transition-all duration-300 bg-red-500 text-white hover:scale-105 hover:bg-red-600"
              onClick={confirmDelete}
            >
              Delete Slot
            </button>
          </div>
        </div>
      </div>
    )}

    {editingSlot && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-richblack-800 p-6 rounded-lg w-96 space-y-2 relative border-2">
          <button
            className="absolute top-3 right-5 text-white text-2xl hover:text-yellow-25"
            onClick={() => setEditingSlot(null)}
          >
            &times;
          </button>

          <h2 className="text-xl font-semibold mb-4">Edit Slot</h2>
          <input
            type="text"
            placeholder="Title"
            value={slotDetails.title}
            onChange={(e) =>
              setSlotDetails({ ...slotDetails, title: e.target.value })
            }
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full text-sm rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
          />
          <textarea
            placeholder="Description"
            value={slotDetails.description}
            onChange={(e) =>
              setSlotDetails({ ...slotDetails, description: e.target.value })
            }
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full text-sm rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
          />
          <input
            type="datetime-local"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full text-sm rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
            value={slotDetails.startTime}
            onChange={(e) =>
              setSlotDetails({ ...slotDetails, startTime: e.target.value })
            }
          />
          <input
            type="datetime-local"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full text-sm rounded-[0.5rem] bg-richblack-600 p-[12px] text-richblack-5"
            value={slotDetails.endTime}
            onChange={(e) =>
              setSlotDetails({ ...slotDetails, endTime: e.target.value })
            }
          />
          <div className="flex justify-end space-x-4">
            <button
              className="w-full px-6 py-3 mt-6 text-base font-bold rounded-lg shadow-md transition-all duration-300 bg-green-500 text-white hover:scale-105 hover:bg-green-600"
              onClick={handleUpdate}
            >
              Update Slot
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);

};

export default InterviewSlotCard;

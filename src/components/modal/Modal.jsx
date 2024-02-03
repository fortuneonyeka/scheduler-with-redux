import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./modal.css";
import {
  addEvents,
  deleteEvents,
  updatedEvents,
} from "../../redux/reducers/actions";

const Modal = ({ selectEvent, selectedDate, setShowModal }) => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.calendar);
  const [eventTitle, setEventTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectEvent && selectEvent.title) {
      setEventTitle(selectEvent.title);
    } else {
      setEventTitle("");
    }
  }, [selectEvent]);
  


  const handleSaveEvent = () => {
    if (eventTitle.trim() && selectedDate) {
      const newEvent = {
        id: events.length + 1,
        title: eventTitle.trim(),
        start: selectedDate,
        end: selectedDate,
        allDay: true,
      };

      dispatch(addEvents(newEvent));
      setShowModal(false);
      setEventTitle("");
    } else {
      setError("Event title cannot be empty");
    }
  };

  const handleAddChanges = () => {
    if (selectEvent && eventTitle) {
      const updatedEvent = { ...selectEvent, title: eventTitle };
      dispatch(updatedEvents(updatedEvent));
      setEventTitle("");
      setShowModal(false);
    } else {
      setError("Event title cannot be empty");
    }
  };
  const handleDeleteEvent = () => {
    if (selectEvent) {
      dispatch(deleteEvents(selectEvent.id));
      setShowModal(false);
    }
  };

  const handleTitleChange = (e) => {
    setEventTitle(e.target.value);
    setError("");
  };

  return (
    <div data-testid="modal" className="modal-container">
      <div className="modal-content">
        <h2>{selectEvent ? "Edit Event" : "Add Event"}</h2>
        {error && <p className="error-message">{error}!</p>}{" "}
        <form>
          <div className="form-group">
            <label htmlFor="eventTitle">Event Title:</label>
            <input
              type="text"
              id="eventTitle"
              placeholder="Enter your event"
              value={eventTitle}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className="form-group">
            {selectEvent && (
              <button
                type="button"
                onClick={handleDeleteEvent}
                className="delete-btn"
              >
                Remove Event
              </button>
            )}
            {selectEvent ? (
              <button
                onClick={handleAddChanges}
                type="button"
                className="submit-btn"
              >
                Add Changes
              </button>
            ) : (
              <button
                onClick={handleSaveEvent}
                type="button"
                className="submit-btn"
              >
                Add Event
              </button>
            )}
            <button
              onClick={() => {
                setError("");
                setShowModal(false);
              }}
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

import React, { useEffect, useState } from "react";
import "./events.css";

const Events = () => {
  const [storedEvents, setStoredEvents] = useState([]);

  useEffect(() => {
    const getEventsFromLocalStorage =
      JSON.parse(localStorage.getItem("events")) || [];
    setStoredEvents(getEventsFromLocalStorage);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const endTime = new Date(date);
    endTime.setHours(endTime.getHours() + 12);

    return `From: ${date.toLocaleDateString("en-US", options)} - To: ${endTime.toLocaleTimeString("en-US", options)}`;
  };

  return (
    <div data-testid="event" className="event-container">
      {storedEvents.length === 0 ? (
        <h3>You have no scheduled events, Please add new events</h3>
      ): (
        storedEvents.map((event) => (
          <div key={event.id} className="event-item">
            <h3>{event.title}</h3>
            <p>{formatDate(event.start)}</p>
          </div>
        ))
      )}
      
    </div>
  );
};

export default Events;

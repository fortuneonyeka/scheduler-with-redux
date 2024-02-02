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
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div data-testid="event" className="event-container">
      {storedEvents.map((event) => (
        <div key={event.id} className="event-item">
          <h3>{event.title}</h3>
          <p>Start: {formatDate(event.start)}</p>
          <p>End: {formatDate(event.end)}</p>
        </div>
      ))}
    </div>
  );
};

export default Events;

import React, { useEffect, useState } from "react";
import "./dashboard.css";

const Dashboard = () => {
  const [storedEvents, setStoredEvents] = useState([]);
  const [numberOfStoredEvents, setNumberOfStoredEvents] = useState(0);
  const [numberOfPassedEvents, setNumberOfPassedEvents] = useState(0);
  const [numberOfCurrentAndFutureEvents, setNumberOfCurrentAndFutureEvents] =
    useState(0);

  useEffect(() => {
    const eventsFromLocalStorage =
      JSON.parse(localStorage.getItem("events")) || [];
    setStoredEvents(eventsFromLocalStorage);
    setNumberOfStoredEvents(eventsFromLocalStorage.length);

    // Filter out passed events excluding today
    const passedEvents = eventsFromLocalStorage.filter((event) => {
      const eventStart = new Date(event.start);
      const today = new Date();
      const todayStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0,
        0
      );
      return eventStart < todayStart;
    });
    setNumberOfPassedEvents(passedEvents.length);

    const currentAndFutureEvents = eventsFromLocalStorage.filter((event) => {
      const eventStart = new Date(event.start);
      const today = new Date();
      const todayStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0,
        0
      );
      return eventStart >= todayStart;
    });
    setNumberOfCurrentAndFutureEvents(currentAndFutureEvents.length);
  }, []);

  return (
    <div className="dashboard-container">
      <div>
        <h1 className="dashboard-header">Welcome to the Dashboard</h1>
      </div>
      <div className="stats">
        <div className="stat-card">
          <h2 className="stat-title">Total Users</h2>
          <p className="stat-value">1000</p>
        </div>
        <div className="stat-card">
          <h2 className="stat-title">Total Events</h2>
          <p className="stat-value">{numberOfStoredEvents}</p>
        </div>
        <div className="stat-card">
          <h2 className="stat-title">Total Revenue</h2>
          <p className="stat-value">$5000</p>
        </div>
      </div>

      <div>
        <h2 className="dashboard-header">Scheduled Events</h2>
        <div className="event-grid">
          {storedEvents.map((event, index) => (
            <div key={index} className="event-item">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>
                {event.start} - {event.end}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <h2>You scheduled: {numberOfStoredEvents} events</h2>
        <p style={{textDecoration:"line-through"}}>Passed events: {numberOfPassedEvents}</p>
        <p>Active events: {numberOfCurrentAndFutureEvents}</p>
      </div>
    </div>
  );
};

export default Dashboard;

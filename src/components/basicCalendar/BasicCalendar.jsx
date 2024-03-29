import React, { useEffect, useState} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../redux/reducers/actions";
import Modal from "../modal/Modal";

const localizer = momentLocalizer(moment);

const BasicCalendar = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.calendar);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectEvent, setSelectEvent] = useState("");

  const today = moment().startOf("day");

  useEffect(() => {
    dispatch(getEvents);
  }, [dispatch]);

  const handleSelectSlot = (slotInfo) => {
    if (moment(slotInfo.start).isSameOrAfter(today, "day")) {
      setShowModal(!showModal);
      setSelectedDate(slotInfo.start);
      setSelectEvent("");
    } else {
      alert("You can only add events for today and future dates.");
    }
  };

  const handleSelectEvent = (event) => {
    if (moment(event.start).isBefore(today, "day")) {
      alert("Editing past events is not allowed.");
      return;
    }

    setSelectEvent(event);
    setShowModal(true);
  };

  const stylePassedEvent = (event) => {
    const today = moment().startOf("day");
    const eventStart = moment(event.start);

    if (eventStart.isBefore(today, "day")) {
      return {
        style: {
          textDecoration: "line-through",
        },
      };
    }

    return {};
  };

  const filterEvents = (events) => {
    const filteredEvents = events.filter((event) => {
      const eventStart = moment(event.start);
      const daysDifference = moment().diff(eventStart, "days");
      return daysDifference <= 30;
    });
    return filteredEvents;
  };
  
  const filteredEvents = filterEvents(events);
  
  useEffect(() => {
    try {
      const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
      const updatedEvents = filterEvents(storedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
    } catch (error) {
      console.error("Error processing events from localStorage:", error);
    }
  }, []);
  


  return (
    <div style={{ height: "800px" }}>
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        eventPropGetter={stylePassedEvent}
      />
      {showModal && (
        <Modal
          selectedDate={selectedDate}
          selectEvent={selectEvent}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default BasicCalendar;

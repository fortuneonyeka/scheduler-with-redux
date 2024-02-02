import React, { useEffect, useState, useCallback } from "react";
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
    } else {
      alert("You can only add events for today and future dates.");
    }
  };

  const handleSelectEvent = (event) => {
    setSelectEvent(event);
    setShowModal(true);
  };

  const stylePassedEvent = (start) => {
    let style = {};

    if (moment(start).isBefore(today, "day")) {
      style = {
        textDecoration: "line-through",
      };
    }

    return {
      style: style,
    };
  };

  return (
    <div style={{ height: "800px" }}>
      <Calendar
        localizer={localizer}
        events={events}
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

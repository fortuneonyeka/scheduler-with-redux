import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./reducers/calendarSlice";

export default configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});

// calendarSlice.js
//

const initialState = {
      events: [],
      // fts
    };
    
    const eventsReducer = (state = initialState, action) => {
      console.log(action);
      switch (action.type) {
        case "GET_EVENTS":
          return {
            ...state,
            events: action.payload,
          };
    
        case "SET_EVENTS":
          return {
            ...state,
            events: [...state.events, action.payload],
          };
    
        case "DELETE_EVENTS": {
          return {
            ...state,
            events: state.events.filter((item) => item.id !== action.payload),
          };
        }
    
        case "UPDATE_EVENT": {
          const updatedEvents = state.events.map((event) =>
            event.id === action.payload.id ? { ...action.payload } : event
          );
    
          localStorage.setItem("events", JSON.stringify(updatedEvents));
    
          return {
            ...state,
            events: updatedEvents,
          };
        }
    
        default:
          return state;
      }
    };
    
    export default eventsReducer;
    
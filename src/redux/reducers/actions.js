export const getEvents = (dispatch) => {
      const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    
      dispatch({
        type: "GET_EVENTS",
        payload: storedEvents,
      });
    };
    
    export const addEvents = (formData) => (dispatch) => {
      const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    
      localStorage.setItem("events", JSON.stringify([...storedEvents, formData]));
    
      dispatch({
        type: "SET_EVENTS",
        payload: formData,
      });
    };
    
    export const updatedEvents = (formData) => (dispatch) => {
      dispatch({
        type: "UPDATE_EVENT",
        payload: formData,
      });
    };
    
    export const deleteEvents = (id) => (dispatch) => {
      const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    
      const filteredEvents = storedEvents.filter((event) => event.id !== id);
    
      localStorage.setItem("events", JSON.stringify(filteredEvents));
    
      dispatch({
        type: "DELETE_EVENTS",
        payload: id,
      });
    };
    
import { List_OF_PATIENT, LIST_OF_QUERY } from "../actions/index.js";

const initialstate = {
  listOfPatient: {
    patient: [],
  },
  showquery: {
    query: [],
  },
};
export const fetchPatient = (state = initialstate, action) => {
  switch (action.type) {
    case List_OF_PATIENT:
      return {
        ...state,
        patient: action.payload,
      };
    case LIST_OF_QUERY:
      return {
        ...state,
        showquery: action.payload,
      };
    default:
      return state;
  }
};

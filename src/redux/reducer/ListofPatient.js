import { List_OF_PATIENT } from "../actions/index.js";

const listOfPatient = {
  data: [],
};

export const fetchPatient = (state = listOfPatient, action) => {
  switch (action.type) {
    case List_OF_PATIENT:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

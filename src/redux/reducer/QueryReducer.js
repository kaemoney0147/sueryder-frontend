import { LIST_OF_QUERY } from "../actions/index.js";
const showquery = {
  query: [],
};
export const fetchQuery = (state = showquery, action) => {
  switch (action.type) {
    case LIST_OF_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

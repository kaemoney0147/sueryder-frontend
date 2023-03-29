export const List_OF_PATIENT = "List_OF_PATIENT";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const USER_STATUS = "USER_STATUS";
export const LOGOUT_USER = "LOGOUT_USER";
export const DELETE_ACCESS_TOKEN = "DELETE_ACCESS_TOKEN";
export const LIST_OF_QUERY = "LIST_OF_QUERY";

const apiUrl = process.env.REACT_APP_BE_URL;
export const getAllPatient = () => {
  return async (dispatch, getstate) => {
    try {
      let url = await fetch(`${apiUrl}/patient`);

      if (url.ok) {
        const response = await url.json();
        const fetchedData = response;
        dispatch({
          type: List_OF_PATIENT,
          payload: fetchedData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchWithQuery = (query) => {
  return async (dispatch, getstate) => {
    try {
      let url = await fetch(
        `${apiUrl}/patient?ward=${query}&firstName=${query}`
      );
      if (url.ok) {
        const response = await url.json();
        const queryData = response;
        dispatch({
          type: LIST_OF_QUERY,
          payload: queryData,
        });
      } else {
        console.log("No match found");
      }
    } catch (error) {}
  };
};

export const getAccessToken = (userLogin) => {
  return async (dispatch) => {
    const options = {
      method: "POST",
      body: JSON.stringify(userLogin),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(`${apiUrl}/users/login`, options);
      if (response.ok) {
        const tokens = await response.json();
        const tokenReceived = await tokens.accessToken;

        if (tokenReceived) {
          dispatch({
            type: SET_ACCESS_TOKEN,
            payload: tokenReceived,
          });
          localStorage.setItem("accessToken", tokenReceived);
          try {
            const opts = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + tokenReceived,
              },
            };
            const userResponse = await fetch(`${apiUrl}/users/me`, opts);
            if (userResponse.ok) {
              const user = await userResponse.json();

              dispatch({
                type: LOGIN_REQUEST,
                payload: user,
              });
              dispatch({
                type: USER_STATUS,
                payload: {
                  status: "success",
                  message: "user successfully logged in",
                },
              });
            } else {
              console.log("error getting the user");
            }
          } catch (error) {
            console.log("error in trycatch", error);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    try {
      dispatch({
        type: DELETE_ACCESS_TOKEN,
        payload: null,
      });
      dispatch({
        type: List_OF_PATIENT,
        payload: [],
      });
      dispatch({
        type: LIST_OF_QUERY,
        payload: [],
      });
      dispatch({
        type: USER_STATUS,
        payload: null,
      });

      dispatch({
        type: LOGIN_REQUEST,
        payload: null,
      });
      dispatch({
        type: LOGOUT_USER,
        payload: "",
      });
      localStorage.removeItem("accessToken");
      console.log("logout successfully");
    } catch (error) {
      console.log(error);
    }
  };
};

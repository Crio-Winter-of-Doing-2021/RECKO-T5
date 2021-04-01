import { ACTIONS } from "../reducers/AuthReducer";
import { HTTP } from "../utils";

export const login = async (dispatch:any, details:any) => {
  try {
    dispatch({ type: ACTIONS.LOADING });
    const loginData = await HTTP({
      url: "/login",
      method: "POST",
      body: details,
      headers:null
    });
    dispatch({ type: ACTIONS.LOGIN, payload: loginData });
    return true;
  } catch (e) {
    console.log(e);
    dispatch({
      type: ACTIONS.LOGIN,
      payload: { user: null, error: e?.response?.data?.error || e.message },
    });
    throw e
  }
};
import {HTTP} from "../utils";
import { ACTIONS } from "../reducers/AuthReducer";

export const logout = async (dispatch:any) => {
  try {
    dispatch({ type: ACTIONS.LOADING });
    await HTTP({url:"/logout", headers:null, body:{}, method:"POST"})
    dispatch({ type: ACTIONS.LOGOUT });
    return true;
  } catch (e) {
    console.log(e);
    dispatch({
      type: ACTIONS.LOGOUT,
      payload: { user: null, error: e.response.data },
    });
    throw e
  }
};
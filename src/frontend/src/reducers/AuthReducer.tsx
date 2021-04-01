export const ACTIONS = {
  LOGIN: "login",
  LOGOUT: "logout",
  LOADING: "loading",
  CURRENT_USER: "current_user",
};

export const AuthReducer = (state:any, action:any) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      console.log(action.payload);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return { ...action.payload, loading: false };
    case ACTIONS.LOGOUT:
      localStorage.removeItem("user");
      return { user: null, error: null, loading: false };
    case ACTIONS.LOADING:
      return { user: null, error: null, loading: true };
    case ACTIONS.CURRENT_USER:
    // @ts-ignore
      const userData = JSON.parse(localStorage.getItem("user"));
      console.log(localStorage.getItem("user"), userData);
      return { user: userData, error: null, loading: true };
    default:
      return state;
  }
};
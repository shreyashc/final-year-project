import { AuthStateType } from "./authContext";

type ActionType = {
  type: string;
  payload: any;
};

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SAVED_STATE = "SAVED_STATE";

export const authReducer = (state: AuthStateType, action: ActionType) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,

        userId: action.payload.userId,
        email: action.payload.email,
        token: action.payload.token,
        role: action.payload.role,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,

        userId: "",
        email: "",
        token: "",
        role: "",
        isLoggedIn: false,
      };
    case SAVED_STATE:
      return {
        ...state,
        userId: action.payload.userId,
        email: action.payload.email,
        token: action.payload.token,
        role: action.payload.role,
        isLoggedIn: action.payload.isLoggedIn,
      };
    default:
      return state;
  }
};

import { AuthStateType } from "./authContext";

type ActionType = {
  type: string;
  payload: any;
};

export const authReducer = (state: AuthStateType, action: ActionType) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,

        userId: action.payload.userId,
        email: action.payload.email,
        token: action.payload.token,
        role: action.payload.role,
        isLoggedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,

        userId: "",
        email: "",
        token: "",
        role: "",
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

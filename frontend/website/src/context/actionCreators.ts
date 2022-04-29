import { LOGIN, LOGOUT } from "./authReducer";

function logoutAction() {
  return {
    type: LOGOUT,
  };
}
function loginAction(payload: any) {
  return {
    type: LOGIN,
    payload,
  };
}

export { logoutAction, loginAction };

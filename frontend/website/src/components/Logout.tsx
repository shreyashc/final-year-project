import {  FC, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { logoutAction } from "../context/actionCreators";
import { Link } from "react-router-dom";


// export default function Logout() {
//   const {  dispatch: authDispatch } = useContext(AuthContext);
//   const  logout = ()=> {
//     localStorage.clear();
//     authDispatch(logoutAction());
//   }
 
//   return <button onClick={logout}>Logout</button>;
// }

interface IMyProps {
  className: any;
}

const Logout: FC<IMyProps> = (props) => {
  const {  dispatch: authDispatch } = useContext(AuthContext);
  const  logout = ()=> {
    localStorage.clear();
    authDispatch(logoutAction());
  }

  return <Link to={"/login"} {...props} onClick={logout}>Logout</Link>;
};


export default Logout;

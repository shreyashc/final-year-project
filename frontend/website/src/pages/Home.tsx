import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
const Home = () => {
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);

  return (
    <div>
      <Link to="/login">Login</Link>
      <hr />
      <Link to="/signup">Signup</Link>
      <div>
        <p>Email:{authState.email}</p>
        <p>Role:{authState.role}</p>
        <p>token:{authState.token.substring(0, 20)}......</p>
        <p>isLoggedIn:{authState.isLoggedIn ? "YES" : "No"}</p>
      </div>
    </div>
  );
};

export default Home;

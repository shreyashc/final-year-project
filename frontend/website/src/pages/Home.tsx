import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { apiClient } from "../api/client";
import { logoutAction } from "../context/actionCreators";
const Home = () => {
  const nav = useNavigate();
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  function makeRequest() {
    apiClient.get("/");
  }
  function logout() {
    localStorage.clear();
    authDispatch(logoutAction());
  }
  return (
    <div>
      <div>
        <p>Email:{authState.email}</p>
        <p>Role:{authState.role}</p>
        <p>token:{authState.token.substring(0, 20)}......</p>
        <p>isLoggedIn:{authState.isLoggedIn ? "YES" : "No"}</p>
        <button onClick={makeRequest}>makeRequest</button>
        <button onClick={logout}>Logout</button>
        <Link to={"/investors"}>
          <h2>See all investors</h2>
        </Link>
        <Link to={"/startups"}>
          <h2>See all startups</h2>
        </Link>
        <Link to={"/investor/my-chats"}>
          <h2>My chats Investor</h2>
        </Link>
        <button
          onClick={() =>
            nav(`/private-chat/38i26s`, {
              state: { otherPerson: "Lythouse" },
            })
          }
        >
          mark chat
        </button>
      </div>
    </div>
  );
};

export default Home;


import { Anchor, Button, Center } from "@mantine/core";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
const Home = () => {
  const nav = useNavigate();
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);

  return (
    <div>
      <div>
        {/* <p>Email:{authState.email}</p>
        <p>Role:{authState.role}</p>
        <p>token:{authState.token.substring(0, 20)}......</p>
        <p>isLoggedIn:{authState.isLoggedIn ? "YES" : "No"}</p>
        <button onClick={makeRequest}>makeRequest</button> */}
        <Center>
          <Button color="blue" radius="md" size="xl" mt={20} variant="subtle">
            <Anchor component={Link} to="/startups">
              All Startups
            </Anchor>
          </Button>
          <br />
          <Button color="blue" radius="md" size="xl" mt={20} variant="subtle">
            <Anchor component={Link} to="/investors">
              All Investors
            </Anchor>
          </Button>
          <br />
          <Button color="blue" radius="md" size="xl" mt={20} variant="subtle">
            <Anchor component={Link} to="/investor/my-chats">
              Investors chats
            </Anchor>
          </Button>
          <br />
          <Button color="blue" radius="md" size="xl" mt={20} variant="subtle">
            <Anchor component={Link} to="/news/1">
              Startup News
            </Anchor>
          </Button>
        </Center>
      </div>
    </div>
  );
};

export default Home;


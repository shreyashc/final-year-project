import { Avatar, Center, Container, Paper, Text } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Circle } from "tabler-icons-react";
import { apiClient } from "../api/client";
import { AuthContext } from "../context/authContext";
import "../styles/mychats.css";

const MyChats = () => {
  const [messages, setMessages] = useState<People[]>([]);
  const nav = useNavigate();
  const { state: authState } = useContext(AuthContext);

  useEffect(() => {
    apiClient
      .get<People[]>("/chat/mychats/")
      .then((res) => {
        console.log(res.data);
        setMessages(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Container size="md">
      <Paper
        className="chat-box"
        shadow="md"
        py={40}
        style={{ minHeight: "80vh", background: "#f2f5f3" }}
      >
        <Center>
          <Text style={{ fontSize: "2.1rem" }} weight={800} mb={10}>
            My Messages
          </Text>
        </Center>
        {messages.map((itm) => (
          <Paper
            shadow="md"
            radius="sm"
            m={5}
            className="people-itm"
            key={itm.chatId}
            onClick={() => {
              nav(`/private-chat/${itm.chatId}`, {
                state: {
                  otherPerson: itm.displayName,
                  otherUserId: itm.sUserId,
                },
              });
            }}
          >
            <Avatar
              mr={7}
              src={itm.logoURL}
              radius="xl"
              alt="it's me"
              size={50}
            />
            <Text size="lg" weight={500}>
              {itm.displayName}
            </Text>
            {authState.role === "investor" && itm.investorUnread && (
              <div className="unread">
                <Circle fill="#1f7cff" stroke="none" />
              </div>
            )}
            {authState.role === "startup" && itm.startupUnread && (
              <div className="unread">
                <Circle fill="#1f7cff" stroke="none" />
              </div>
            )}
          </Paper>
        ))}
      </Paper>
    </Container>
  );
};

export default MyChats;

interface People {
  displayName: string;
  logoURL: string;
  id: number;
  chatId: string;
  investorUnread: boolean;
  startupUnread: boolean;
  sUserId: number;
  iUserId: number;
}


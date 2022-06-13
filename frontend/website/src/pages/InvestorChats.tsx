import { Avatar, Text, Container, Paper } from "@mantine/core";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Circle } from "tabler-icons-react";
import { apiClient } from "../api/client";
import { AuthContext } from "../context/authContext";
import "../styles/mychats.css";

const InvestorChats = () => {
  const [messages, setMessages] = useState<People[]>([]);
  const nav = useNavigate();
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
      <Text style={{ fontSize: "2.1rem" }} weight={800} mb={10}>
        My Messages
      </Text>
      <Paper className="chat-box" shadow="md" py={40}>
        {messages.map((itm) => (
          <div
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
            {itm.investorUnread && (
              <div className="unread">
                <Circle fill="#1f7cff" stroke="none" />
              </div>
            )}
          </div>
        ))}
      </Paper>
    </Container>
  );
};

export default InvestorChats;

interface People {
  displayName: string;
  logoURL: string;
  id: number;
  chatId: string;
  investorUnread: string;
  startupUnread: string;
  sUserId: number;
  iUserId: number;
}


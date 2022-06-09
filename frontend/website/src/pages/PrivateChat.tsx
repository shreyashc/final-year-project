import {
  Avatar,
  Button,
  Container,
  Paper,
  ScrollArea,
  Text,
} from "@mantine/core";

import {
  addDoc,
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import moment from "moment";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { apiClient } from "../api/client";
import "../chat.css";
import { AuthContext } from "../context/authContext";
import { db } from "../firebase";
const PrivateChat = () => {
  const { chatid } = useParams();
  const { state }: any = useLocation();
  const chatPath = `privatechat/messages/${chatid}`;

  const [messages, setMessages] =
    useState<QueryDocumentSnapshot<DocumentData>[]>();

  const [formValue, setFormValue] = useState("");
  const dummy = useRef<any>();
  const { state: authState } = useContext(AuthContext);
  const q = query(collection(db, chatPath), orderBy("createdAt"));

  const [isFirstTime, setIsFirstTime] = useState(false);

  const isInvestor = authState.role === "investor";

  console.log(state.otherUserId);
  const addToDB = async () => {
    const res = await apiClient.post("/chat", {
      chatId: chatid,
      investorUnread: !isInvestor,
      startupUnread: isInvestor,
      sUserId: !isInvestor ? authState.userId : state.otherUserId,
      iUserId: isInvestor ? authState.userId : state.otherUserId,
    });
  };

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    const docData = {
      userId: authState.userId,
      text: formValue,
      createdAt: serverTimestamp(),
      role: authState.role,
    };
    await addDoc(collection(db, chatPath), docData);
    setFormValue("");
    if (isFirstTime) {
      await addToDB();
    }
  };

  useEffect(() => {
    dummy?.current.scrollIntoViewIfNeeded({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const unsub = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.docs.length === 0) {
        setIsFirstTime(true);
      }

      setMessages(querySnapshot.docs);
    });

    return () => unsub();
  }, []);

  return (
    <>
      <Container size="md" px={20}>
        <Paper shadow="sm">
          <Text
            style={{ fontSize: "2.1rem", padding: "10px 5px" }}
            weight={700}
          >
            {state?.otherPerson}
          </Text>
        </Paper>
        <Paper shadow="lg" mt={5}>
          <ScrollArea style={{ height: "70vh" }} p={20}>
            {messages &&
              messages.map((msg) => {
                const data = msg.data();
                return (
                  <TextMessage
                    text={data.text}
                    time={data.createdAt}
                    fromMe={data.userId == authState.userId}
                    avatarText={
                      data.userId == authState.userId
                        ? "Me"
                        : state?.otherPerson.charAt(0)
                    }
                    key={msg.id}
                  />
                );
              })}

            <span ref={dummy}></span>
          </ScrollArea>
          <form onSubmit={sendMessage} className="chat-form">
            <input
              className="msg-input"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Enter Your message here"
            />
            <Button
              type="submit"
              disabled={!formValue}
              variant="light"
              size="lg"
            >
              Send
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

interface tmPops {
  text: string;
  time: any;
  avatarText: string;
  fromMe: boolean;
}

function TextMessage({ text, time, fromMe, avatarText }: tmPops) {
  const messageClass = fromMe ? "sent" : "received";
  const date = time ? new Date(time.seconds * 1000) : new Date();
  return (
    <>
      <div className={`message ${messageClass}`}>
        <Avatar color="cyan" radius="xl">
          {avatarText}
        </Avatar>
        <div className={`${messageClass}-txt-dt`}>
          <p style={{ marginBottom: "0px" }}>{text}</p>
          <div className="time">{moment(date).fromNow()}</div>
        </div>
      </div>
    </>
  );
}

export default PrivateChat;


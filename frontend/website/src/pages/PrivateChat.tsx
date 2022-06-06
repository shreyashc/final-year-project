import React from "react";
import { useParams } from "react-router-dom";

const PrivateChat = () => {
  const { chatid } = useParams();
  return <div>{chatid}</div>;
};

export default PrivateChat;

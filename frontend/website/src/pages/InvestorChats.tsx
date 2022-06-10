import {
  collection,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { AuthContext } from "../context/authContext";


const InvestorChats = () => {
  const { state: authState } = useContext(AuthContext);
  const [messages, setMessages] =
    useState<QueryDocumentSnapshot<DocumentData>[]>();
  const chatPath = `/privatechat/messages`;



  useEffect(() => {
    apiClient.get("/chat/mychats/")
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    
  }, []);
  return <div>InvestorChats</div>;
};

export default InvestorChats;


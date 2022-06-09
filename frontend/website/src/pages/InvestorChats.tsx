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
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { db } from "../firebase";

const InvestorChats = () => {
  const { state: authState } = useContext(AuthContext);
  const [messages, setMessages] =
    useState<QueryDocumentSnapshot<DocumentData>[]>();
  const chatPath = `/privatechat/messages`;

  useEffect(() => {
    async function getChats() {
      const docRef = doc(db, chatPath);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data()?.collection);
    }
    getChats();
  }, []);
  return <div>InvestorChats</div>;
};

export default InvestorChats;


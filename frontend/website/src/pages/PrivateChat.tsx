import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { db } from "../firebase";
const PrivateChat = () => {
  const { chatid } = useParams();
  const chatPath = `privatechat/messages/${chatid}`;
  const messagesRef = collection(db, chatPath);
  const [docs, setDocs] = useState<QuerySnapshot<DocumentData>>();
  const [messages, setMessages] =
    useState<QueryDocumentSnapshot<DocumentData>[]>();

  const [formValue, setFormValue] = useState("");
  const dummy = useRef<any>();
  const { state: authState } = useContext(AuthContext);
  const q = query(collection(db, chatPath), orderBy("createdAt"));

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    const docData = {
      userId: authState.userId,
      text: formValue,
      createdAt: serverTimestamp(),
      role: authState.role,
    };
    await addDoc(collection(db, chatPath), docData);
  };

  useEffect(() => {
    async function x() {
      const docSnap = await getDocs(messagesRef);
      console.log(docSnap.empty);
      setDocs(docSnap);
    }
    x();
    const unsub = onSnapshot(q, (querySnapshot) => {
      console.log(querySnapshot.docs);
      setMessages(querySnapshot.docs);
    });
    return () => unsub();
  }, []);

  // console.log(messagesRef.orderBy);

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => (
            <div key={msg.id}>
              <p>{msg.data().text}</p>
            </div>
          ))}
        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice..."
        />
        <button type="submit" disabled={!formValue}>
          send
        </button>
      </form>
    </>
  );
};

export default PrivateChat;


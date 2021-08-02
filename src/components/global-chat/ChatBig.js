import "./ChatBig.css";
import { ImUsers } from "react-icons/im";
import { RiMessageFill } from "react-icons/ri";
import { Message } from "./Message";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { useUser } from "../../hooks/useUser";

export const ChatBig = ({ input, sendMessage, setInput, messages }) => {
  const user = useUser();
  const [users, setUsers] = useState([]);
  const [chatType, setChatType] = useState("global");
  const [privateMessgaUser, setPrivateMessageUser] = useState("");

  const handlePrivateChat = (e) => {
    setChatType("private");
    setPrivateMessageUser(e.target.textContent);
  };

  const handleGlobalChat = () => {
    setChatType("global");
    setPrivateMessageUser("");
  };

  const handleSendMessage = () => {
    if (chatType === "global") {
      sendMessage();
    } else {
      db.collection("users").doc(user?.uid).collection("privateMessages").add({
        text: input,
        time: db.FieldValue.serverTimestamp(),
        chatWith: privateMessgaUser,
      });
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const response = await db.collection("users").get();
      const usersList = [];
      response.forEach((user) => {
        usersList.push({
          username: user.data().name,
          isOnline: user.data().isOnline,
        });
      });
      setUsers(usersList);
    };
    getUsers();
  }, []);
  return (
    <div className="chat chat--big">
      <div className="chat__navigation">
        <div className="chat__channel">
          <div className="chat__label">
            <RiMessageFill className="chat__icon" />
            <span>Kanał czatu:</span>
          </div>
          <button className="btn btn-small btn-blue" onClick={handleGlobalChat}>
            Czat globalny
          </button>
        </div>
        <div className="chat__usernames">
          <div className="chat__label">
            <ImUsers className="chat__icon" /> Użytkownicy:
            <span></span>
          </div>
          <ul className="usernames-list">
            {users.map((user, i) => (
              <li
                className="usernames-list__item"
                key={i}
                onClick={handlePrivateChat}
              >
                <div
                  className={`user-status user-status--${
                    user.isOnline ? "online" : "offline"
                  }`}
                  title={user.isOnline ? "online" : "offline"}
                ></div>
                {user.username}
              </li>
            ))}
            <ul></ul>
          </ul>
        </div>
      </div>
      <div className="chat__view">
        <div className="chat__header">
          Czat{" "}
          {chatType === "global"
            ? "globalny"
            : `z użytkownikiem ${privateMessgaUser}`}
        </div>
        <div className="chat__messages chat__messages--big">
          {messages.map((message) => (
            <Message key={message.time} message={message} />
          ))}
        </div>
        <form className="chat__form">
          <input
            className="chat__input"
            placeholder="Wpisz wiadomość...."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button
            className="btn btn-small btn-green"
            disabled={!input}
            onClick={handleSendMessage}
            type="submit"
          >
            Wyślij
          </button>
        </form>
      </div>
    </div>
  );
};

import "./App.css";
import React from "react";
import { Route, useHistory } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import { ChatState } from "./Context/ChatProvider";
import { useEffect } from "react";

function App() {
  const { user } = ChatState();
  const history = useHistory();
  useEffect(() => {
    if (user) history.push("/chats");
  }, [user, history]);
  return (
    <div className="app">
      <Route exact path="/" component={HomePage} />
      <Route path="/chats" component={ChatPage} />
    </div>
  );
}

export default App;

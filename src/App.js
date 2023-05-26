import "./App.css";
import React from "react";
// import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import { isEmpty } from "lodash";

function App() {

  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="app">
      {/* <Switch>
        <Route exact path="/chats" component={ChatPage} />
        <Route exact path="/" component={HomePage} />
      </Switch> */}
      {isEmpty(user) ? <HomePage/> : <ChatPage/>}
    </div>
  );
}

export default App;

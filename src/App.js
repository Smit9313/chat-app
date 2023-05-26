import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/chats" component={ChatPage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;

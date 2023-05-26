import React, { useState, useEffect } from "react";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { useHistory } from "react-router-dom";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isEmpty(user)) history.push("/");
  }, [history, user]);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        w="100%"
        h="91.5vh"
        p="10px"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;

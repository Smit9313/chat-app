import React, { useState, useEffect } from "react";

import { Box, Button, useToast, Text, Stack, Avatar } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { ChatState } from "../Context/ChatProvider";
import { getSender } from "../Config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import axios from "axios";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/chat`,
        config
      );
      console.log(data);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
      background="linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgba(27,24,113,1) 93.2% )"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            background="linear-gradient( 86.3deg,  rgba(0,119,182,1) 3.6%, rgba(8,24,68,1) 87.6% )"
            _hover={{
              background: "linear-gradient(90deg, #4b6cb7 10%, #182848 90%)",
              //   color: "white",
            }}
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgba(27,24,113,1) 93.2% )"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                display="flex"
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={
                  selectedChat === chat
                    ? "black"
                    : "radial-gradient( circle 815px at 23.4% -21.8%,  rgba(9,29,85,1) 0.2%, rgba(0,0,0,1) 100.2% )"
                }
                color={selectedChat === chat ? "white" : "white"}
                px={3}
                py={2}
                borderWidth="1px"
                borderRadius="lg"
                key={chat._id}
              >
                {console.log(chat.users[0].pic)}
                <Avatar
                  mr={5}
                  size="md"
                  cursor="pointer"
                  name={user.name}
                  src={chat.users[0].pic}
                />
                <Box>
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;

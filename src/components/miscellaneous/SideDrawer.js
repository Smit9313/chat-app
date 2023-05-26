import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Box,
  Button,
  Menu,
  Text,
  Tooltip,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
import axios from "axios";
import ChatLoading from "../ChatLoading";

import { ChatState } from "../../Context/ChatProvider";
import { getSender } from "../../Config/ChatLogics";
import ProfileModal from "./profileModal";
import UserListItem from "../UserAvatar/UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const toast = useToast();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter Something in search",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/api/user?search=${search}`,
        config
      );
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/chat`,
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgba(27,24,113,1) 93.2% )"
        w="100%"
        p="10px 15px 10px 15px"
        borderColor="radial-gradient( circle 815px at 23.4% -21.8%,  rgba(9,29,85,1) 0.2%, rgba(0,0,0,1) 100.2% )"
      >
        <Tooltip
          label="Search Users to chat"
          hasArrow
          placeContent="bottom-end"
        >
          <Button
            variant="ghost"
            background="linear-gradient( 86.3deg,  rgba(0,119,182,1) 3.6%, rgba(8,24,68,1) 87.6% )"
            _hover={{
              background: "linear-gradient(90deg, #4b6cb7 10%, #182848 90%)",
              //   color: "white",
            }}
            onClick={onOpen}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
            <Text display={{ base: "none", md: "flex" }} px="4" color="white">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontWeight={600} fontFamily="Work sans">
          MERN-CHAT-APP
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList
              pl={2}
              background="radial-gradient( circle 815px at 23.4% -21.8%,  rgba(9,29,85,1) 0.2%, rgba(0,0,0,1) 100.2% )"
            >
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              background="linear-gradient( 86.3deg,  rgba(0,119,182,1) 3.6%, rgba(8,24,68,1) 87.6% )"
              _hover={{
                background: "linear-gradient(90deg, #4b6cb7 10%, #182848 90%)",
                //   color: "white",
              }}
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList background="radial-gradient( circle 815px at 23.4% -21.8%,  rgba(9,29,85,1) 0.2%, rgba(0,0,0,1) 100.2% )">
              <ProfileModal user={user}>
                <MenuItem background="radial-gradient( circle 815px at 23.4% -21.8%,  rgba(9,29,85,1) 0.2%, rgba(0,0,0,1) 100.2% )">
                  My Profile
                </MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem
                onClick={logoutHandler}
                background="radial-gradient( circle 815px at 23.4% -21.8%,  rgba(9,29,85,1) 0.2%, rgba(0,0,0,1) 100.2% )"
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent
          background="radial-gradient( circle 815px at 23.4% -21.8%,  rgba(9,29,85,1) 0.2%, rgba(0,0,0,1) 100.2% )"
          color="white"
        >
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                onClick={handleSearch}
                background="radial-gradient( circle 815px at 23.4% -21.8%,  rgba(9,29,85,1) 0.2%, rgba(0,0,0,1) 100.2% )"
                _hover={{
                  background:
                    "linear-gradient(90deg, #4b6cb7 10%, #182848 90%)",
                  //   color: "white",
                }}
              >
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;

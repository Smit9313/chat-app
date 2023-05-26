import React from 'react';

import {Box, Avatar, Text } from '@chakra-ui/react';

const UserListItem = ({ user, handleFunction }) => {
    // const { user } = ChatState();

    return (
      <Box
        onClick={handleFunction}
        cursor="pointer"
        bg="linear-gradient(90deg, #a1c4fd 10%, #c2e9fb 90%)"
        _hover={{
          background: "linear-gradient(90deg, #a1c4fd 1%, #4dabf7 100%, #c2e9fb 100%)",
        //   color: "white",
        }}
        w="100%"
        display="flex"
        alignItems="center"
        color="black"
        px={3}
        py={2}
        mb={2}
        borderRadius="lg"
      >
        <Avatar
          mr={2}
          size="sm"
          cursor="pointer"
          name={user.name}
          src={user.pic}
        />
        <Box>
          <Text>{user.name}</Text>
          <Text fontSize="xs">
            <b>Email : </b>
            {user.email}
          </Text>
        </Box>
      </Box>
    );
}

export default UserListItem
import React from 'react';

import {Box, Avatar, Text } from '@chakra-ui/react';

const UserListItem = ({ user, handleFunction }) => {
    // const { user } = ChatState();

    return (
      <Box
        onClick={handleFunction}
        cursor="pointer"
        background= 'linear-gradient(90deg, #1e3c72 16%, #2a5298 94%)'
        color="white"
        _hover={{
          background: 'linear-gradient(90deg, #4b6cb7 10%, #182848 90%)',
        //   color: "white",
        }}
        w="100%"
        display="flex"
        alignItems="center"
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
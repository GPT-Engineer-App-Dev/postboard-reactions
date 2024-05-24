import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <Box bg="blue.500" px={4} py={2}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Text fontSize="xl" color="white">MyApp</Text>
        <Flex alignItems="center">
          <NavLink to="/" style={{ marginRight: '20px', color: 'white', textDecoration: 'none' }}>Home</NavLink>
          <NavLink to="/login" style={{ marginRight: '20px', color: 'white', textDecoration: 'none' }}>Login</NavLink>
          <NavLink to="/signup" style={{ marginRight: '20px', color: 'white', textDecoration: 'none' }}>Sign Up</NavLink>
          <NavLink to="/account" style={{ color: 'white', textDecoration: 'none' }}>Account</NavLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navigation;
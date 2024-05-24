import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Box, Flex, Link } from "@chakra-ui/react";
import Index from "./pages/Index.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Account from "./pages/Account.jsx";

const Navigation = () => (
  <Box bg="gray.800" color="white" px={4}>
    <Flex h={16} alignItems="center" justifyContent="space-between">
      <Box>Logo</Box>
      <Flex alignItems="center">
        <Link px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'gray.700' }} href="/">Home</Link>
        <Link px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'gray.700' }} href="/login">Login</Link>
        <Link px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'gray.700' }} href="/signup">Sign Up</Link>
        <Link px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'gray.700' }} href="/account">Account</Link>
      </Flex>
    </Flex>
  </Box>
);

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;

import { Box, Flex, Link, Button, useDisclosure, Stack } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

const NavigationMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="blue.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box color="white" fontWeight="bold">MyApp</Box>
        <Flex display={{ base: "none", md: "flex" }} ml={10}>
          <DesktopNav />
        </Flex>
        <Flex display={{ base: "flex", md: "none" }}>
          <Button onClick={isOpen ? onClose : onOpen} variant="ghost" color="white">
            {isOpen ? <CloseIcon /> : <HamburgerIcon />}
          </Button>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <MobileNav />
        </Box>
      ) : null}
    </Box>
  );
};

const DesktopNav = () => (
  <Stack direction="row" spacing={4}>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/login">Login</NavLink>
    <NavLink to="/signup">Sign Up</NavLink>
    <NavLink to="/account">Account</NavLink>
  </Stack>
);

const MobileNav = () => (
  <Stack as={"nav"} spacing={4}>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/login">Login</NavLink>
    <NavLink to="/signup">Sign Up</NavLink>
    <NavLink to="/account">Account</NavLink>
  </Stack>
);

const NavLink = ({ to, children }) => (
  <Link
    as={RouterLink}
    to={to}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{ textDecoration: "none", bg: "blue.700" }}
    color="white"
  >
    {children}
  </Link>
);

export default NavigationMenu;
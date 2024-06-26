import { useState, useEffect } from "react";
import { supabase } from "../integrations/supabase/api";
import { Container, VStack, Input, Button, Text } from "@chakra-ui/react";

const Account = () => {
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setEmail(user.email);
      setUserId(user.id);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUserId(session.user.id);
      } else {
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) {
          console.error("Error signing in anonymously:", error);
        } else {
          setUserId(data.user.id);
        }
      }
    };
    checkSession();
  }, []);

  const handleUpdate = async () => {
    const { error } = await supabase.auth.updateUser({ email, password });
    if (error) setError(error.message);
    else setError(null);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) setError(error.message);
    else setError(null);
  };

  return (
    <Container centerContent>
      <VStack spacing={4}>
        <Text fontSize="2xl">Account</Text>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleUpdate} colorScheme="blue">Update</Button>
        <Button onClick={handleLogout} colorScheme="red">Logout</Button>
        {error && <Text color="red.500">{error}</Text>}
      </VStack>
    </Container>
  );
};

export default Account;
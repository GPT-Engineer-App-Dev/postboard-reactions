import { useState } from "react";
import { supabase } from "../integrations/supabase/api";
import { Container, VStack, Input, Button, Text } from "@chakra-ui/react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setError(null);
  };

  return (
    <Container centerContent>
      <VStack spacing={4}>
        <Text fontSize="2xl">Sign Up</Text>
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
        <Button onClick={handleSignUp} colorScheme="blue">Sign Up</Button>
        {error && <Text color="red.500">{error}</Text>}
      </VStack>
    </Container>
  );
};

export default SignUp;
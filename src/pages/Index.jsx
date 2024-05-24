import { useState } from "react";
import { Container, VStack, Text, Box, Input, Button, HStack, IconButton, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown, FaLaugh, FaSadTear } from "react-icons/fa";

import { usePosts, useAddPost, useAddReaction } from "../integrations/supabase/api.ts";

const Index = () => {
  const { data: posts, isLoading, isError } = usePosts();
  const addPostMutation = useAddPost();
  const addReactionMutation = useAddReaction();
  const [newPost, setNewPost] = useState("");

  const addPost = () => {
    if (newPost.trim() === "") return;
    addPostMutation.mutate({ title: newPost, body: newPost, author_id: "anonymous" });
    setNewPost("");
  };

  const addReaction = (postId, reaction) => {
    addReactionMutation.mutate({ post_id: postId, user_id: "anonymous", emoji: reaction });
  };

  if (isLoading) return <Spinner />;
  if (isError) return <Alert status="error"><AlertIcon />Error loading posts</Alert>;

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Public Postboard</Text>
        <HStack width="100%">
          <Input
            placeholder="Write a new post..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <Button onClick={addPost} colorScheme="blue">Post</Button>
        </HStack>
        <VStack spacing={4} width="100%">
          {posts.map((post) => (
            <Box key={post.id} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Text mb={2}>{post.title}</Text>
              <HStack spacing={4}>
                <IconButton
                  aria-label="Like"
                  icon={<FaThumbsUp />}
                  onClick={() => addReaction(post.id, "👍")}
                />
                <Text>{post.reactions?.like || 0}</Text>
                <IconButton
                  aria-label="Dislike"
                  icon={<FaThumbsDown />}
                  onClick={() => addReaction(post.id, "👎")}
                />
                <Text>{post.reactions?.dislike || 0}</Text>
                <IconButton
                  aria-label="Laugh"
                  icon={<FaLaugh />}
                  onClick={() => addReaction(post.id, "😂")}
                />
                <Text>{post.reactions?.laugh || 0}</Text>
                <IconButton
                  aria-label="Sad"
                  icon={<FaSadTear />}
                  onClick={() => addReaction(post.id, "😢")}
                />
                <Text>{post.reactions?.sad || 0}</Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
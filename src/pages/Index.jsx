import { useState } from "react";
import { usePosts, useAddPost, useAddReaction } from '../integrations/supabase/api';
import { Container, VStack, Text, Box, Input, Button, HStack, IconButton } from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown, FaLaugh, FaSadTear } from "react-icons/fa";

const Index = () => {
  const { data: posts, isLoading, isError } = usePosts();
  const addPostMutation = useAddPost();
  const addReactionMutation = useAddReaction();
  const [newPost, setNewPost] = useState("");

  const addPost = () => {
    if (newPost.trim() === "") return;
    addPostMutation.mutate({ title: newPost, body: newPost, author_id: 'some-author-id' });
    setNewPost("");
  };

  const addReaction = (postId, reaction) => {
    addReactionMutation.mutate({ post_id: postId, user_id: 'some-user-id', emoji: reaction });
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error loading posts</Text>;

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
              <Text mb={2}>{post.body}</Text>
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
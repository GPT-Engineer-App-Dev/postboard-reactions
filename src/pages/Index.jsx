import { useState, useEffect } from "react";
import { supabase } from "../integrations/supabase/api";
import { usePosts, useAddPost, useAddReaction, useRemoveReaction } from '../integrations/supabase/api';
import { Container, VStack, Text, Box, Input, Button, HStack, IconButton } from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown, FaLaugh, FaSadTear } from "react-icons/fa";

const Index = () => {
  const { data: posts, isLoading: postsLoading, error: postsError } = usePosts();
  const addPostMutation = useAddPost();
  const addReactionMutation = useAddReaction();
  const removeReactionMutation = useRemoveReaction();
  const [newPost, setNewPost] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const signInAnonymously = async () => {
      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) {
        console.error("Error signing in anonymously:", error);
      } else {
        setUserId(data.user.id);
      }
    };
    signInAnonymously();
  }, []);

  const addPost = () => {
    if (newPost.trim() === "" || !userId) return;
    addPostMutation.mutate({ title: newPost, body: newPost, author_id: userId });
    setNewPost("");
  };

  const handleReaction = (postId, reaction) => {
    if (!userId) return;
    const existingReaction = posts.find(post => post.id === postId).reactions.find(r => r.user_id === userId && r.emoji === reaction);
    if (existingReaction) {
      removeReactionMutation.mutate({ post_id: postId, user_id: userId, emoji: reaction });
    } else {
      addReactionMutation.mutate({ post_id: postId, emoji: reaction, user_id: userId });
    }
  };

  if (postsLoading) return <Text>Loading...</Text>;
  if (postsError) return <Text>Error loading posts</Text>;

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
          <Button onClick={addPost} colorScheme="blue" isLoading={addPostMutation.isLoading}>Post</Button>
        </HStack>
        <VStack spacing={4} width="100%">
          {posts.map((post) => (
            <Box key={post.id} p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Text mb={2}>{post.title}</Text>
              <HStack spacing={4}>
                <IconButton
                  aria-label="Like"
                  icon={<FaThumbsUp />}
                  onClick={() => handleReaction(post.id, "👍")}
                  colorScheme={post.reactions.some(r => r.user_id === userId && r.emoji === "👍") ? "blue" : "gray"}
                />
                <Text>{post.reactions.filter(r => r.emoji === "👍").length}</Text>
                <IconButton
                  aria-label="Dislike"
                  icon={<FaThumbsDown />}
                  onClick={() => handleReaction(post.id, "👎")}
                  colorScheme={post.reactions.some(r => r.user_id === userId && r.emoji === "👎") ? "blue" : "gray"}
                />
                <Text>{post.reactions.filter(r => r.emoji === "👎").length}</Text>
                <IconButton
                  aria-label="Laugh"
                  icon={<FaLaugh />}
                  onClick={() => handleReaction(post.id, "😂")}
                  colorScheme={post.reactions.some(r => r.user_id === userId && r.emoji === "😂") ? "blue" : "gray"}
                />
                <Text>{post.reactions.filter(r => r.emoji === "😂").length}</Text>
                <IconButton
                  aria-label="Sad"
                  icon={<FaSadTear />}
                  onClick={() => handleReaction(post.id, "😢")}
                  colorScheme={post.reactions.some(r => r.user_id === userId && r.emoji === "😢") ? "blue" : "gray"}
                />
                <Text>{post.reactions.filter(r => r.emoji === "😢").length}</Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Reaction, Post } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const queryClient = new QueryClient();

export const SupabaseProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

// Fetch all posts
export const usePosts = () => {
  return useQuery(['posts'], async () => {
    const { data, error } = await supabase.from<Post>('posts').select('*');
    if (error) throw new Error(error.message);
    return data;
  });
};

// Fetch all reactions for a post
export const useReactions = (postId: number) => {
  return useQuery(['reactions', postId], async () => {
    const { data, error } = await supabase.from<Reaction>('reactions').select('*').eq('post_id', postId);
    if (error) throw new Error(error.message);
    return data;
  });
};

// Add a new post
export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation(async (newPost: Omit<Post, 'id' | 'created_at'>) => {
    const { data, error } = await supabase.from<Post>('posts').insert(newPost);
    if (error) throw new Error(error.message);
    return data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    }
  });
};

// Add a new reaction
export const useAddReaction = () => {
  const queryClient = useQueryClient();
  return useMutation(async (newReaction: Omit<Reaction, 'id'>) => {
    const { data, error } = await supabase.from<Reaction>('reactions').insert(newReaction);
    if (error) throw new Error(error.message);
    return data;
  }, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['reactions', variables.post_id]);
    }
  });
};
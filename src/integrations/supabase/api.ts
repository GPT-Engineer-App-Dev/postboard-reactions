import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Post, Reaction } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const queryClient = new QueryClient();

export const usePosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase.from('posts').select('*');
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation<Post, Error, Partial<Post>>({
    mutationFn: async (newPost) => {
      const { data, error } = await supabase.from('posts').insert(newPost).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });
};

export const useReactions = (postId: number) => {
  return useQuery<Reaction[], Error>({
    queryKey: ['reactions', postId],
    queryFn: async () => {
      const { data, error } = await supabase.from('reactions').select('*').eq('post_id', postId);
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useAddReaction = () => {
  const queryClient = useQueryClient();
  return useMutation<Reaction, Error, Partial<Reaction>>({
    mutationFn: async (newReaction) => {
      const { data, error } = await supabase.from('reactions').insert(newReaction).select().single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['reactions', data.post_id]);
    },
  });
};
import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Post, Reaction } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const queryClient = new QueryClient();

export const usePosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`*, reactions(*)`)
      if (error) throw new Error(error.message);
      return window.r = data.map(post => ({
        ...post,
        reactions: post.reactions || [],
      }));
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
      const { data, error } = await supabase.from('reactions').select('*, user:users(*)').eq('post_id', postId);
      console.log(data)
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
      queryClient.invalidateQueries(['posts']);
    },
  });
};

export const useRemoveReaction = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { post_id: number, user_id: string, emoji: string }>({
    mutationFn: async ({ post_id, user_id, emoji }) => {
      const { error } = await supabase
        .from('reactions')
        .delete()
        .eq('post_id', post_id)
        .eq('user_id', user_id)
        .eq('emoji', emoji);
      if (error) throw new Error(error.message);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['reactions', variables.post_id]);
      queryClient.invalidateQueries(['posts']);
    },
  });
};
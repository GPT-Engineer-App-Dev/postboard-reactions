import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Post, Reaction } from './types';
import React from 'react';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Query client for React Query
const queryClient = new QueryClient();

// Helper function to fetch data
const fetchData = async (table: string) => {
  const { data, error } = await supabase.from(table).select('*');
  if (error) throw new Error(error.message);
  return data;
};

// Hook to fetch posts
export const usePosts = () => {
  return useQuery<Post[], Error>(['posts'], () => fetchData('posts'));
};

// Hook to fetch reactions
export const useReactions = () => {
  return useQuery<Reaction[], Error>(['reactions'], () => fetchData('reactions'));
};

// Helper function to insert data
const insertData = async (table: string, payload: any) => {
  const { data, error } = await supabase.from(table).insert(payload);
  if (error) throw new Error(error.message);
  return data;
};

// Hook to add a new post
export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation((newPost: Omit<Post, 'id' | 'created_at'>) => insertData('posts', newPost), {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });
};

// Hook to add a new reaction
export const useAddReaction = () => {
  const queryClient = useQueryClient();
  return useMutation((newReaction: Omit<Reaction, 'id'>) => insertData('reactions', newReaction), {
    onSuccess: () => {
      queryClient.invalidateQueries('reactions');
    },
  });
};

// QueryClientProvider setup
export const QueryClientProviderWrapper: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);
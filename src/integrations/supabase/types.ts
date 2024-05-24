// src/integrations/supabase/types.ts

// Interface for the 'reactions' table
export interface Reaction {
  id: number; // Primary Key
  post_id: number; // Foreign Key to `posts.id`
  user_id: string;
  emoji: string;
}

// Interface for the 'posts' table
export interface Post {
  id: number; // Primary Key
  title: string;
  body: string;
  created_at: string; // Timestamp with time zone
  author_id: string;
}
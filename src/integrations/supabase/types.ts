/**
 * Represents a reaction to a post.
 * @property {number} id - Primary Key.
 * @property {number} post_id - Foreign Key to `posts.id`.
 * @property {string} user_id - UUID of the user.
 * @property {string} emoji - Emoji representing the reaction.
 */
export interface Reaction {
  id: number;
  post_id: number;
  user_id: string;
  emoji: string;
}

/**
 * Represents a post made by a user.
 * @property {number} id - Primary Key.
 * @property {string} title - Title of the post.
 * @property {string} body - Body content of the post.
 * @property {string} created_at - Timestamp when the post was created.
 * @property {string} author_id - UUID of the author.
 */
export interface Post {
  id: number;
  title: string;
  body: string;
  created_at: string;
  author_id: string;
}
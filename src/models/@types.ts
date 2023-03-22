export interface CreateUserTypes {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserTypes {
  id: number;
  name: string;
  email: string;
  password: string;
  old_password: string;
}

export interface CreatePostsType {
  title: string;
  description: string;
  image: string;
}

export interface CommentsType {
  id: number;
  name: string;
  post_id: number;
  user_id: number;
}

export interface GetPostsType {
  id: number;
  title: string;
  description: string;
  image: string;
  user_id: number;
  created_at: string;
}

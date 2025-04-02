import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { api } from '../services/api';

interface Post {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  comments?: Comment[];
}

interface Comment {
  id: string;
  postId: string;
  content: string;
  timestamp: string;
}

interface SocialState {
  posts: Post[];
  comments: Record<string, Comment[]>;
  users: any[];
  loading: boolean;
  error: string | null;
}

type Action = 
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'SET_COMMENTS'; payload: { postId: string; comments: Comment[] } }
  | { type: 'SET_USERS'; payload: any[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

const initialState: SocialState = {
  posts: [],
  comments: {},
  users: [],
  loading: false,
  error: null,
};

function socialReducer(state: SocialState, action: Action): SocialState {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'SET_COMMENTS':
      return { 
        ...state, 
        comments: { 
          ...state.comments, 
          [action.payload.postId]: action.payload.comments 
        } 
      };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const SocialContext = createContext<{
  state: SocialState;
  fetchPosts: (userId?: string) => Promise<void>;
  fetchComments: (postId: string) => Promise<void>;
  fetchUsers: () => Promise<void>;
} | null>(null);

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(socialReducer, initialState);

  const fetchPosts = useCallback(async (userId?: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const posts = await api.getPosts(userId);
      dispatch({ type: 'SET_POSTS', payload: posts });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch posts' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const fetchComments = useCallback(async (postId: string) => {
    try {
      const comments = await api.getComments(postId);
      dispatch({ 
        type: 'SET_COMMENTS', 
        payload: { postId, comments } 
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch comments' });
    }
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      const users = await api.getUsers();
      dispatch({ type: 'SET_USERS', payload: users });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch users' });
    }
  }, []);

  return (
    <SocialContext.Provider value={{ state, fetchPosts, fetchComments, fetchUsers }}>
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};

import {
    configureStore,
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    PayloadAction
  } from '@reduxjs/toolkit';
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

const postsAdapter = createEntityAdapter<Post>();

export const fetchPosts = createAsyncThunk(
  'social/fetchPosts',
  async (userId?: string) => {
    return api.getPosts(userId);
  }
);

export const fetchComments = createAsyncThunk(
  'social/fetchComments',
  async (postId: string) => {
    return api.getComments(postId);
  }
);

interface SocialState {
  posts: ReturnType<typeof postsAdapter.getInitialState>;
  comments: Record<string, Comment[]>;
  users: any[];
  loading: boolean;
  error: string | null;
}

const initialState: SocialState = {
  posts: postsAdapter.getInitialState(),
  comments: {},
  users: [],
  loading: false,
  error: null,
};

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    setPosts: (state: SocialState, action: PayloadAction<Post[]>) => {
      postsAdapter.setAll(state.posts, action.payload);
    },
    setUsers: (state: SocialState, action: PayloadAction<any[]>) => {
      state.users = action.payload;
    },
    setLoading: (state: SocialState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setComments: (state, action: PayloadAction<{ postId: string; comments: Comment[] }>) => {
      state.comments[action.payload.postId] = action.payload.comments;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        postsAdapter.setAll(state.posts, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        if (action.meta.arg) {
          state.comments[action.meta.arg] = action.payload;
        }
      });
  },
});

export const store = configureStore({
  reducer: {
    social: socialSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: true,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Selectors
export const selectSocialState = (state: RootState) => state.social;
export const selectPosts = createSelector(
  selectSocialState,
  (state) => state.posts
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state: RootState) => state.social.posts);

export const { setPosts, setUsers, setLoading, setComments } = socialSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

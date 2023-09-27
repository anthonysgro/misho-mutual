// Main Redux Imports
import { combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

// Combined Reducer
const reducer = combineReducers({});

// Redux Middleware
const middleware = [thunkMiddleware, createLogger({ collapsed: true })];

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Creates Redux Store
const store = configureStore({
    reducer,
    middleware,
});

export default store;

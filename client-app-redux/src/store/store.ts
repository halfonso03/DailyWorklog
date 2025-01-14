import { configureStore } from "@reduxjs/toolkit";
import logReducer from "../redux/logSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        log: logReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
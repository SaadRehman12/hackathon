import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import eventReducer from './slices/eventSlice';

const store = configureStore({
    reducer: {
        user: userReducer, // User slice will be accessed via store.user
        eventSlice: eventReducer, // Event slice will be accessed via store.eventSlice
    },
});

export default store;

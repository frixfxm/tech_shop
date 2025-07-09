import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cart from "./Slices/cartSlice";
import filter from "./Slices/filterSlice";
import pizzas from "./Slices/pizzasSlice";

export const store = configureStore({
	reducer: {
		filter,
		cart,
		pizzas,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

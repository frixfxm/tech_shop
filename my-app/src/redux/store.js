import { configureStore } from "@reduxjs/toolkit";
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

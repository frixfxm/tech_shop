import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzasSL = createAsyncThunk(
	"pizza/fetchPizzas",
	async params => {
		const { sortBy, order, category, search, currentPage } = params;
		const { data } = await axios.get(
			`https://685452cb6a6ef0ed662ec830.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		);
		return data;
	}
);

const initialState = {
	items: [],
	status: "loading", //loading, succes, error
};

const pizzaSlice = createSlice({
	name: "pizza",
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPizzasSL.pending, state => {
				state.status = "loading";
				state.items = [];
			})
			.addCase(fetchPizzasSL.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = "success";
			})
			.addCase(fetchPizzasSL.rejected, state => {
				state.status = "error";
				state.items = [];
			});
	},
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type SearchPizzaParams = {
	sortBy: string;
	order: string;
	category: string;
	search: string;
	currentPage: string;
};

export const fetchPizzasSL = createAsyncThunk<Pizza[], SearchPizzaParams>(
	"pizza/fetchPizzas",
	async params => {
		const { sortBy, order, category, search, currentPage } = params;
		const { data } = await axios.get<Pizza[]>(
			`https://685452cb6a6ef0ed662ec830.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		);
		return data;
	}
);
type Pizza = {
	id: string;
	title: string;
	types: number[];
	price: number;
	count: number;
	imageUrl: string;
	sizes: number[];
};

export enum Status {
	LOADING = "loading",
	SUCCESS = "success",
	ERROR = "error",
}

interface PizzaSliceState {
	items: Pizza[];
	status: Status;
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING, //loading, succes, error
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
				state.status = Status.LOADING;
				state.items = [];
			})
			.addCase(fetchPizzasSL.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = Status.SUCCESS;
			})
			.addCase(fetchPizzasSL.rejected, state => {
				state.status = Status.ERROR;
				state.items = [];
			});
	},
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;

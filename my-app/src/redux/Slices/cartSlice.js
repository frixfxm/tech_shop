import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	totalPrice: 0,
	item: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action) {
			const findItem = state.item.find(obj => obj.id === action.payload.id);

			if (findItem) {
				findItem.count++;
			} else {
				state.item.push({
					...action.payload,
					count: 1,
				});
			}
			state.totalPrice = state.item.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},
		minusItem(state, action) {
			const findItem = state.item.find(obj => obj.id === action.payload);
			if (findItem) {
				findItem.count--;
			}
			state.totalPrice = state.item.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},
		removeItem(state, action) {
			state.item = state.item.filter(obj => obj.id !== action.payload);
			state.totalPrice = state.item.reduce(
				(sum, obj) => obj.price * obj.count + sum,
				0
			);
		},
		clearItems(state) {
			state.item = [];
			state.totalPrice = 0;
		},
	},
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;

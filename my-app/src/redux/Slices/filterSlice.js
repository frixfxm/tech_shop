import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	categoryId: 0,
	sortType: {
		name: "популярности",
		sort: "rating",
	},
};

const filterSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setCategoryId(state, action) {
			state.categoryId = action.payload;
			console.log("action = ", action);
		},
	},
});

export const { setCategoryId } = filterSlice.actions;
export default filterSlice.reducer;

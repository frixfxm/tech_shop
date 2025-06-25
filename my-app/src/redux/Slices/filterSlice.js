import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	categoryId: 0,
	currentPage: 1,
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
		setSort(state, action) {
			state.sortType = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
	},
});

export const { setCategoryId, setSort, setCurrentPage } = filterSlice.actions;
export default filterSlice.reducer;

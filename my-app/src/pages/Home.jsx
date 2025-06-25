import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchContext } from "../App";
import Categories from "../Components/Categories";
import Pagination from "../Components/Pagination";
import PizzaBlock from "../Components/PizzaBlock";
import Sceleton from "../Components/PizzaBlock/Sceleton";
import Sort from "../Components/Sort";
import { setCategoryId, setCurrentPage } from "../redux/Slices/filterSlice";
import "../scss/app.scss";

const Home = () => {
	const { categoryId, sortType, currentPage } = useSelector(
		state => state.filter
	);

	const dispatch = useDispatch();

	const setCategoriesActiveIndex = id => {
		dispatch(setCategoryId(id));
	};

	const { searchValue } = useContext(SearchContext);
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const onChangePage = num => {
		dispatch(setCurrentPage(num));
	};

	useEffect(() => {
		setIsLoading(true);

		const sortBy = sortType.sort.replace("-", "");
		const order = sortType.sort.includes("-") ? "asc" : "desc";
		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const search = searchValue ? `&search=${searchValue}` : "";

		axios
			.get(
				`https://685452cb6a6ef0ed662ec830.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
			)
			.then(res => {
				setItems(Array.isArray(res.data) ? res.data : []);
				setIsLoading(false);
			});

		window.scrollTo(0, 0);
	}, [categoryId, sortType, searchValue, currentPage]);

	const pizzas = items.map(i => <PizzaBlock key={i.id} {...i} />);

	const skeletons = [...new Array(6)].map((_, index) => (
		<Sceleton key={index} />
	));

	return (
		<div className="container">
			<div className="content__top">
				<Categories
					value={categoryId}
					setValue={id => setCategoriesActiveIndex(id)}
				/>
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? skeletons : pizzas}</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;

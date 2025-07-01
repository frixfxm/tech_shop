import axios from "axios";
import qs from "qs";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../App";
import Categories from "../Components/Categories";
import Pagination from "../Components/Pagination";
import PizzaBlock from "../Components/PizzaBlock";
import Sceleton from "../Components/PizzaBlock/Sceleton";
import Sort, { popupItems } from "../Components/Sort";
import {
	setCategoryId,
	setCurrentPage,
	setFilters,
} from "../redux/Slices/filterSlice";
import "../scss/app.scss";

const Home = () => {
	const navigate = useNavigate();
	const { categoryId, sortType, currentPage } = useSelector(
		state => state.filter
	);

	const isSearch = useRef(false);

	const dispatch = useDispatch();
	const isMounted = useRef(false);
	const setCategoriesActiveIndex = id => {
		dispatch(setCategoryId(id));
	};

	const { searchValue } = useContext(SearchContext);
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const onChangePage = num => {
		dispatch(setCurrentPage(num));
	};

	function fetchPizzas() {
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
	}
	//Если изменили параметры и был первый рендер
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sortType.sort,
				categoryId,
				currentPage,
			});

			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sortType, searchValue, currentPage]);

	//Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = popupItems.find(obj => obj.sort === params.sortProperty);
			dispatch(
				setFilters({
					...params,
					sort,
				})
			);
			isSearch.current = true;
		}
	}, []);
	//Если был первый рендер, то запрашиваем пиццы
	useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			fetchPizzas();
		}
		isSearch.current = false;
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

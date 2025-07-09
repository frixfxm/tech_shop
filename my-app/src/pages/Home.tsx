import qs from "qs";
import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Categories from "../Components/Categories";
import Pagination from "../Components/Pagination";
import PizzaBlock from "../Components/PizzaBlock";
import Sceleton from "../Components/PizzaBlock/Sceleton";
import Sort, { popupItems } from "../Components/Sort";
import {
	filterSelector,
	pizzasSelector,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from "../redux/Slices/filterSlice";
import { fetchPizzasSL } from "../redux/Slices/pizzasSlice";
import { useAppDispatch } from "../redux/store";
import "../scss/app.scss";

const Home = () => {
	const navigate = useNavigate();
	const { categoryId, sortType, currentPage, searchValue } =
		useSelector(filterSelector);

	const isSearch = useRef(false);

	const dispatch = useAppDispatch();
	const isMounted = useRef(false);

	const setCategoriesActiveIndex = useCallback((id: number) => {
		dispatch(setCategoryId(id));
	}, []);

	const { items, status } = useSelector(pizzasSelector);

	const onChangePage = (num: number) => {
		dispatch(setCurrentPage(num));
	};
	async function fetchPizzas() {
		type fethPizza = {
			sortBy: string;
			order: string;
			category: number;
			search: string;
			currentPage: number;
		};
		const sortBy = sortType.sort.replace("-", "");
		const order = sortType.sort.includes("-") ? "asc" : "desc";
		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const search = searchValue ? `&search=${searchValue}` : "";

		try {
			dispatch(
				fetchPizzasSL({
					sortBy,
					order,
					category,
					search,
					currentPage: String(currentPage),
				})
			);
		} catch (err) {
			if (err instanceof Error) {
				alert(err.message);
			}
		}
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
			const params = qs.parse(window.location.search.substring(1)) as {
				sortProperty: string;
				categoryId: string;
				currentPage: string;
				search?: string;
			};

			const sort =
				popupItems.find(obj => obj.sort === params.sortProperty) ??
				popupItems[0];

			dispatch(
				setFilters({
					searchValue: params.search || "",
					categoryId: Number(params.categoryId),
					currentPage: Number(params.currentPage),
					sortType: sort,
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
				<Categories value={categoryId} setValue={setCategoriesActiveIndex} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{status === "error" ? (
				<div className="content__error-info">
					<h1>Сорянчик чегодня питс не будет 👿</h1>
					<p>
						Мы не извиняемся, потому что пацаны не извиняются, кстати вместо
						пицц есть такая штука{" "}
						<a href="https://fitness-cccp.ru/clubs/solntsevo/?utm_source=direct.yandex.ru&utm_medium=cpc&utm_campaign=rak_rk+solntsevo+poisk+key+fitnes+geo_metro_rajony&rak_cid=27995846&rak_source_type=search&rak_source=none&rak_position_type=premium&rak_position=3&rak_ad_id=4485227676&rak_phrase_id=47558272888&rak_retargeting_id=47558272888&calltouch_tm=yd_c:27995846_gb:2802756594_ad:4485227676_ph:47558272888_st:search_pt:premium_p:3_s:none_dt:desktop_reg:216_ret:47558272888_apt:none&yclid=11588521511052115967">
							тык👈
						</a>
					</p>
				</div>
			) : (
				<div className="content__items">
					{status === "loading" ? skeletons : pizzas}
				</div>
			)}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;

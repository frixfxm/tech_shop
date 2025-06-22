import { useEffect, useState } from "react";
import Categories from "../Components/Categories";
import PizzaBlock from "../Components/PizzaBlock";
import Sceleton from "../Components/PizzaBlock/Sceleton";
import Sort from "../Components/Sort";
import "../scss/app.scss";

const Home = ({ searchValue }) => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [categoriesActiveIndex, setCategoriesActiveIndex] = useState(0);
	const [popupIndex, setPopupIndex] = useState({
		name: "популярности",
		sort: "rating",
	});

	useEffect(() => {
		setIsLoading(true);

		const sortBy = popupIndex.sort.replace("-", "");
		const order = popupIndex.sort.includes("-") ? "asc" : "desc";
		const category =
			categoriesActiveIndex > 0 ? `category=${categoriesActiveIndex}` : "";
		const search = searchValue ? `&search=${searchValue}` : "";
		fetch(
			`https://685452cb6a6ef0ed662ec830.mockapi.io/pizzas?${category}&sortBy=${sortBy}&order=${order}${search}`
		)
			.then(res => res.json())
			.then(arr => {
				setItems(arr);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoriesActiveIndex, popupIndex, searchValue]);
	console.log(categoriesActiveIndex, popupIndex);

	const pizzas = items.map(i => <PizzaBlock key={i.id} {...i} />);

	const skeletons = [...new Array(6)].map((_, index) => (
		<Sceleton key={index} />
	));

	return (
		<div className="container">
			<div className="content__top">
				<Categories
					value={categoriesActiveIndex}
					setValue={id => setCategoriesActiveIndex(id)}
				/>
				<Sort value={popupIndex} setValue={id => setPopupIndex(id)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? skeletons : pizzas}</div>
		</div>
	);
};

export default Home;

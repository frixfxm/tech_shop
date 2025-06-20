import { useEffect, useState } from "react";
import Categories from "../Components/Categories";
import PizzaBlock from "../Components/PizzaBlock";
import Sceleton from "../Components/PizzaBlock/Sceleton";
import Sort from "../Components/Sort";
import "../scss/app.scss";

const Home = () => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch("https://685452cb6a6ef0ed662ec830.mockapi.io/pizzas")
			.then(res => res.json())
			.then(arr => {
				setItems(arr);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, []);

	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(6)].map((_, index) => <Sceleton key={index} />)
					: items.map(i => <PizzaBlock key={i.id} {...i} />)}
			</div>
		</div>
	);
};

export default Home;

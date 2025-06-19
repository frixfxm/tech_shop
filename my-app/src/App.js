import { useEffect, useState } from "react";
import Categories from "./Components/Categories";
import Header from "./Components/Header";
import PizzaBlock from "./Components/Pizza-block";
import Sort from "./Components/Sort";
import "./scss/app.scss";

function App() {
	const [items, setItems] = useState([]);
	useEffect(() => {
		fetch("https://685452cb6a6ef0ed662ec830.mockapi.io/pizzas")
			.then(res => res.json())
			.then(arr => setItems(arr));
	}, []);
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<div className="content__top">
						<Categories />
						<Sort />
					</div>
					<h2 className="content__title">Все пиццы</h2>
					<div className="content__items">
						{items.map(value => (
							<PizzaBlock key={value.id} {...value} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

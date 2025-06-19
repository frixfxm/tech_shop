import Categories from "./Components/Categories";
import Header from "./Components/Header";
import PizzaBlock from "./Components/Pizza-block";
import Sort from "./Components/Sort";
import Pizza from "./assets/pizza.json";
import "./scss/app.scss";

function App() {
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
						{Pizza.map(value => (
							<PizzaBlock key={value.id} {...value} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

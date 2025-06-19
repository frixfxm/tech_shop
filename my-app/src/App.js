import Categories from "./Components/Categories";
import Header from "./Components/Header";
import PizzaBlock from "./Components/Pizza-block";
import Sort from "./Components/Sort";
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
						<PizzaBlock title={"Балийская"} price={500} />
						<PizzaBlock title={"Гавайская"} price={700} />
						<PizzaBlock title={"Тайландская"} price={200} />
						<PizzaBlock title={"Мясная"} price={350} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

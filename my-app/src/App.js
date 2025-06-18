import Categories from "./Components/Categories";
import Header from "./Components/Header";
import PizzaBlock from "./Components/Pizza-block";
import Sort from "./Components/Sort";
import "./scss/app.scss";

function App() {
	return (
		<div class="wrapper">
			<Header />
			<div class="content">
				<div class="container">
					<div class="content__top">
						<Categories />
						<Sort />
					</div>
					<h2 class="content__title">Все пиццы</h2>
					<div class="content__items">
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

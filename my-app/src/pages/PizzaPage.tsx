import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PizzaPage = () => {
	const { id } = useParams();
	const [pizza, setPizza] = useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
	const navigate = useNavigate();
	useEffect(() => {
		async function fetchPizzas() {
			try {
				const { data } = await axios.get(
					`https://685452cb6a6ef0ed662ec830.mockapi.io/pizzas/${id}`
				);
				setPizza(data);
			} catch (error) {
				if (error instanceof Error) {
					alert(error.message);
					navigate("/");
				} else {
					return "ошибочка";
				}
			}
		}
		fetchPizzas();
	}, []);

	if (!pizza) {
		return "Грузим вкуснятину бля...";
	}

	return (
		<div className="container">
			<img src={pizza.imageUrl} alt={pizza.title} />
			<h1>{pizza.title}</h1>
			<h2>Стоимость: {pizza.price} руб.</h2>
		</div>
	);
};

export default PizzaPage;

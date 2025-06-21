import { useState } from "react";

const Categories = ({ value, setValue }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const categories = [
		"Все",
		"Мясные",
		"Вегетарианская",
		"Гриль",
		"Острые",
		"Закрытые",
	];

	const onClickCategory = index => {
		setValue(index);
		setActiveIndex(index);
	};

	return (
		<div className="categories">
			<ul>
				{categories.map((value, i) => (
					<li
						key={i}
						className={activeIndex === i ? "active" : ""}
						onClick={() => onClickCategory(i)}
					>
						{value}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;

import React from "react";

type CategoriesProps = {
	value: number;
	setValue: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
	({ value, setValue }) => {
		const categories = [
			"Все",
			"Мясные",
			"Вегетарианская",
			"Гриль",
			"Острые",
			"Закрытые",
		];

		return (
			<div className="categories">
				<ul>
					{categories.map((category, i) => (
						<li
							key={i}
							className={value === i ? "active" : ""}
							onClick={() => setValue(i)}
						>
							{category}
						</li>
					))}
				</ul>
			</div>
		);
	}
);

export default Categories;

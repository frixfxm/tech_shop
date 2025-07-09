import React from "react";
import style from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
	return (
		<div className={style.root}>
			<span> 😔 </span>
			<br />
			<h1>Ничего не найдено</h1>
			<h5 className={style.description}>
				К сожалению данная страница отсутствует в нашем магазине
			</h5>
		</div>
	);
};

export default NotFoundBlock;

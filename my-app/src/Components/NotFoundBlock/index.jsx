import style from "./NotFoundBlock.module.scss";

export default function NotFoundBlock() {
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
}

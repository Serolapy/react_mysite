import * as Blocks from './blocks'
export function MainPage (){
	return (
		<>
			<h1>Пушистый блог Серолапого - проект на ReactJS</h1>
			<Blocks.List.Ul>
				<Blocks.List.Li href="/blogs" link="Блоги">
					В этом разделе будут собраны все блоги. Также сюда можно перейти из панели Nav
				</Blocks.List.Li>
				<Blocks.List.Li href="/404" link="Какая-то другая страница">
					Эта таблица должна показывать важные и частые страницы на сайте. Поскольку это только лишь проект для сдачи зачёта, тут пока что ничего нет. При переходе по этой ссылке выйдет страница 404
				</Blocks.List.Li>
				<Blocks.List.Li href="https://serolapy.t.me" link="Мой Telegram">
					Добавил просто так. Чтобы была ссылка на другой сайт
				</Blocks.List.Li>
			</Blocks.List.Ul>
			
			<Blocks.LastUpdate>
				20 мая 2023 г.
			</Blocks.LastUpdate>
		</>
	);
}
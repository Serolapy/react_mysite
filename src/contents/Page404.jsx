export function Page404() {
	return (
	<>
		<h1>Ошибка 404</h1>
		Страница не найдена. <br />
		Проверьте ссылку: {window.location.href}
	</>
	);
}
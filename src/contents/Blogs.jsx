import { Link } from 'react-router-dom';

export function Blogs (){
	return (
		<>
			<h1>Блоги</h1>
			Здесь должны быть блоги, но они пока что вырезаны.<br />
			<Link to="/">На главную</Link>
		</>
	);
}
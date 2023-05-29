import { Link } from 'react-router-dom';

export function Nav() {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/blogs">Блоги</Link>
				</li>
				<li>
					<Link to="/">Главная</Link>
				</li>
				{/* <li>
					<Link to="/mods">Моды</Link>
				</li>
				<li>
					<Link to="/useful">Полезное</Link>
				</li> */}
			</ul>
		</nav>
	);
}
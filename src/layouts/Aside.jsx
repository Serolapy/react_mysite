import { Link } from 'react-router-dom';
import constants from '../const.json';
import { useDispatch, useSelector } from 'react-redux';

export function Aside(){
	const dispatch = useDispatch();
	const { authorized, nickname, login, registred } = useSelector((state) => state.users);

	return (
		<aside>
			<h2>Аккаунт</h2>
			{ !authorized ?
			<>
				<Link to="/login">Авторизация</Link>
				<Link to="/reg">Регистрация</Link>
			</> :
			<>
				<div id='account'>
					<div id='aside_nickname'>{nickname}</div>
					<div id='aside_login'>{login}</div>
					<div id='aside_registred'>{registred}</div>
				</div>
				
				<Link onClick={() => { 
					fetch(`http://localhost:${constants.DATABASE_SERVER_PORT}/logout`,
					{ 
						method: 'POST',
						credentials: 'include',
					})
					dispatch({type:"LOGOUT"});
				}}>Выход</Link>
			</>}
			
		</aside>
	);
}
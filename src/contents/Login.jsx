import { useState }  from 'react';
import constants from '../const.json';
import { useNavigate } from 'react-router';

import { useDispatch } from 'react-redux';

import * as Blocks from './blocks';

export function Login(){
	const navigation = useNavigate();
	const dispatch = useDispatch();
	
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [loginMessage, setLoginMessage] = useState('');


	const submitForm = function(e){
		e.preventDefault();
		fetch(`http://localhost:${constants.DATABASE_SERVER_PORT}/login`,
		{ 
			method: 'POST',
			credentials: 'include',
			headers: {
			  	"Content-Type": "application/json",
			},
			body: JSON.stringify({
				"login" : login,
				"password" : password
			})
		})
		.then((res) => res.json())
	  	.then((res) => {
			if (res) {
				switch (res.stat){
					case 0:
						//удачный логин
						setLoginMessage('');
						dispatch({
							type: 'LOGIN',
							nickname : res.nickname,
							login : res.login,
							registred : res.registred,
							catwarId : res.catwarId
						});
						navigation(-1);

						break;
					case 1:
						//если нет пользователя или что-то не совпало
						setLoginMessage(<Blocks.Warning text='Неверный логин или пароль.' />)
						break;
					default:
						setLoginMessage(<Blocks.Warning text='Неизвестная ошибка' />)
						break;
				}
			}
	  	});
	};
	return (
		<>
			<h1>Авторизация</h1>
			<form onSubmit={submitForm}>
				<label htmlFor='login'>Логин <input type="text" name="login" id="login" placeholder="Логин" onChange={(e) => setLogin(e.target.value)}/></label>
				<label htmlFor='password_1'>Пароль <input type="password" name="password" id="password" placeholder="Пароль"  onChange={(e) => setPassword(e.target.value)}/></label>
				<input type="submit" value="Авторизоваться"/>
				<div className="loginMessage">{loginMessage}</div>
			</form>

		</>
	);
}

import { useState }  from 'react';
import constants from '../const.json';
import { useCookies } from 'react-cookie';
import * as Blocks from './blocks';
import { useNavigate } from 'react-router';


export function Reg(){
	const navigation = useNavigate();
	const [login, setLogin] = useState('');
	const [password_1, setPassword_1] = useState('');
	const [password_2, setPassword_2] = useState('');
	const [nickname, setNickname] = useState('');

	const [regMessage, setRegMessage] = useState('');

	const [, setToken] = useCookies(['token']);

	const submitForm = function(e){
		e.preventDefault();
		if (password_1 !== password_2){
			//пароли не совпадают
			setRegMessage(<Blocks.Warning text='Пароли не совпадают' />);
			return
		}
		fetch(`http://localhost:${constants.DATABASE_SERVER_PORT}/reg`,
		{ 
			method: 'POST',
			headers: {
			  "Content-Type": "application/json"
			},
			body: JSON.stringify({
				"nickname" : nickname, 
				"login" : login,
				"password" : password_1
			})
		})
		.then((res) => res.json())
	  	.then((res) => {
			if (res) {
				console.log(res)
				switch (res.stat){
					case 0:
						//юзер уже существует
						setRegMessage(<Blocks.Warning text='Пользователь с таким логином уже существует!' />);
						break;
					case 1:
						//юзер не найден
						setRegMessage('');
						setToken('token', res.token);
						navigation(-1);
						break;
					default:
						setRegMessage(<Blocks.Warning text='Неизвестная ошибка' />)
						break;
				}
			}
	  	})
	};

	return (
		<>
			<h1>Регистрация</h1>
			<form onSubmit={submitForm}>
				<label htmlFor='nickname'>Отображаемое имя<input id="nickname" type="text" name="nickname" placeholder="Серик" onChange={(e) => setNickname(e.target.value)}/></label>
				<label htmlFor='login'>Логин<input id="login" type="text" name="login" placeholder="serolapy"  onChange={(e) => setLogin(e.target.value)}/></label>
				<label htmlFor='password_1'>Пароль<input id="password_1" type="password" name="password_1" onChange={(e) => setPassword_1(e.target.value)}/></label>
				<label htmlFor='password_2'>Повторить пароль<input id="password_2" type="password" name="password_2" onChange={(e) => setPassword_2(e.target.value)}/></label>

				<input type="submit" value="Регистрация"/>
				<div className="regMessage">{regMessage}</div>
			</form>
		</>
	);
}

import { Routes, Route } from 'react-router-dom'

import * as Body from './layouts/'
import * as Content from './contents/'

import constants from './const.json';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		//проверка на авторизацию - юзЭффект выполняется один раз!
		fetch(`http://localhost:${constants.DATABASE_SERVER_PORT}/getuserdata`,
		{ 
			method: 'POST',
			credentials: 'include',
			headers: {
			  	"Content-Type": "application/json"
			},
		})
		.then((res) => res.json())
	  	.then((res) => {
			if (res) {
				switch (res.stat){
					case 0:
						//удачный логин
						dispatch({
							type: 'LOGIN',
							nickname : res.nickname,
							login : res.login,
							registred : res.registred,
							catwarId : res.catwarId
						})
						break;
					case 1:
						//неудачный логин - сервер сам удалит токен
						dispatch({type: 'LOGOUT'});
						break;
					default:
						dispatch({type: 'LOGOUT'});
				}
			}
	  	})
	},[]);


  	return (
		<>
			<Body.Header />
			<Body.Nav />
			<Body.Aside />
			<article>
				<Routes>
    	    	  <Route path='/' element={<Content.MainPage />} />
				  <Route path='login' element={<Content.Login />} />
				  <Route path='reg' element={<Content.Reg />} />
				  <Route path='blogs' element={<Content.Blogs />} />
    	    	  <Route path='*' element={<Content.Page404 />} />
    	    	</Routes>
			</article>
			<Body.Footer />
		</>
  	);
}

export default App;

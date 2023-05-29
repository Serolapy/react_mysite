import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';	//работа с кукуками
import { Provider } from 'react-redux';			//работа с редакс => стейты на глобальном уровне
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementsByTagName('body')[0]);
root.render(
	<React.StrictMode>
		<CookiesProvider>
			<BrowserRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>
		</CookiesProvider>
	</React.StrictMode>
);

import express from 'express';
import Blogs from '../schemas/BlogSchemas.js';
import Users from '../schemas/UserSchemas.js';

import * as mongoose from 'mongoose';

const router = express.Router();

router.post('/new_blog', async function(req, res){
	const { body } = req;

	//проверка - авторизован ли пользователь
	const token = req.cookies.token;
	let userId;							//id автора

	Users.findOne({token: token}).then(function(obj){
		if (obj === null){
			//пользователь не авторизован
			return res.status(200).json({
				ok : true,
				stat : 1,
				errorMessage : 'No token'
			}).send();
		}
		userId = obj._id;
	});

	//создание url
	let url = translit(body.title);
	console.log(body);
	for (let i = 0; true; i++){
		let flagUrl = false;
		let newUrl = url + (i == 0 ? '' : '_' + i);
		await Blogs.findOne({url : newUrl}).then(function(obj){
			if (obj === null){
				//то есть новый урл свободен
				flagUrl = !flagUrl;
				url = newUrl;
				
			}
		});

		if (flagUrl){
			break;
		}
			//то есть мы выбрали новый урл
	}

	//создание блога
	let newBlog = new Blogs ({
		_id : new mongoose.Types.ObjectId(),
		title : body.title,
		created : new Date(),
		author : userId,
		raiting : [],
		url : url,
		content : body.content
	});
	newBlog.save();

	return res.status(200).json({
		ok : true,
		stat : 0,
		url : url
	}).send();
});

router.post('/get_blog', function(req, res){
	const { body } = req;

	Blogs.findOne({url : body.url}).then(function(obj){
		if (obj === null){
			//блог не найден
			return res.status(200).json({
				ok : true,
				stat : 1,
			}).send();
		}
		else{
			//блог найден

			//расчет рейтинга
			let numRaiting = 0;
			raiting.forEach(voite => {
				numRaiting += voite.voites
			});
			
			//получение некоторых данных о пользователе
			let authorData;
			Users.findOne({_id: obj.author._id})
			.then(function(user){
				authorData = {
					nickname : user.nickname,
					login : user.login,
				}
			});
			

			//отправка данных
			return res.status(200).json({
				ok : true,
				stat : 0,
				title : obj.title,
				created : obj.created,
				author : authorData,
				raiting : numRaiting,
				url : obj.url,
				content : obj.content
			}).send();
		}
	});
});
router.post('/remove_blog', async function(req, res){
	const { body } = req;

	//проверка - авторизован ли пользователь
	const token = req.cookies.token;
	let userFlag = false;	//его ли это блог?
	await Users.findOne({token: token}).then(function(obj){
		if (obj === null){
			//пользователь не авторизован или не существует
			return res.status(200).json({
				ok : true,
				stat : 1,
				errorMessage : 'No token'
			}).send();
		}
		userFlag = true;
	});

	//проверка, его ли это блог
	Blogs.findOne({url : body.url}, function(obj){
		if (obj === null){
			return res.status(200).json({
				ok : true,
				stat : 2,
				errorMessage : 'No blog with this url'
			}).send();
		}
		//получаем пользователя-автора
		Users.findById(obj._id, function(objUser){
			//сравниваем токены
			if (objUser.token === token){
				//если юзер, отправивший запрос, является автором
				Blogs.deleteOne({url : body.url});
				return res.status(200).json({
					ok : true,
					stat : 0,
				}).send();
			} else{
				//юзер не автор!
				return res.status(200).json({
					ok : true,
					stat : 3,
					errorMessage : 'User is not author!'
				}).send();
			}
		});
	});
});



//ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ДЛЯ ПЕРЕВОДА ТЕКСТА В ТРАНСЛИТ
function translit(word){
	word = new String(word);
	var converter = {
		'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
		'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
		'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
		'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
		'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
		'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
		'э': 'e',    'ю': 'yu',   'я': 'ya'
	};
 
	word = word.toLowerCase();
  
	var answer = '';
	for (var i = 0; i < word.length; ++i ) {
		if (converter[word[i]] == undefined){
			answer += word[i];
		} else {
			answer += converter[word[i]];
		}
	}
 
	answer = answer.replace(/[-]+/g, '_');
	answer = answer.replace(/^\-|-$/g, ''); 
	return answer;
}



export default router;
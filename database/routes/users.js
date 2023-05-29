import express from 'express';
const router = express.Router()

import Users from '../schemas/UserSchemas.js';
import * as crypto from 'crypto';
import * as mongoose from 'mongoose';

router.post('/login',function(req, res){
	const { body } = req;
	//тут мы сделаем вид, что я шифрую пароль и сверяю его с шифром из БД

	Users.findOne({login: body.login, password: body.password})
	.then(function(obj){
		//если всё правильно

		res.cookie('token', obj.token, { expires: new Date(new Date().getTime() + (3600 * 1000 * 24 * 30)), httpOnly: true });	//устанавливаю токен
		
		//возвращаю данные, чтобы установить их на фронте
		return res.status(200).json({
			ok: true,
			stat: 0,
			nickname : obj.nickname,
			login : obj.login,
			registred : obj.registred,
			catwarId : obj.catwarId
		}).send();
	})
	.catch(function(err){
		console.error(err)
		//если нет пользователя или что-то не совпало
		return res.status(200).json({
			ok: true,
			stat: 1
		}).send();
	});
});

router.post('/reg',function(req, res){
	const { body } = req;
	//тут мы сделаем вид, что я шифрую пароль и сверяю его с шифром из БД

	Users.findOne({login: body.login})
	.then(function(obj){
		//юзер ещё не существует
		if (obj === null){
			let token = crypto.randomBytes(64).toString('hex');
			let newUser = new Users ({
				_id : new mongoose.Types.ObjectId(),
				nickname : body.nickname,
				login : body.login,
				password : body.password,
				token : token
			});
			newUser.save();

			res.cookie('token', token, { expires: new Date(new Date().getTime() + (3600 * 1000 * 24 * 30)), httpOnly: true });	//устанавливаю токен
			return res.status(200).json({
				ok : true,
				stat : 1,
			}).send();
		}
		return res.status(200).json({
			ok: true,
			stat: 0
		}).send();
	})

});

router.post('/getuserdata', function(req,res){
	//ищу юзера в базе данных по токену клиента
	const token = req.cookies.token;
	Users.findOne({token: token})
	.then(function(obj){
		if (obj === null){
			//пользователь не найден
			return res.status(200).json({
				ok : true,
				stat : 1,
			}).send();
		}

		//пользователь найден - возвращаем его данные
		return res.status(200).json({
			ok: true,
			stat: 0,
			nickname : obj.nickname,
			login : obj.login,
			registred : obj.registred,
			catwarId : obj.catwarId
		}).send();
	});
})

router.post('/logout',function(req, res){
	res.clearCookie('token');	//удаляю токен
	return res.status(200).json({
		ok: true,
	}).send();

});
export default router;
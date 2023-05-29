import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,			//id пользователя
	nickname : {type: String},						//отображаемое имя
  	login: {type: String},							//логин
  	password: {type: String},						//зашифрованный пароль
	token: {type: String},							//токен для куки
	registred : {type: Date, default: Date.now},	//дата регистрации
	catwarId : {type: Number, default: 0}			//на будущее
});

export default mongoose.model('Users', UserSchema);
import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
	_id : mongoose.Schema.Types.ObjectId,			//id пользователя
	title : {type: String},							//название поста
  	created : {type: Date},							//дата создания						//дата последнего обновления
	author : mongoose.Schema.Types.ObjectId,		//id автора
	raiting: [{										//рейтинг поста: id юзера + его голос
		userId: mongoose.Schema.Types.ObjectId,
		voites: Number
	}],
	url : String,									//https://domain.com/blog?id=этот_урл
	content : [{									//контент блога: тип контента (параграф, изображение, етк) + его содержимое
		type : String,								
		body : String
	}]	
});

export default mongoose.model('Blogs', BlogSchema);
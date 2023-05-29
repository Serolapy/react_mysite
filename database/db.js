import mongoose from 'mongoose'
import constants from '../src/const.json' assert { type: "json" };

console.log(`Connect to ${constants.DATABASE_NAME}...`)

export async function dbConnect(){
	await mongoose.connect(`${constants.DATABASE_URL}${constants.DATABASE_NAME}`)
		.then(() => console.log('Successfully connected'.green))
        .catch((err) => console.log('Connection failed\n'.red, err));
}
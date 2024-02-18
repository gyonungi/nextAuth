import mongoose from 'mongoose'

const connect = async () => {
	try {
		mongoose.set('strictQuery', false)
		await mongoose.connect(process.env.MONGO as string)
		console.log('подключился к дб')
	} catch (err) {
		throw new Error('lost connection')
	}
}

export default connect

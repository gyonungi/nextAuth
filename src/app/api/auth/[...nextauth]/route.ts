import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/dist/client/components/headers'
import User from '../../../../models/User'
import connect from '../../../../utils/db'

const handlerAuth = NextAuth({
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				email: { label: 'email', type: 'email', required: true },
				password: { label: 'password', type: 'password', required: true },
			},
			async authorize(credentials) {
				if (!credentials) {
					throw new Error('Credentials are missing')
				}

				const cookieStore = cookies()
				const token = cookieStore.get('OutSiteJWT')
				console.log(token?.value)
				await connect()
				try {
					const user = await User.findOne({ email: credentials.email })
					if (user) {
						const isPassword = await bcrypt.compare(
							credentials.password,
							user.password
						)
						if (isPassword || token?.value === token?.value) {
							return user
						} else {
							throw new Error('Неправильные данные')
						}
					} else {
						throw new Error('Не найден Пользователь')
					}
				} catch (err) {
					console.log(err)
				}
			},
		}),
	],
})

export { handlerAuth as GET, handlerAuth as POST }

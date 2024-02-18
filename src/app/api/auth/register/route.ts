import bcrypt from 'bcryptjs'
import { serialize } from 'cookie'

import { sign } from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import User from '../../../../models/User'
import connect from '../../../../utils/db'

export const POST = async (request: Request) => {
	const { name, email, password } = await request.json()

	await connect()

	try {
		const saltRounds = 10
		const salt = await bcrypt.genSalt(saltRounds)
		const hashedPassword = await bcrypt.hash(password, salt)

		const doc = new User({
			name,
			email,
			password: hashedPassword,
		})

		const user = await doc.save()

		const token = sign(
			{
				_id: user._id,
			},
			'secret123',
			{
				expiresIn: '30d',
			}
		)

		const serializedToken = serialize('OutSiteJWT', token, {
			httpOnly: true,
			sameSite: 'strict',

			path: '/',
		})

		return new NextResponse('Пользователь был успешно создан', {
			status: 201,
			headers: { 'Set-cookie': serializedToken },
		})
	} catch (error) {
		return new NextResponse((error as Error).message, {
			status: 500,
		})
	}
}

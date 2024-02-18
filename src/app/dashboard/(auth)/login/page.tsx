'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
const Login = () => {
	const session = useSession()
	const router = useRouter()

	if (session.status == 'loading') {
		return <p>Загрузка</p>
	}

	if (session.status == 'authenticated') {
		router?.push('/')
	}
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const email = (e.currentTarget[0] as HTMLInputElement).value
		const password = (e.currentTarget[1] as HTMLInputElement).value
		signIn('credentials', { email, password })
	}
	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<input
					type='email'
					placeholder='Email'
					required
					className={styles.input}
				/>
				<input
					type='password'
					placeholder='Пароль'
					required
					className={styles.input}
				/>
				<button className={styles.button}>Войти</button>
			</form>
		</div>
	)
}

export default Login

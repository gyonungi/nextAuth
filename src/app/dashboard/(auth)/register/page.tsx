'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styles from './page.module.css'

const Register = () => {
	const [error, setError] = useState<Error | null>(null)

	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const name = (e.currentTarget[0] as HTMLInputElement).value
		const email = (e.currentTarget[1] as HTMLInputElement).value
		const password = (e.currentTarget[2] as HTMLInputElement).value

		try {
			const res = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			})
			res.status === 201 &&
				router.push('/dashboard/login?success=Account has been created')
		} catch (err) {
			setError(err as Error)
			console.log(err)
		}
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Создайте Аккаунт</h1>
			<h2 className={styles.subtitle}>
				Пожалуйста, зарегистрируйтесь, чтобы увидеть панель управления.
			</h2>
			<form onSubmit={handleSubmit} className={styles.form}>
				<input
					type='text'
					placeholder='Username'
					required
					className={styles.input}
				/>
				<input
					type='text'
					placeholder='Email'
					required
					className={styles.input}
				/>
				<input
					type='password'
					placeholder='Password'
					required
					className={styles.input}
				/>
				<button className={styles.button}>Регистрация</button>
				{error && 'Что-то пошло нет!'}
			</form>
			<span className={styles.or}>- Или -</span>
			<Link className={styles.link} href='/dashboard/login'>
				<button className={styles.button}>
					Войти с существующей учетной записью
				</button>
			</Link>
		</div>
	)
}

export default Register

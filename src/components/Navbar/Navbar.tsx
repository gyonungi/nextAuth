'use client'

import Link from 'next/link'

import { signOut, useSession } from 'next-auth/react'
import styles from './page.module.css'

const links = [
	{
		id: 1,
		title: 'Главная',
		url: '/',
	},
	{
		id: 2,
		title: 'Панель управления',
		url: '/dashboard/register',
	},
]

const Navbar = () => {
	const session = useSession()
	return (
		<nav className={styles.container}>
			<Link href='/' className={styles.logo}>
				NextAuth
			</Link>
			<div className={styles.links}>
				{links.map(link => (
					<Link key={link.id} href={link.url}>
						{link.title}
					</Link>
				))}
				{session.status === 'authenticated' && (
					<button className={styles.logout} onClick={() => signOut()}>
						Выйти
					</button>
				)}
			</div>
		</nav>
	)
}

export default Navbar

import { useState } from 'react'
import { createStorage } from 'storage-facade'
import { IndexedDBInterface } from 'storage-facade-indexeddb'

interface UserData {
	email: string
	password: string
	id: string
}

export const indexDbStorage = async () => {
	const userStorage = createStorage({
		use: new IndexedDBInterface(),
		name: 'UserData', // ObjectStore name
		dbName: 'User', // DB name
	})

	const saveUserData = async ({ email, password, id }: UserData) => {
		userStorage.email = email
		await userStorage.email
		userStorage.password = password
		await userStorage.password
		userStorage.id = id
		await userStorage.id
	}

	const deleteUserData = () => {
		const asyncFunc = async () => {
			await userStorage.deleteStorage()
		}
		asyncFunc()
	}

	const getUserData = async () => {
		const email = (await userStorage.email) as string
		const password = (await userStorage.password) as string
		const id = (await userStorage.id) as string
		return { id, email, password }
	}
	return { saveUserData, deleteUserData, getUserData }
}

export const handleIndexDb = async () => {
	return (async () => {
		const { saveUserData, deleteUserData, getUserData } = await indexDbStorage()
		return { saveUserData, deleteUserData, getUserData }
	})()
}
export const useGetIdUser = () => {
	const [id, setId] = useState<string | null>(null)

	;(async () => {
		const { getUserData } = await handleIndexDb()
		const { id } = await getUserData()
		setId(id || null)
	})()

	return id
}

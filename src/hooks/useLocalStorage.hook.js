import { useState, useEffect } from 'react'



export function useLocalStorage(key) {
	const [data, setData] = useState([])

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(key))
		if (data) {
			setData(data)
		}
	}, [])

	const saveData = (newData) => {
		if (newData.length) {
			localStorage.setItem(key, JSON.stringify(newData))
			setData(newData)
		}
	}

	return [data, saveData]
}
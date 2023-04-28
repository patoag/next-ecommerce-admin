import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Categories() {
	const [name, setName] = useState('')
	const [categories, setCategories] = useState([])

	useEffect(() => {
		fetchCategories()
	}, [])

    function fetchCategories(){
        axios.get('/api/categories').then((result) => {
			setCategories(result.data)
		})
    }

	async function saveCategory(ev) {
		ev.preventDefault()
		await axios.post('/api/categories', { name })
		setName('')
        fetchCategories()
	}

	return (
		<Layout>
			<h1>Categories</h1>
			<label>New category name</label>
			<form
				className="flex gap-1"
				onSubmit={saveCategory}
			>
				<input
					className="mb-0"
					type="text"
					value={name}
					placeholder={'Category name'}
					onChange={(ev) => setName(ev.target.value)}
				/>

				<button
					className="btn-primary py-1"
					type="sumbit"
				>
					Save
				</button>
			</form>

			<table className="basic mt-4">
				<thead>
					<tr>
						<td>Category name</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{categories.length > 0 &&
						categories.map((category) => (
							<tr key={category._id}>
								<td>{category.name}</td>
							</tr>
						))}
				</tbody>
			</table>
		</Layout>
	)
}

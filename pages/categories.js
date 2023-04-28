import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Categories() {
	const [editedCategory, setEditedCategory] = useState(null)
	const [name, setName] = useState('')
	const [parentCategory, setParentCategory] = useState('')
	const [categories, setCategories] = useState([])

	useEffect(() => {
		fetchCategories()
	}, [])

	function fetchCategories() {
		axios.get('/api/categories').then((result) => {
			setCategories(result.data)
		})
	}

	async function saveCategory(ev) {
		ev.preventDefault()
		const data = { name, parentCategory }
		if (editedCategory) {
			//update
			data._id = editedCategory._id
			await axios.put('/api/categories', data)
			setEditedCategory(null)
		} else {
			//create
			await axios.post('/api/categories', data)
		}
		setName('')
		fetchCategories()
	}

	function editCategory(category) {
		setEditedCategory(category)
		setName(category.name)
		setParentCategory(category.parent?._id)
	}

	return (
		<Layout>
			<h1>Categories</h1>
			<label>
				{editedCategory
					? `Edit category ${editedCategory.name}`
					: 'Create new category'}
			</label>
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

				<select
					className="mb-0"
					value={parentCategory}
					onChange={(ev) => setParentCategory(ev.target.value)}
				>
					<option value="">No parent category</option>
					{categories.length > 0 &&
						categories.map((category) => (
							<option
								key={category._id}
								value={category._id}
							>
								{category.name}
							</option>
						))}
				</select>

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
						<td>Parent category</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{categories.length > 0 &&
						categories.map((category) => (
							<tr key={category._id}>
								<td>{category.name}</td>
								<td>{category?.parent?.name}</td>
								<td>
									<button
										className="btn-primary mr-1"
										onClick={() => editCategory(category)}
									>
										Edit
									</button>
									<button className="btn-primary">
										Delete
									</button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</Layout>
	)
}

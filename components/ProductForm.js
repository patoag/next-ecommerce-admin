import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function ProductForm({
	_id,
	title: existingTitle,
	description: existingDescription,
	price: existingPrice,
}) {
	const [title, setTitle] = useState(existingTitle || '')
	const [description, setDescription] = useState(existingDescription || '')
	const [price, setPrice] = useState(existingPrice || '')
	const [goToProducts, setGoToProducts] = useState(false)
	const router = useRouter()

	async function saveProduct(ev) {
		ev.preventDefault()
		const data = { title, description, price }

		if (_id) {
			//update
			await axios.put('/api/products/', { ...data, _id })
		} else {
			//create
			await axios.post('/api/products', data)
		}
        setGoToProducts(true)
	}

	if (goToProducts) {
		router.push('/products')
	}

	return (
		<form onSubmit={saveProduct}>
			<label>Product name</label>
			<input
				value={title}
				onChange={(ev) => setTitle(ev.target.value)}
				type="text"
				placeholder="product name"
			/>

			<label>Description</label>
			<textarea
				value={description}
				onChange={(ev) => setDescription(ev.target.value)}
				type="text"
				placeholder="description"
			/>

			<label>Price (in USD)</label>
			<input
				value={price}
				onChange={(ev) => setPrice(ev.target.value)}
				type="text"
				placeholder="price"
			/>
			<button
				type="submit"
				className="btn-primary"
			>
				Save
			</button>
		</form>
	)
}

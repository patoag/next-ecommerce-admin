import Layout from '@/components/Layout'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function NewProduct() {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [goToProducts, setGoToProducts] = useState(false)
    const router = useRouter()

	async function createProduct(ev) {
		ev.preventDefault()
		const data = { title, description, price }
		await axios.post('/api/products', data)
		setGoToProducts(true)
	}

	if (goToProducts) {
        router.push('/products')
	}

	return (
		<Layout>
			<form onSubmit={createProduct}>
				<h1>New product</h1>

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
		</Layout>
	)
}

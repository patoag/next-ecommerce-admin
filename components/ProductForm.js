import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function ProductForm({
	_id,
	title: existingTitle,
	description: existingDescription,
	price: existingPrice,
	images: existingImges,
}) {
	const [title, setTitle] = useState(existingTitle || '')
	const [description, setDescription] = useState(existingDescription || '')
	const [price, setPrice] = useState(existingPrice || '')
	const [images, setImages] = useState(existingImges || [])
	const [goToProducts, setGoToProducts] = useState(false)
	const router = useRouter()

	async function saveProduct(ev) {
		ev.preventDefault()
		const data = { title, description, price, images }

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

	async function uploadImages(ev) {
		const files = ev.target?.files
		if (files?.length > 0) {
			const data = new FormData()

			for (const file of files) {
				data.append('file', file)
			}

			const res = await axios.post('/api/upload', data)
			setImages((oldImages) => {
				return [...oldImages, ...res.data.links]
			})
		}
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

			<label>Photos</label>
			<div className='mb-2 flex flex-wrap gap-2'>

                {!!images?.length && images.map( link => (
                    <div key={link} className='h-24'>
                        <img src={link} alt='' className='rounded-lg' />
                    </div>
                ))}

				<label className="w-24 h-24 text-center cursor-pointer flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
						/>
					</svg>
					<div>Upload</div>
					<input
						type="file"
						onChange={uploadImages}
						className="hidden"
					/>
				</label>
				{!images?.length && <div>No photos in this product.</div>}
			</div>

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

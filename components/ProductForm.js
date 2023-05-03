import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Spinner from '@/components/Spinner'
import { ReactSortable } from 'react-sortablejs'

export default function ProductForm({
	_id,
	title: existingTitle,
	description: existingDescription,
	price: existingPrice,
	images: existingImges,
	category: assignedCategory,
	properties: assignedProperties,
}) {
	const [title, setTitle] = useState(existingTitle || '')
	const [category, setCategory] = useState(assignedCategory || '')
	const [productProperties, setProductProperties] = useState(
		assignedProperties || {}
	)
	const [description, setDescription] = useState(existingDescription || '')
	const [price, setPrice] = useState(existingPrice || '')
	const [images, setImages] = useState(existingImges || [])
	const [goToProducts, setGoToProducts] = useState(false)
	const [isUploading, setIsUploading] = useState(false)
	const [categories, setCategories] = useState([])
	const router = useRouter()

	useEffect(() => {
		axios.get('/api/categories').then((result) => {
			setCategories(result.data)
		})
	}, [])

	async function saveProduct(ev) {
		ev.preventDefault()
		const data = {
			title,
			description,
			price,
			images,
			category,
			properties: productProperties,
		}

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
			setIsUploading(true)

			const data = new FormData()

			for (const file of files) {
				data.append('file', file)
			}

			const res = await axios.post('/api/upload', data)
			setImages((oldImages) => {
				return [...oldImages, ...res.data.links]
			})
			setIsUploading(false)
		}
	}

	function updateImageOrder(images) {
		setImages(images)
	}

	function setProductProperty(propertyName, value) {
		setProductProperties((oldProps) => ({
			...oldProps,
			[propertyName]: value,
		}))
	}

	const propertiesToFill = []
	if (categories.length > 0 && category) {
		let categoryInfo = categories.find(({ _id }) => _id === category)
		propertiesToFill.push(...categoryInfo.properties)

		while (categoryInfo?.parent?._id) {
			const parentCatInfo = categories.find(
				({ _id }) => _id === categoryInfo?.parent?._id
			)
			propertiesToFill.push(...parentCatInfo.properties)
			categoryInfo = parentCatInfo
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

			<label>Category</label>
			<select
				value={category}
				onChange={(ev) => setCategory(ev.target.value)}
			>
				<option value="">Uncategorized</option>
				{categories.length &&
					categories.map((category) => (
						<option
							key={category._id}
							value={category._id}
						>
							{category.name}
						</option>
					))}
			</select>

			{propertiesToFill.length > 0 &&
				propertiesToFill.map((p) => (
					<div
						key={p._id}
						className="flex gap-1"
					>
						<div>{p.name}</div>
						<select
							value={productProperties[p.name] || ''}
							onChange={(ev) =>
								setProductProperty(p.name, ev.target.value)
							}
						>
							{p.values.map((v) => (
								<option
									key={v._id}
									value={v}
								>
									{v}
								</option>
							))}
						</select>
					</div>
				))}

			<label>Photos</label>
			<div className="mb-2 flex flex-wrap gap-1">
				<ReactSortable
					className="flex flex-wrap gap-1"
					list={images}
					setList={updateImageOrder}
				>
					{!!images?.length &&
						images.map((link) => (
							<div
								key={link}
								className="h-24"
							>
								<img
									src={link}
									alt=""
									className="rounded-lg"
								/>
							</div>
						))}
				</ReactSortable>

				{isUploading && (
					<div className="h-24 p-1 flex items-center">
						<Spinner />
					</div>
				)}

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

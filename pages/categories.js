import Layout from '@/components/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { withSwal } from 'react-sweetalert2'

function Categories({ swal }) {
	const [editedCategory, setEditedCategory] = useState(null)
	const [name, setName] = useState('')
	const [parentCategory, setParentCategory] = useState('')
	const [categories, setCategories] = useState([])
	const [properties, setProperties] = useState([])

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
		const data = {
			name,
			parentCategory,
			properties: properties.map((p) => ({
				name: p.name,
				values: p.values.split(','),
			})),
		}
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
		setParentCategory('')
		setProperties([])
		fetchCategories()
	}

	function editCategory(category) {
		setEditedCategory(category)
		setName(category.name)
		setParentCategory(category.parent?._id)
		setProperties(
			category.properties.map(({ name, values }) => ({
				name: name,
				values: values.join(','),
			}))
		)
	}

	function deleteCategory(category) {
		swal.fire({
			title: '¿Estás seguro?',
			text: `¿Quieres eliminar ${category.name}?`,
			showCancelButton: true,
			cancelButtonText: 'Cancelar',
			confirmButtonText: '¡Sí, Eliminar!',
			confirmButtonColor: '#d55',
			reverseButtons: true,
		}).then(async (result) => {
			// when confirmed and promise resolved...
			if (result.isConfirmed) {
				const { _id } = category
				await axios.delete('/api/categories?_id=' + _id)
				fetchCategories()
			}
		})
	}

	function addProperty() {
		setProperties((prev) => {
			return [...prev, { name: '', values: '' }]
		})
	}

	function handlePropertyNameChange(index, property, newName) {
		setProperties((prev) => {
			const properties = [...prev]
			properties[index].name = newName
			return properties
		})
	}

	function handlePropertyValuesChange(index, property, newValues) {
		setProperties((prev) => {
			const properties = [...prev]
			properties[index].values = newValues
			return properties
		})
	}

	function removeProperty(indexToRemove) {
		setProperties((prev) => {
			return [...prev].filter((p, pIndex) => {
				return pIndex !== indexToRemove
			})
		})
	}

	return (
		<Layout>
			<h1>Categorías</h1>
			<label>
				{editedCategory
					? `Editar categoría ${editedCategory.name}`
					: 'Crear nueva categoría'}
			</label>
			<form onSubmit={saveCategory}>
				<div className="flex gap-1">
					<input
						type="text"
						value={name}
						placeholder={'Nombre de la categoría'}
						onChange={(ev) => setName(ev.target.value)}
					/>

					<select
						value={parentCategory}
						onChange={(ev) => setParentCategory(ev.target.value)}
					>
						<option value="">Sin categoría padre</option>
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
				</div>

				<div className="mb-2">
					<label className="block">Propiedades</label>
					<button
						className="btn-default text-sm mb-2"
						type="button"
						onClick={addProperty}
					>
						Agregar nueva propiedad
					</button>
					{properties.length > 0 &&
						properties.map((property, index) => (
							<div
								key={property._id}
								className="flex gap-1 mb-2"
							>
								<input
									type="text"
									value={property.name}
									className="mb-0"
									onChange={(ev) =>
										handlePropertyNameChange(
											index,
											property,
											ev.target.value
										)
									}
									placeholder="nombre de propiedad (ejemplo: color)"
								/>
								<input
									type="text"
									value={property.values}
									className="mb-0"
									onChange={(ev) =>
										handlePropertyValuesChange(
											index,
											property,
											ev.target.value
										)
									}
									placeholder="valores, separados por comas"
								/>

								<button
									className="btn-red"
									onClick={() => removeProperty(index)}
									type="button"
								>
									Eliminar
								</button>
							</div>
						))}
				</div>

				<div className="flex gap-1">
					{editedCategory && (
						<button
							className="btn-default"
							type="button"
							onClick={(ev) => {
								setEditedCategory(null)
								setName('')
								setParentCategory('')
                                setProperties([])
							}}
						>
							Cancelar
						</button>
					)}
					<button
						className="btn-primary py-1"
						type="sumbit"
					>
						Guardar
					</button>
				</div>
			</form>

			{!editedCategory && (
				<table className="basic mt-4">
					<thead>
						<tr>
							<td>Nombre de categoría</td>
							<td>Categoría padre</td>
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
											className="btn-default mr-1"
											onClick={() =>
												editCategory(category)
											}
										>
											Editar
										</button>
										<button
											className="btn-red"
											onClick={() =>
												deleteCategory(category)
											}
										>
											Eliminar
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			)}
		</Layout>
	)
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />)

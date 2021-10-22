import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addProductApi, productCategoriesApi } from '../../core/services/api';
import { encodeFileToBase64 } from '../../core/utils/fileEncoding';
import { getUserIdFromToken } from '../../core/utils/tokenHandler';
import { productDetailsValidation } from '../../core/validations/productValidation';
import { Store } from '../../provider/Store';

export default function AddProduct() {
    const { categories, setCategories } = useContext(Store);
    const userId = getUserIdFromToken();
    const history = useHistory();
    const initialErrors = { category: '', name: '', image: '', price: '', quantity: '', description: '', };
    const [errors, setErrors] = useState(initialErrors);
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState(undefined);
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            const cats = await productCategoriesApi();
            setCategories(cats);
        }
        fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addProduct = async (e) => {
        try {
            e.preventDefault();
            setErrors(initialErrors);
            const errors = productDetailsValidation(categories, category, name, image, price, quantity, description);
            if (Object.keys(errors).length !== 0) {
                setErrors({
                    category: errors.category,
                    name: errors.name,
                    image: errors.image,
                    price: errors.price,
                    quantity: errors.quantity,
                    description: errors.description,
                });
            }
            else {
                const imageBase64 = image ? await encodeFileToBase64(image) : null;
                const body = JSON.stringify({ category, name, imageBase64, price, quantity, description, userId });
                const data = await addProductApi(body);
                if (data.errors) {
                    console.log(data.errors);
                    setErrors({
                        category: data.errors.category,
                        name: data.errors.name,
                        image: data.errors.image,
                        price: data.errors.price,
                        quantity: data.errors.quantity,
                        description: data.errors.description,
                    });
                    if (data.errors.product)
                        alert(data.errors.product);
                }
                else if (data.success === true) {
                    alert('Product Added Successfully');
                    history.replace('/dashboard');
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="addProduct my-3 py-2 container w-50 border">
            <h4 className="pt-2 text-center">Add Product</h4>
            <hr />
            <form>
                <label className="form-label" htmlFor="category">Category</label>
                <select className="form-select" name="category" value={category} onChange={(e) => { setCategory(e.target.value) }}>
                    <option value="">--- Select Category ---</option>
                    {
                        categories.map((category) => {
                            return <option key={category.code} value={category.code}>{category.name}</option>
                        })
                    }
                </select>
                <p className="fs-6 alert-danger">{errors.category}</p>

                <label className="form-label" htmlFor="name">Name</label>
                <input className="form-control" type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                <p className="fs-6 alert-danger">{errors.name}</p>

                <label htmlFor="formFile" className="form-label">Product Image</label>
                <input className="form-control" type="file" id="formFile" onChange={(e) => { setImage(e.target.files[0]) }} />
                <p className="fs-6 alert-danger">{errors.image}</p>

                <label className="form-label" htmlFor="price">Price</label>
                <input className="form-control" type="text" name="price" value={price} onChange={(e) => { setPrice(e.target.value) }} />
                <p className="fs-6 alert-danger">{errors.price}</p>

                <label className="form-label" htmlFor="quantity">Quantity</label>
                <input className="form-control" type="number" name="quantity" value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
                <p className="fs-6 alert-danger">{errors.quantity}</p>

                <label className="form-label" htmlFor="description">Description</label>
                <textarea className="form-control" name="description" cols="30" rows="5" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                <p className="fs-6 alert-danger">{errors.description}</p>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-secondary" onClick={() => { console.log('addPro go back'); history.replace('/dashboard'); }}>Cancel</button>
                    <button className="btn btn-primary" onClick={addProduct}>Add</button>
                </div>
            </form>
        </div>
    )
}

import React, { useContext, useEffect, useRef, useState } from 'react'
import { modifyProductApi, productCategoriesApi } from '../../core/services/api';
import { getUserIdFromToken } from '../../core/utils/tokenHandler';
import { productDetailsValidation } from '../../core/validations/productValidation';
import { Store } from '../../provider/Store';

export default function EditProductModal(props) {
    const { categories, setCategories, sellerProducts, setSellerProducts } = useContext(Store);
    const userId = getUserIdFromToken();
    const initialProduct = { category: '', name: '', price: '', quantity: '', description: '' };
    const initialErrors = {
        category: "",
        name: "",
        price: "",
        quantity: "",
        description: "",
    };
    const [product, setProduct] = useState(initialProduct);
    const [errors, setErrors] = useState(initialErrors);
    const refClose = useRef(null)

    useEffect(() => {
        const fetchCategories = async () => {
            const cats = await productCategoriesApi();
            setCategories(cats);
        }
        fetchCategories();
        if (Object.keys(props.product).length > 0)
            setProduct(props.product);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.product])

    const handleOnChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const editProduct = async (e) => {
        try {
            e.preventDefault();
            setErrors(initialErrors);
            const { category, name, price, quantity, description } = product;
            const errors = productDetailsValidation(categories, category, name, price, quantity, description)
            if (Object.keys(errors).length !== 0) {
                setErrors({
                    category: errors.category,
                    name: errors.name,
                    price: errors.price,
                    quantity: errors.quantity,
                    description: errors.description,
                });
            } else {
                const { category, name, price, quantity, description } = product;
                const body = JSON.stringify({ category, name, price, quantity, description, userId });
                const data = await modifyProductApi(product.pid, body);
                if (data.errors) {
                    setErrors({
                        category: data.errors.category,
                        name: data.errors.name,
                        price: data.errors.price,
                        quantity: data.errors.quantity,
                        description: data.errors.description,
                    });
                    if (data.errors.product)
                        alert(data.errors.product);
                }
                else if (data.success === true) {
                    alert('Product Modified Successfully');

                    let newProducts = JSON.parse(JSON.stringify(sellerProducts));
                    for (let i = 0; i < newProducts.length; i++) {
                        if (newProducts[i].pid === product.pid) {
                            newProducts[i] = product;
                            break;
                        }
                    }
                    setSellerProducts(newProducts);
                    console.log(sellerProducts);
                    refClose.current.click();
                }
            }
        } catch (err) {
            console.log('err', err);
        }
    }
    return (
        <div>

            <div className="modal fade" id="editProductModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editProductModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editProductModalLabel">Edit Product</h5>
                            <button ref={refClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form>
                                <label className="form-label" htmlFor="category">Category</label>
                                <select className="form-select" name="category" value={product.category} onChange={handleOnChange}>
                                    <option value="">--- Select Category ---</option>
                                    {
                                        categories.map((category) => {
                                            return <option key={category.code} value={category.code}>{category.name}</option>
                                        })
                                    }
                                </select>
                                <p className="fs-6 alert-danger">{errors.category}</p>

                                <label className="form-label" htmlFor="name">Name</label>
                                <input className="form-control" type="text" name="name" value={product.name} onChange={handleOnChange} />
                                <p className="fs-6 alert-danger">{errors.name}</p>

                                <label className="form-label" htmlFor="price">Price</label>
                                <input className="form-control" type="text" name="price" value={product.price} onChange={handleOnChange} />
                                <p className="fs-6 alert-danger">{errors.price}</p>

                                <label className="form-label" htmlFor="quantity">Quantity</label>
                                <input className="form-control" type="number" name="quantity" value={product.quantity} onChange={handleOnChange} />
                                <p className="fs-6 alert-danger">{errors.quantity}</p>

                                <label className="form-label" htmlFor="description">Description</label>
                                <textarea className="form-control" name="description" cols="30" rows="3" value={product.description} onChange={handleOnChange} />
                                <p className="fs-6 alert-danger">{errors.description}</p>
                            </form>

                        </div>
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-secondary" onClick={() => setProduct(props.product)} data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={editProduct} >Confirm Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

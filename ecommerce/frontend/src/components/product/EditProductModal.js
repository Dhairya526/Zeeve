import React, { useContext, useEffect, useRef, useState } from 'react'
import { modifyProductApi, productCategoriesApi } from '../../core/services/api';
import { getUserIdFromToken } from '../../core/utils/tokenHandler';
import { encodeFileToBase64 } from '../../core/utils/fileEncoding';
import { productDetailsValidation } from '../../core/validations/productValidation';
import { Store } from '../../provider/Store';

export default function EditProductModal(props) {
    const { categories, setCategories, sellerProducts, setSellerProducts } = useContext(Store);
    const userId = getUserIdFromToken();
    const initialProduct = { category: '', name: '', image: '', price: '', quantity: '', description: '' };
    const initialErrors = { category: '', name: '', image: '', price: '', quantity: '', description: '', };
    const [product, setProduct] = useState(initialProduct);
    const [errors, setErrors] = useState(initialErrors);
    const [image, setImage] = useState(undefined);
    const [imageBase64, setImageBase64] = useState('');
    const refClose = useRef(null);
    const refFileInput = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const cats = await productCategoriesApi();
            if (Object.keys(cats).length > 0)
                setCategories(cats);
        }
        fetchCategories();
        if (Object.keys(props.product).length > 0) {
            setProduct(props.product);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.product])

    useEffect(() => {
        if (product.image) {
            const imageUrl = Buffer(product.image).toString();
            setImageBase64(imageUrl);
        } else
            setImageBase64('');
    }, [product.image])

    const handleOnChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const removeImage = (e) => {
        e.preventDefault();
        setImage(undefined);
        setImageBase64('');
        refFileInput.current.value = '';
        setProduct({ ...product, image: null });
    }

    const reset = () => {
        setProduct(props.product);
        setImage(undefined);
        setImageBase64('');
        refFileInput.current.value = '';
        if (product.image)
            setImageBase64(Buffer(product.image));
    }

    const handleImage = async (e) => {
        setImage(e.target.files[0]);
        if (e.target.files[0] !== undefined) {
            setImageBase64(await encodeFileToBase64(e.target.files[0]));
            setProduct({ ...product, image: Buffer(await encodeFileToBase64(e.target.files[0])) });
        }
        else {
            if (props.product.image) {
                setImageBase64(Buffer(product.image));
                setProduct({ ...product, image: Buffer(props.product.image) });
            }
            else {
                setImageBase64('');
                setProduct({ ...product, image: props.product.image });
            }
        }
    }

    const editProduct = async (e) => {
        try {
            e.preventDefault();
            setErrors(initialErrors);
            const { category, name, price, quantity, description } = product;
            const errors = productDetailsValidation(categories, category, name, image, price, quantity, description)
            if (Object.keys(errors).length !== 0) {
                setErrors({
                    category: errors.category,
                    name: errors.name,
                    image: errors.image,
                    price: errors.price,
                    quantity: errors.quantity,
                    description: errors.description,
                });
            } else {
                let tempImage = null;
                if (product.image === null) {
                    if (imageBase64 !== '')
                        tempImage = imageBase64;
                } else {
                    if (imageBase64 === '')
                        tempImage = null;
                    else if (imageBase64 !== '') {
                        if (Buffer(product.image).equals(Buffer(imageBase64)))
                            tempImage = 'EXISTS';
                        else
                            tempImage = imageBase64;
                    }
                }
                const { category, name, price, quantity, description } = product;
                const body = JSON.stringify({ category, name, imageBase64: tempImage, price, quantity, description, userId });

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
                            <button ref={refClose} onClick={reset} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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

                                <div className="d-flex justify-content-between">
                                    {imageBase64 &&
                                        <div className="align-items-center">
                                            <img src={imageBase64} alt="product" style={{ height: '5rem' }} />
                                            <button className="btn btn-danger mt-1" onClick={removeImage}>Remove Image</button>
                                        </div>
                                    }
                                    <div>
                                        <label htmlFor="formFile" className="form-label">{product.image ? 'Change Image' : 'Add Image'}</label>
                                        <input ref={refFileInput} className="form-control" type="file" onChange={handleImage} />
                                        {/* {imageBase64 && <button className="btn btn-danger" onClick={removeImage}>Remove Image</button>} */}
                                    </div>
                                </div>
                                <p className="fs-6 alert-danger">{errors.image}</p>
                                <label className="form-label" htmlFor="price">Price</label>
                                <input className="form-control" type="text" name="price" value={product.price} onChange={handleOnChange} />
                                <p className="fs-6 alert-danger">{errors.price}</p>

                                <label className="form-label" htmlFor="quantity">Quantity</label>
                                <input className="form-control" type="number" name="quantity" value={product.quantity} onChange={handleOnChange} />
                                <p className="fs-6 alert-danger">{errors.quantity}</p>

                                <label className="form-label" htmlFor="description">Description</label>
                                <textarea className="form-control" name="description" cols="30" value={product.description} onChange={handleOnChange} />
                                <p className="fs-6 alert-danger">{errors.description}</p>
                            </form>

                        </div>
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-secondary" onClick={reset} data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={editProduct} >Confirm Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

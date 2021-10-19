import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../../provider/Store';

export default function ProductItem(props) {
    const [category, setCategory] = useState('')
    const { categories } = useContext(Store);
    const { updateProduct, item } = props;
    useEffect(() => {
        const getCategory = (categoryCode) => {
            const cat = categories.find((category) => category.code === categoryCode);
            setCategory(cat.name);
        }
        getCategory(item.category);
        // eslint-disable-next-line
    }, [item])

    return (
        <div className="card" style={{ width: '33%' }}>
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-subtitle mb-1 text-muted">{category}</p>
                <p className="card-subtitle mb-1 text-muted">{item.price}</p>
                <p className="card-text">{item.description}</p>
            </div>
            {props.seller && <div className="card-footer d-flex justify-content-around">
                <EditButton updateProduct={updateProduct} item={item} />
                <DeleteButton updateProduct={updateProduct} item={item} />
            </div>}

        </div>
    )
}

const EditButton = (props) => {
    const { updateProduct, item } = props;
    return (
        <button type="button" onClick={() => updateProduct(item)} className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#editProductModal">
            <i className="bi bi-pencil-square"></i>
        </button>
    )
}

const DeleteButton = (props) => {
    const { updateProduct, item } = props;
    return (
        <button type="button" onClick={() => updateProduct(item)} className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteProductAlert">
            <i className="bi bi-trash"></i>
        </button>
    )
}
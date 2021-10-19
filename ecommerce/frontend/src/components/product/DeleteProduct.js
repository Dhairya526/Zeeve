import React, { useContext, useEffect, useRef, useState } from 'react'
import { deleteProductApi } from '../../core/services/api';
import { Store } from '../../provider/Store';

export default function DeleteProductModal(props) {
    const [product, setProduct] = useState({ pid: '', name: '' });
    const { sellerProducts, setSellerProducts } = useContext(Store);
    const refClose = useRef(null);

    useEffect(() => {
        setProduct(props.product)
    }, [props.product])

    const deleteProduct = async (e) => {
        try {
            e.preventDefault();
            const data = await deleteProductApi(product.pid);
            if (data.errors) {
                if (data.errors.product)
                    alert(data.errors.product);
            }
            else if (data.success === true) {
                alert('Product Deleted Successfully');

                let newProducts = sellerProducts.filter((item) => item.pid !== product.pid);
                setSellerProducts(newProducts);
                console.log(sellerProducts);
                refClose.current.click();
            }
        } catch (err) {
            console.log('err', err);
        }
    }
    return (
        <div>
            <div className="modal fade" id="deleteProductAlert" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="deleteProductAlertLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fw-bold" id="deleteProductAlertLabel">Delete Product!!</h3>
                        </div>
                        <div className="modal-body">
                            <p className="fs-4"><strong> Are you sure you want to delete the product?</strong></p>
                            <p>Product id: {product.pid}</p>
                            <p>Product name: {product.name}</p>
                            <p>Once deleted it cannot be retrived.</p>
                            <p>Press <strong>DELETE</strong> to continue or <strong>CANCEL</strong> to cancel the deletion.</p>
                        </div>
                        <div className="modal-footer justify-content-between">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={deleteProduct}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

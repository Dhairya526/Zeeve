import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import DeleteProductModal from '../../components/product/DeleteProduct';
import EditProductModal from '../../components/product/EditProductModal';
import ProductItem from '../../components/product/ProductItem';
import { sellerProductsApi } from '../../core/services/api';
import { getUserIdFromToken } from '../../core/utils/tokenHandler';
import { Store } from '../../provider/Store';

export default function SellerDash() {
    const { sellerProducts, setSellerProducts } = useContext(Store);
    const [product, setProduct] = useState({})
    const userId = getUserIdFromToken();
    const history = useHistory();

    useEffect(() => {
        const fetchProducts = async (userId) => {
            const productList = await sellerProductsApi(userId);
            setSellerProducts(productList);
        }
        fetchProducts(userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateCurrentProduct = (currentProduct) => {
        setProduct(currentProduct);
    }
    return (
        <div className="sdash">
            <Navbar />
            <div className="justify-content-center text-center my-2 ">
                <button className="btn btn-success" onClick={() => { console.log('sell dash push'); history.push('/addProduct') }}>
                    <i className="bi bi-plus-circle"></i> Add New Product</button>
            </div>
            <div className="row row-cols-sm-3">
                {sellerProducts.map((item) => {
                    return <ProductItem key={item.pid} seller={true} item={item} updateProduct={updateCurrentProduct} />
                })}
            </div>
            <EditProductModal product={product} />
            <DeleteProductModal product={product} />
        </div>
    );
}

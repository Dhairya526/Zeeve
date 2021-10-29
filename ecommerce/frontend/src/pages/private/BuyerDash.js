import React, { useContext, useEffect } from 'react';
import Navbar from '../../components/header/Navbar';
import ProductItem from '../../components/product/ProductItem';
import { productCategoriesApi, productsApi } from '../../core/services/api';
import { Store } from '../../provider/Store';

export default function BuyerDash() {
    const { allProducts, setAllProducts, setCategories } = useContext(Store);
    useEffect(() => {
        const fetchAllProductsAndCategories = async () => {
            const categories = await productCategoriesApi();
            setCategories(categories);
            const productList = await productsApi();
            setAllProducts(productList);
        }
        fetchAllProductsAndCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="bdash">
            <Navbar />
            <div className="row w-100 gx-2 gy-4 ps-2 pt-3 mb-3">
                {allProducts.map((item) => {
                    // return <ProductItem key={item.pid} seller={false} category={item.category} name={item.name} price={item.price} quantity={item.quantity} description={item.description} />
                    return <ProductItem key={item.pid} seller={false} item={item} />
                })}
            </div>
        </div>
    );
}

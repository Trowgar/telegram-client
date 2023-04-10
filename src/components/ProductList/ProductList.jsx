import React, {useState} from 'react';
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

const products = [
    {id: '1', title: 'Test', price: 5000, description: 'Some Color Here ...'},
    {id: '2', title: 'Test 2', price: 12000, description: 'Some Color Here ...'},
    {id: '3', title: 'Test 3', price: 5000, description: 'Some Color Here ...'},
    {id: '4', title: 'Test 4', price: 122, description: 'Some Color Here ...'},
    {id: '5', title: 'Test 5', price: 5000, description: 'Some Color Here ...'},
    {id: '6', title: 'Test 6 ', price: 600, description: 'Some Color Here ...'},
    {id: '7', title: 'Test 7 ', price: 5500, description: 'Some Color Here ...'},
    {id: '8', title: 'Test 8', price: 12000, description: 'Some Color Here ...'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {telegram, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://localhost:8080', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        telegram.onEvent('mainButtonClicked', onSendData)
        return () => {
            telegram.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            telegram.MainButton.hide();
        } else {
            telegram.MainButton.show();
            telegram.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;
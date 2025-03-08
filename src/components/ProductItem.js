import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { convertProductToCartItem } from '../utils';
import Rating from './Rating';
function ProductItem({ product }) {
    const { state, dispatch } = useContext(Store);
    const { cart: { cartItems }, } = state;
    const addToCartHandler = (item) => {
        const existItem = cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        if (product.countInStock < quantity) {
            alert('Sorry. Product is out of stock');
            return;
        }
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
        toast.success('Product added to the cart');
    };
    return (_jsxs(Card, { children: [_jsx(Link, { to: `/product/${product.slug}`, children: _jsx("img", { src: product.image, className: "card-img-top", alt: product.name }) }), _jsxs(Card.Body, { children: [_jsx(Link, { to: `/product/${product.slug}`, children: _jsx(Card.Title, { children: product.name }) }), _jsx(Rating, { rating: product.rating, numReviews: product.numReviews }), _jsxs(Card.Text, { children: ["$", product.price] }), product.countInStock === 0 ? (_jsx(Button, { variant: "light", disabled: true, children: "Out of stock" })) : (_jsx(Button, { onClick: () => addToCartHandler(convertProductToCartItem(product)), children: "Add to cart" }))] })] }));
}
export default ProductItem;

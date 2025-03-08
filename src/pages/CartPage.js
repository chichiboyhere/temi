import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
export default function CartPage() {
    const navigate = useNavigate();
    const { state: { mode, cart: { cartItems }, }, dispatch, } = useContext(Store);
    const updateCartHandler = (item, quantity) => {
        if (item.countInStock < quantity) {
            toast.warn('Sorry. Product is out of stock');
            return;
        }
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
    };
    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    };
    const removeItemHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };
    return (_jsxs("div", { children: [_jsx(Helmet, { children: _jsx("title", { children: "Shopping Cart" }) }), _jsx("h1", { children: "Shopping Cart" }), _jsxs(Row, { children: [_jsx(Col, { md: 8, children: cartItems.length === 0 ? (_jsxs(MessageBox, { children: ["Cart is empty. ", _jsx(Link, { to: "/", children: "Go Shopping" })] })) : (_jsx(ListGroup, { children: cartItems.map((item) => (_jsx(ListGroup.Item, { children: _jsxs(Row, { className: "align-items-center", children: [_jsxs(Col, { md: 4, children: [_jsx("img", { src: item.image, alt: item.name, className: "img-fluid rounded thumbnail" }), ' ', _jsx(Link, { to: `/product/${item.slug}`, children: item.name })] }), _jsxs(Col, { md: 3, children: [_jsx(Button, { onClick: () => updateCartHandler(item, item.quantity - 1), variant: mode, disabled: item.quantity === 1, children: _jsx("i", { className: "fas fa-minus-circle" }) }), ' ', _jsx("span", { children: item.quantity }), _jsx(Button, { variant: mode, onClick: () => updateCartHandler(item, item.quantity + 1), disabled: item.quantity === item.countInStock, children: _jsx("i", { className: "fas fa-plus-circle" }) })] }), _jsxs(Col, { md: 3, children: ["$", item.price] }), _jsx(Col, { md: 2, children: _jsx(Button, { onClick: () => removeItemHandler(item), variant: mode, children: _jsx("i", { className: "fas fa-trash" }) }) })] }) }, item._id))) })) }), _jsx(Col, { md: 4, children: _jsx(Card, { children: _jsx(Card.Body, { children: _jsxs(ListGroup, { variant: "flush", children: [_jsx(ListGroup.Item, { children: _jsxs("h3", { children: ["Subtotal (", cartItems.reduce((a, c) => a + c.quantity, 0), ' ', "items) : $", cartItems.reduce((a, c) => a + c.price * c.quantity, 0)] }) }), _jsx(ListGroup.Item, { children: _jsx("div", { className: "d-grid", children: _jsx(Button, { type: "button", variant: "primary", onClick: checkoutHandler, disabled: cartItems.length === 0, children: "Proceed to Checkout" }) }) })] }) }) }) })] })] }));
}

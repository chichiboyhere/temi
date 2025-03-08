import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/CheckoutSteps';
import LoadingBox from '../components/LoadingBox';
import { useCreateOrderMutation } from '../hooks/orderHooks';
import { Store } from '../Store';
import { getError } from '../utils';
export default function PlaceOrderPage() {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(Store);
    const { cart, userInfo } = state;
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
    cart.itemsPrice = round2(cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
    cart.taxPrice = round2(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const { mutateAsync: createOrder, isLoading } = useCreateOrderMutation();
    const placeOrderHandler = async () => {
        try {
            const data = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            });
            dispatch({ type: 'CART_CLEAR' });
            localStorage.removeItem('cartItems');
            navigate(`/order/${data.order._id}`);
        }
        catch (err) {
            toast.error(getError(err));
        }
    };
    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart, navigate]);
    return (_jsxs("div", { children: [_jsx(CheckoutSteps, { step1: true, step2: true, step3: true, step4: true }), _jsx(Helmet, { children: _jsx("title", { children: "Preview Order" }) }), _jsx("h1", { className: "my-3", children: "Preview Order" }), _jsxs(Row, { children: [_jsxs(Col, { md: 8, children: [_jsx(Card, { className: "mb-3", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Shipping" }), _jsxs(Card.Text, { children: [_jsx("strong", { children: "Name:" }), " ", cart.shippingAddress.fullName, " ", _jsx("br", {}), _jsx("strong", { children: "Address: " }), " ", cart.shippingAddress.address, ",", cart.shippingAddress.city, ", ", cart.shippingAddress.postalCode, ",", cart.shippingAddress.country] }), _jsx(Link, { to: "/shipping", children: "Edit" })] }) }), _jsx(Card, { className: "mb-3", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Payment" }), _jsxs(Card.Text, { children: [_jsx("strong", { children: "Method:" }), " ", cart.paymentMethod] }), _jsx(Link, { to: "/payment", children: "Edit" })] }) }), _jsx(Card, { className: "mb-3", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Items" }), _jsx(ListGroup, { variant: "flush", children: cart.cartItems.map((item) => (_jsx(ListGroup.Item, { children: _jsxs(Row, { className: "align-items-center", children: [_jsxs(Col, { md: 6, children: [_jsx("img", { src: item.image, alt: item.name, className: "img-fluid rounded thumbnail" }), ' ', _jsx(Link, { to: `/product/${item.slug}`, children: item.name })] }), _jsx(Col, { md: 3, children: _jsx("span", { children: item.quantity }) }), _jsxs(Col, { md: 3, children: ["$", item.price] })] }) }, item._id))) }), _jsx(Link, { to: "/cart", children: "Edit" })] }) })] }), _jsx(Col, { md: 4, children: _jsx(Card, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Order Summary" }), _jsxs(ListGroup, { variant: "flush", children: [_jsx(ListGroup.Item, { children: _jsxs(Row, { children: [_jsx(Col, { children: "Items" }), _jsxs(Col, { children: ["$", cart.itemsPrice.toFixed(2)] })] }) }), _jsx(ListGroup.Item, { children: _jsxs(Row, { children: [_jsx(Col, { children: "Shipping" }), _jsxs(Col, { children: ["$", cart.shippingPrice.toFixed(2)] })] }) }), _jsx(ListGroup.Item, { children: _jsxs(Row, { children: [_jsx(Col, { children: "Tax" }), _jsxs(Col, { children: ["$", cart.taxPrice.toFixed(2)] })] }) }), _jsx(ListGroup.Item, { children: _jsxs(Row, { children: [_jsx(Col, { children: _jsx("strong", { children: " Order Total" }) }), _jsx(Col, { children: _jsxs("strong", { children: ["$", cart.totalPrice.toFixed(2)] }) })] }) }), _jsx(ListGroup.Item, { children: _jsxs("div", { className: "d-grid", children: [_jsx(Button, { type: "button", onClick: placeOrderHandler, disabled: cart.cartItems.length === 0 || isLoading, children: "Place Order" }), isLoading && _jsx(LoadingBox, {})] }) })] })] }) }) })] })] }));
}

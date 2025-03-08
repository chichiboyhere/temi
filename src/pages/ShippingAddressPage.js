import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';
export default function ShippingAddressPage() {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(Store);
    const { userInfo, cart: { shippingAddress }, } = state;
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/shipping');
        }
    }, [userInfo, navigate]);
    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: {
                fullName,
                address,
                city,
                postalCode,
                country,
            },
        });
        localStorage.setItem('shippingAddress', JSON.stringify({
            fullName,
            address,
            city,
            postalCode,
            country,
        }));
        navigate('/payment');
    };
    return (_jsxs("div", { children: [_jsx(Helmet, { children: _jsx("title", { children: "Shipping Address" }) }), _jsx(CheckoutSteps, { step1: true, step2: true }), _jsxs("div", { className: "container small-container", children: [_jsx("h1", { className: "my-3", children: "Shipping Address" }), _jsxs(Form, { onSubmit: submitHandler, children: [_jsxs(Form.Group, { className: "mb-3", controlId: "fullName", children: [_jsx(Form.Label, { children: "Full Name" }), _jsx(Form.Control, { value: fullName, onChange: (e) => setFullName(e.target.value), required: true })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "address", children: [_jsx(Form.Label, { children: "Address" }), _jsx(Form.Control, { value: address, onChange: (e) => setAddress(e.target.value), required: true })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "city", children: [_jsx(Form.Label, { children: "City" }), _jsx(Form.Control, { value: city, onChange: (e) => setCity(e.target.value), required: true })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "postalCode", children: [_jsx(Form.Label, { children: "Postal Code" }), _jsx(Form.Control, { value: postalCode, onChange: (e) => setPostalCode(e.target.value), required: true })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "country", children: [_jsx(Form.Label, { children: "Country" }), _jsx(Form.Control, { value: country, onChange: (e) => setCountry(e.target.value), required: true })] }), _jsx("div", { className: "mb-3", children: _jsx(Button, { variant: "primary", type: "submit", children: "Continue" }) })] })] })] }));
}

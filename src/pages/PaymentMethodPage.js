import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';
export default function PaymentMethodPage() {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(Store);
    const { cart: { shippingAddress, paymentMethod }, } = state;
    const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || 'PayPal');
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
        localStorage.setItem('paymentMethod', paymentMethodName);
        navigate('/placeorder');
    };
    return (_jsxs("div", { children: [_jsx(CheckoutSteps, { step1: true, step2: true, step3: true }), _jsxs("div", { className: "container small-container", children: [_jsx(Helmet, { children: _jsx("title", { children: "Payment Method" }) }), _jsx("h1", { className: "my-3", children: "Payment Method" }), _jsxs(Form, { onSubmit: submitHandler, children: [_jsx("div", { className: "mb-3", children: _jsx(Form.Check, { type: "radio", id: "PayPal", label: "PayPal", value: "PayPal", checked: paymentMethodName === 'PayPal', onChange: (e) => setPaymentMethodName(e.target.value) }) }), _jsx("div", { className: "mb-3", children: _jsx(Form.Check, { type: "radio", id: "Stripe", label: "Stripe", value: "Stripe", checked: paymentMethodName === 'Stripe', onChange: (e) => setPaymentMethodName(e.target.value) }) }), _jsx("div", { className: "mb-3", children: _jsx(Button, { type: "submit", children: "Continue" }) })] })] })] }));
}

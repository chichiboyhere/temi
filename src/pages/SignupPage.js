import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSignupMutation } from '../hooks/userHooks';
import { Store } from '../Store';
import { getError } from '../utils';
export default function SignupPage() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);
    const { mutateAsync: signup, isLoading } = useSignupMutation();
    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const data = await signup({
                name,
                email,
                password,
            });
            dispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect);
        }
        catch (err) {
            toast.error(getError(err));
        }
    };
    return (_jsxs(Container, { className: "small-container", children: [_jsx(Helmet, { children: _jsx("title", { children: "Sign Up" }) }), _jsx("h1", { className: "my-3", children: "Sign Up" }), _jsxs(Form, { onSubmit: submitHandler, children: [_jsxs(Form.Group, { className: "mb-3", controlId: "name", children: [_jsx(Form.Label, { children: "Name" }), _jsx(Form.Control, { onChange: (e) => setName(e.target.value), required: true })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "email", children: [_jsx(Form.Label, { children: "Email" }), _jsx(Form.Control, { type: "email", required: true, onChange: (e) => setEmail(e.target.value) })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "password", children: [_jsx(Form.Label, { children: "Password" }), _jsx(Form.Control, { type: "password", required: true, onChange: (e) => setPassword(e.target.value) })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "confirmPassword", children: [_jsx(Form.Label, { children: "Confirm Password" }), _jsx(Form.Control, { type: "password", onChange: (e) => setConfirmPassword(e.target.value), required: true })] }), _jsx("div", { className: "mb-3", children: _jsx(Button, { type: "submit", children: "Sign Up" }) }), _jsxs("div", { className: "mb-3", children: ["Already have an account?", ' ', _jsx(Link, { to: `/signin?redirect=${redirect}`, children: "Sign In" })] })] })] }));
}

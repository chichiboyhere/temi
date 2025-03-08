import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import { useSigninMutation } from '../hooks/userHooks';
import { Store } from '../Store';
import { getError } from '../utils';
export default function SigninPage() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    const { mutateAsync: signin, isLoading } = useSigninMutation();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const data = await signin({
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
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);
    return (_jsxs(Container, { className: "small-container", children: [_jsx(Helmet, { children: _jsx("title", { children: "Sign In" }) }), _jsx("h1", { className: "my-3", children: "Sign In" }), _jsxs(Form, { onSubmit: submitHandler, children: [_jsxs(Form.Group, { className: "mb-3", controlId: "email", children: [_jsx(Form.Label, { children: "Email" }), _jsx(Form.Control, { type: "email", required: true, onChange: (e) => setEmail(e.target.value) })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "password", children: [_jsx(Form.Label, { children: "Password" }), _jsx(Form.Control, { type: "password", required: true, onChange: (e) => setPassword(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx(Button, { disabled: isLoading, type: "submit", children: "Sign In" }), isLoading && _jsx(LoadingBox, {})] }), _jsxs("div", { className: "mb-3", children: ["New customer?", ' ', _jsx(Link, { to: `/signup?redirect=${redirect}`, children: "Create your account" })] })] })] }));
}

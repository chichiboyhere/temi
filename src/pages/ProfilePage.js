import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import { useUpdateProfileMutation } from '../hooks/userHooks';
import { Store } from '../Store';
import { getError } from '../utils';
export default function ProfilePage() {
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { mutateAsync: updateProfile, isLoading } = useUpdateProfileMutation();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (password !== confirmPassword) {
                toast.error('Passwords do not match');
                return;
            }
            const data = await updateProfile({
                name,
                email,
                password,
            });
            dispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('User updated successfully');
        }
        catch (err) {
            toast.error(getError(err));
        }
    };
    return (_jsxs("div", { className: "container small-container", children: [_jsx(Helmet, { children: _jsx("title", { children: "User Profile" }) }), _jsx("h1", { className: "my-3", children: "User Profile" }), _jsxs("form", { onSubmit: submitHandler, children: [_jsxs(Form.Group, { className: "mb-3", controlId: "name", children: [_jsx(Form.Label, { children: "Name" }), _jsx(Form.Control, { value: name, onChange: (e) => setName(e.target.value), required: true })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "name", children: [_jsx(Form.Label, { children: "Email" }), _jsx(Form.Control, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "password", children: [_jsx(Form.Label, { children: "Password" }), _jsx(Form.Control, { type: "password", onChange: (e) => setPassword(e.target.value) })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "password", children: [_jsx(Form.Label, { children: "Confirm Password" }), _jsx(Form.Control, { type: "password", onChange: (e) => setConfirmPassword(e.target.value) })] }), _jsxs("div", { className: "mb-3", children: [_jsx(Button, { disabled: isLoading, type: "submit", children: "Update" }), isLoading && _jsx(LoadingBox, {})] })] })] }));
}

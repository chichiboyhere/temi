import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
export default function SearchBox() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        navigate(query ? `/search?query=${query}` : '/search');
    };
    return (_jsx(Form, { className: "flex-grow-1 d-flex me-auto", onSubmit: submitHandler, children: _jsxs(InputGroup, { children: [_jsx(FormControl, { type: "text", name: "q", id: "q", placeholder: "Search Amazona", "aria-label": "Search Amazona", "aria-describedby": "button-search", onChange: (e) => setQuery(e.target.value) }), _jsx(Button, { variant: "outline-primary", type: "submit", id: "button-search", children: _jsx("i", { className: "fas fa-search" }) })] }) }));
}

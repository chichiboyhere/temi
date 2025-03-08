import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useGetOrderHistoryQuery } from '../hooks/orderHooks';
import { getError } from '../utils';
export default function OrderHistoryPage() {
    const navigate = useNavigate();
    const { data: orders, isLoading, error } = useGetOrderHistoryQuery();
    return (_jsxs("div", { children: [_jsx(Helmet, { children: _jsx("title", { children: "Order History" }) }), _jsx("h1", { children: "Order History" }), isLoading ? (_jsx(LoadingBox, {})) : error ? (_jsx(MessageBox, { variant: "danger", children: getError(error) })) : (_jsxs("table", { className: "table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "ID" }), _jsx("th", { children: "DATE" }), _jsx("th", { children: "TOTAL" }), _jsx("th", { children: "PAID" }), _jsx("th", { children: "DELIVERED" }), _jsx("th", { children: "ACTIONS" })] }) }), _jsx("tbody", { children: orders.map((order) => (_jsxs("tr", { children: [_jsx("td", { children: order._id }), _jsx("td", { children: order.createdAt.substring(0, 10) }), _jsx("td", { children: order.totalPrice.toFixed(2) }), _jsx("td", { children: order.isPaid ? order.paidAt.substring(0, 10) : 'No' }), _jsx("td", { children: order.isDelivered
                                        ? order.deliveredAt.substring(0, 10)
                                        : 'No' }), _jsx("td", { children: _jsx(Button, { type: "button", variant: "light", onClick: () => {
                                            navigate(`/order/${order._id}`);
                                        }, children: "Details" }) })] }, order._id))) })] }))] }));
}

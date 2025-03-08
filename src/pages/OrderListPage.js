import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import { useDeleteOrderMutation } from "../hooks/orderHooks";
import { useGetOrderListQuery } from "../hooks/orderHooks";
import { getError } from "../utils";
import MessageBox from "../components/MessageBox";
import { useNavigate } from "react-router-dom";
export default function OrderListPage() {
    const navigate = useNavigate();
    const { data: orderList, isLoading, error } = useGetOrderListQuery();
    const { mutateAsync: deleteOrder } = useDeleteOrderMutation();
    const handleDeleteOrder = (orderId) => {
        console.log("order Id", orderId);
        deleteOrder(orderId);
    };
    return (_jsxs("div", { children: [_jsx(Helmet, { children: _jsx("title", { children: "Orders" }) }), _jsx("h1", { children: "Orders" }), isLoading ? (_jsx(LoadingBox, {})) : error ? (_jsx(MessageBox, { variant: "danger", children: getError(error) })) : (_jsxs("table", { className: "table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "ID" }), _jsx("th", { children: "USER" }), _jsx("th", { children: "DATE" }), _jsx("th", { children: "TOTAL" }), _jsx("th", { children: "PAID" }), _jsx("th", { children: "DELIVERED" }), _jsx("th", { children: "ACTIONS" })] }) }), _jsx("tbody", { children: orderList.map((order) => (_jsxs("tr", { children: [_jsx("td", { children: order._id }), _jsx("td", { children: order.user ? order.user.name : "DELETED USER" }), _jsx("td", { children: order.createdAt.substring(0, 10) }), _jsx("td", { children: order.totalPrice.toFixed(2) }), _jsx("td", { children: order.isPaid ? order.paidAt.substring(0, 10) : "No" }), _jsx("td", { children: order.isDelivered
                                        ? order.deliveredAt.substring(0, 10)
                                        : "No" }), _jsxs("td", { children: [_jsx(Button, { type: "button", variant: "light", onClick: () => {
                                                navigate(`/order/${order._id}`);
                                            }, children: "Details" }), "\u00A0", _jsx(Button, { type: "button", variant: "light", onClick: () => handleDeleteOrder(order._id), children: "Delete" })] })] }, order._id))) })] }))] }));
}

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PayPalButtons, SCRIPT_LOADING_STATE, usePayPalScriptReducer, } from '@paypal/react-paypal-js';
import { useContext, useEffect } from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useGetOrderDetailsQuery, useGetPaypalClientIdQuery, usePayOrderMutation, } from '../hooks/orderHooks';
import { Store } from '../Store';
import { getError } from '../utils';
export default function OrderPage() {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const params = useParams();
    const { id: orderId } = params;
    const { data: order, isLoading, error, refetch, } = useGetOrderDetailsQuery(orderId);
    const { mutateAsync: payOrder, isLoading: loadingPay } = usePayOrderMutation();
    const testPayHandler = async () => {
        await payOrder({ orderId: orderId });
        refetch();
        toast.success('Order is paid');
    };
    const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();
    const { data: paypalConfig } = useGetPaypalClientIdQuery();
    useEffect(() => {
        if (paypalConfig && paypalConfig.clientId) {
            const loadPaypalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypalConfig.clientId,
                        currency: 'USD',
                    },
                });
                paypalDispatch({
                    type: 'setLoadingStatus',
                    value: SCRIPT_LOADING_STATE.PENDING,
                });
            };
            loadPaypalScript();
        }
    }, [paypalConfig]);
    const paypalbuttonTransactionProps = {
        style: { layout: 'vertical' },
        createOrder(data, actions) {
            return actions.order
                .create({
                purchase_units: [
                    {
                        amount: {
                            value: order.totalPrice.toString(),
                        },
                    },
                ],
            })
                .then((orderID) => {
                return orderID;
            });
        },
        onApprove(data, actions) {
            return actions.order.capture().then(async (details) => {
                try {
                    await payOrder({ orderId: orderId, ...details });
                    refetch();
                    toast.success('Order is paid successfully');
                }
                catch (err) {
                    toast.error(getError(err));
                }
            });
        },
        onError: (err) => {
            toast.error(getError(err));
        },
    };
    return isLoading ? (_jsx(LoadingBox, {})) : error ? (_jsx(MessageBox, { variant: "danger", children: getError(error) })) : !order ? (_jsx(MessageBox, { variant: "danger", children: "Order Not Found" })) : (_jsxs("div", { children: [_jsx(Helmet, { children: _jsxs("title", { children: ["Order ", orderId] }) }), _jsxs("h1", { className: "my-3", children: ["Order ", orderId] }), _jsxs(Row, { children: [_jsxs(Col, { md: 8, children: [_jsx(Card, { className: "mb-3", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Shipping" }), _jsxs(Card.Text, { children: [_jsx("strong", { children: "Name:" }), " ", order.shippingAddress.fullName, " ", _jsx("br", {}), _jsx("strong", { children: "Address: " }), " ", order.shippingAddress.address, ",", order.shippingAddress.city, ", ", order.shippingAddress.postalCode, ",", order.shippingAddress.country] }), order.isDelivered ? (_jsxs(MessageBox, { variant: "success", children: ["Delivered at ", order.deliveredAt] })) : (_jsx(MessageBox, { variant: "warning", children: "Not Delivered" }))] }) }), _jsx(Card, { className: "mb-3", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Payment" }), _jsxs(Card.Text, { children: [_jsx("strong", { children: "Method:" }), " ", order.paymentMethod] }), order.isPaid ? (_jsxs(MessageBox, { variant: "success", children: ["Paid at ", order.paidAt] })) : (_jsx(MessageBox, { variant: "warning", children: "Not Paid" }))] }) }), _jsx(Card, { className: "mb-3", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Items" }), _jsx(ListGroup, { variant: "flush", children: order.orderItems.map((item) => (_jsx(ListGroup.Item, { children: _jsxs(Row, { className: "align-items-center", children: [_jsxs(Col, { md: 6, children: [_jsx("img", { src: item.image, alt: item.name, className: "img-fluid rounded thumbnail" }), ' ', _jsx(Link, { to: `/product/${item.slug}`, children: item.name })] }), _jsx(Col, { md: 3, children: _jsx("span", { children: item.quantity }) }), _jsxs(Col, { md: 3, children: ["$", item.price] })] }) }, item._id))) })] }) })] }), _jsx(Col, { md: 4, children: _jsx(Card, { className: "mb-3", children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Order Summary" }), _jsxs(ListGroup, { variant: "flush", children: [_jsx(ListGroup.Item, { children: _jsxs(Row, { children: [_jsx(Col, { children: "Items" }), _jsxs(Col, { children: ["$", order.itemsPrice.toFixed(2)] })] }) }), _jsx(ListGroup.Item, { children: _jsxs(Row, { children: [_jsx(Col, { children: "Shipping" }), _jsxs(Col, { children: ["$", order.shippingPrice.toFixed(2)] })] }) }), _jsx(ListGroup.Item, { children: _jsxs(Row, { children: [_jsx(Col, { children: "Tax" }), _jsxs(Col, { children: ["$", order.taxPrice.toFixed(2)] })] }) }), _jsx(ListGroup.Item, { children: _jsxs(Row, { children: [_jsx(Col, { children: _jsx("strong", { children: " Order Total" }) }), _jsx(Col, { children: _jsxs("strong", { children: ["$", order.totalPrice.toFixed(2)] }) })] }) }), !order.isPaid && (_jsxs(ListGroup.Item, { children: [isPending ? (_jsx(LoadingBox, {})) : isRejected ? (_jsx(MessageBox, { variant: "danger", children: "Error in connecting to PayPal" })) : (_jsxs("div", { children: [_jsx(PayPalButtons, { ...paypalbuttonTransactionProps }), _jsx(Button, { onClick: testPayHandler, children: "Test Pay" })] })), loadingPay && _jsx(LoadingBox, {})] }))] })] }) }) })] })] }));
}

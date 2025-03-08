import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useContext } from "react";
import LoadingBox from "../components/LoadingBox";
import Chart from "react-google-charts";
import { useGetOrderSummaryQuery } from "../hooks/orderHooks";
import { Store } from "../Store";
import { getError } from "../utils";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import MessageBox from "../components/MessageBox";
export default function DashboardPage() {
    const { state } = useContext(Store);
    const { userInfo } = state;
    const { data: getOrderSummary, isLoading, error } = useGetOrderSummaryQuery();
    console.log(getOrderSummary);
    //Do type for Dashboard
    return (_jsxs("div", { children: [_jsx("h1", { children: "Dashboard" }), isLoading ? (_jsx(LoadingBox, {})) : error ? (_jsx(MessageBox, { variant: "danger", children: getError(error) })) : (_jsxs(_Fragment, { children: [_jsxs(Row, { children: [_jsx(Col, { md: 4, children: _jsx(Card, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: getOrderSummary.users && getOrderSummary.users[0]
                                                    ? getOrderSummary.users[0].numUsers
                                                    : 0 }), _jsx(Card.Text, { children: " Users" })] }) }) }), _jsx(Col, { md: 4, children: _jsx(Card, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: getOrderSummary.orders && getOrderSummary.users[0]
                                                    ? getOrderSummary.orders[0].numOrders
                                                    : 0 }), _jsx(Card.Text, { children: " Orders" })] }) }) }), _jsx(Col, { md: 4, children: _jsx(Card, { children: _jsxs(Card.Body, { children: [_jsxs(Card.Title, { children: ["$", getOrderSummary.orders && getOrderSummary.users[0]
                                                        ? getOrderSummary.orders[0].totalSales.toFixed(2)
                                                        : 0] }), _jsx(Card.Text, { children: " Orders" })] }) }) })] }), _jsxs("div", { className: "my-3", children: [_jsx("h2", { children: "Sales" }), getOrderSummary.dailyOrders.length === 0 ? (_jsx(MessageBox, { children: "No Sale" })) : (_jsx(Chart, { width: "100%", height: "400px", chartType: "AreaChart", loader: _jsx("div", { children: "Loading Chart..." }), data: [
                                    ["Date", "Sales"],
                                    ...getOrderSummary.dailyOrders.map((x) => [
                                        x._id,
                                        x.sales,
                                    ]),
                                ] }))] }), _jsxs("div", { className: "my-3", children: [_jsx("h2", { children: "Categories" }), getOrderSummary.productCategories.length === 0 ? (_jsx(MessageBox, { children: "No Category" })) : (_jsx(Chart, { width: "100%", height: "400px", chartType: "PieChart", loader: _jsx("div", { children: "Loading Chart..." }), data: [
                                    ["Category", "Products"],
                                    ...getOrderSummary.productCategories.map((x) => [
                                        x._id,
                                        x.count,
                                    ]),
                                ] }))] })] }))] }));
}

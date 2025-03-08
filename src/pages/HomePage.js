import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import ProductItem from '../components/ProductItem';
import { useGetProductsQuery } from '../hooks/productHooks';
import { getError } from '../utils';
export default function HomePage() {
    const { data: products, isLoading, error } = useGetProductsQuery();
    return isLoading ? (_jsx(LoadingBox, {})) : error ? (_jsx(MessageBox, { variant: "danger", children: getError(error) })) : (_jsxs(Row, { children: [_jsx(Helmet, { children: _jsx("title", { children: "TS Amazona" }) }), products.map((product) => (_jsx(Col, { sm: 6, md: 4, lg: 3, children: _jsx(ProductItem, { product: product }) }, product.slug)))] }));
}

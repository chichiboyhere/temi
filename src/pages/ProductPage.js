import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { useGetProductDetailsBySlugQuery } from '../hooks/productHooks';
import { Store } from '../Store';
import { convertProductToCartItem, getError } from '../utils';
export default function ProductPage() {
    const params = useParams();
    const { slug } = params;
    const { data: product, isLoading, error, } = useGetProductDetailsBySlugQuery(slug);
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const navigate = useNavigate();
    const addToCartHandler = () => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        if (product.countInStock < quantity) {
            toast.warn('Sorry. Product is out of stock');
            return;
        }
        dispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...convertProductToCartItem(product), quantity },
        });
        toast.success('Product added to the cart');
        navigate('/cart');
    };
    return isLoading ? (_jsx(LoadingBox, {})) : error ? (_jsx(MessageBox, { variant: "danger", children: getError(error) })) : !product ? (_jsx(MessageBox, { variant: "danger", children: "Product Not Found" })) : (_jsx("div", { children: _jsxs(Row, { children: [_jsx(Col, { md: 6, children: _jsx("img", { className: "large", src: product.image, alt: product.name }) }), _jsx(Col, { md: 3, children: _jsxs(ListGroup, { variant: "flush", children: [_jsxs(ListGroup.Item, { children: [_jsx(Helmet, { children: _jsx("title", { children: product.name }) }), _jsx("h1", { children: product.name })] }), _jsx(ListGroup.Item, { children: _jsx(Rating, { rating: product.rating, numReviews: product.numReviews }) }), _jsxs(ListGroup.Item, { children: ["Price : $", product.price] }), _jsxs(ListGroup.Item, { children: ["Description:", _jsx("p", { children: product.description })] })] }) }), _jsx(Col, { md: 3, children: _jsx(Card, { children: _jsx(Card.Body, { children: _jsxs(ListGroup, { variant: "flush", children: [_jsx(ListGroup.Item, { children: _jsxs(Row, { children: [_jsx(Col, { children: "Price:" }), _jsxs(Col, { children: ["$", product.price] })] }) }), _jsx(ListGroup.Item, { children: _jsxs(Row, { children: [_jsx(Col, { children: "Status:" }), _jsx(Col, { children: product.countInStock > 0 ? (_jsx(Badge, { bg: "success", children: "In Stock" })) : (_jsx(Badge, { bg: "danger", children: "Unavailable" })) })] }) }), product.countInStock > 0 && (_jsx(ListGroup.Item, { children: _jsx("div", { className: "d-grid", children: _jsx(Button, { onClick: addToCartHandler, variant: "primary", children: "Add to Cart" }) }) }))] }) }) }) })] }) }));
}

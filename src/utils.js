export const getError = (error) => {
    return error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
};
export const convertProductToCartItem = (product) => {
    const cartItem = {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        quantity: 1,
    };
    return cartItem;
};

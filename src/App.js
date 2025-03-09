import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  ListGroup,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "./Store";
import { useGetCategoriesQuery } from "./hooks/productHooks";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import { getError } from "./utils";
import SearchBox from "./components/SearchBox";
function App() {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store);
  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);
  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };
  const signoutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/";
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  return _jsxs("div", {
    className: "d-flex flex-column vh-100",
    children: [
      _jsx(ToastContainer, { position: "bottom-center", limit: 1 }),
      _jsx("header", {
        children: _jsxs(Navbar, {
          className: "d-flex flex-column align-items-stretch p-2 pb-0 mb-3",
          bg: "dark",
          variant: "dark",
          expand: "lg",
          children: [
            _jsxs("div", {
              className: "d-flex justify-content-between align-items-center",
              children: [
                _jsx(LinkContainer, {
                  to: "/",
                  className: "header-link",
                  children: _jsx(Navbar.Brand, { children: "temi" }),
                }),
                _jsx(SearchBox, {}),
                _jsx(Navbar.Collapse, {
                  children: _jsxs(Nav, {
                    className: "w-100 justify-content-end",
                    children: [
                      _jsxs(Link, {
                        to: "#",
                        className: "nav-link header-link",
                        onClick: switchModeHandler,
                        children: [
                          _jsx("i", {
                            className:
                              mode === "light" ? "fa fa-sun" : "fa fa-moon",
                          }),
                          " ",
                          mode === "light" ? "Light" : "Dark",
                        ],
                      }),
                      userInfo
                        ? _jsxs(NavDropdown, {
                            className: "header-link",
                            title: `${userInfo.name}`,
                            children: [
                              _jsx(LinkContainer, {
                                to: "/profile",
                                children: _jsx(NavDropdown.Item, {
                                  children: "User Profile",
                                }),
                              }),
                              _jsx(LinkContainer, {
                                to: "/orderhistory",
                                children: _jsx(NavDropdown.Item, {
                                  children: "Order History",
                                }),
                              }),
                              _jsx(NavDropdown.Divider, {}),
                              _jsxs(Link, {
                                className: "dropdown-item",
                                to: "#signout",
                                onClick: signoutHandler,
                                children: [" ", "Sign Out", " "],
                              }),
                            ],
                          })
                        : _jsx(NavDropdown, {
                            className: "header-link",
                            title: `Hello, sign in`,
                            children: _jsx(LinkContainer, {
                              to: "/signin",
                              children: _jsx(NavDropdown.Item, {
                                children: "Sign In",
                              }),
                            }),
                          }),
                      userInfo &&
                        userInfo.isAdmin &&
                        _jsxs(NavDropdown, {
                          title: "Admin",
                          className: "header-link",
                          id: "admin-nav-dropdown",
                          children: [
                            _jsx(LinkContainer, {
                              to: "/admin/dashboard",
                              children: _jsx(NavDropdown.Item, {
                                children: "Dashboard",
                              }),
                            }),
                            _jsx(LinkContainer, {
                              to: "/admin/products",
                              children: _jsx(NavDropdown.Item, {
                                children: "Products",
                              }),
                            }),
                            _jsx(LinkContainer, {
                              to: "/admin/orders",
                              children: _jsx(NavDropdown.Item, {
                                children: "Orders",
                              }),
                            }),
                            _jsx(LinkContainer, {
                              to: "/admin/users",
                              children: _jsx(NavDropdown.Item, {
                                children: "Users",
                              }),
                            }),
                            _jsx(LinkContainer, {
                              to: "/admin/productUpload",
                              children: _jsx(NavDropdown.Item, {
                                children: "Product Upload",
                              }),
                            }),
                          ],
                        }),
                      _jsx(Link, {
                        to: "/orderhistory",
                        className: "nav-link header-link",
                        children: "Orders",
                      }),
                      _jsxs(Link, {
                        to: "/cart",
                        className: "nav-link header-link p-0",
                        children: [
                          _jsx("span", {
                            className: "cart-badge",
                            children: cart.cartItems.reduce(
                              (a, c) => a + c.quantity,
                              0
                            ),
                          }),
                          _jsx("svg", {
                            fill: "#ffffff",
                            viewBox: "130 150 200 300",
                            width: "40px",
                            height: "40px",
                            children: _jsx("path", {
                              d: "M 110.164 188.346 C 104.807 188.346 100.437 192.834 100.437 198.337 C 100.437 203.84 104.807 208.328 110.164 208.328 L 131.746 208.328 L 157.28 313.233 C 159.445 322.131 167.197 328.219 176.126 328.219 L 297.409 328.219 C 306.186 328.219 313.633 322.248 315.951 313.545 L 341.181 218.319 L 320.815 218.319 L 297.409 308.237 L 176.126 308.237 L 150.592 203.332 C 148.426 194.434 140.675 188.346 131.746 188.346 L 110.164 188.346 Z M 285.25 328.219 C 269.254 328.219 256.069 341.762 256.069 358.192 C 256.069 374.623 269.254 388.165 285.25 388.165 C 301.247 388.165 314.431 374.623 314.431 358.192 C 314.431 341.762 301.247 328.219 285.25 328.219 Z M 197.707 328.219 C 181.711 328.219 168.526 341.762 168.526 358.192 C 168.526 374.623 181.711 388.165 197.707 388.165 C 213.704 388.165 226.888 374.623 226.888 358.192 C 226.888 341.762 213.704 328.219 197.707 328.219 Z M 197.707 348.201 C 203.179 348.201 207.434 352.572 207.434 358.192 C 207.434 363.812 203.179 368.183 197.707 368.183 C 192.236 368.183 187.98 363.812 187.98 358.192 C 187.98 352.572 192.236 348.201 197.707 348.201 Z M 285.25 348.201 C 290.722 348.201 294.977 352.572 294.977 358.192 C 294.977 363.812 290.722 368.183 285.25 368.183 C 279.779 368.183 275.523 363.812 275.523 358.192 C 275.523 352.572 279.779 348.201 285.25 348.201 Z",
                            }),
                          }),
                          _jsx("span", { children: "Cart" }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
            _jsx("div", {
              className: "sub-header",
              children: _jsxs("div", {
                className: "d-flex",
                children: [
                  _jsxs(Link, {
                    to: "#",
                    className: "nav-link header-link p-1",
                    onClick: () => setSidebarIsOpen(!sidebarIsOpen),
                    children: [_jsx("i", { className: "fas fa-bars" }), " All"],
                  }),
                  ["Todays Deal", "Gifts", "On Sale"].map((x) =>
                    _jsx(
                      Link,
                      {
                        className: "nav-link header-link p-1 px-3",
                        to: `/search?tag=${x}`,
                        children: x,
                      },
                      x
                    )
                  ),
                ],
              }),
            }),
          ],
        }),
      }),
      sidebarIsOpen &&
        _jsx("div", {
          onClick: () => setSidebarIsOpen(!sidebarIsOpen),
          className: "side-navbar-backdrop",
        }),
      _jsx("div", {
        className: sidebarIsOpen
          ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
          : "side-navbar d-flex justify-content-between flex-wrap flex-column",
        children: _jsxs(ListGroup, {
          variant: "flush",
          children: [
            _jsx(ListGroup.Item, {
              action: true,
              className: "side-navbar-user",
              children: _jsx(LinkContainer, {
                to: userInfo ? `/profile` : `/signin`,
                onClick: () => setSidebarIsOpen(!sidebarIsOpen),
                children: _jsx("span", {
                  children: userInfo
                    ? `Hello, ${userInfo.name}`
                    : `Hello, sign in`,
                }),
              }),
            }),
            _jsx(ListGroup.Item, {
              children: _jsxs("div", {
                className: "d-flex justify-content-between align-items-center",
                children: [
                  _jsx("strong", { children: "Categories" }),
                  _jsx(Button, {
                    variant: mode,
                    onClick: () => setSidebarIsOpen(!sidebarIsOpen),
                    children: _jsx("i", { className: "fa fa-times" }),
                  }),
                ],
              }),
            }),
            isLoading
              ? _jsx(LoadingBox, {})
              : error
              ? _jsx(MessageBox, {
                  variant: "danger",
                  children: getError(error),
                })
              : categories.map((category) =>
                  _jsx(
                    ListGroup.Item,
                    {
                      action: true,
                      children: _jsx(LinkContainer, {
                        to: {
                          pathname: "/search",
                          search: `category=${category}`,
                        },
                        onClick: () => setSidebarIsOpen(false),
                        children: _jsx(Nav.Link, { children: category }),
                      }),
                    },
                    category
                  )
                ),
          ],
        }),
      }),
      _jsx("main", {
        children: _jsx(Container, {
          className: "mt-3",
          children: _jsx(Outlet, {}),
        }),
      }),
      _jsx("footer", {
        children: _jsx("div", {
          className: "text-center",
          children: "All rights reserved",
        }),
      }),
    ],
  });
}
export default App;

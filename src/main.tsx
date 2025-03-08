import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// import 'bootstrap/dist/css/bootstrap.min.css'
import App from "./App";
import "./index.css";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StoreProvider } from "./Store";
import CartPage from "./pages/CartPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import ShippingAddressPage from "./pages/ShippingAddressPage";
import PaymentMethodPage from "./pages/PaymentMethodPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import OrderListPage from "./pages/OrderListPage";
import UserListPage from "./pages/UserListPage";
import ProductUploadPage from "./pages/ProductUploadPage";
import ProductEditPage from "./pages/ProductEditPage";
import ProductListPage from "./pages/ProductListPage";
import UserEditPage from "./pages/UserEditPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="product/:slug" element={<ProductPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="signin" element={<SigninPage />} />
      <Route path="signup" element={<SignupPage />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="shipping" element={<ShippingAddressPage />} />
        <Route path="payment" element={<PaymentMethodPage />} />
        <Route path="placeorder" element={<PlaceOrderPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/orderhistory" element={<OrderHistoryPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/orders" element={<OrderListPage />} />
        <Route path="/admin/users" element={<UserListPage />} />
        <Route path="/admin/productUpload" element={<ProductUploadPage />} />
        <Route path="/admin/products" element={<ProductListPage />} />
        <Route path="/admin/product/:id" element={<ProductEditPage />} />
        <Route path="/admin/user/:id" element={<UserEditPage />} />
      </Route>
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* ... etc. */}
    </Route>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <PayPalScriptProvider options={{ "client-id": "sb" }} deferLoading={true}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </HelmetProvider>
      </PayPalScriptProvider>
    </StoreProvider>
  </React.StrictMode>
);

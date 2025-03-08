import { useContext, useState, useReducer, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import { useDeleteOrderMutation } from "../hooks/orderHooks";
import { useGetOrderListQuery } from "../hooks/orderHooks";

import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import MessageBox from "../components/MessageBox";
import { useNavigate } from "react-router-dom";

export default function OrderListPage() {
  const navigate = useNavigate();
  const { data: orderList, isLoading, error } = useGetOrderListQuery();
  const { mutateAsync: deleteOrder } = useDeleteOrderMutation();

  const handleDeleteOrder = (orderId: any) => {
    console.log("order Id", orderId);
    deleteOrder(orderId);
  };

  return (
    <div>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <h1>Orders</h1>

      {isLoading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orderList!.map((order: any) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user ? order.user.name : "DELETED USER"}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>

                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "No"}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                  &nbsp;
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

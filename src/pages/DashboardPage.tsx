import { useContext, useState, useReducer, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import Chart from "react-google-charts";
import { useGetOrderSummaryQuery } from "../hooks/orderHooks";
import { Store } from "../Store";
import { ApiError } from "../types/ApiError";
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
  return (
    <div>
      <h1>Dashboard</h1>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : (
        <>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {getOrderSummary!.users && getOrderSummary!.users[0]
                      ? getOrderSummary!.users[0].numUsers
                      : 0}
                  </Card.Title>
                  <Card.Text> Users</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {getOrderSummary!.orders && getOrderSummary!.users[0]
                      ? getOrderSummary!.orders[0].numOrders
                      : 0}
                  </Card.Title>
                  <Card.Text> Orders</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    $
                    {getOrderSummary!.orders && getOrderSummary!.users[0]
                      ? getOrderSummary!.orders[0].totalSales.toFixed(2)
                      : 0}
                  </Card.Title>
                  <Card.Text> Orders</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="my-3">
            <h2>Sales</h2>
            {getOrderSummary!.dailyOrders.length === 0 ? (
              <MessageBox>No Sale</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="AreaChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ["Date", "Sales"],
                  ...getOrderSummary!.dailyOrders.map((x: any) => [
                    x._id,
                    x.sales,
                  ]),
                ]}
              ></Chart>
            )}
          </div>
          <div className="my-3">
            <h2>Categories</h2>
            {getOrderSummary!.productCategories.length === 0 ? (
              <MessageBox>No Category</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart...</div>}
                data={[
                  ["Category", "Products"],
                  ...getOrderSummary!.productCategories.map((x: any) => [
                    x._id,
                    x.count,
                  ]),
                ]}
              ></Chart>
            )}
          </div>
        </>
      )}
    </div>
  );
}

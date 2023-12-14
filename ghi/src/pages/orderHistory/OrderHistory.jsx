import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllOrdersQuery } from "../../app/ordersSlice";
import { useGetTokenQuery } from "../../app/authSlice";
import OrderRow from "../../components/orderRow/OrderRow";
import OrderDetails from "../../components/orderDetails/OrderDetails";
import { ImgBackground } from "./style";
import { Wrapper, Table } from "../../constants";

const OrderHistory = () => {
  const navigate = useNavigate();
  const { data: account, isLoading } = useGetTokenQuery();
  const { data: allOrders, isLoading: ordersLoading } = useGetAllOrdersQuery();
  const [orders, setOrders] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [detailedOrder, setDetailedOrder] = useState({});

  useEffect(() => {
    if (!isLoading && !account) {
      navigate("/");
    }
    if (allOrders && account?.role === "customer") {
      let list = allOrders.filter(
        (item) => item.customer_username === account.username
      );
      setOrders(list);
    } else if (allOrders && account?.role === "shaper") {
      let list = allOrders.filter(
        (item) => item.surfboard_shaper === account.username
      );
      setOrders(list);
    } else {
      !ordersLoading && setOrders(allOrders);
    }
  }, [account, allOrders, isLoading, navigate, ordersLoading]);

  if (isLoading || ordersLoading)
    return (
      <Wrapper>
        <h1>Loading...</h1>
      </Wrapper>
    );

  return (
    <ImgBackground>
      <Wrapper>
        {account && (
          <>
            <h1>Order List</h1>
            <OrderDetails
              order={detailedOrder}
              showDetails={showDetails}
              setShowDetails={setShowDetails}
              status={detailedOrder.order_status}
              role={account.role}
            />
            <Table>
              <thead>
                <tr>
                  <th>Order Date</th>
                  {account.role !== "customer" && <th>Customer</th>}
                  {account.role !== "shaper" && <th>Shaper</th>}
                  <th>Length</th>
                  <th>Width</th>
                  <th>Thickness</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => (
                  <OrderRow
                    item={item}
                    role={account.role}
                    key={index}
                    setShowDetails={setShowDetails}
                    setDetailedOrder={setDetailedOrder}
                  />
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Wrapper>
    </ImgBackground>
  );
};

export default OrderHistory;

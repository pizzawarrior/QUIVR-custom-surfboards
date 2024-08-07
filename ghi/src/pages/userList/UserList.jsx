import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllAccountsQuery, useGetTokenQuery } from "../../app/authSlice";
import { useGetAllOrdersQuery } from "../../app/ordersSlice";
import UserRow from "../../components/userRow/UserRow";
import AddUserModal from "../../components/addUserModal/AddUserModal";
import { HeaderContainer, ImgBackground } from "./style";
import { Table } from "../../constants";

const UserList = () => {
  const { data: allUsers = [], isLoading: isLoadingUsers } =
    useGetAllAccountsQuery();
  const { data: orders = [], isLoading: isLoadingOrders } =
    useGetAllOrdersQuery();
  const { data: account, isLoading: isLoadingAccount } = useGetTokenQuery();
  const [userList, setUserList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoadingAccount || isLoadingOrders || isLoadingUsers) return;

    if (!account) {
      navigate("/");
      return;
    }

    if (account.role === "customer") {
      navigate("/create-order");
      return;
    }

    if (account.role === "shaper" && orders) {
      let filteredOrders = orders.filter(
        (order) => order.surfboard_shaper === account.username
      );

      const customerMap = new Map();

      filteredOrders.forEach((order) => {
        const { customer_username } = order;

        const customerData = allUsers.find(
          (user) => user.username === customer_username
        );

        if (customerData) {
          if (!customerMap.has(customer_username)) {
            customerMap.set(customer_username, {
              first_name: customerData.first_name,
              last_name: customerData.last_name,
              email: customerData.email,
              phone_number: customerData.phone_number,
              username: customer_username,
              orders_in_progress: 0,
              orders_completed: 0,
            });
          }

          const existingCustomerData = customerMap.get(customer_username);

          if (order.order_status !== "Completed") {
            existingCustomerData.orders_in_progress += 1;
          }

          if (order.order_status === "Completed") {
            existingCustomerData.orders_completed += 1;
          }
        }
      });

      const uniqueCustomers = Array.from(customerMap.values());
      setUserList(uniqueCustomers);
    } else if (account.role === "admin") {
      setUserList(allUsers || []);
    }
  }, [
    account,
    orders,
    allUsers,
    isLoadingAccount,
    isLoadingOrders,
    isLoadingUsers,
    navigate,
  ]);

  if (isLoadingAccount || isLoadingOrders || isLoadingUsers) {
    return (
      <ImgBackground>
        <HeaderContainer>
          <h1>Loading...</h1>
        </HeaderContainer>
      </ImgBackground>
    );
  }

  return (
    <ImgBackground>
      <>
        <HeaderContainer>
          <h1>Customer List</h1>
          {account?.role === "admin" && (
            <button onClick={() => setShowModal(true)}>Add User</button>
          )}
        </HeaderContainer>
        {account && (
          <Table>
            <thead>
              <tr>
                <th>
                  {account.role === "shaper" ? "Customer Name" : "User Name"}
                </th>
                {account.role === "shaper" ? (
                  <>
                    <th>Orders In Progress</th>
                    <th>Completed Orders</th>
                  </>
                ) : (
                  <th>User Type</th>
                )}
                <th>Email</th>
                <th>Phone Number</th>
                {account?.role === "admin" && <th>Delete User</th>}
              </tr>
            </thead>
            <tbody>
              {userList.map((item, index) => (
                <UserRow item={item} role={account.role} key={index} />
              ))}
            </tbody>
          </Table>
        )}
        {showModal && <AddUserModal setShowModal={setShowModal} />}
      </>
    </ImgBackground>
  );
};

export default UserList;

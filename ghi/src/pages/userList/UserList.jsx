import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllAccountsQuery, useGetTokenQuery } from "../../app/authSlice";
import UserRow from "../../components/userRow/UserRow";
import AddUserModal from "../../components/addUserModal/AddUserModal";
import { HeaderContainer, ImgBackground } from "./style";
import { Table } from "../../constants";

const UserList = () => {
  let { data: allUsers } = useGetAllAccountsQuery();
  const { data: account, isLoading } = useGetTokenQuery();
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !account) {
      navigate("/");
    }
    if (!isLoading && account.role === "customer") {
      navigate("/create-order");
    }
    if (allUsers && !isLoading) {
      if (account.role === "shaper") {
        let filtered = allUsers.filter((item) => item.role === "customer");
        setUserList(filtered);
      } else {
        setUserList(allUsers);
      }
    }
  }, [account, allUsers, isLoading, navigate]);

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

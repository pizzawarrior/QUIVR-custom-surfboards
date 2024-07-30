import React from "react";
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  LogoutLink,
  Logo,
} from "./style";
import QuivrLogo from "../../images/Quivr_logo2.png";
import { useLogoutMutation, useGetTokenQuery } from "../../app/authSlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { data: account } = useGetTokenQuery();
  const [logout] = useLogoutMutation();

  return (
    <NavbarContainer>
      <NavbarInnerContainer>
        <LeftContainer>
          <Logo to="/"></Logo>
        </LeftContainer>
        <RightContainer>
          <NavbarLinkContainer>
            <div className={account ? "vis" : "hidden"}>
              <NavbarLink to="/">Home</NavbarLink>
              {account?.role === "customer" && (
                <NavbarLink to="/create-order">Create Order</NavbarLink>
              )}
              <NavbarLink to="/order-history">Orders</NavbarLink>
              <NavbarLink to="/messages">Messages</NavbarLink>
            </div>

            <div
              className={
                account && account?.role !== "customer" ? "vis" : "hidden"
              }
            >
              <NavbarLink to="/users">Customer List</NavbarLink>
            </div>

            <div className={!account ? "vis" : "hidden"}>
              <NavbarLink to="/login">Login</NavbarLink>
            </div>

            <div className={account ? "vis" : "hidden"}>
              <LogoutLink
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
              </LogoutLink>
            </div>
          </NavbarLinkContainer>
        </RightContainer>
      </NavbarInnerContainer>
    </NavbarContainer>
  );
}
export default Navbar;

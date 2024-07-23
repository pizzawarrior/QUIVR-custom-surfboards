import styled from "styled-components";
import { Link } from "react-router-dom";

export const Logo = styled.img`
  height: 80px;
  margin-left: 60px;
`;

export const NavbarContainer = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;

  @media (min-width: 700px) {
    height: 80px;
  }
`;

export const LeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 35%;
`;

export const RightContainer = styled.div`
  flex: 45%;
  display: flex;
  justify-content: space-evenly;
  padding-left: 5em;
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
  .vis {
    display: flex;
  }
  .hidden {
    visibility: hidden;
  }
`;

export const NavbarLink = styled(Link)`
  color: #0d5274;
  font-size: 20px;
  text-decoration: none;
  margin-top: 30px;
  padding-left: 3rem;

  @media (max-width: 700px) {
    display: none;
  }
`;

export const LogoutLink = styled(Link)`
  color: #9cd9e8;
  font-size: 20px;
  text-decoration: none;
  margin-top: 30px;
  padding-left: 3rem;

  @media (max-width: 700px) {
    display: none;
  }
`;

export const NavbarLinkExtended = styled(Link)`
  color: white;
  font-size: x-large;
  font-family: "Montserrat", sans-serif;
  letter-spacing: 5px;
  text-decoration: none;
  margin: 30px;
  padding-right: 80px;
`;

export const OpenLinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;

  @media (min-width: 700px) {
    display: none;
  }
`;

export const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (mibn-width: 700px) {
    display: none;
  }
`;

import styled from "styled-components";

export const Background = styled.div`
  max-width: 1200px;
  margin: auto;
  background-color: #e3f5fd;
  min-height: 60vh;
  width: 100%;
  overflow-y: scroll;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 20px 0 70px 0;
  border-radius: 8px;
`;

export const H1 = styled.h1`
  font-family: "Lilita One", sans-serif;
  color: white;
  text-shadow: 1px 1px 2px #e76215;
  letter-spacing: 2px;
  grid-column: 1;
`;

export const Button1 = styled.button`
  border: 2px solid white;
  border-radius: 8px;
  padding: 10px 20px;
  background-color: #e76215;
  color: white;
  font-weight: bold;
  cursor: pointer;
  grid-column: 4;
  justify-self: end;
  &:hover {
    background-color: #8f3806;
  }
`;

export const TopDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  width: 100%;
`;

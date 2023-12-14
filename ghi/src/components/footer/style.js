import styled from "styled-components";

export const Container = styled.div`
  padding: 30px 30px;
  background-color: #072c42;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  height: 80px;
  padding-top: 20px;
  margin: 0 auto;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 20px;

  @media (maxwidth: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  }
`;

export const Link = styled.div`
  color: #66bced;
  margin-bottom: 10px;
  font-size: 12px;
  text-decoration: none;

  &:hover {
    color: #ff9c00;
    transition: 200ms ease-in;
    cursor: pointer;
  }
`;

export const Title = styled.div`
  font-size: 15px;
  color: #fff;
  margin-bottom: 20px;
`;

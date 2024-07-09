import styled from "styled-components";

export const OrderFormStyle = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #0d5274;
  color: #e3f5fd;
  text-align: center;
  align-items: center;
  padding: 20px;
  border-radius: 12px;

  img {
    height: 30vh;
    width: 14em;
    padding-right: 2em;
    object-fit: contain;
  }

  h1 {
    text-align: center;
    color: white;
    text-shadow: 1px 1px 2px #e76215;
  }

  h3 {
    font-weight: normal;
    font-size: 16px;
  }

  button {
    margin: 8px 0;
    background-color: rgb(253, 137, 64);
    padding: 8px 12px;
    color: #fff;
    border-radius: 8px;
    letter-spacing: 1px;
    font-weight: bold;
    border: none;
  }

  input {
    width: 9vw;
    height: 2.2vw;
    margin: 10px;
    padding-left: 5px;
  }

  select {
    width: 184px;
    height: 2.5vw;
    margin: 10px;
    margin-left: 11px;
  }

  textarea {
    height: 10vw;
    width: 20vw;
    margin-top: 45px;
  }
`;

export const Container1 = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const Container2 = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const Container3 = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const Buttons = styled.div`
  margin-top: 6em;
  padding-right: 2em;
`;

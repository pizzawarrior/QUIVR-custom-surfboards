import styled from "styled-components";
import Background from "../../images/OrderHistory.jpg";

export const ImgBackground = styled.div`
  background-image: url(${Background});
  min-height: 60vh;
  width: 100%;
  overflow-y: scroll;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 70px 0;

  H1 {
    font-family: "Lilita One", sans-serif;
    color: #e76215;
    letter-spacing: 2px;
  }
`;

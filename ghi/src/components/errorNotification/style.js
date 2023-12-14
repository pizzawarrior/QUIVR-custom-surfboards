import styled from "styled-components";
import ErrorPage from "../../images/ErrorPage.webp";

export const Container = styled.div`
  background-image: url(${ErrorPage});
  height: 60vh;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 70px 0;
  h2 {
    color: #072c42;
    text-align: center;
    font-size: 2rem;
    margin: 0;
    font-weight: bold;
  }
  img {
    padding-left: 37%;
    height: 30rem;
    width: 30rem;
  }

  p {
    color: #072c42;
    font-size: larger;
    padding-left: 37%;
    font-weight: bold;
  }
`;

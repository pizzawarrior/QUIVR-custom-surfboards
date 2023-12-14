import styled from "styled-components";
import Background from "../../images/pexels-pixabay-390051.jpg";

export const Title = styled.h1`
  text-align: left;
  font-family: "Lilita One", sans-serif;
  font-size: 40px;
  line-height: 3rem;
  letter-spacing: 4px;
  color: #f58236;
`;

export const LandContainer = styled.div`
  #quote {
    text-align: center;
    font-family: "Montserrat", sans-serif;
    font-size: 35px;
    margin: 0;
  }
`;

export const LandBackground = styled.div`
  background-image: url(${Background});
  height: 60vh;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 70px 0;
`;

export const Div = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 30px 80px 0 80px;

  img {
    height: 20vh;
    width: 20vh;
    margin: 8px;
    padding: 50px;
  }

  h1 {
    color: #0d5274;
    font-family: "Montserrat", sans-serif;
  }
`;

export const OurStory = styled.div`
  font-size: large;
  background-color: #e56a4b;
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: space-evenly;
  align-items: center;
  padding: 16px 100px;
  gap: 110px;
  img {
    height: 30vh;
    width: 40vh;
    padding: 40px;
  }
  div {
    max-width: 75%;
  }
`;

export const AboutUs = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 30px 80px;
  line-height: 30px;
  background-color: #073e4f;
  color: white;
  margin-top: 0px;

  img {
    height: 50vh;
    width: 60vh;
    margin-top: 30px;
  }
  div {
    max-width: 50%;
  }
  p {
    font-size: 20px;
    font-family: "Montserrat", sans-serif;
  }
`;

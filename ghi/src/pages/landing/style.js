import styled from "styled-components";
import Background from "../../images/pexels-pixabay-390051.jpg";

export const Title = styled.h1`
  text-align: left;
  font-family: "Lilita One", sans-serif;
  font-size: 40px;
  line-height: 3rem;
  letter-spacing: 4px;
  color: #f5cf25;
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
  height: 50vh;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  background-position: center calc(-30vh);
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
    object-fit: contain;
  }

  h1 {
    color: #0d5274;
    text-shadow: 1px 1px 0px #e87c0a;
    font-family: "Montserrat", sans-serif;
  }
`;

export const AboutUs = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px 0px 30px 80px;
  line-height: 30px;
  background-color: #0b1c40;
  color: white;
  margin: auto;

  img {
    width: 30%;
    margin: auto;
    padding-left: 10em;
    object-fit: contain;
  }
  div {
    max-width: 50%;
  }
  p {
    font-size: 20px;
    font-family: "Montserrat", sans-serif;
  }
`;

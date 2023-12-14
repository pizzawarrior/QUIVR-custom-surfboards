import styled from 'styled-components';
import Background from '../../images/swellBackground.jpg';

export const LandBackground = styled.div`
    background-image: url(${Background});
    height: 60vh;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 70px 0;
`;

export const SignUp = styled.p`
    cursor: pointer;
    color: #df7357;
    text-align: center;
`;

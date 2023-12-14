import styled from "styled-components";

export const DetailsContainer = styled.div`
  display: flex;
  gap: 15%;
  width: 100%;
  margin: 0 20%;
`;

export const Labels = styled.div`
  color: #9cd9e8;
`;

export const Values = styled.div``;

export const Container = styled.div`
  position: fixed;
  top: 10vh;
  bottom: 17vh;
  right: 0;
  width: 30em;
  background: #072c42;
  color: #eee;
  padding: 1em;
  border-radius: 8px;
  padding: 0 16px;
  font-weight: bold;

  .statusContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    padding: 0 15%;
  }
  #status {
    height: 36px;
  }

  #statusBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  button {
    padding: 8px 14px;
    border-radius: 12px;
  }

  h2 {
    color: #e76215;
  }
`;

export const H1 = styled.h1`
  text-align: end;
  font-size: 16px;
`;

export const AddReview = styled.button`
  margin: 5% 20%;
  padding: 12px;
  background-color: #6b839f;
  color: #fff;
  border: none;
  border-radius: 4px;
`;

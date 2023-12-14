import { useState, useEffect } from "react";
import Orderboard from "../../images/Orderboard.png";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../app/ordersSlice";

import {
  Wrapper,
  CartContainer,
  StyleTable,
  STHead,
  STHeadTR,
  STBody,
  STR,
  STD1,
  STD2,
  STD3,
  STH,
  STH1,
  P1,
  P2,
  Button1,
  StyledTotal,
} from "./style";

const CartDetails = ({ order, setShowCart, addToCart, setAddToCart }) => {
  const price = 849;
  const subtotal = price * addToCart.length;

  const [createOrder, result] = useCreateOrderMutation();
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (result.isSuccess) {
      navigate("/order-history");
      setAddToCart([]);
    } else if (result.isError) {
      setErrorMessage("There was an error creating your order");
    }
  }, [result, navigate, setAddToCart]);

  const handleCreate = async (e) => {
    e.preventDefault();
    createOrder(addToCart[0]);
  };

  return (
    <Wrapper>
      {addToCart.length === 0 ? (
        <h2>Your cart is currently empty</h2>
      ) : (
        <CartContainer>
          <div>
            <h1>Cart Contents... Get Stoked!</h1>
            {errorMessage && <h3>{errorMessage}</h3>}
          </div>
          <StyleTable>
            <STHead>
              <STHeadTR>
                <STH1>Item</STH1>
                <STH>Description</STH>
                <STH>Price</STH>
              </STHeadTR>
            </STHead>
            <STBody>
              {order &&
                order.map((item, index) => {
                  return (
                    <STR key={index}>
                      <STD1>
                        <img src={Orderboard} alt="" />
                      </STD1>
                      <STD2>
                        {`${item.surfboard_shaper} -
                        ${
                          item.surfboard_model.charAt(0).toUpperCase() +
                          item.surfboard_model.slice(1)
                        },
                        ${item.surfboard_length}' x ${item.surfboard_width}" x
                        ${item.surfboard_thickness}"`}
                      </STD2>
                      <STD3>${price}</STD3>
                    </STR>
                  );
                })}
            </STBody>
          </StyleTable>
          <StyledTotal>
            <P1>Subtotal</P1>
            <P2>${subtotal}.00</P2>
          </StyledTotal>
          <Button1 onClick={(e) => handleCreate(e)}>Checkout</Button1>
        </CartContainer>
      )}
      <IconButton
        style={{
          position: "absolute",
          top: "0",
          right: "0",
        }}
        onClick={() => setShowCart(false)}
      >
        <CloseRoundedIcon fontSize="large" />
      </IconButton>
    </Wrapper>
  );
};

export default CartDetails;

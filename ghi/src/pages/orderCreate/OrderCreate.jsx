import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImgBackground, StyledCart } from "./style";
import { Wrapper } from "../../constants";
import Cart from "../../components/cart/Cart";
import CartDetails from "../../components/cartDetails/CartDetails";
import OrderForm from "../../components/orderForm/orderForm";
import {
  useGetTokenQuery,
  useGetAccountsByRoleQuery,
} from "../../app/authSlice";

const OrderCreate = () => {
  const navigate = useNavigate();
  const { data: shaper, isLoading } = useGetAccountsByRoleQuery("shaper");
  const { data: account, isLoading: isTokenLoading } = useGetTokenQuery();

  useEffect(() => {
    if (!isTokenLoading && !account) {
      navigate("/");
    }
  }, [account, isTokenLoading, navigate]);

  const [surfboard_shaper, setShaper] = useState("");
  const [surfboard_model, setModel] = useState("");
  const [surfboard_length, setLength] = useState("");
  const [surfboard_width, setWidth] = useState("");
  const [surfboard_thickness, setThickness] = useState("");
  const [surfboard_construction, setConstruction] = useState("");
  const [surfboard_fin_system, setFinSystem] = useState("");
  const [surfboard_fin_count, setFinCount] = useState("");
  const [surfboard_tail_style, setTailStyle] = useState("");
  const [surfboard_glassing, setGlassing] = useState("");
  const [surfboard_desc, setDesc] = useState("");
  const [addToCart, setAddToCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  if (isLoading || isTokenLoading) return <div>Loading...</div>;

  const handleClear = () => {
    setShaper("");
    setModel("");
    setLength("");
    setWidth("");
    setThickness("");
    setConstruction("");
    setFinSystem("");
    setFinCount("");
    setTailStyle("");
    setGlassing("");
    setDesc("");
  };

  async function handleAdd(e) {
    e.preventDefault();
    const order = {
      surfboard_shaper,
      surfboard_model,
      surfboard_length,
      surfboard_width,
      surfboard_thickness,
      surfboard_construction,
      surfboard_fin_system,
      surfboard_fin_count,
      surfboard_tail_style,
      surfboard_glassing,
      surfboard_desc,
    };
    setAddToCart([...addToCart, order]);
    handleClear();
  }
  // console.log(addToCart);

  return (
    <ImgBackground>
      <Wrapper>
        <StyledCart>
          <Cart cartCount={addToCart.length} setShowCart={setShowCart} />
        </StyledCart>

        {showCart && (
          <CartDetails
            order={addToCart}
            showCart={showCart}
            setShowCart={setShowCart}
            addToCart={addToCart}
            setAddToCart={setAddToCart}
          />
        )}

        <OrderForm
          shaper={shaper}
          surfboard_shaper={surfboard_shaper}
          setShaper={setShaper}
          surfboard_model={surfboard_model}
          setModel={setModel}
          surfboard_length={surfboard_length}
          setLength={setLength}
          surfboard_width={surfboard_width}
          setWidth={setWidth}
          surfboard_thickness={surfboard_thickness}
          setThickness={setThickness}
          surfboard_construction={surfboard_construction}
          setConstruction={setConstruction}
          surfboard_fin_system={surfboard_fin_system}
          setFinSystem={setFinSystem}
          surfboard_fin_count={surfboard_fin_count}
          setFinCount={setFinCount}
          surfboard_tail_style={surfboard_tail_style}
          setTailStyle={setTailStyle}
          surfboard_glassing={surfboard_glassing}
          setGlassing={setGlassing}
          surfboard_desc={surfboard_desc}
          setDesc={setDesc}
          handleAdd={handleAdd}
          handleClear={handleClear}
        />
      </Wrapper>
    </ImgBackground>
  );
};

export default OrderCreate;

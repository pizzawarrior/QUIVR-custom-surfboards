import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Cart = ({ cartCount, setShowCart }) => {
  const handleClick = () => {
    setShowCart(true);
  };

  return (
    <div onClick={() => handleClick()}>
      <Badge color="primary" fontSize="large" badgeContent={cartCount}>
        <ShoppingCartIcon style={{ color: "#072c42" }} fontSize="large" />{" "}
      </Badge>
    </div>
  );
};

export default Cart;

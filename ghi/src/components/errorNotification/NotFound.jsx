import { Link } from "react-router-dom"
import { Container } from "./style";
import BrokenSurfboard from "../../images/BrokenSurfboard.jpg"

export const NotFound = () => {
  return (
    <Container>
      <h2>Page not found!</h2>
      <img src={BrokenSurfboard} alt="" />
      <p>Looks like you broke your board! return to home to make a new one!</p>
      <p>Go to the <Link to="/">Homepage</Link>.</p>
    </Container>
  )
}

export default NotFound;

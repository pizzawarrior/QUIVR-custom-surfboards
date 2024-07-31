import { useState } from "react";
import ReviewModal from "../reviewModal/ReviewModal";
import Review from "../review/Review";
import { useUpdateOrderMutation } from "../../app/ordersSlice";
import { OrderStatusOptions } from "../../constants";
import {
  DetailsContainer,
  Labels,
  Values,
  Container,
  H1,
  AddReview,
} from "./style";

const OrderDetails = ({ order, showDetails, setShowDetails, status, role }) => {
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [update] = useUpdateOrderMutation();

  const handleStatus = () => {
    const updateVal = {
      id: order.order_id,
      data: {
        order_status: newStatus,
      },
    };
    update(updateVal);
    setShowDetails(false);
    setNewStatus("");
  };

  return (
    <>
      {showModal && (
        <ReviewModal
          setShowModal={setShowModal}
          shaper={order.surfboard_shaper}
          orderId={order.order_id}
        />
      )}
      {showDetails && (
        <Container>
          <H1 onClick={() => setShowDetails(false)}>X</H1>
          {order && (
            <DetailsContainer>
              <Labels>
                <p>Order Date:</p>
                <p>Order Status:</p>
                <p>Shaper:</p>
                <p>Model:</p>
                <p>Length:</p>
                <p>Width:</p>
                <p>Thickness:</p>
                <p>Fin System:</p>
                <p>Fin Count:</p>
                <p>Tail Style:</p>
                <p>Construction:</p>
                <p>Glassing:</p>
                <p>Description:</p>
              </Labels>
              <Values>
                <p>{order.date}</p>
                <p>{order.order_status}</p>
                <p>{order.surfboard_shaper}</p>
                <p>{order.surfboard_model}</p>
                <p>{order.surfboard_length}</p>
                <p>{order.surfboard_width}</p>
                <p>{order.surfboard_thickness}</p>
                <p>{order.surfboard_fin_system}</p>
                <p>{order.surfboard_fin_count}</p>
                <p>{order.surfboard_tail_style}</p>
                <p>{order.surfboard_construction}</p>
                <p>{order.surfboard_glassing}</p>
                <p>{order.surfboard_desc}</p>
              </Values>
            </DetailsContainer>
          )}
          {!order.reviewed && status === "Completed" && role === "customer" && (
            <AddReview
              onClick={() => {
                setShowDetails(false);
                setShowModal(true);
              }}
            >
              Add Review
            </AddReview>
          )}
          {role === "shaper" && status !== "Completed" && (
            <div className="statusContainer">
              <h2>Update Order Status</h2>
              <div id="statusBox">
                <select
                  onChange={(e) => setNewStatus(e.target.value)}
                  name="status"
                  id="status"
                  value={newStatus}
                  required
                >
                  <option>Choose a status...</option>
                  {OrderStatusOptions.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleStatus()}>Update</button>
              </div>
            </div>
          )}
          {order.reviewed && <Review order={order} />}
        </Container>
      )}
    </>
  );
};

export default OrderDetails;

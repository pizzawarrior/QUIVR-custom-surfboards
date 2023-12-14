import { useGetReviewByIdQuery } from '../../app/reviewsSlice';
import StarRender from '../starRender/StarRender';
import { ReviewContainer } from './style';

const Review = ({ order }) => {
    const { data: review, isLoading } = useGetReviewByIdQuery(order.order_id);

    if (isLoading) return <h1>Loading...</h1>;

    return (
        <ReviewContainer>
            <p>{review.title}</p>
            <p>{review.description}</p>
            <StarRender rating={review.rating} />
        </ReviewContainer>
    );
};

export default Review;

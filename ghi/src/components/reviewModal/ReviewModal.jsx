import { useState } from 'react';
import { useCreateReviewMutation } from '../../app/reviewsSlice';
import { useUpdateOrderMutation } from '../../app/ordersSlice';
import StarRating from '../starRating/StarRating';
import { ModalContainer } from '../../constants';

const ReviewModal = ({ setShowModal, shaper, orderId }) => {
    const [starrating, setRating] = useState(0);
    const [reviewtitle, setTitle] = useState('');
    const [desc, setDescription] = useState('');
    const [review] = useCreateReviewMutation();
    const [update] = useUpdateOrderMutation();

    const handleReview = () => {
        const addRating = {
            rating: starrating,
            title: reviewtitle,
            description: desc,
            shaper: shaper,
            order_id: orderId,
        };
        review(addRating);
        const updateVal = {
            id: orderId,
            data: {
                reviewed: true,
            },
        };
        update(updateVal);
        setShowModal(false);
    };

    return (
        <ModalContainer>
            <h2 onClick={() => setShowModal(false)}>X</h2>
            <h1>Leave a Review</h1>
            <StarRating
                rating={starrating}
                setRating={setRating}
            />
            <p>Title:</p>
            <input
                type='text'
                value={reviewtitle}
                onChange={(e) => setTitle(e.target.value)}
            />
            <p>Review Body:</p>
            <textarea
                name='description'
                id='description'
                cols='30'
                rows='10'
                value={desc}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <br />
            <button onClick={() => handleReview()}>Add Review</button>
        </ModalContainer>
    );
};

export default ReviewModal;

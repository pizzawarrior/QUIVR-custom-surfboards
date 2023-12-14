import { useState } from 'react';
import { Container } from './style';

const StarRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(0);

    return (
        <Container>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type='button'
                        key={index}
                        className={index <= (hover || rating) ? 'on' : 'off'}
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className='star'>&#9733;</span>
                    </button>
                );
            })}
        </Container>
    );
};

export default StarRating;

const StarRender = ({ rating }) => {
    const stars = Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 0.5;
        const starClassName = starValue <= rating ? 'star filled' : 'star';

        return (
            <span
                key={index}
                className={starClassName}
            >
                ★
            </span>
        );
    });

    return <div className='star-rating'>{stars}</div>;
};

export default StarRender;

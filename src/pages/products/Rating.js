import React from 'react';

class Rating extends React.Component {
  render() {
    const { props } = this;
    if (!props.ratings) return '';
    let totalRateValue = 0;
    props.ratings.forEach((rating) => {
      totalRateValue += rating.rating;
    });

    const avgRating = Math.round(totalRateValue / props.ratings.length);
    /* console.log({
      totalRateValue,
      length: props.ratings.length,
      avgRating,
    }); */
    const ratings = [];
    for (let i = 1; i <= 5; i++) {
      ratings.push(
        <i
          className={i <= avgRating ? 'fa fa-star' : 'fa fa-star-o'}
        />,
      );
    }

    return (
      <span className="ps-rating">
        {ratings}
      </span>
    );
  }
}

export default Rating;

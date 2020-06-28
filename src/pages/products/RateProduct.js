import React from 'react';
import { alert } from '../../lib/js';

class RateProduct extends React.Component {
  constructor(props) {
    super(props);

    // Register user old rating
    let rating = 0;
    for (rating of props.product.ratings) {
      if (rating.userId === props.sessionUser.id) {
        rating = rating.rating;
      }
    }

    this.state = {
      rating,
    };

    this.rateProduct = this.rateProduct.bind(this);
  }

  rateProduct(rating) {
    const { props } = this;
    const { product, fetchRequest } = props;
    this.setState(() => ({ rating }));
    fetchRequest({
      url: `${process.env.REACT_APP_API}/products/${product.id}/ratings`,
      method: 'POST',
      body: JSON.stringify({
        rating,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (this._isMounted) {
        alert('Rating succesfullhy created', '', [{ text: 'ok' }]);
      }
      props.updateProduct({ ratings: res.ratings });
    });
  }

  render() {
    console.log('THE RATING IS : ', this.props);
    return (
      <div id="rateProduct">
        <p>Rate this product</p>
        <span className="ps-rating">
          {(() => {
            const ratings = [];
            for (let i = 1; i <= 5; i++) {
              ratings.push(
                <i
                  className={i <= this.state.rating ? 'fa fa-star' : 'fa fa-star-o'}
                  onClick={() => { this.rateProduct(i); }}
                />,
              );
            }

            return ratings;
          })()}
        </span>
      </div>
    );
  }
}

export default RateProduct;

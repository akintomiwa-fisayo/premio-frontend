import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeHeader, resetHeader } from '../../store/setting/action';
import SearchBar from '../../components/shared/SearchBar';
import { getRelativeTime, stringSimilarity } from '../../lib/js';


class Purchases extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: false,
    };

    this.getPurchases = this.getPurchases.bind(this);
  }

  componentDidMount() {
    this.props.onComponentMount();
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: 'My purchases',
      onGoBack: () => {
        this.props.history.goBack();
      },
    }));
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
  }

  getPurchases(query) {
    const { props, state } = this;
    const { loading } = state;
    const { sessionUser, purchases } = props;
    const { products } = purchases;
    let searchResult = [];
    // const query = this.parseQueryString(this.props.location.search);

    if (query) {
      for (let i = 0; i < products.length; i += 1) {
        products[i].score = stringSimilarity(query, `${products[i].title} ${products[i].description}`);
      }

      products.sort((a, b) => {
        const scoreA = a.score;
        const scoreB = b.score;

        if (scoreA < scoreB) {
          return 1;
        }
        if (scoreA > scoreB) {
          return -1;
        }
        return 0;
      });

      searchResult = [];
      products.forEach((user) => {
        if (user.score > 0) {
          searchResult.push(user);
        }
      });
      console.log('products AFTER SORT IS', products);
    } else {
      searchResult = products;
    }

    this.setState({ searchResult });
  }

  render() {
    const { header, purchases, setting } = this.props;
    const { products } = purchases;
    const { searchResult } = this.state;
    const products_ = searchResult !== false ? searchResult : products;

    return (
      <div id="myPurchases">
        <div className="ps-shopping__header" style={{ top: `${setting.header.height}px` }}>
          <SearchBar
            placeholder="Search by keyword"
            onChange={(query) => {
              this.getPurchases(query);
            }}
          />
        </div>

        <div className="ps-cart__content">
          {(() => {
            if (products.length === 0) {
              return <p className="page-empty-msg">You are yet to purchase any product</p>;
            }

            return products_.map((product) => (
              <Link to={`/purchases/${product.id}`} className="ps-product--cart-mobile" key={product.id}>
                <div className="ps-product__thumbnail">
                  <div>
                    <img src={product.thumbnail} alt="martfury" />
                  </div>
                </div>
                <div className="ps-product__content">
                  <div className="ps-product__title"> {product.title} </div>
                  <Link to={`/account/${product.vendor.id}`} className="vendor">
                    <strong>Vendor:</strong> {product.vendor.companyName}
                  </Link>
                  <p className="purchased-on">
                    <span>Purchased:</span> {getRelativeTime(product.purchasedOn, 'number')}
                  </p>
                </div>
              </Link>
            ));
          })()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  purchases: state.purchases,
});
export default connect(mapStateToProps)(Purchases);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/shared/SearchBar';
import { setViewProduct } from '../../store/myProducts/action';
import { ucFirst, stringSimilarity } from '../../lib/js';
import myProducts from '../../tasks/myProducts';


class ViewMyProducts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: false,
    };

    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.props.onComponentMount();
    this.props.changeHeader({
      type: 'goBack',
      label: 'My products',
      onGoBack: () => {
        this.props.history.goBack();
      },
    });
  }

  componentWillUnmount() {
    this.props.resetHeader();
  }

  getProducts(query) {
    const { props, state } = this;
    const { loading } = state;
    const { sessionUser, myProducts } = props;
    const { products } = myProducts;
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

  viewProduct(product) {
    const { props } = this;

    props.setViewProduct(product);
    props.history.push('/my-products/view');
  }

  render() {
    const { nav } = this.props.setting;
    const { products, loading } = this.props.myProducts;
    const { searchResult } = this.state;
    const products_ = searchResult !== false ? searchResult : products;
    return (
      <div id="myProducts">
        <div className="ps-shopping__header">
          <SearchBar
            placeholder="Search by keyword"
            onChange={(query) => {
              this.getProducts(query);
            }}
          />
        </div>
        <div className="ps-cart__content">
          {(() => {
            if (loading) {
              return <p className="page-loader" />;
            }

            if (products.length === 0) {
              return <p>there are no items in your products</p>;
            }

            return products_.map((product) => (
              <div
                className="ps-product--cart-mobile"
                onClick={() => { this.viewProduct(product); }}
                key={product.id}
              >
                <div className="ps-product__thumbnail">
                  <div>
                    <img src={product.thumbnail} alt="martfury" />
                  </div>
                </div>
                <div className="ps-product__content">
                  <p className="ps-product__title"> {product.title} </p>
                  <p className="description">{ucFirst(product.description)}</p>
                </div>
              </div>
            ));
          }
          )()}
        </div>
        <div
          id="submiNewProduct"
          style={{ bottom: `calc(1em + ${nav.height}px)` }}
        >
          <Link to="/my-products/view">
            <span className="icon-pencil" />
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  myProducts: state.myProducts,
});

const mapDispatchToProps = (dispatch) => ({
  setViewProduct: (props) => dispatch(setViewProduct(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewMyProducts);

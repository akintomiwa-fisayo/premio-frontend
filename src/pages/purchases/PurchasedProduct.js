/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRelativeTime, formatBytes } from '../../lib/js';

class ProductInformations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullScreen: false,
    };
  }

  componentDidMount() {
    this.props.onComponentMount();
    this.props.changeHeader({
      type: 'goBack',
      label: 'Purchased Product',
      onGoBack: () => {
        this.props.history.goBack();
      },
    });
  }

  componentWillUnmount() {
    this.props.resetHeader();
  }


  render() {
    const { props } = this;

    console.log('procuases product', props);
    const { purchases, setting } = props;
    const { header, nav } = setting;
    const { productId } = props.match.params;

    let product = {};
    for (const product_ of purchases.products) {
      if (product_.id === productId) {
        product = product_;
        break;
      }
    }

    const file = (() => {
      switch (product.mime) {
        case ('image/gif'):
        case ('image/jpg'):
        case ('image/jpeg'):
        case ('image/png'):
          return (
            <img
              src={product.url}
              alt=""
            />
          );

        case ('video/mp4'):
          return <video src={product.url} controls />;

        case ('audio/mp3'):
        case ('audio/mpeg'):
          return <audio src={product.url} controls />;

        case ('application/pdf'):
          return (
            <iframe
              typeof="application/pdf"
              title="."
              src={product.url}
            />
          );

        default:
          if (product.mime) {
            return <>{product.mime} not supported</>;
          }
          return <></>;
      }
    })();


    return (
      <div id="purchasedProductDetails" className="ps-product--detail ps-product--fullwidth">
        <div id="preview">
          {file}
          <span
            className="icon-expand action"
            onClick={() => {
              this.setState({ fullScreen: true });
            }}
          />
          <span className="action">
            <Link to={`/products/${product.id}`} className="icon-exit-up" />
          </span>
        </div>
        <div id="productInfo" className="ps-product__info">
          <div className="info">
            <span className="label">Title</span>
            <p>{product.title}</p>
          </div>
          <div className="info">
            <span className="label">description</span>
            <p>{product.description}</p>
          </div>
          <div className="info">
            <span className="label">width</span>
            <p>{product.metas.width}px</p>
          </div>
          <div className="info">
            <span className="label">height</span>
            <p>{product.metas.height}px</p>
          </div>
          <div className="info">
            <span className="label">size</span>
            <p>{formatBytes(product.metas.size)}</p>
          </div>
          <div className="info">
            <span className="label">vendor</span>
            <p>
              <Link to={`/account/${product.vendor.id}`} className="ml-2 text-capitalize">{product.vendor.companyName} </Link>
            </p>
          </div>
          <div className="info">
            <span className="label">Purchased</span>
            <p>{getRelativeTime(product.purchasedOn, 'number')}</p>
          </div>
        </div>
        {this.state.fullScreen ? (
          <div
            id="fullScreenPreview"
            style={{
              top: `${header.height}px`,
              height: `calc(100vh - ${header.height + nav.height}px)`,
            }}
          >
            {file}
            <span
              className="icon-cross action"
              onClick={() => {
                this.setState({ fullScreen: false });
              }}
            />
          </div>
        ) : ''}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  purchases: state.purchases,
});

export default connect(mapStateToProps)(ProductInformations);

import React, { Component } from 'react';
import { addItem } from '../../../../../store/cart/action';
import { addItemToCompare } from '../../../../../store/compare/action';
import { addItemToWishlist } from '../../../../../store/wishlist/action';
import { connect } from 'react-redux';
import Rating from '../../../Rating';
import { NavLink } from 'react-router-dom';

class InformationAffiliate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
        };
    }

    handleAddItemToCart = e => {
        e.preventDefault();
        const { product } = this.props;
        let tempProduct = product;
        tempProduct.quantity = this.state.quantity;
        this.props.dispatch(addItem(product));
    };

    handleAddItemToCompare = e => {
        e.preventDefault();
        const { product } = this.props;
        this.props.dispatch(addItemToCompare(product));
    };

    handleAddItemToWishlist = e => {
        e.preventDefault();
        const { product } = this.props;
        this.props.dispatch(addItemToWishlist(product));
    };

    handleIncreaseItemQty = e => {
        e.preventDefault();
        this.setState({ quantity: this.state.quantity + 1 });
    };

    handleDecreaseItemQty = e => {
        e.preventDefault();
        if (this.state.quantity > 1) {
            this.setState({ quantity: this.state.quantity - 1 });
        }
    };

    render() {
        const { product, currency } = this.props;

        return (
            <div className="ps-product__info">
                <h1>{product.title}</h1>
                <div className="ps-product__meta">
                    <p>
                        Brand:
                        <NavLink to="/shop" className="ml-2 text-capitalize">{product.vendor} </NavLink>
                    </p>
                    <div className="ps-product__rating">
                        <Rating />
                        <span>(1 review)</span>
                    </div>
                </div>
                {product.sale === true ? (
                    <h4 className="ps-product__price sale">
                        <del className="mr-2">
                            {currency ? currency.symbol : '$'}
                            {product.salePrice}
                        </del>
                        {currency ? currency.symbol : '$'}
                        {product.price}
                    </h4>
                ) : (
                    <h4 className="ps-product__price">
                        {currency ? currency.symbol : '$'}
                        {product.price}
                    </h4>
                )}
                <div className="ps-product__desc">
                    <p>
                        Sold By:
                        <NavLink to="/shop">
                            <strong> {product.vendor}</strong>
                        </NavLink>
                    </p>
                    <ul className="ps-list--dot">
                        <li>
                            {' '}
                            Unrestrained and portable active stereo speaker
                        </li>
                        <li> Free from the confines of wires and chords</li>
                        <li> 20 hours of portable capabilities</li>
                        <li>
                            {' '}
                            Double-ended Coil Cord with 3.5mm Stereo Plugs
                            Included
                        </li>
                        <li> 3/4″ Dome Tweeters: 2X and 4″ Woofer: 1X</li>
                    </ul>
                </div>
                <div className="ps-product__shopping">
                    <a
                        className="ps-btn"
                        href="https://www.amazon.com/Premium-Military-Sunglasses-Polarized-protection/dp/B01GVRZ1BS/"
                        target="_blank">
                        Purchase on Amazon
                    </a>
                    <div className="ps-product__actions">
                        <a
                            href="#"
                            onClick={this.handleAddItemToWishlist.bind(this)}>
                            <i className="icon-heart"></i>
                        </a>
                        <a
                            href="#"
                            onClick={this.handleAddItemToCompare.bind(this)}>
                            <i className="icon-chart-bars"></i>
                        </a>
                    </div>
                </div>
                <div className="ps-product__specification">
                    <NavLink to="/page/blank" className="report">Report Abuse </NavLink>
                    <p>
                        <strong>SKU:</strong> SF1133569600-1
                    </p>
                    <p className="categories">
                        <strong> Categories:</strong>
                        <NavLink to="/shop"> Consumer Electronics </NavLink>
                        <NavLink to="/shop"> Refrigerator </NavLink>
                        <NavLink to="/shop"> Babies & Moms </NavLink>
                    </p>
                    <p className="tags">
                        <strong> Tags</strong>
                        <NavLink to="/shop"> sofa </NavLink>
                        <NavLink to="/shop">technologies </NavLink>
                        <NavLink to="/shop"> wireless </NavLink>
                    </p>
                </div>
                <div className="ps-product__sharing">
                    <a className="facebook" href="#">
                        <i className="fa fa-facebook"></i>
                    </a>
                    <a className="twitter" href="#">
                        <i className="fa fa-twitter"></i>
                    </a>
                    <a className="google" href="#">
                        <i className="fa fa-google-plus"></i>
                    </a>
                    <a className="linkedin" href="#">
                        <i className="fa fa-linkedin"></i>
                    </a>
                    <a className="instagram" href="#">
                        <i className="fa fa-instagram"></i>
                    </a>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return state.setting;
};
export default connect(mapStateToProps)(InformationAffiliate);

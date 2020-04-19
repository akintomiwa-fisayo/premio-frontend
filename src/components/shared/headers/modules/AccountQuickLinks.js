import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../../../store/auth/action';
import { NavLink } from 'react-router-dom';
class AccountQuickLinks extends Component {
    constructor(props) {
        super(props);
    }

    handleLogout = e => {
        e.preventDefault();
        this.props.dispatch(logOut());
    };

    render() {
        const accountLinks = [
            {
                text: 'Account Information',
                url: '/account/user-information',
            },
            {
                text: 'Notifications',
                url: '/account/notifications',
            },
            {
                text: 'Invoices',
                url: '/account/invoices',
            },
            {
                text: 'Address',
                url: '/account/addresses',
            },
            {
                text: 'Recent Viewed Product',
                url: '/account/recent-viewed-product',
            },
            {
                text: 'Wishlist',
                url: '/account/wishlist',
            },
        ];
        const { isLoggedIn } = this.props;
        if (isLoggedIn === true) {
            return (
                <div className="ps-block--user-account">
                    <i className="icon-user"></i>
                    <div className="ps-block__content">
                        <ul className="ps-list--arrow">
                            {accountLinks.map(link => (
                                <li key={link.text}>
                                    <NavLink to={link.url}>
                                        {link.text}
                                    </NavLink>
                                </li>
                            ))}
                            <li className="ps-block__footer">
                                <a
                                    href="#"
                                    onClick={this.handleLogout.bind(this)}>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="ps-block--user-header">
                    <div className="ps-block__left">
                        <i className="icon-user"></i>
                    </div>
                    <div className="ps-block__right">   
                        <NavLink to="/account/login">
                            Login
                        </NavLink>
                        <NavLink to="/account/register">
                            Register
                        </NavLink>
                    </div>
                </div>
            );
        }
    }
}
const mapStateToProps = state => {
    return state;
};
export default connect(mapStateToProps)(AccountQuickLinks);

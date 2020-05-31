import React from 'react';
import { Link } from 'react-router-dom';
import HomeBanner from './HomeBanner';
import user2 from '../../public/static/img/users/1.jpg';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vendors: [
        {
          id: '122332',
          displayImage: user2,
          firstName: 'Akintomiwa',
          lastName: 'fisayo',
          description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't",
          productsCount: 95,
        },
        {
          id: '12232',
          displayImage: user2,
          firstName: 'bamgboye',
          lastName: 'samuel',
          description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't",
          productsCount: 20,
        },
        {
          id: '122',
          displayImage: user2,
          firstName: 'mr',
          lastName: 'shola',
          description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't",
          productsCount: 129,
        },
      ],
      loading: true,
    };

    this._isMounted = false;
    this.getVendors = this.getVendors.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    // this.getVendors();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getVendors() {
    const { props } = this;
    const { state } = this;

    if (!state.loading) {
      props.fetchRequest({
        url: `${process.env.REACT_APP_API}/vendors`,
        method: 'POST',
      }).then((vendors) => {
        if (this._isMounted) {
          this.setState(() => ({ vendors }));
        }
      }).catch(() => {
        if (this._isMounted) {
          alert(
            '',
            'Error connecting to server, please try again',
            [{
              text: 'ok',
            }],
          );
        }
      });
    }
  }

  render() {
    const { vendors } = this.state;
    return (
      <section id="homeComp">
        <p className="header">Vendors</p>
        <HomeBanner />
        <div id="vendors">
          {
            vendors.map((vendor) => (
              <Link to="/account/client?user=other&type=vendor" className="vendor">
                <div className="avi">
                  <div className="holder">
                    <img src={vendor.displayImage} alt="" />
                  </div>
                </div>

                <div className="holder">
                  <div className="details">
                    <p className="name">{vendor.firstName} {vendor.lastName}</p>
                    <p className="description">{vendor.description}</p>
                    <p className="products">{vendor.productsCount} Products</p>
                  </div>
                  <button type="button" className="btn btn-glass" />
                </div>
              </Link>
            ))
          }
        </div>
      </section>
    );
  }
}
export default Home;

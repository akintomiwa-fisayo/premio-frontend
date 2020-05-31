import React, { Component } from 'react';
import { Tabs, Badge } from 'antd-mobile';
import { connect } from 'react-redux';
import { changeHeader, resetHeader } from '../../store/setting/action';
import user3 from '../../public/static/img/users/3.jpg';
import user1 from '../../public/static/img/users/1.jpg';
import { parseQueryString } from '../../lib/js';
import { onSale } from '../../public/static/data/product';
import Product from '../products/Product';

class ViewAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: false,
    };

    this.getContent = this.getContent.bind(this);
  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    console.log('this props here is:', this.props);
    if (userId === 'client') {
      // alert('so wew true');
      this.setState(() => ({ client: true }));
    }
    this.props.dispatch(changeHeader({
      type: 'goBack',
      label: 'Account',
      onGoBack: () => {
        this.props.history.goBack();
      },
    }));
  }

  componentWillUnmount() {
    this.props.dispatch(resetHeader());
  }

  // eslint-disable-next-line class-methods-use-this
  getContent(query) {
    const tabs = [
      { title: 'Details' },
    ];

    const userDetails = (
      <div id="userDetails">
        <div className="user-detail">
          <p className="label">first name</p>
          <p className="detail">akintomiwa</p>
        </div>

        <div className="user-detail">
          <p className="label">last name</p>
          <p className="detail">fisayo</p>
        </div>

        <div className="user-detail">
          <p className="label">email</p>
          <p className="detail">akintomiwa.fisayo@gmail.com</p>
        </div>

        <div className="user-detail">
          <p className="label">mobile number</p>
          <p className="detail">090734878478</p>
        </div>

        <div className="user-detail">
          <p className="label">city</p>
          <p className="detail">city</p>
        </div>

        <div className="user-detail">
          <p className="label">state</p>
          <p className="detail">state</p>
        </div>

        <div className="user-detail">
          <p className="label">country</p>
          <p className="detail">country</p>
        </div>
      </div>
    );

    if (query.type === 'customer') {
      return (
        <>
          <div className="actions">
            <button
              type="button"
              className="btn btn-glass"
              onClick={this.becomeVendor}
            >Message
            </button>
          </div>

          <Tabs
            tabs={tabs}
            initialPage={0}
            className="ps-widget__content"
            class="ps-widget__content"
            onChange={(tab, index) => { console.log('onChange', index, tab); }}
            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
          >
            <>
              {userDetails}
            </>

            <>
              <div className="products-preview">
                {onSale.map((product) => (
                  <Product
                    product={product}
                    key={product.title}
                  />
                ))}
              </div>
            </>
          </Tabs>
        </>
      );
    }


    tabs.push({ title: 'Products' });
    return (
      <>
        <p>
        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
        </p>

        <div className="actions">
          <button
            type="button"
            className="btn btn-glass"
            onClick={this.changePassword}
          >UnFollow
          </button>

          <button
            type="button"
            className="btn btn-glass"
            onClick={this.becomeVendor}
          >Message
          </button>
        </div>

        <Tabs
          tabs={tabs}
          initialPage={0}
          className="ps-widget__content"
          class="ps-widget__content"
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <>
            {userDetails}
          </>

          <>
            <div className="products-preview">
              {onSale.map((product) => (
                <Product
                  product={product}
                  key={product.title}
                />
              ))}
            </div>
          </>
        </Tabs>
      </>
    );
  }

  render() {
    const { state } = this;
    const { header, nav, user } = this.props;

    const query = {
      type: 'customer',
      ...parseQueryString(this.props.location.search),
    };

    return (
      <section id="viewAccount" className="ps-page--account ps-container">
        <div className="ps-widget__header">
          <div className={`avi${query.type === 'vendor' ? ' vendor' : ''}`}>
            <img src={state.client ? user1 : user3} alt="" />
          </div>
          <div className="user-name">Akintomiwa fisayo</div>
          <div className="user-handle">(@AkintomiwaF)</div>

        </div>

        {this.getContent(query)}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.setting,
  ...state.auth,
});

export default connect(mapStateToProps)(ViewAccount);

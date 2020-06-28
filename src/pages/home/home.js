import React from 'react';
import { connect } from 'react-redux';
import HomeBanner from './HomeBanner';
import { setInfo } from '../../store/home/action';
import { ucFirst, alert } from '../../lib/js';
import Vendor from './Vendor';
import loader from '../../public/static/loading.gif';


class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onComponentMount();
  }

  render() {
    const { vendors, loading } = this.props.home;
    return (
      <section id="homeComp">
        <p className="header">Vendors</p>
        <HomeBanner />
        {loading
          ? <p className="page-loader" />
          : (
            <div id="vendors">
              {vendors.map((vendor) => (
                <Vendor {...this.props} vendor={vendor} />
              ))}
            </div>
          )}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  home: state.home,
});

const mapDispatchToProps = (dispatch) => ({
  setInfo: (props) => dispatch(setInfo(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);

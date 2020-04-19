import React from 'react';
import HomeBanner from '../components/partials/homepage/home-default/HomeBanner';
import HomeProductsPreview from '../components/partials/homepage/home-default/HomeProductsPreview';
import { resetHeader, resetNav } from '../store/setting/action';

class Home extends React.Component {
  componentDidMount() {
    this.props.dispatch(resetHeader());
    this.props.dispatch(resetNav());
  }

  render() {
    return (
      <>
        <HomeBanner />
        <HomeProductsPreview title="Images" />
        <HomeProductsPreview title="Videos" />
        <HomeProductsPreview title="PDFs" />
        <div className="ps-container">
          <button type="button" className="btn btn-glass">View All Products</button>
        </div>

      </>
    );
  }
}
export default Home;

import React from 'react';
import HomeBanner from '../components/partials/homepage/home-default/HomeBanner';
import HomeProductsPreview from '../components/partials/homepage/home-default/HomeProductsPreview';

class Home extends React.Component {
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

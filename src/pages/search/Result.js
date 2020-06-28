import React from 'react';
import Product from '../products/Product';


class SearchResult extends React.Component {
  render() {
    const { props } = this;
    console.log('result props', props);
    const { products, loading, sort } = props.search;

    if (loading) {
      return (
        <div className="page-loader block" />
      );
    }

    if (!products) {
      return (
        <div className="page-empty-msg block">Input your search term</div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="page-empty-msg block"> There is no result found for this search term </div>
      );
    }

    if (sort === 'sortByDateDesc') {
      products.sort((a, b) => {
        const dateA = a.createdOn;
        const dateB = b.createdOn;

        if (dateA < dateB) {
          return -1;
        }
        if (dateA > dateB) {
          return 1;
        }
        return 0;
      });
    } else if (sort === 'sortByDateAsc') {
      products.sort((a, b) => {
        const dateA = a.createdOn;
        const dateB = b.createdOn;

        if (dateA < dateB) {
          return 1;
        }

        if (dateA > dateB) {
          return -1;
        }
        return 0;
      });
    } else if (sort === 'sortByPriceDesc') {
      products.sort((a, b) => {
        console.log({ a, b });
        const priceA = a.price;
        const priceB = b.price;

        if (priceA < priceB) {
          return -1;
        }
        if (priceA > priceB) {
          return 1;
        }
        return 0;
      });
    } else if (sort === 'sortByPriceAsc') {
      products.sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;
        console.log({ a, b });

        if (priceA < priceB) {
          return 1;
        }

        if (priceA > priceB) {
          return -1;
        }
        return 0;
      });
    }

    return (
      products.map((item) => (
        <Product
          product={item}
          key={item.id}
        />
      ))
    );
  }
}


export default SearchResult;

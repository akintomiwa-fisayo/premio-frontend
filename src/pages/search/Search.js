import React from 'react';
import { connect } from 'react-redux';

import {
  setInfo,
} from '../../store/search/action';
import { changeHeader, resetHeader } from '../../store/setting/action';
import SearchBar from '../../components/shared/SearchBar';
import Filter from './Filter';
import Result from './Result';


class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
    };

    this._isMounted = false;
    this.parseQueryString = this.parseQueryString.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.toogleShowFilter = this.toogleShowFilter.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.props.onComponentMount();
    this.props.changeHeader({
      type: 'goBack',
      label: 'search',
      onGoBack: () => {
        this.props.history.goBack();
      },
    });

    const query = this.props.match.params.query || false;
    this.setState({ query: query || '' });
    if (query !== false) this.getProducts(query);
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.props.resetHeader();
  }

  getProducts(searchQuery) {
    const { props } = this;
    const { loading } = props.search;
    // const query = this.parseQueryString(this.props.location.search);

    if (!loading) {
      props.setInfo({ loading: true });
      this.props.changeHeader({
        label: searchQuery,
      });
      props.fetchRequest({
        url: `${process.env.REACT_APP_API}/products?q=${searchQuery}`,
        method: 'GET',
      }).then((products) => {
        if (this._isMounted) {
          props.setInfo({
            products,
            loading: false,
          });
        }
      });
    }
  }

  parseQueryString(query) {
    const t = this;
    const obj = {};
    let values = query.split('?');
    if (values[1]) {
      values = values[1].split('&');
      values.forEach((value) => {
        const foo = value.split('=');
        obj[foo[0]] = foo[1];
      });
    }
    return obj;
  }

  toogleShowFilter() {
    const { props } = this;
    const { showFilter } = props.search;
    props.setInfo({ showFilter: !showFilter });
  }

  render() {
    const { props } = this;
    const { listView } = props.search;

    return (
      <div className="ps-page--shop" id="shop-sidebar">
        <div className="ps-shopping">
          <div className="ps-shopping__header">
            <div id="searchBox">
              <div
                id="filterCntrl"
                className="icon-menu"
                onClick={this.toogleShowFilter}
              />
              <SearchBar
                {...props}
                value={this.state.query}
                onChange={(query) => {
                  this.setState({ query });
                }}

                onEnter={(searchQuery) => {
                  this.getProducts(searchQuery);
                }}
              />
            </div>
            <Filter {...props} />
          </div>
          <div className={`ps-shopping__content products-preview${listView !== true ? ' grid-1' : ''}`}>
            <Result {...props} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  search: state.search,
});

const mapDispatchToProps = (dispatch) => ({
  setInfo: (products) => dispatch(setInfo(products)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);

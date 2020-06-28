import React from 'react';

class SearchFilter extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeViewMode = this.handleChangeViewMode.bind(this);
  }

  handleChangeViewMode() {
    const { props } = this;
    const { listView } = props.search;
    props.setInfo({ listView: !listView });
  }

  render() {
    const { props } = this;
    const { listView, showFilter, sort } = props.search;

    return (
      <div id="searchFilter" style={{ display: showFilter ? '' : 'none' }}>
        <select
          className="ps-select"
          defaultValue="sortByDateDesc"
          value={sort}
          onChange={(e) => {
            const sort = e.target.value;
            props.setInfo({ sort });
          }}
        >
          <option value="sortByDateDesc">Sort by date: Descendingly</option>
          <option value="sortByDateAsc">Sort by date: Ascendingly</option>
          <option value="sortByPriceDesc">Sort by price: Descendingly</option>
          <option value="sortByPriceAsc">Sort by price: Ascendingly</option>
        </select>
        <div className="ps-shopping__view">
          <ul className="ps-tab-list">
            <li className={listView === true ? 'active' : ''}>
              <span onClick={this.handleChangeViewMode}>
                <i className="icon-grid" />
              </span>
            </li>
            <li className={listView !== true ? 'active' : ''}>
              <span onClick={this.handleChangeViewMode}>
                <i className="icon-list4" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SearchFilter;

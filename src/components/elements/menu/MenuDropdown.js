import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class MenuDropdown extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { menuData } = this.props;
    return (
      <li className={menuData.subMenu ? 'menu-item-has-children dropdown' : ''}>
        {/* <NavLink to={menuData.url} as={menuData.url}>
                    {menuData.text}
                </NavLink> */}
        {menuData.type === 'dynamic' ? (
          <NavLink to={`${menuData.url}/[pid]`} as={`${menuData.url}/${menuData.endPoint}`}>
            {menuData.text}
          </NavLink>
        ) : (
          <NavLink to={menuData.url} as={menuData.alias}>
            {menuData.text}
          </NavLink>
        )}
        {menuData.subMenu ? (
          <ul className={menuData.subClass}>
            {menuData.subMenu.map((subMenuItem, index) => (
              <MenuDropdown menuData={subMenuItem} key={index} />
            ))}
          </ul>
        ) : (
          ''
        )}
      </li>
    );
  }
}

export default MenuDropdown;

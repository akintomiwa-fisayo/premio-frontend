import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { menuData } = this.props;
    return (
      <li className={menuData.megaContent ? 'menu-item-has-children has-mega-menu' : ''}>
        {menuData.type === 'dynamic' ? (
          <NavLink to={`${menuData.url}/${menuData.endPoint}`}>
            {menuData.text}
          </NavLink>
        ) : (
          <NavLink to={menuData.url}>
            {menuData.text}
          </NavLink>
        )}
        <div className="mega-menu">
          {menuData
            && menuData.megaContent.map((megaItem) => (
              <div className="mega-menu__column" key={megaItem.heading}>
                <h4>{megaItem.heading}</h4>
                <ul className="mega-menu__list">
                  {megaItem.megaItems.map((megaSubItem) => (
                    <li key={megaSubItem.text}>
                      {megaSubItem.type === 'dynamic' ? (
                        <NavLink to={`${megaSubItem.url}/${megaSubItem.endPoint}`}>
                          {megaSubItem.text}
                        </NavLink>
                      ) : (
                        <NavLink to={megaSubItem.url}>
                          {megaSubItem.text}
                        </NavLink>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </li>
    );
  }
}

export default Menu;

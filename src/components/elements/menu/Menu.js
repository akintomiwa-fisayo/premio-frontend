import React from 'react';

import { NavLink } from 'react-router-dom';
import MegaMenu from './MegaMenu';
import MenuDropdown from './MenuDropdown';

const Menu = ({ data, className }) => (
  <ul className={className}>
    {data
            && data.map((item) => {
              if (item.subMenu) {
                return <MenuDropdown menuData={item} key={item.text} />;
              } if (item.megaContent) {
                return <MegaMenu menuData={item} key={item.text} />;
              }
              return (
                <li key={item.text}>
                  {item.type === 'dynamic' ? (
                    <NavLink to={`${item.url}/${item.endPoint}`}>
                      {item.text}
                    </NavLink>
                  ) : (
                    <NavLink to={item.alias}>
                      {item.text}
                    </NavLink>
                  )}
                </li>
              );
            })}
  </ul>
);

export default Menu;

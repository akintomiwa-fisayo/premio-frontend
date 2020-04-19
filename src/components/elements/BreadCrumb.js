import React from 'react';
import { NavLink } from 'react-router-dom';

const BreadCrumb = ({ breacrumb, layout }) => (
  <div className="ps-breadcrumb">
    <div
      className={
                    layout === 'fullwidth' ? 'ps-container' : 'container'
                }
    >
      <ul className="breadcrumb">
        {breacrumb.map((item) => {
          if (!item.url) {
            return <li key={item.text}>{item.text}</li>;
          }
          return (
            <li key={item.text}>
              <NavLink to={item.url}> {item.text} </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);

export default BreadCrumb;

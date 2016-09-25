import React from 'react';
import Layout from '../stateless_layout_container';

const Column = props => (
  <Layout {...props} />
);

Column.defaultProps = {...Layout.defaultProps};
Column.defaultProps.style = {...Layout.defaultProps.style, ...{display: 'block'}};
Column.propInputs = Layout.propInputs;
Column.categories = Layout.categories;
Column.Icon = (
  <svg fill="#eee" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M2 21h19v-3H2v3zM20 8H3c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h17c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zM2 3v3h19V3H2z"/>
  </svg>
);

export default Column;

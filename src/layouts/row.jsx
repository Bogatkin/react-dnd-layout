import React from 'react';
import Layout from '../stateless_layout_container';

const Row = (props) => (
  <Layout {...props} row />
);

Row.defaultProps = Layout.defaultProps;
Row.propInputs = Layout.propInputs;

export default Row;
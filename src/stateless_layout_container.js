import Layout from './stateless_layout';
import { connect } from 'react-redux';
import { mergeItems } from './redux/utils';
import { change } from './redux/actions';
import { isEqual } from 'lodash';
import { string, number, boolean, object, array } from 'react-formulate';

const mapStateToProps = (state, props) => ({
  a: state[props.id] ? console.log(isEqual(state[props.id].props.children, props.children)) : null,
  childrenIds: state[props.id] && state[props.id].props.children,
  children: state[props.id] ? mergeItems(state, props.id) : []
});

const mapDispatchToProps = (dispatch, props) => ({
  onChange: children => dispatch(change(props.id, children))
});

const LayoutContainer = connect(mapStateToProps, mapDispatchToProps)(Layout);

LayoutContainer.defaultProps = {
  children: [],
  style: {
    flex: 1,
    display: 'flex',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    background: 'transparent',
    padding: 20,
    textAlign: 'inherit',
    color: 'inherit',
    fontSize: 16,
    textShadow: 'inherit',
    fontFamily: 'inherit'
  }
};

LayoutContainer.categories = ['layout'];

LayoutContainer.propInputs = object({
  style: object({
    display: string({label: 'Display'}),
    flex: number({label: 'Flex'}),
    background: string({label: 'Background'}),
    padding: number({label: 'Padding'}),
    color: string({label: 'Font Color'}),
    fontSize: number({label: 'Font Size'}),
    textAlign: string({label: 'Text Align'}),
    textShadow: string({label: 'Text Shadown'}),
    fontFamily: string({label: 'Font Family'}),
  }, {label: 'Style'})
});

export default LayoutContainer;

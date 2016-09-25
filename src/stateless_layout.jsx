import React, { Component } from 'react';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';
import { isEqual } from 'lodash';

import Wrapper from './wrapper';

const layoutTarget = {
  drop(props, monitor, component) {
    if (!monitor.didDrop()) {
      props.onChange(
        update(props.children , {
          $push: [monitor.getItem()]
        })
      );
      return props;
    }
  }
};

class Layout extends Component {

  shouldComponentUpdate(props, state, context) {
    if (isEqual(props.children, this.props.children)) {
      if (props.isOverCurrent === this.props.isOverCurrent && context.editable === this.context.editable) {
        return false;
      } else {
        return true;
      }
    }
    if (isEqual(props, this.props)) {
      return false;
    } else {
      return true;
    }
  }

  componentDidUpdate() {
    console.log('updated');
  }

  render() {
  const { onChange, connectDropTarget, children } = this.props;
  const { components, editable } = this.context;

  const removeItem = idx => () => {
    onChange(update(children, {$splice: [[idx, 1]]}));
  };
  const addItem = (idx, item) => {
    onChange(update(children, {$splice: [[idx, 0, item]]}));
  };
  const renderItems = children.map((item, idx) => {
    const Comp = components[item.type];
    return editable ? (
      <Wrapper
        key={item.id}
        index={idx}
        Form={Comp.propInputs}
        row={this.props.row}
        addItem={addItem}
        parentId={this.props.id}
        item={item}
        component={Comp}
        onDragStart={() => setTimeout(removeItem(idx), 50)}>
        <Comp id={item.id} {...item.props} type={item.type} />
      </Wrapper>
    ) : (
      <div key={item.id} style={{flex: item.props.style.flex, display: 'flex'}}>
        <Comp id={item.id} {...item.props} type={item.type} />
      </div>
    );
  });

  const styles = styler(this.props);

  const wrap = editable ? connectDropTarget : item => item;
  return wrap(
    <div style={styles.container}>
      {renderItems}
    </div>
  );
  }
}

// const Layout = (props, { components, editable }) => {
//   const { onChange, connectDropTarget, children } = props;
//
//   const removeItem = idx => () => {
//     onChange(update(props.children, {$splice: [[idx, 1]]}));
//   };
//   const addItem = (idx, item) => {
//     onChange(update(props.children, {$splice: [[idx, 0, item]]}));
//   };
//   const renderItems = children.map((item, idx) => {
//     const Comp = components[item.type];
//     return editable ? (
//       <Wrapper
//         key={item.id}
//         index={idx}
//         Form={Comp.propInputs}
//         row={props.row}
//         addItem={addItem}
//         parentId={props.id}
//         item={item}
//         component={Comp}
//         onDragStart={() => setTimeout(removeItem(idx), 50)}>
//         <Comp id={item.id} {...item.props} type={item.type} />
//       </Wrapper>
//     ) : (
//       <div key={item.id} style={{flex: item.props.style.flex, display: 'flex'}}>
//         <Comp id={item.id} {...item.props} type={item.type} />
//       </div>
//     );
//   });
//
//   const styles = styler(props);
//
//   const wrap = editable ? connectDropTarget : item => item;
//   return wrap(
//     <div style={styles.container}>
//       {renderItems}
//     </div>
//   );
// };

const styler = ({ row, isOverCurrent, children, style, canDrop, root }) => ({
  container: {
    ...style,
    minHeight: children.length ? null : 100,
    flexDirection: row ? 'row' : 'column',
    flexWrap: 'wrap',
    position: 'relative',
    boxSizing: 'border-box',
    padding: root ? 0 : style.padding,
    paddingBottom: canDrop && root ? 40 : root ? 0 : style.padding,
    background: isOverCurrent && canDrop ? 'rgba(53,181,229, 0.3)' : style.background,
    // background: '#333'
  },
});

Layout.contextTypes = {
  components: React.PropTypes.object,
  editable: React.PropTypes.bool
};


const LayoutContainer = DropTarget('COMPONENT', layoutTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({shallow: true}),
  canDrop: monitor.canDrop()
}))(Layout);

LayoutContainer.defaultProps = {
  children: [],
  onChange: children => {}
};

export default LayoutContainer;

import React from 'react';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';

import Wrapper from './wrapper';

const layoutTarget = {
  drop(props, monitor, component) {
    if (!monitor.didDrop()) {
      console.log(monitor.getItem());
      props.onChange(
        update(props.items, {
          $splice: [
            [0,0,monitor.getItem()]
          ]
        })
      );
      return props;
    }
  }
};

const Layout = (props, { components }) => {
  const { onChange, connectDropTarget, items } = props;

  const removeItem = idx => () => {
    onChange(update(props.items, {$splice: [[idx, 1]]}));
  };
  // console.log(items);
  const renderItems = items.map((item, idx) => {
    const Comp = components[item.type];
    return (
      <Wrapper
        key={item.id}
        onDragStart={() => setTimeout(removeItem(idx), 50)}>
        <Comp id={item.id} {...item.props}/>
      </Wrapper>
    );
  });

  const styles = style(props);

  return connectDropTarget(
    <div style={styles.container}>
      {renderItems}
    </div>
  );
};

const style = ({ row, isOverCurrent, items }) => ({
  container: {
    minHeight: items.length ? null : 75,
    height: '100%',
    padding: 5,
    display: row ? 'flex' : 'block',
    flexWrap: 'wrap',
    background: isOverCurrent ? '#35b5e5' : '#333',
    // background: '#333'
  },
});

Layout.contextTypes = {
  components: React.PropTypes.object
};


const LayoutContainer = DropTarget('COMPONENT', layoutTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOverCurrent: monitor.isOver({shallow: true})
}))(Layout);

LayoutContainer.defaultProps = {
  items: [],
  onChange: items => console.log(items)
};

export default LayoutContainer;
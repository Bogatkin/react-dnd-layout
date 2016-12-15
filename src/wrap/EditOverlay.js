import React from 'react';
import { DropTarget } from 'react-dnd';

const overlayTarget = {
  drop(props, monitor) {
    if (!monitor.didDrop()) {
      console.log('dropped');
    }
  }
};

const EditOverlay = ({ item, onRemove, isHovered, isOver, connectDropTarget, children }) => {

  let styles = styleFunc({ isOver: isOver || isHovered });

  // return connectDropTarget(isOver || isHovered ? (
  //     <div style={styles.container}>
  //       <div style={styles.overlay} />
  //       <div style={styles.remove} onClick={onRemove}>&#x274c;</div>
  //       <div style={styles.handle}>{item.type}</div>
  //     </div>
  //   ) : (
  //     <div style={styles.container}>
  //       <div style={styles.overlay} />
  //     </div>
  //   )
  // );
  return connectDropTarget(
      <div style={styles.container}>
        <div style={styles.overlay} />
        <div style={styles.remove} onClick={onRemove}>&#x274c;</div>
        <div style={styles.handle}>{item.type}</div>
      </div>
    );
};

const buttonStyle = {
  zIndex: 3,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  top: -10,
  minWidth: 20,
  height: 20,
  borderRadius: 5,
  backgroundColor: '#aaa',
  color: '#eee',
};

const styleFunc = ({ isOver }) => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
  },
  overlay: {
    zIndex: 2,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    border: isOver ? '1px solid #aaa' : '1px solid #eee'
  },
  handle: {
    ...buttonStyle,
    left: '50%',
    transform: 'translateX(-50%)',
    cursor: 'move',
    display: isOver ? 'auto' : 'none'
  },
  remove: {
    ...buttonStyle,
    right: -10,
    display: isOver ? 'auto' : 'none'
  }
});

export default DropTarget('Component', overlayTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(EditOverlay);

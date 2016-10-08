import Item from './Item.js';
import { Map, fromJS } from 'immutable';

const LayoutState = () => {};

const RootItem = new Item({type: 'Column', id: 'root', props: fromJS({children: []})});

LayoutState.createEmpty = () => Map({
  root: RootItem
});

export default LayoutState;

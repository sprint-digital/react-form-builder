/**
  * <Preview />
  */

import React from 'react';
import update from 'immutability-helper';
import store from './stores/store';
import FormElementsEdit from './form-dynamic-edit';
import SortableFormElements from './sortable-form-elements';
import CustomDragLayer from './form-elements/component-drag-layer';
import ID from './UUID';

const { PlaceHolder } = SortableFormElements;

export default class Preview extends React.Component {
  state = {
    data: [],
    answer_data: {},
  };

  constructor(props) {
    super(props);

    const { onLoad, onPost } = props;
    store.setExternalHandler(onLoad, onPost);

    this.editForm = React.createRef();
    this.state = {
      data: props.data || [],
      answer_data: {},
    };
    this.seq = 0;

    this._onUpdate = this._onChange.bind(this);
    this.getDataById = this.getDataById.bind(this);
    this.moveCard = this.moveCard.bind(this);
    this.insertCard = this.insertCard.bind(this);
    this.setAsChild = this.setAsChild.bind(this);
    this.removeChild = this.removeChild.bind(this);
    this._onDestroy = this._onDestroy.bind(this);
    this.duplicateCard = this.duplicateCard.bind(this);
  }

  componentDidMount() {
    const { data, url, saveUrl, saveAlways } = this.props;
    store.subscribe(state => this._onUpdate(state.data));
    store.dispatch('load', { loadUrl: url, saveUrl, data: data || [], saveAlways });
    document.addEventListener('mousedown', this.editModeOff);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.editModeOff);
  }

  editModeOff = (e) => {
    if (this.editForm.current && !this.editForm.current.contains(e.target)) {
      this.manualEditModeOff();
    }
  }

  manualEditModeOff = () => {
    const { editElement } = this.props;
    if (editElement && editElement.dirty) {
      editElement.dirty = false;
      this.updateElement(editElement);
    }
    this.props.manualEditModeOff();
  }

  _setValue(text) {
    return text.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
  }

  updateElement(element) {
    const { data } = this.state;
    let found = false;

    for (let i = 0, len = data.length; i < len; i++) {
      if (element.id === data[i].id) {
        data[i] = element;
        found = true;
        break;
      }
    }

    if (found) {
      this.seq = this.seq > 100000 ? 0 : this.seq + 1;
      store.dispatch('updateOrder', data);
    }
  }

  _onChange(data) {
    const answer_data = {};

    data.forEach((item) => {
      if (item && item.readOnly && item.variableKey && this.props.variables[item.variableKey]) {
        answer_data[item.field_name] = this.props.variables[item.variableKey];
      }
    });

    this.setState({
      data,
      answer_data,
    });
  }

  _onDestroy(item) {
    if (item.childItems) {
      item.childItems.forEach(x => {
        const child = this.getDataById(x);
        if (child) {
          store.dispatch('delete', child);
        }
      });
    }
    store.dispatch('delete', item);
  }

  getDataById(id) {
    const { data } = this.state;
    return data.find(x => x && x.id === id);
  }

  swapChildren(data, item, child, col) {
    if (child.col !== undefined && item.id !== child.parentId) {
      return false;
    }
    if (!(child.col !== undefined && child.col !== col && item.childItems[col])) {
      // No child was assigned yet in both source and target.
      return false;
    }
    const oldId = item.childItems[col];
    const oldItem = this.getDataById(oldId);
    const oldCol = child.col;
    // eslint-disable-next-line no-param-reassign
    item.childItems[oldCol] = oldId; oldItem.col = oldCol;
    // eslint-disable-next-line no-param-reassign
    item.childItems[col] = child.id; child.col = col;
    store.dispatch('updateOrder', data);
    return true;
  }

  setAsChild(item, child, col, isBusy) {
    const { data } = this.state;
    if (this.swapChildren(data, item, child, col)) {
      return;
    } if (isBusy) {
      return;
    }
    const oldParent = this.getDataById(child.parentId);
    const oldCol = child.col;
    // eslint-disable-next-line no-param-reassign
    item.childItems[col] = child.id; child.col = col;
    // eslint-disable-next-line no-param-reassign
    child.parentId = item.id;
    // eslint-disable-next-line no-param-reassign
    child.parentIndex = data.indexOf(item);
    if (oldParent) {
      oldParent.childItems[oldCol] = null;
    }
    const list = data.filter(x => x && x.parentId === item.id);
    const toRemove = list.filter(x => item.childItems.indexOf(x.id) === -1);
    let newData = data;
    if (toRemove.length) {
      // console.log('toRemove', toRemove);
      newData = data.filter(x => toRemove.indexOf(x) === -1);
    }
    if (!this.getDataById(child.id)) {
      newData.push(child);
    }
    store.dispatch('updateOrder', newData);
  }

  removeChild(item, col) {
    const { data } = this.state;
    const oldId = item.childItems[col];
    const oldItem = this.getDataById(oldId);
    if (oldItem) {
      const newData = data.filter(x => x !== oldItem);
      // eslint-disable-next-line no-param-reassign
      item.childItems[col] = null;
      // delete oldItem.parentId;
      this.seq = this.seq > 100000 ? 0 : this.seq + 1;
      store.dispatch('updateOrder', newData);
      this.setState({ data: newData });
    }
  }

  restoreCard(item, id) {
    const { data } = this.state;
    const parent = this.getDataById(item.data.parentId);
    const oldItem = this.getDataById(id);
    if (parent && oldItem) {
      const newIndex = data.indexOf(oldItem);
      const newData = [...data]; // data.filter(x => x !== oldItem);
      // eslint-disable-next-line no-param-reassign
      parent.childItems[oldItem.col] = null;
      delete oldItem.parentId;
      // eslint-disable-next-line no-param-reassign
      delete item.setAsChild;
      // eslint-disable-next-line no-param-reassign
      delete item.parentIndex;
      // eslint-disable-next-line no-param-reassign
      item.index = newIndex;
      this.seq = this.seq > 100000 ? 0 : this.seq + 1;
      store.dispatch('updateOrder', newData);
      this.setState({ data: newData });
    }
  }

  insertCard(item, hoverIndex, id) {
    const { data } = this.state;
    if (id) {
      this.restoreCard(item, id);
    } else {
      data.splice(hoverIndex, 0, item);
      this.saveData(item, hoverIndex, hoverIndex);
      store.dispatch('insertItem', item);
    }
  }

  moveCard(dragIndex, hoverIndex) {
    const { data } = this.state;
    const dragCard = data[dragIndex];
    // happens sometimes when you click to insert a new item from the toolbox
    if (dragCard !== undefined) {
      this.saveData(dragCard, dragIndex, hoverIndex);
    }
  }

  // eslint-disable-next-line no-unused-vars
  cardPlaceHolder(dragIndex, hoverIndex) {
    // Dummy
  }

  saveData(dragCard, dragIndex, hoverIndex) {
    const newData = update(this.state, {
      data: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
      },
    });
    this.setState(newData);
    store.dispatch('updateOrder', newData.data);
  }

  duplicateCard = (item) => {
    if (!item) return;

    // Create a deep copy of the item
    const newItem = JSON.parse(JSON.stringify(item));
    
    // Generate a new unique ID
    newItem.id = ID.uuid();
    
    // Make the field name unique by appending a number
    const existingNames = this.state.data.map(element => element.field_name);
    let newFieldName = newItem.field_name;
    let counter = 1;
    while (existingNames.includes(newFieldName)) {
      newFieldName = `${newItem.field_name}_${counter}`;
      counter++;
    }
    newItem.field_name = newFieldName;

    // If this is a Layout component with child items, create deep copies of all children
    if (newItem.childItems && newItem.childItems.length > 0) {
      const newChildItems = [];
      const childIdMap = new Map(); // Map to track old ID -> new ID relationships

      // First pass: create deep copies of all child items
      newItem.childItems.forEach((childId, index) => {
        if (childId) {
          const childItem = this.getDataById(childId);
          if (childItem) {
            const newChildItem = JSON.parse(JSON.stringify(childItem));
            newChildItem.id = ID.uuid();
            newChildItem.parentId = newItem.id;
            newChildItem.col = index;
            newChildItem.custom = childItem.custom || false;
            newChildItem.element = childItem.element;
            newChildItem.key = childItem.key;

            // Handle deep cards (cards within cards)
            if (newChildItem.childItems && newChildItem.childItems.length > 0) {
              const newDeepChildItems = [];
              newChildItem.childItems.forEach((deepChildId, deepIndex) => {
                if (deepChildId) {
                  const deepChildItem = this.getDataById(deepChildId);
                  if (deepChildItem) {
                    const newDeepChildItem = JSON.parse(JSON.stringify(deepChildItem));
                    newDeepChildItem.id = ID.uuid();
                    newDeepChildItem.parentId = newChildItem.id;
                    newDeepChildItem.col = deepIndex;
                    newDeepChildItem.custom = deepChildItem.custom || false;
                    newDeepChildItem.element = deepChildItem.element;
                    newDeepChildItem.key = deepChildItem.key;

                    // Make deep child's field name unique
                    let deepChildFieldName = newDeepChildItem.field_name;
                    let deepChildCounter = 1;
                    while (existingNames.includes(deepChildFieldName)) {
                      deepChildFieldName = `${newDeepChildItem.field_name}_${deepChildCounter}`;
                      deepChildCounter++;
                    }
                    newDeepChildItem.field_name = deepChildFieldName;

                    childIdMap.set(deepChildId, newDeepChildItem.id);
                    newDeepChildItems.push(newDeepChildItem);
                  }
                } else {
                  newDeepChildItems.push(null);
                }
              });
              newChildItem.childItems = newDeepChildItems.map(child => child ? child.id : null);
              newChildItems.push(...newDeepChildItems.filter(Boolean));
            }
            
            // Make child's field name unique
            let childFieldName = newChildItem.field_name;
            let childCounter = 1;
            while (existingNames.includes(childFieldName)) {
              childFieldName = `${newChildItem.field_name}_${childCounter}`;
              childCounter++;
            }
            newChildItem.field_name = childFieldName;

            childIdMap.set(childId, newChildItem.id);
            newChildItems.push(newChildItem);
          } else {
            newChildItems.push(null);
          }
        } else {
          newChildItems.push(null);
        }
      });

      // Second pass: update childItems array with new IDs
      newItem.childItems = newChildItems.map(child => child ? child.id : null);

      // Insert all new child items into the data array
      const index = this.state.data.findIndex(element => element.id === item.id);
      const newData = [...this.state.data];
      newData.splice(index + 1, 0, newItem, ...newChildItems.filter(Boolean));
      
      // Update state and store
      this.setState({ data: newData });
      this.seq = this.seq > 100000 ? 0 : this.seq + 1;
      store.dispatch('updateOrder', newData);
    } else {
      // For non-Layout components, just insert the new item
      const index = this.state.data.findIndex(element => element.id === item.id);
      const newData = [...this.state.data];
      newData.splice(index + 1, 0, newItem);
      
      // Update state and store
      this.setState({ data: newData });
      this.seq = this.seq > 100000 ? 0 : this.seq + 1;
      store.dispatch('updateOrder', newData);
    }
  }

  getElement(item, index) {
    if (item.custom) {
      if (!item.component || typeof item.component !== 'function') {
        // eslint-disable-next-line no-param-reassign
        item.component = this.props.registry.get(item.key);
      }
    }
    const SortableFormElement = SortableFormElements[item.element];

    if (SortableFormElement === null) {
      return null;
    }
    return <SortableFormElement id={item.id} seq={this.seq} index={index} moveCard={this.moveCard} insertCard={this.insertCard} mutable={false} parent={this.props.parent} editModeOn={this.props.editModeOn} isDraggable={true} key={item.id} sortData={item.id} data={item} getDataById={this.getDataById} setAsChild={this.setAsChild} removeChild={this.removeChild} _onDestroy={this._onDestroy} duplicateCard={this.duplicateCard} />;
  }

  showEditForm() {
    const handleUpdateElement = (element) => this.updateElement(element);
    handleUpdateElement.bind(this);

    const formElementEditProps = {
      showCorrectColumn: this.props.showCorrectColumn,
      files: this.props.files,
      manualEditModeOff: this.manualEditModeOff,
      preview: this,
      element: this.props.editElement,
      updateElement: handleUpdateElement,
    };

    return this.props.renderEditForm(formElementEditProps);
  }

  render() {
    let classes = this.props.className;
    if (this.props.editMode) { classes += ' is-editing'; }
    const data = this.state.data.filter(x => !!x && !x.parentId);
    const items = data.map((item, index) => this.getElement(item, index));
    return (
      <div className={classes}>
        <div className="edit-form" ref={this.editForm}>
          {this.props.editElement !== null && this.showEditForm()}
        </div>
        <div className="Sortable">{items}</div>
        <PlaceHolder id="form-place-holder" show={items.length === 0} index={items.length} moveCard={this.cardPlaceHolder} insertCard={this.insertCard} />
        <CustomDragLayer/>
      </div>
    );
  }
}
Preview.defaultProps = {
  showCorrectColumn: false,
  files: [],
  editMode: false,
  editElement: null,
  className: 'col-md-9 react-form-builder-preview float-left',
  renderEditForm: props => <FormElementsEdit {...props} />,
};

import { useEffect, useState } from 'react';

const GridRow = ({ 
    headers, 
    item, 
    selectType,
    resetSeleted,
    singleSelection,
    multiSelection,
    onSingleSelection,
    onMultiSelection
}) => {
  const headerFields = headers.map((header) => header.value);

  /**
   * Set an item as selected base of selection type
   * @param {*} item - object
   */
  const onSelect = (item) => {
    // if selection type isn't provide or it is provided as single type
    if (!selectType || (selectType && selectType === 'single')) {
        onSingleSelection(item);
    } else { // otherwise it's a multi selection type
        onMultiSelection(item);
    }
  }

  /**
   * Check if the provided item is already selected
   * @param {*} item - object
   * @returns boolean
   */
  const onSingleSelecType = (item) => {
    // if an item is already selected
    if (Object.keys(singleSelection).length) {
        // get the first field of the already selected item
        const key = Object.keys(singleSelection)[0];
        // return true if item is already selected otherwise false
        return singleSelection[key] === item[key];
    } else {
        // return false if no item is selected
        return false;
    }
  }

  /**
   * Check if selected item is already in the selection
   * @param {*} item - object
   * @returns boolean
   */
  const onMultiSelectType = (item) => {
    // get the first field of item
    const key = Object.keys(item)[0]; 

    // if it's a multiple selection
    if (multiSelection) {
        // check if item is already exist in selection
        return multiSelection.some((selection) => selection[key] === item[key]);
    } else {
        return false;
    }
  }

  /**
   * Check if the item in param is selected or not
   * @param {*} item - object
   * @returns boolean
   */
  const isSelected = (item) => {
    // check if an item is selected
    return !selectType || selectType === 'single' ? onSingleSelecType(item) : onMultiSelectType(item);
  }

  return (
    <tr style={{ display: 'table', width: '100%', tableLayout: 'fixed', cursor: 'pointer' }}>
        { headerFields.map((field) => (
            <th 
                key={ item[field] }
                className={ isSelected(item) ? 'bg-primary text-light' : '' }
                onClick={ () => onSelect(item) }
                style={{ borderRight: '2px solid #ddd' }}
                
            >{ item[field] }</th>
        ))  }
    </tr>
  )
}

export default GridRow
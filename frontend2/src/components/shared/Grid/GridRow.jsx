import { useState } from 'react';

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

  const onSelect = (item) => {
    if (!selectType || (selectType && selectType === 'single')) {
        onSingleSelection(item);
    } else {
        onMultiSelection(item);
    }
  }

  const onSingleSelecType = (item) => {
    if (Object.keys(singleSelection).length) {
        const key = Object.keys(singleSelection)[0];
        return singleSelection[key] === item[key];
    } else {
        return false;
    }
  }

  const onMultiSelectType = (item) => {
    const key = Object.keys(item)[0];
    if (multiSelection) {
        return multiSelection.some((selection) => selection[key] === item[key]);
    } else {
        return false;
    }
  }

  const isSelected = (item) => {
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
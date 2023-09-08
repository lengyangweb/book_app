import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import GridHeader from './GridHeader';
import GridRow from './GridRow';
import GridFooter from './GridFooter';
import PropTypes from 'prop-types';

const GridBox = ({ 
    headers, 
    items,
    setItem,
    initialItems,
    selectType,
    selectedItem,
    setSelectedItem
}) => {
  const [sortStatus, setSortStatus] = useState('');
  const [singleSelection, setSingleSelection] = useState({});
  const [multiSelection, setMultiSelection] = useState([]);

  useEffect(() => {
    setSingleSelection(selectedItem);
  }, [selectedItem])

  /**
   * Sort all item in acending order
   * @param {*} field - an item field
   */
  const sortAsc = (field) => {
    const sortedItem = items.sort((a, b) => {
        // if value of field is type string
        if (typeof a[field] === 'string') {
            return String(a[field]).localeCompare(String(b[field]));
        }
        
        // if value of field is type number
        if (typeof a[field] === 'number') {
            return a[field] - b[field];
        }
    });

    // update sort item
    setItem([ ...sortedItem ]);
  }

  /**
   * Sort all items in descending order
   * @param {*} field - an item field
   */
  const sortDesc = (field) => {
    const sortedItem = items.sort((a, b) => {
        if (typeof a[field] === 'string') {
            return String(b[field]).localeCompare(String(a[field]));
        }
        
        if (typeof a[field] === 'number') {
            return b[field] - a[field];
        }
    });

    // update sort item
    setItem([ ...sortedItem ]);
  }

  /**
   * Search for items whose field is equal to the value
   * @param {*} field - an item field
   * @param {*} value - an item value
   * @returns boolean
   */
  const onFilter = (field, value) => {

    if (!value) {
        return setItem(initialItems);
    }

    const filterItems = items.filter((item) => {
        if (typeof value === 'string') {
            return String(item[field]).toLowerCase().startsWith((String(value).toLowerCase()));
        }

        if (typeof value === 'number') {
            return item[field] === value;
        }
    });

    setItem(filterItems);
  }

  /**
   * Set an item as selected in single selection
   * @param {*} item an item
   */
  const onSingleSelection = (item) => {
    const key = Object.keys(item)[0]; // grab the first field of the selected item

    // if an item is alreadly selected and it's equal to the new selected item
    if (Object.keys(singleSelection).length && item[key] == singleSelection[key]) {
        setSingleSelection({}); // set item selected to nothing
        setSelectedItem({}); // set item selected to nothing
    } else {
        // set selected item to the new selected item
        setSingleSelection({ ...item }); 
        // set selected item to the new selected item
        setSelectedItem({ ...item }); 
    }
  }

  /**
   * Set an item as selected in multi selection
   * @param {*} item an item
   */
  const onMultiSelection = (item) => {
    const key = Object.keys(item)[0]; // get the first field of the new selected item

    // if the new selected item is already in selection
    if (multiSelection.some((selected) => selected[key] === item[key])) {
        // remove the new selected item from the selection
        setMultiSelection([ ...multiSelection.filter((selected) => selected[key] !== item[key]) ]);
    } else {
        // add the new selected item in the selection
        setMultiSelection([ ...multiSelection, item ]);
    }
  }

  return (
    <div className="table-responsive">
        <Table striped hover className='border bg-dark'>
            <thead style={ theadStyle }>
                <GridHeader 
                    headers={ headers } 
                    sortAsc = { sortAsc }
                    sortDesc = { sortDesc }
                    sortStatus = { sortStatus }
                    setSortStatus = { setSortStatus }
                    setFilter= { onFilter }
                />
            </thead>
            <tbody style={ tbodyStyle }>
                {
                    items.map((item, index) => (
                        <GridRow 
                            key={ index } 
                            headers={ headers } 
                            item={ item } 
                            selectType={ selectType }
                            singleSelection={ singleSelection }
                            multiSelection={ multiSelection }
                            onSingleSelection={ onSingleSelection }
                            onMultiSelection={ onMultiSelection }
                        />
                    ))
                }
            </tbody>
            <tfoot>
                <GridFooter itemLength={ items.length } />
            </tfoot>
        </Table>
    </div>
  )
}

const theadStyle = { 
    display: 'table', 
    width: 'calc(100% - 1em)', 
    tableLayout: 'fixed' 
};

const tbodyStyle = { 
    maxHeight: '350px', 
    overflow: 'auto', 
    display: 'block', 
    width: '100%', 
    tableLayout: 'fixed'
};

GridBox.propTypes = {
    headers: PropTypes.array, 
    items: PropTypes.array,
    setItem: PropTypes.func,
    initialItems: PropTypes.array,
    selectType: PropTypes.object,
    selectedItem: PropTypes.object,
    setSelectedItem: PropTypes.func
}

export default GridBox
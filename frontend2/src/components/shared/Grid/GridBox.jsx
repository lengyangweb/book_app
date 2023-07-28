import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import GridHeader from './GridHeader';
import GridRow from './GridRow';
import GridFooter from './GridFooter';

const GridBox = ({ 
    headers, 
    items,
    setItem,
    initialItems
}) => {
  const [sortStatus, setSortStatus] = useState('');

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

  return (
    <div className="table-responsive">
        <Table striped hover className='border bg-dark'>
            <thead style={{ display: 'table', width: 'calc(100% - 1em)', tableLayout: 'fixed' }}>
                <GridHeader 
                    headers={ headers } 
                    sortAsc = { sortAsc }
                    sortDesc = { sortDesc }
                    sortStatus = { sortStatus }
                    setSortStatus = { setSortStatus }
                    setFilter={ onFilter }
                />
            </thead>
            <tbody style={{ maxHeight: '350px', overflow: 'auto', display: 'block', width: '100%', tableLayout: 'fixed' }}>
                {
                    items.map((item) => (
                        <GridRow 
                            key={item.name} 
                            headers={ headers } 
                            item={ item } 
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

export default GridBox
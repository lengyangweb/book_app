import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import GridHeader from './GridHeader';
import GridRow from './GridRow';
import GridFooter from './GridFooter';

const GridBox = ({ 
    headers, 
    items,
    setItem
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

  return (
    <div className="table-responsive">
        <Table striped bordered hover border>
            <thead style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
                <GridHeader 
                    headers={ headers } 
                    sortAsc = { sortAsc }
                    sortDesc = { sortDesc }
                    sortStatus = { sortStatus }
                    setSortStatus = { setSortStatus }
                />
            </thead>
            <tbody style={{ display: 'block', maxHeight: '350px', overflowY: 'auto' }}>
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

const gridStyle = {
    // width: '100%',
    // maxHeight: '350px',
    // overflow: 'auto',
}

export default GridBox
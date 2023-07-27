import React from 'react';
import Table from 'react-bootstrap/Table';
import GridHeader from './GridHeader';
import GridRow from './GridRow';
import GridFooter from './GridFooter';

const GridBox = ({ 
    headers, 
    items,
    setItem
}) => {

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

    console.log(sortedItem);
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

    console.log(sortedItem);
    setItem([ ...sortedItem ]);
  }

  return (
        <Table striped bordered hover>
            <thead>
                <GridHeader 
                    headers={ headers } 
                    sortAsc = { sortAsc }
                    sortDesc = { sortDesc }
                />
            </thead>
            <tbody>
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
  )
}

export default GridBox
import React from 'react';
import Table from 'react-bootstrap/Table';
import GridHeader from './GridHeader';
import GridRow from './GridRow';
import GridFooter from './GridFooter';

const GridBox = ({ 
    headers, 
    items
}) => {

  return (
        <Table striped bordered hover>
            <thead>
                <GridHeader headers={ headers } />
            </thead>
            <tbody>
                {
                    items.map((item) => (
                        <GridRow key={item.name} headers={ headers } item={ item } />
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
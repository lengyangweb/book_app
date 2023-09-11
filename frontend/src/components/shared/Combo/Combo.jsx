import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const Combo = ({ 
  selectedItem,
  setSelectedItem,
  defaultOptionText,
  selection
}) => {
  // const [select, setSelect] = useState({});

  return (
    <>
      <Form.Select aria-label="Default select example" onChange={(e) => setSelectedItem({ label: e.target.value, value: e.target.value })}>
        <option>{ defaultOptionText }</option>
        {
          selection.map((item) => {
            return (<option key={ item.label } value={ item.value }>{ item.label }</option>)
          })
        }
      </Form.Select>
    </>
  )
}

Combo.prototypes = {
  selectedItem: PropTypes.object,
  setSelectedItem: PropTypes.func,
  defaultOptionText: PropTypes.string,
  selection: PropTypes.array
}

export default Combo
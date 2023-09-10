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

  const onSelect = (item) => console.log(item);

  return (
    <>
      <Form.Select aria-label="Default select example">
        <option>{ defaultOptionText }</option>
        {
          selection.map((item) => {
            return (<option key={ item.label } value={ item.value } onChange={() => onSelect(item)}>{ item.label }</option>)
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
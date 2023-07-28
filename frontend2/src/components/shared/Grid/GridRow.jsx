
const GridRow = ({ headers, item }) => {
  const headerFields = headers.map((header) => header.value);

  const onSelect = (item) => {
    console.log(item);
  }

  return (
    <tr style={{ display: 'table', width: '100%', tableLayout: 'fixed', cursor: 'pointer' }}>
        { headerFields.map((field) => (
            <th 
                key={ item[field] }
                onClick={ () => onSelect(item) }
            >{ item[field] }</th>
        ))  }
    </tr>
  )
}

export default GridRow
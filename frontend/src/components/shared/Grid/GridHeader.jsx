import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { Form } from 'react-bootstrap';

const GridHeader = ({ 
  headers,
  sortAsc,
  sortDesc,
  sortStatus,
  setSortStatus,
  setFilter
}) => {

  let sortIcons;

  let headerEls = headers.map(({ label, value }) => (
    <th key={ label } className='bg-dark text-light py-2'>
      <div className="d-flex flex-column flex-lg-row justify-content-between">
        
        <div className="d-flex justify-content-start align-items-center">
          <span className='mx-2'>{ label }</span>
          {/* { sortIcons } */}
          <FaSort onClick={ () => onSort(value) } style={{ cursor: 'pointer' }} />
        </div>

        <form>
          <Form.Group>
            <Form.Control
              type='text'
              style={{ width: '150px' }}
              placeholder={ value }
              onChange={ (e) => setFilter(value, e.target.value) }
            />
          </Form.Group>
        </form>

      </div>
    </th>
  ));

  const onSort = (value) => {
    if (!sortStatus || (sortStatus && sortStatus === 'desc')) {
      setSortStatus('asc');
      sortAsc(value);
      addSortIcon(value);
    } else {
      setSortStatus('desc');
      sortDesc(value);
      addSortIcon(value);
    }
  }

  const addSortIcon = (value) => {
    if (!sortStatus) {
      sortIcons = <FaSort onClick={ () => onSort(value) } style={{ cursor: 'pointer' }} />
    }
    if (sortStatus === 'asc') {
      <FaSortUp onClick={ () => onSort(value) } style={{ cursor: 'pointer' }} />
    }
    if (sortStatus === 'desc') {
      sortIcons = <FaSortDown onClick={ () => onSort(value) } style={{ cursor: 'pointer' }} />
    }
  }

  return (
    <tr style={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
        { headerEls }
    </tr>
  )
}

export default GridHeader
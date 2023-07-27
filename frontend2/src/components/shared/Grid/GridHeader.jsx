import { FaSort } from 'react-icons/fa';

const GridHeader = ({ 
  headers,
  sortAsc,
  sortDesc
}) => {
  let sortStatus = "";
  let currentSort = "";
  
  const onSort = (value) => {
    if (!sortStatus || currentSort !== 'asc') {
      sortStatus = 'asc';
      sortAsc(value)
    } else {
      if (sortStatus === 'asc') {
        sortStatus = 'desc';
        sortDesc(value);
      } else {
        sortStatus = 'asc'
        sortAsc(value);
      }
    }
  }

  return (
    <tr>
        {
            headers.map(({ label, value }) => (
                <th key={ label } className='bg-dark text-light'>
                  <div className="d-flex justify-content-start align-items-center">
                    <span className='mx-2'>{ label }</span>
                    <FaSort onClick={ () => onSort(value) } style={{ cursor: 'pointer' }} />
                  </div>
                </th>
            ))
        }
    </tr>
  )
}

export default GridHeader
import { FaSort } from 'react-icons/fa';

const GridHeader = ({ 
  headers,
  sortAsc,
  sortDesc,
  sortStatus,
  setSortStatus
}) => {
  
  const onSort = (value) => {
    if (!sortStatus || (sortStatus && sortStatus === 'desc')) {
      setSortStatus('asc');
      sortAsc(value);
    } else {
      setSortStatus('desc');
      sortDesc(value);
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
import React from 'react'

const GridHeader = ({ headers }) => {
  return (
    <tr>
        {
            headers.map(({ label }) => (
                <th key={ label } className='bg-dark text-light'>{ label }</th>
            ))
        }
    </tr>
  )
}

export default GridHeader
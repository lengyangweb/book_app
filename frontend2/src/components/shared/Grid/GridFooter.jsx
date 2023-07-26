import React from 'react'

const GridFooter = ({ itemLength }) => {
  return (
    <tr>
        <th colSpan={itemLength}>
            <div className="d-flex justify-content-center">
                { itemLength } Items
            </div>
        </th>
    </tr>
  )
}

export default GridFooter
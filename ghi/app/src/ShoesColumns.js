import React from 'react';

  
function ShoesColumns({shoes}) {
  // console.log("shoes: ", shoes)
  const shoeColumns = [[], [], []]
  let index = 0
  for (let j = 0; j < shoes.length; j++) {
    // console.log("shoe: ", shoes[j])
    shoeColumns[index].push(shoes[j])
    index += 1
    if (index > 2) {
        index = 0
    }
  }
  console.log("shoeColumns: ", shoeColumns)
  return (
    shoeColumns.map(column => {
      // console.log("column: ", column)
      return(
        ShoeColumn(column)
      )
    }
    )
  )
}

function ShoeColumn(column) {
  return (
    <div className="col">
      {column.map(shoe => {
        // console.log("shoe: ", shoe)
        return (
          <div key={shoe.href} className="card mb-3 shadow">
            <img src={shoe.picture_url} className="card-img-top" />
            <div className="card-body">
              {/* add link to detail page */}
              <h3 className="card-title">{shoe.model_name}</h3>
              <div className="card-text">
                <div>
                  Brand: {shoe.manufacturer}
                </div>
                <div>
                  Color: {shoe.color}
                </div>
              </div>
            </div>
            <div className="card-footer">
                {/* put delete button here */}
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default ShoesColumns;
import React from 'react';

// function populateColumns({shoes}) {
//     console.log("shoes", shoes)
//     const shoeColumns = [[], [], []]
//     let i = 0
//     for (let shoe in shoes) {
//         shoeColumns[i].push(shoe)
//         i += 1
//         if (i > 2) {
//             i = 0
//         }
//     }
//     this.setState({shoeColumns: shoeColumns})
//     console.log("shoeColumns :", this.state.shoeColumns)
// }

function ShoesColumn({shoes}) {
    // populateColumns()
  return (
    <div className="col">
      {shoes.map(data => {
        console.log(data)
        // return (
        //   <div key={shoe.href} className="card mb-3 shadow">
        //     <img src={shoe.picture_url} className="card-img-top" />
        //     <div className="card-body">
        //       <h5 className="card-title">{shoe.model_name}</h5>
        //       <h6 className="card-subtitle mb-2 text-muted">
        //         {shoe.manufacturer_name}
        //       </h6>
        //       <p className="card-text">
        //         {conference.description}
        //       </p>
        //     </div>
        //     <div className="card-footer">
        //         {/* put delete button here */}
        //     </div>
        //   </div>
        // );
      })}
    </div>
  );
}

export default ShoesColumn;
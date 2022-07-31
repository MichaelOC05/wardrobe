function DisplayHatDetails (props){
  console.log(props)
  const hat = props.hat
  console.log(hat)
  return (
    <div key={hat.href} className="card mb-3 shadow">
            <img src={hat.picture_url} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{hat.style_name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Closet: {hat.location.closet_name} Section Number: {hat.location.section_number}
              </h6>
              <p> build {hat.href}</p>

            </div>

          </div>
  )
}

export default DisplayHatDetails
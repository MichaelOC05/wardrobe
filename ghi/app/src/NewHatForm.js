import React from 'react';

class NewHatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style_name: "",
      fabric: "",
      color: "",
      picture_url: "",
      locations: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeStyleName = this.handleChangeStyleName.bind(this);
    this.handleChangeFabric = this.handleChangeFabric.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleChangePictureUrl = this.handleChangePictureUrl.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/locations/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ locations: data.locations });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    delete data.locations;
    delete data.picture_url
    console.log("thsi is data", data)
    const hatsUrl = "http://localhost:8090/api/hats/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(hatsUrl, fetchConfig);
    if (response.ok) {
      const newHat = await response.json();
      console.log(newHat);
      this.setState({
        style_name: "",
        fabric: "",
        color: "",
        picture_url: "",
        location: "",
      });
    }
  }

  handleChangeStyleName(event) {
    const value = event.target.value;
    this.setState({ style_name: value });
  }

  handleChangeFabric(event) {
    const value = event.target.value;
    this.setState({ fabric: value });
  }

  handleChangeColor(event) {
    const value = event.target.value;
    this.setState({ color: value });
  }

  handleChangePictureUrl(event) {
    const value = event.target.value;
    this.setState({ picture_url: value });
  }

  handleChangeLocation(event) {
    const value = event.target.value;
    this.setState({ location: value });
  }


  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a New Hat</h1>
            <form onSubmit={this.handleSubmit} id="create-conference-form">
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeStyleName} placeholder="Style Name" required type="text" name="style_name" id="style_name" className="form-control" />
                <label htmlFor="style_name">Style Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeFabric} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control" />
                <label htmlFor="starts">Fabric</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangeColor} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={this.handleChangePictureUrl} placeholder="Picture Url" type="url" name="picture_url" id="picture_url" className="form-control" />
                <label htmlFor="picture_url">Picture Url</label>
              </div>
              <div className="mb-3">
                <select onChange={this.handleChangeLocation} required name="location" id="location" className="form-select">
                  <option value="">Choose a location</option>
                  {this.state.locations.map(location => {
                    return (
                      <option key={location.id} value={location.href}>Closet: {location.closet_name} Section Number: {location.section_number} Shelf number: {location.shelf_number}</option>
                    )
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewHatForm;
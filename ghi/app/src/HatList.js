import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function HatColumn(props) {
  return (
    <div className="col">
      {props.list.map(data => {
        const hat = data;
        const handleDelete = props.handleDelete
        return (
          <div key={hat.href} className="card mb-3 shadow">
            <img src={hat.picture_url} className="card-img-top" />
            <div className="card-body">
            <React.StrictMode>
              <Link className="nav-link" to="/hatDetail" params={{
                props: {hat}
              }}>
                <h5 className="card-title">{hat.style_name}</h5>
              </Link>
            </React.StrictMode>
              <h6 className="card-subtitle mb-2 text-muted">
                Closet: {hat.location.closet_name} Section Number: {hat.location.section_number}
              </h6>
              <p> build {hat.href}</p>
              <button className="btn btn-primary" onClick={ () => handleDelete(hat.href)}>Delete</button>
            </div>

          </div>
        );
      })}
    </div>
  );
}

class HatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hatColumns: [[], [], []]
    };
    this.handleDelete = this.handleDelete.bind(this)
  }


  async handleDelete(hatId) {
      const url = `http://localhost:8090${hatId}`
      const fetchConfig = {
        method: "DELETE"
      }
      const response = await fetch(url, fetchConfig)
      console.log("this is deleted", response)
      const updatedUrl = "http://localhost:8090/api/hats/"
      try {
        const updatedResponse = await fetch(updatedUrl)
        if (response.ok) {
          const data = await updatedResponse.json()
          const updatedRequests = []
          console.log(data)
          for (let hat of data.hats) {
            const detailsUrl = `http://localhost:8090${hat.href}`
            updatedRequests.push(fetch(detailsUrl))
          }
          const updatedHatResponses = await Promise.all(updatedRequests)
          const updatedHatColumns = [[], [], []];
          let i = 0
          for (const updatedHatResponse of updatedHatResponses) {
            if (updatedHatResponse.ok) {
              const updatedHatDetails = await updatedHatResponse.json()
              updatedHatColumns[i].push(updatedHatDetails);
              i = i + 1;
              if (i > 2) {
                i = 0;
              }
            } else {
              console.error(updatedHatResponse);
            }
          

          // Set the state to the new list of three lists of
          // conferences
          this.setState({hatColumns: updatedHatColumns});
        
      }

        }

    }catch (e) {
      console.error(e);
    }
  }
  async componentDidMount() {
    const url = 'http://localhost:8090/api/hats/';

    try {
      const response = await fetch(url);
      if (response.ok) {
        // Get the list of conferences
        const data = await response.json();
        const requests = [];

        for (let hat of data.hats) {
          const detailUrl = `http://localhost:8090${hat.href}`;
          requests.push(fetch(detailUrl));
        }
        const responses = await Promise.all(requests);
        const hatColumns = [[], [], []];
        let i = 0;
        for (const conferenceResponse of responses) {
          if (conferenceResponse.ok) {
            const details = await conferenceResponse.json();
            hatColumns[i].push(details);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(conferenceResponse);
          }
        }

        // Set the state to the new list of three lists of
        // conferences
        this.setState({hatColumns: hatColumns});
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <>
        <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
          <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
          <h1 className="display-5 fw-bold">Hat List</h1>

        </div>
        <div className="container">
          <h2>Hats</h2>
          <div className="row">
            {this.state.hatColumns.map((hatList, index) => {
              return (
                <HatColumn key={index} list={hatList} handleDelete={this.handleDelete}/>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default HatList;
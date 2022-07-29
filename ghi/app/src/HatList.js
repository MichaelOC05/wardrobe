import React from 'react';
import { Link } from 'react-router-dom';

function HatColumn(props) {
  return (
    <div className="col">
      {props.list.map(data => {
        const hat = data;

        return (
          <div key={hat.href} className="card mb-3 shadow">
            <img src={hat.picture_url} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{hat.style_name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Closet: {hat.location.closet_name} Section Number: {hat.location.section_number}
              </h6>

            </div>

          </div>
        );
      })}
    </div>
  );
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hatColumns: [[], [], []],
    };
  }

  async componentDidMount() {
    const url = 'http://localhost:8090/api/hats/';

    try {
      const response = await fetch(url);
      if (response.ok) {
        // Get the list of conferences
        const data = await response.json();

        // Create a list of for all the requests and
        // add all of the requests to it
        const requests = [];

        for (let hat of data.hats) {
          const detailUrl = `http://localhost:8090${hat.href}`;
          requests.push(fetch(detailUrl));
        }

        // Wait for all of the requests to finish
        // simultaneously
        const responses = await Promise.all(requests);

        // Set up the "columns" to put the conference
        // information into
        const hatColumns = [[], [], []];

        // Loop over the conference detail responses and add
        // each to to the proper "column" if the response is
        // ok
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
          <h1 className="display-5 fw-bold">Conference GO!</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              The only resource you'll ever need to plan an run your in-person or
              virtual conference for thousands of attendees and presenters.
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/attendees/new" className="btn btn-primary btn-lg px-4 gap-3">Attend a conference</Link>
            </div>
          </div>
        </div>
        <div className="container">
          <h2>Upcoming conferences</h2>
          <div className="row">
            {this.state.hatColumns.map((hatList, index) => {
              return (
                <HatColumn key={index} list={hatList} />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default MainPage;
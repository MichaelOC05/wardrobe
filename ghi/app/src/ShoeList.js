import React from 'react';
import { Link } from 'react-router-dom';
import ShoesColumns from './ShoesColumns';

class ShoeList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
                    <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
                    <h1 className="display-5 fw-bold">Wardrobify</h1>
                <div className="col-lg-6 mx-auto">
                    <p className="lead mb-4">
                        Taking all the work out of managing your wardrobe.
                    </p>
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        {/* <Link to="/attendees/new" className="btn btn-primary btn-lg px-4 gap-3">Attend a conference</Link> */}
                    </div>
                </div>
                </div>
                <div className="container">
                    <h2>Your Shoes:</h2>
                    <div className="row">
                        <ShoesColumns shoes={this.props.shoes} />
                    </div>
                </div>
            </>
        );
    }
}

export default ShoeList;
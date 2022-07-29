import React from 'react';
import { Link } from 'react-router-dom';
import ShoesColumns from './ShoesColumns';

class ShoeList extends React.Component {
    constructor(props) {
        super(props);
    }

    // async componentDidMount() {
    //     console.log("shoes", this.props.shoes)
    //     const shoeColumns = [[], [], []]
    //     let i = 0
    //     for (let shoe in this.props.shoes) {
    //         shoeColumns[i].push(shoe)
    //         i += 1
    //         if (i > 2) {
    //             i = 0
    //         }
    //     }
    //     this.setState({shoeColumns: shoeColumns})
    //     console.log("shoeColumns :", this.state.shoeColumns)
    // }
    
    
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
                        {/* <Link to="/attendees/new" className="btn btn-primary btn-lg px-4 gap-3">Attend a conference</Link> */}
                    </div>
                </div>
                </div>
                <div className="container">
                    <h2></h2>
                    <div className="row">
                        <ShoesColumns shoes={this.props.shoes} />
                    </div>
                </div>
            </>
        );
    }
}

export default ShoeList;
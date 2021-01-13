import React from 'react';
import ReactJson from 'react-json-view';

class Results extends React.Component {
    render() {
        return(
            <div id="resultsapi">
                <h3>Pokemon Results</h3>
                <ReactJson src={this.props.headers}/>
                <p>Count: {this.props.count}</p>
                <ReactJson src={this.props.pokemon}/>
            </div>
        )
    }
}

export default Results;

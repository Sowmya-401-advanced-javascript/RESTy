import React from 'react';
import ReactJson from 'react-json-view';

class Results extends React.Component {
    render() {
        return(
            <div id="resultsapi">
                <h3>Response</h3>
                <span class='strong'>{this.props.method}</span> <span>{this.props.url}</span> 
                <ReactJson src={this.props.headers} name="Headers"/>
                <ReactJson src={this.props.result} name="Response"/>
            </div>
        )
    }
}

export default Results;

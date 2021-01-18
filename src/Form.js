import React from 'react';
import Results from './ResultsApi';
import './Form.scss';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlInput: '',
      url: '',
      method: '',
      result: {},
      headers: {},
      requestBody: {},
      requestHistory: []
      // historyList: {
      //   1 { 'method': 'GET', 'url': 'https://elle.com', 'requestBody': ','},
      //   2 { 'method': 'PUT', 'url': 'https://elle.com/put1', 'requestBody': '{something}'}
      // }
    };
  }

  handleInput = e => {
    let input = e.target.value;
    this.setState({ url: input });
  }

  handleMethod = e => {
    e.preventDefault();
    let newMethod = e.target.value;
    this.setState({ method: newMethod });
  }

  handleRequestBody = e => {
    let newRequestBody = e.target.value;
    this.setState({ requestBody: newRequestBody });
  }

  useHistoryItem = e => {
    e.preventDefault();



    let historyItemIdx = 0;
    let historyList = this.state.requestHistory;
    let url = historyList[historyItemIdx].url;
    let requestOptions = historyList[historyItemIdx].requestOptions;

    this.setState({ url });
    this.setState({ method: requestOptions.method });
    this.setState({ displayResults: true })

    this.getResultsFromHistory(e, url, requestOptions);
  }

  getResultsFromHistory = async (e, url, requestOptions) => {
    let responseHeaders = {};

    const result = await fetch(url, requestOptions)
     .then(response => {
       if(response.status === 200) {
         for(var pair of response.headers.entries()) {
           responseHeaders[pair[0]] = pair[1];
         }
         return response.json();
       } else {
         return;
       }
     });
     this.setState({ result: result });
     this.setState({ headers: responseHeaders });
  }

  getResult = async (e) => {
    e.preventDefault();
    const url = this.state.url;
    const method = this.state.method;
    let requestOptions;
    let requestHeaders = { "content-type": "application/json; charset=UTF-8" };
    var responseHeaders = {};
    let requestBody = this.state.requestBody;
    // let historyItem = [];

    switch (method) {
      case 'GET':
        requestOptions = { method: method, mode: 'cors' };
        break;
      case 'POST':
        requestOptions = { method: method, headers: requestHeaders, body: requestBody, mode: 'cors' };
        break;
      case 'PUT':
        requestOptions = { method: method, headers: requestHeaders, body: requestBody, mode: 'cors' };
        break;
      case 'DELETE':
        requestOptions = { method: method, mode: 'cors' };
        break;

      default:
        requestOptions = {};
        break;
    }

    try {
      var result = await fetch(url, requestOptions)
    } catch (err) {
      console.error(err);
    }

    try {
      const resultBody = await result.json();

      for (var pair of result.headers.entries()) {
        responseHeaders[pair[0]] = pair[1]
      }

      this.setState({ headers: responseHeaders });
      this.setState({ result: resultBody });

      this.state.requestHistory.push({ method: method, url: url});
      console.log(this.state.requestHistory)
    } catch (err) {
      console.error(err);
    }
  }

  handlePreviousQuery = event => {
    console.log("inside handlePreviousQuery")
    console.log(event)
    console.log(event.target)
    console.log(event.target.value)
    this.setState({ urlInput: "abc" })
    console.log(this.state.urlInput)
  }

  render() {
    return (
      <div>
        <ul onClick={this.handlePreviousQuery}>
          {this.state.requestHistory.map( (item, i, array) =>
          <li key={i}>
            {item.url}
          </li> )}
        </ul>

        <form>
          <label for="URL" >URL:</label>
          <input name="URL" onBlur={this.handleInput}
            placeholder="Enter a URL...." autoFocus
            defaultValue={this.state.urlInput}/>
          <button onClick={this.getResult}>Go!</button>


          <fieldset id='method' onClick={this.handleMethod}>
            <legend> Choose a method:</legend>
            <button value='GET'>GET</button>
            <button value='POST'>POST</button>
            <button value='PUT'>PUT</button>
            <button value='DELETE'>DELETE</button>
          </fieldset>

          {(this.state.method === 'POST' || this.state.method === 'PUT') ?

            <fieldset id='restRequestBody'>
              <legend>Request Body: </legend>
              <textarea name='requestBody' onBlur={this.handleRequestBody}></textarea>
            </fieldset>
            : ""
          }

          <fieldset id='resultResponseBody'>
            <Results
              url={this.state.url}
              method={this.state.method}
              headers={this.state.headers}
              result={this.state.result}
            />
          </fieldset>
        </form>
      </div>
    )
  }
}

export default Form;
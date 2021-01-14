import React from 'react';
import Results from './ResultsApi';
import './Form.scss';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      method: '',
      result: {},
      headers: {},
      requestBody: {}
    };
  }

  handleInput = e => {
    let input = e.target.value;
    this.setState({ url: input });
  }

  handleMethod = e => {
    e.preventDefault();
    let newMethod = e.target.value;
    // console.log(newMethod);
    this.setState({ method: newMethod });
  }

  handleRequestBody = e => {
    let newRequestBody = e.target.value;
    this.setState({ requestBody: newRequestBody });
    // console.log();
  }

  getResult = async (e) => {
    e.preventDefault();
    const url = this.state.url;
    const method = this.state.method;
    let requestOptions;
    let requestHeaders = { "content-type": "application/json; charset=UTF-8" };
    var responseHeaders = {};
    let requestBody = this.state.requestBody;

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
      this.setState({ result: resultBody});
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <div>
        <form>
          <label for="URL" >URL:</label>
          <input name="URL" onBlur={this.handleInput}
            placeholder="Enter a URL...." />
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
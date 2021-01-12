import React from 'react';
import './Form.scss';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      method: '',
      results: ''
    };
  }

  handleInput = e => {
    let input = e.target.value;
    this.setState({ url: input });
    console.log(input);
  }

  handleMethod = e => {
    e.preventDefault();
    let newMethod = e.target.value;
    console.log(newMethod);
    this.setState({ method: newMethod });
  }

  handleClick = e => {
    e.preventDefault();
    if (this.state.url && this.state.method) {
      let newResult = `${this.state.method} ${this.state.url}`;
      let newResultSet = `${newResult}
${this.state.results}`
      this.setState({ results: newResultSet });
      console.log(newResultSet);
    }
  }

  render() {
    return (
      <>
      <form>
      <label for="URL" >URL:</label>
      <input name="URL" onBlur={this.handleInput}
      placeholder="Enter a URL...."/>
      <button onClick={this.handleClick}>Go!</button>
      </form>
      
      <fieldset id='method'>
          <legend> Choose a method:</legend>
          <button onClick={this.handleMethod} value='GET'>GET</button>
          <button onClick={this.handleMethod} value='POST'>POST</button>
          <button onClick={this.handleMethod} value='PUT'>PUT</button>
          <button onClick={this.handleMethod} value='DELETE'>DELETE</button>
      </fieldset>
      <fieldset id='result'>
          <legend>Results:</legend>
          <pre>{this.state.results}</pre>
      </fieldset>

      </>
    )
  }
}

  export default Form;
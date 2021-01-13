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
    // console.log(input);
  }

  handleMethod = e => {
    e.preventDefault();
    let newMethod = e.target.value;
    // console.log(newMethod);
    this.setState({ method: newMethod });
  }

  handleClick = e => {
    e.preventDefault();
    if (this.state.url && this.state.method) {
      let newResult = `${this.state.method} ${this.state.url}`;
      let newResultSet = `${newResult}
${this.state.results}`
      this.setState({ results: newResultSet });
      // console.log(newResultSet);
    }
  }

  getPokemon = async (e) => {
    e.preventDefault();
    const url = this.state.url;

    try {
      var poke = await fetch(url, { method: this.state.method, mode: 'cors' })
    } catch (err) {
      console.error(err);
    }

    try {
      const pokeData = await poke.json();
      var headers = {};


      for (var pair of poke.headers.entries()) {
        headers[pair[0]] = pair[1]
      }
      // .then(response => {
      //   // console.log('poke', response.json());

      //   // if(response.status !==200)return;
      //   return response.json();
      // });
      // console.log(pokeData);
      this.props.givePokemon(pokeData.results, pokeData.count, headers);
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
      placeholder="Enter a URL...."/>
      <button onClick={this.getPokemon}>Go!</button>
      </form>
      
      <fieldset id='method' onClick={this.handleMethod}>
          <legend> Choose a method:</legend>
          <button value='GET'>GET</button>
          <button value='POST'>POST</button>
          <button value='PUT'>PUT</button>
          <button value='DELETE'>DELETE</button>
      </fieldset>
      <fieldset id='result'>
          <legend>Results:</legend>
          <pre>{this.state.results}</pre>
      </fieldset>

      </div>
    )
  }
}

  export default Form;
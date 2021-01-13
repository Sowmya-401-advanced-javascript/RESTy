import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Form from './Form';
import Results from './ResultsApi';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headers: [],
      count: 0,
      pokemon: []
    }
  }

  getPoke = (pokemonResult, countResult, headerResult) => {
    this.setState({ pokemon: pokemonResult, count: countResult, headers: headerResult });
    // console.log(pokemonResult);
  }


  render() {
    return (
      <div>
      <Header/>
      <Form data-testid='get-poke-form'
        givePokemon={this.getPoke}
      />
      <Results
        headers={this.state.headers}
        count={this.state.count}
        pokemon={this.state.pokemon}
      />
      <Footer/>
      
      </div>
    )
  }
}

export default App;

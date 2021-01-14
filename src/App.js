import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Form from './Form';
import './App.scss';

class App extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Form /> 
        <Footer />
      </div>
    )
  }
}

export default App;

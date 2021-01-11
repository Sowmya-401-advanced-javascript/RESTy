import React from 'react';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//       </header>
//     </div>
//   );
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      URL: '',
    }
  }

  render() {
    return (
      <>
      <Header />
      <input onChange={this.handleWords} />
      <button onClick={this.handleClick}>Go!</button>
      <Footer />
      <Form></Form>
      </>
    )
  }
}

export default App;

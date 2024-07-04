import { Component } from 'react';
import Home from '../pages/home/Home';
import Header from '../shared/ui/Header';

class App extends Component {
  render() {
    return (
      <div className="flex min-h-full w-full min-w-full flex-col justify-center">
        <Header />
        <Home />
      </div>
    );
  }
}

export default App;

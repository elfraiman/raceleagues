import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import React from 'react';
import Routes from './providers/Router/routes';

function App() {
  return (
    <main>
      <Routes />
    </main>
  );
}

export default App;

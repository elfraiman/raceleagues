import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import React from 'react';
import Routes from './providers/Router/routes';
import Footer from './components/footer/footer';

function App() {
  return (
    <main>
      <Routes />
      <Footer />
    </main>
  );
}

export default App;

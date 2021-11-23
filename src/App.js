import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

import Header from './components/Header';
import LeagueDisplay from './components/Teams/LeagueDisplay';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Container>
          <LeagueDisplay />
        </Container>
      </div>
    </Router>
  );
}

export default App;

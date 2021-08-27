import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Home extends React.Component {
  render() {
    return (
      <ul className="home">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/tool/record">Record</Link>
        </li>
        <li>
          <Link to="/tool/rank">Rank</Link>
        </li>
        <li>
          <Link to="/tool/language">Language</Link>
        </li>
      </ul>
    );
  }
}

export default Home;

import * as React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default class Header extends React.Component {
  public render() {
    return (
      <div className="Header Section">
        <h1 id="App-Header">ffdraft.app</h1>
        <p>A fantasy football draft tool</p>
        <p>
          Pick players based on their{' '}
          <a
            href="https://en.wikipedia.org/wiki/Value_over_replacement_player"
            target="_blank">
            value over replacement
          </a>{' '}
          from{' '}
          <a href="http://games.espn.com/ffl/tools/projections" target="_blank">
            expert
          </a>{' '}
          <a
            href="https://www.cbssports.com/fantasy/football/stats/weeklyprojections/QB"
            target="_blank">
            forecasts
          </a>
        </p>
        <p>
          <Link to="/about">Overview</Link>
        </p>
      </div>
    );
  }
}

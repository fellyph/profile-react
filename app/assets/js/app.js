'use strict'

import React, {Component} from 'react'
import axios from 'axios'
import PortfolioList from './portfolio/portfolioList'

class App extends Component {
  constructor () {
    super()
    this._isMounted = false;
    this.state = {
      jobs: [],
      source: 'https://blog.fellyph.com.br/wp-json/wp/v2/portfolio'
    }
  }

  componentDidMount () {
    this._isMounted = true;
    axios
      .get(this.state.source)
      .then((result) => {
        if (this._isMounted) {
          this.setState({ jobs: result.data });
        }
      })
      .catch((error) => {
        // Handle API errors gracefully
        console.error('Failed to fetch portfolio data:', error);
      });
  }

  componentWillUnmount () {
    this._isMounted = false;
  }

  render () {
    return (
      <PortfolioList jobs={this.state.jobs} />
    );
  }
}

export default App
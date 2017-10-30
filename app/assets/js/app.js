'use strict'

import React, {Component} from 'react'
import axios from 'axios'
import PortfolioList from './portfolio/portfolioList'

class App extends Component {
  constructor() {
    super()
    this.state = {
      jobs : [],
      source : 'https://blog.fellyph.com.br/wp-json/wp/v2/portfolio'
    }
  }

  componentDidMount() {
    this.serverRequest =
      axios
        .get(this.state.source)
        .then((result) => this.setState({ jobs: result.data}));
  }

  componentWillUnmount () {
    this.serverRequest.abort()
  }

  render () {
    return (
      <PortfolioList jobs={this.jobs} />
    );
  }
}

export default App
'use strict'

import React, {Component} from 'react'
import axios from 'axios'
import PortfolioItem from './portfolioItem'

class PortfolioList extends Component {
  constructor() {
    super()
    this.state = {
      jobs : []
    }
  }

  componentDidMount() {
    this.serverRequest =
      axios
        .get(this.props.source)
        .then((result) => this.setState({ jobs: result.data}));
  }

  componentWillUnmount () {
    this.serverRequest.abort()
  }

  render () {
    return (
      <div className="jobs">
        {this.state.jobs.map( (job) => <PortfolioItem key={job.id} name={job.title.rendered} technologies={job.content.rendered} image={job.thumbnail_url} alt={job.title.rendered} /> )}
      </div>
    );
  }
}

export default PortfolioList
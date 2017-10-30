'use strict'

import React, {PropTypes} from 'react'
import PortfolioItem from './portfolioItem'

const PortfolioList = ({jobs = []}) => (
  <section className="jobs">
    <h2>Portfolio</h2>
    {jobs.map( (job) => <PortfolioItem key={job.id} name={job.title.rendered} technologies={job.content.rendered} image={job.thumbnail_url} alt={job.title.rendered} /> )}
  </section>
)

PortfolioList.propTypes = {
  jobs: PropTypes.array
}

export default PortfolioList
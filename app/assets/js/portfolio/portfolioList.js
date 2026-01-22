'use strict'

import React from 'react'
import PropTypes from 'prop-types'
import PortfolioItem from './portfolioItem'

const PortfolioList = ({jobs = []}) => (
  <section className="jobs">
    <h2>Portfolio</h2>
    {jobs.map( (job) => <PortfolioItem key={job.id} title={job.title.rendered} content={job.content.rendered} imageUrl={job.thumbnail_url} imageAlt={job.title.rendered} /> )}
  </section>
)

PortfolioList.propTypes = {
  jobs: PropTypes.array
}

export default PortfolioList
import React from 'react'
import ReactDOM from 'react-dom'
import PortfolioList from './portfolio/portfolioList'

ReactDOM.render(
  <PortfolioList source="http://blog.fellyph.com.br/wp-json/wp/v2/portfolio"/>, document.getElementById('jobs')
);

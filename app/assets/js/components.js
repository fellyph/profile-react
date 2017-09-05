import React from 'react'
import ReactDOM from 'react-dom'
import PortfolioList from './portfolio/portfolioList'

ReactDOM.render(
  <PortfolioList source="http://fellyph.com.br/blog/wp-json/wp/v2/portfolio"/>, document.getElementById('jobs')
);
